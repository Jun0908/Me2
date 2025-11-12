import { NextRequest, NextResponse } from 'next/server'
import { DraftInput, DraftOutput, isDraftInput, isDraftOutput, Tone } from '@/lib/schema'

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!

export async function POST(req: NextRequest) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 500 })
  }

  let body: DraftInput
  try {
    body = await req.json()
    if (!isDraftInput(body)) throw new Error('Invalid payload')
  } catch {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }

  // 入力整形（過度な長文は切り詰め）
  const text = (body.text || '').slice(0, 1200)
  const era = body.era

  // Chat Completions（JSON強制）で呼ぶ
  const payload = {
    model: MODEL,
    temperature: 0.2,
    response_format: { type: 'json_object' as const },
    messages: [
      {
        role: 'system',
        content:
          [
            'You are a short-form persona cameo generator.',
            'Return ONLY JSON with fields: summary (<=120 chars), tone (Calm|Anxious|Motivated|Neutral),',
            'keywords (an array of exactly 3 concise lowercase keywords),',
            'tagline (<=12 words, punchy, no punctuation at the end).',
            'Avoid PII, medical/financial advice, and offensive content.',
          ].join(' '),
      },
      {
        role: 'user',
        content: JSON.stringify({
          instruction:
            'Create a 10-second persona cameo snapshot from the input text in concise English.',
          era,
          text,
        }),
      },
    ],
  }

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!r.ok) {
      const errText = await r.text().catch(() => '')
      return NextResponse.json({ error: 'OpenAI error', detail: errText }, { status: 500 })
    }

    const data = await r.json()
    const content = data.choices?.[0]?.message?.content
    let json: any
    try {
      json = JSON.parse(content)
    } catch {
      // 念のためのフォールバック（JSONでなかった場合の最低限ガード）
      json = {}
    }

    // バリデーション＆フォールバック
    const coerce = (raw: any): DraftOutput => {
      const tone: Tone =
        raw.tone === 'Calm' || raw.tone === 'Anxious' || raw.tone === 'Motivated' ? raw.tone : 'Neutral'
      const keywords: [string, string, string] = Array.isArray(raw.keywords) && raw.keywords.length >= 3
        ? [String(raw.keywords[0] || ''), String(raw.keywords[1] || ''), String(raw.keywords[2] || '')]
        : ['focus', 'reflection', 'growth']
      const summary = (String(raw.summary || text).slice(0, 120) || 'A 10-second slice of now')
      const tagline = String(raw.tagline || 'A 10-second slice of now').split(/\s+/).slice(0, 12).join(' ')
      return { summary, tone, keywords, tagline }
    }

    const out = coerce(json)
    if (!isDraftOutput(out)) {
      // ここまでで整形しているので通常は通るはず
      return NextResponse.json(out)
    }
    return NextResponse.json(out)
  } catch (e: any) {
    return NextResponse.json({ error: 'Server error', detail: String(e?.message || e) }, { status: 500 })
  }
}
