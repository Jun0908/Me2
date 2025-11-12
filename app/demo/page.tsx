'use client'

import React, { useMemo, useState } from 'react'

type Era = '2018-2020' | '2021-2023' | '2024-'
type Tone = 'Calm' | 'Anxious' | 'Motivated' | 'Neutral'
type VoicePreset = 'F' | 'M'

type Cameo = {
  id: string
  createdAt: string
  era: Era
  text: string
  summary: string
  tone: Tone
  keywords: string[]
  tagline: string
  voicePreset: VoicePreset
  imageSrc: string
}

export default function Page() {
  // English-only
  const t = useMemo(
    () => ({
      title: 'Persona Cameo — Capture your “now” in 10 seconds',
      desc:
        'Paste a short text to generate a Cameo. Voice + face (image) + personality snapshot, saved on a timeline.',
      inputLabel: 'Paste your text',
      sample: 'Insert sample',
      imageLabel: 'Face image (optional)',
      eraLabel: 'Era',
      voiceLabel: 'Voice',
      generate: 'Create Cameo',
      addTimeline: 'Add to timeline',
      timeline: 'Timeline',
      toneLabel: 'Tone',
      keywords: 'Keywords',
      tagline: 'Tagline',
      playHint: 'Play (TTS)',
    }),
    []
  )

  const [text, setText] = useState('')
  const [era, setEra] = useState<Era>('2024-')
  const [voicePreset, setVoicePreset] = useState<VoicePreset>('F')
  const [imageSrc, setImageSrc] = useState('/face.jpg') // default avatar

  const [preview, setPreview] = useState<Cameo | null>(null)
  const [timeline, setTimeline] = useState<Cameo[]>([])
  const [confetti, setConfetti] = useState(false)

  const onFile = (file: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageSrc(String(reader.result))
    reader.readAsDataURL(file)
  }

  // Lightweight pseudo-generation: summary / tone / keywords / tagline
  const generateCameo = () => {
    const base = (text || '').trim()
    if (!base) return

    const tokens = base
      .replace(/[^\w\s’'-]/g, ' ')
      .split(/\s+/)
      .filter(Boolean)

    const freq = tokens.reduce<Record<string, number>>((acc, w) => {
      const k = w.toLowerCase()
      acc[k] = (acc[k] || 0) + 1
      return acc
    }, {})

    const keywords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([k]) => k)
      .filter((w) => w.length > 2)
      .slice(0, 3)

    const exclam = (base.match(/!/g) || []).length
    const neg = (base.match(/\b(no|not|never|can’t|cannot|won’t)\b/gi) || []).length
    const selfRef = (base.match(/\b(I|me|my|I’m|I’ve)\b/g) || []).length

    let tone: Tone = 'Neutral'
    if (exclam >= 2 && neg === 0) tone = 'Motivated'
    else if (neg >= 2 && exclam === 0) tone = 'Anxious'
    else if (selfRef > 3 && neg === 0) tone = 'Calm'

    const summary = base.length > 80 ? base.slice(0, 77) + '…' : base

    const tagline =
      tone === 'Motivated'
        ? 'Momentum is your fuel'
        : tone === 'Anxious'
        ? 'Anxiety can be a compass'
        : tone === 'Calm'
        ? 'Clarity grows in stillness'
        : 'A 10-second slice of now'

    const cameo: Cameo = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      era,
      text: base,
      summary,
      tone,
      keywords,
      tagline,
      voicePreset,
      imageSrc,
    }
    setPreview(cameo)
  }

  const speak = (msg: string) => {
    if (!msg) return
    const utter = new SpeechSynthesisUtterance(msg)
    utter.lang = 'en-US'
    utter.rate = 1.0
    utter.pitch = voicePreset === 'F' ? 1.15 : 0.9
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }

  const addToTimeline = () => {
    if (!preview) return
    setTimeline((prev) => [preview, ...prev])
    setPreview(null)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 1400)
  }

  const Confetti = () =>
    confetti ? (
      <div className="confetti" aria-hidden>
        {Array.from({ length: 60 }).map((_, i) => {
          const left = Math.random() * 100
          const delay = Math.random() * 0.4
          return (
            <span
              key={i}
              style={{
                left: `${left}vw`,
                background: i % 3 === 0 ? '#000' : i % 3 === 1 ? '#444' : '#888',
                animationDelay: `${delay}s`,
              }}
            />
          )
        })}
      </div>
    ) : null

  return (
    <main className="min-h-screen bg-white text-black">
      <Confetti />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-bold tracking-tight">Persona Cameo</div>
          <div className="flex items-center gap-3">
            <label className="text-sm" htmlFor="era">{t.eraLabel}</label>
            <select
              id="era"
              value={era}
              onChange={(e) => setEra(e.target.value as Era)}
              className="rounded-full border px-3 py-1.5 text-sm bg-white"
              aria-label="Select era"
            >
              {(['2018-2020', '2021-2023', '2024-'] as Era[]).map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>

            <label className="text-sm" htmlFor="voice">{t.voiceLabel}</label>
            <select
              id="voice"
              value={voicePreset}
              onChange={(e) => setVoicePreset(e.target.value as VoicePreset)}
              className="rounded-full border px-3 py-1.5 text-sm bg-white"
              aria-label="Select voice preset"
            >
              <option value="F">F</option>
              <option value="M">M</option>
            </select>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">{t.title}</h1>
        <p className="mt-3 text-neutral-700 max-w-3xl">{t.desc}</p>
      </section>

      {/* Workbench */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div className="rounded-2xl border bg-white p-5">
            <label className="text-sm font-medium">{t.inputLabel}</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-2 w-full h-44 rounded-lg border p-3 bg-white"
              placeholder={'e.g., I organized a new feature idea and I can’t wait to build it.'}
            />
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={() =>
                  setText('I can finally see the direction for the new feature. A bit anxious, but I want to ship a prototype now!')
                }
                className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
              >
                {t.sample}
              </button>

              <label className="text-sm font-medium ml-auto">{t.imageLabel}</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onFile(e.target.files?.[0] || null)}
                className="text-sm"
              />
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={generateCameo}
                className="rounded-lg bg-black text-white px-5 py-3 text-sm hover:bg-black/90"
              >
                {t.generate}
              </button>
            </div>
          </div>

          {/* Right: Preview (white-based, no color accents) */}
          <div className="rounded-2xl border p-5 bg-white relative overflow-hidden">
            <div className="text-xs mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border">
                {era}
              </span>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-50 border">
              <img
                src={preview?.imageSrc || imageSrc}
                alt="face"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Subtle “scanline” overlay for motion feel */}
              <div className="absolute inset-0 mix-blend-multiply opacity-40 pointer-events-none"
                   style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px)', backgroundSize: '100% 3px' }} />
              {preview && (
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold">{t.toneLabel}: {preview.tone}</span>
                    <button
                      onClick={() => speak(preview.summary)}
                      className="rounded-full bg-black text-white px-3 py-1"
                      title={t.playHint}
                    >
                      ▶
                    </button>
                  </div>
                  <div className="text-black">
                    <div className="text-lg font-semibold">{preview.summary}</div>
                    <div className="mt-2 text-xs text-neutral-700">
                      {t.keywords}: {preview.keywords.join(' / ')}
                    </div>
                    <div className="mt-1 text-xs text-neutral-700">
                      {t.tagline}: {preview.tagline}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <button
                onClick={addToTimeline}
                disabled={!preview}
                className="rounded-lg border px-5 py-3 text-sm hover:bg-neutral-50 disabled:opacity-50"
              >
                {t.addTimeline}
              </button>
            </div>
          </div>
        </div>

        {/* Timeline (grayscale cards) */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">{t.timeline}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {timeline.map((c) => (
              <div key={c.id} className="min-w-[280px] rounded-xl border bg-white overflow-hidden shadow-sm">
                <div className="h-2 bg-black" />
                <div className="p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-full border">{c.era}</span>
                    <span className="text-neutral-600">
                      {new Date(c.createdAt).toLocaleDateString('en-US')}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-medium line-clamp-2">{c.summary}</div>
                  <div className="mt-1 text-xs text-neutral-700">
                    {t.toneLabel}: {c.tone}
                  </div>
                  <div className="mt-1 text-xs text-neutral-700">
                    {t.keywords}: {c.keywords.join(' / ')}
                  </div>
                </div>
                <div className="aspect-video bg-neutral-100 relative">
                  <img src={c.imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            ))}
            {timeline.length === 0 && (
              <div className="text-neutral-600 text-sm px-2 py-1">
                No Cameos yet. Generate one and add it to the timeline.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

