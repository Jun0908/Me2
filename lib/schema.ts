export type Era = '2018-2020' | '2021-2023' | '2024-'
export type Tone = 'Calm' | 'Anxious' | 'Motivated' | 'Neutral'

export type DraftInput = {
  text: string
  era: Era
}

export type DraftOutput = {
  summary: string
  tone: Tone
  keywords: [string, string, string]
  tagline: string
}

export function isDraftInput(x: any): x is DraftInput {
  return x && typeof x.text === 'string' && typeof x.era === 'string'
}

export function isDraftOutput(x: any): x is DraftOutput {
  return (
    x &&
    typeof x.summary === 'string' &&
    (x.tone === 'Calm' || x.tone === 'Anxious' || x.tone === 'Motivated' || x.tone === 'Neutral') &&
    Array.isArray(x.keywords) &&
    x.keywords.length === 3 &&
    typeof x.tagline === 'string'
  )
}
