```markdown
# 🎭 Persona Cameo  
> **AI captures your “now” as a 10-second persona snapshot.**

---

## 🧠 Concept  
Most people struggle to express their inner state — they can’t easily say *why* they feel what they feel.  
Every therapy session or coaching starts from zero, wasting both time and emotional energy.

**Persona Cameo** transforms your daily text, notes, and moments into a short, cinematic snapshot —  
a **digital cameo of your evolving self**, blending *voice, face, and inner tone* in one frame.  

It’s not about creating content.  
It’s about **understanding the self as it changes through time.**

---

## 🌈 Why It Matters  
| Traditional AI | Persona Cameo |
|----------------|----------------|
| Generates text or image | Generates **personality + voice + emotion + visual** |
| Answers your question | **Performs “you”** |
| Resets every session | Builds a **timeline of evolving identity** |
| Analytics for self-reflection | **Art for self-understanding** |

---

## 🧩 Technology Overview  
- **Frontend:** Next.js (App Router + TypeScript + Tailwind)  
- **AI Core:** OpenAI GPT-4o-mini (structured JSON mode)  
- **Voice:** Web Speech API (F/M presets)  
- **Image:** `/public/face.jpg` as the visual anchor  
- **Storage:** localStorage only — zero backend friction  
- **Design:** Minimal white aesthetic for emotional clarity  

---

## 🗂️ Project Structure  
```

app/
├─ api/
│   └─ cameo/
│       └─ draft/route.ts      # Calls OpenAI and returns JSON cameo
├─ cameo/page.tsx              # Frontend UI + local timeline
├─ layout.tsx
└─ globals.css
lib/
└─ schema.ts                   # Types + validation
public/
└─ face.jpg                    # Default portrait

````

---

## 🚀 Quick Start  
```bash
npm install
echo "OPENAI_API_KEY=sk-xxxx" > .env.local
npm run dev
````

Open [http://localhost:3000/cameo](http://localhost:3000/cameo)
Paste a short text → “Create Cameo” → watch your digital twin appear.

---

## 🧬 Pitch

> “Don’t just use AI — let AI **perform you**.”

**Persona Cameo** is a portrait for the AI age —
a living record of how your mind sounds, feels, and evolves.
It blurs the line between self-reflection and digital performance.

---

## 🏆 Motto

> **Move fast, feel deeper.**
> Lightweight code. Heavy experience.

```
```
