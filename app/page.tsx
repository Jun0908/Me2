'use client'

import React, { useState } from 'react'

type Lang = 'ja' | 'en'

// 画面文言のスキーマ（両言語で同じ構造）
type Schema = {
  nav_logo: string
  nav_links: string[]
  cta_join_waitlist: string
  switch_label: string

  hero_badge: string
  hero_title: string
  hero_body: string
  hero_cta_primary: string
  hero_cta_secondary: string

  problems_title: string
  problems: string[]

  solution_title: string
  solution_points: string[]

  product_title: string
  product_body: string

  features_title: string
  features: { title: string; desc: string }[]

  how_title: string
  how_steps: { k: string; title: string; desc: string }[]

  security_title: string
  security_points: string[]

  faq_title: string
  faq: { q: string; a: string }[]

  footer_copy: string
  email_placeholder: string
}

// 辞書：言語→Schema
const DICT: Record<Lang, Schema> = {
  ja: {
    nav_logo: 'Persona Twin',
    nav_links: ['機能', '仕組み', 'セキュリティ', 'よくある質問'],
    cta_join_waitlist: '早期アクセスに登録',
    switch_label: 'EN',

    hero_badge: 'AIがあなたを"言語化"する',
    hero_title: '日々の行動から、あなたの本質を可視化する',
    hero_body:
      'メッセージ・発言・行動を自動で日記化し、人格モデルを生成。思考の癖、感情パターン、人間関係の傾向をタイムラインで見える化します。',
    hero_cta_primary: '無料で試す',
    hero_cta_secondary: 'デモを見る',

    problems_title: 'こんな課題ありませんか？',
    problems: [
      '自分の本音・本質が分からない',
      'カウンセリングで毎回ゼロから説明→時間も労力もかかる',
      '自己分析ツールは一度きりで継続データがない',
    ],

    solution_title: 'ソリューション',
    solution_points: [
      'AIが日々の行動・発言・メッセージを自動で日記化＆要約',
      'そこから「人格モデル」を生成',
      '思考の癖・感情パターン・人間関係の傾向をタイムラインで可視化',
    ],

    product_title: 'プロダクト',
    product_body:
      'あなたのデジタル分身（人格ツイン）と、その解釈を支援する専門家（カウンセラー／コーチ／占い師的な人）の二人三脚で、自己理解をアップデート。',

    features_title: '主な機能',
    features: [
      { title: '自動ジャーナリング', desc: 'チャット、予定、メモから日次サマリーを自動生成。負担ゼロで続く。' },
      { title: '人格モデル', desc: '価値観・動機・認知バイアスをグラフと文章で提示。' },
      { title: '感情／思考のパターン', desc: '出来事との相関を時系列で発見。トリガーとリカバリー戦略を提案。' },
      { title: '関係性インサイト', desc: '相手別のコミュニケーション傾向と相性を可視化。' },
      { title: '専門家セッション', desc: 'ツインを共有して「前回の続き」から即深堀り。毎回の説明は不要。' },
      { title: 'データ主権', desc: 'ローカル優先の暗号化。あなたの許可なく外部共有されません。' },
    ],

    how_title: 'どうやって動く？',
    how_steps: [
      { k: 'Capture', title: '取り込み', desc: '日々のテキスト／音声／予定を安全に取り込み。' },
      { k: 'Summarize', title: '要約', desc: '一日の出来事をコンテキストごとに要約。' },
      { k: 'Model', title: 'モデル化', desc: '人格モデルとパターンを更新・学習。' },
      { k: 'Reflect', title: 'リフレクト', desc: 'タイムラインで気づきを得て行動へ。' },
    ],

    security_title: 'セキュリティとプライバシー',
    security_points: [
      'ゼロ知識暗号化（E2EE）で保護',
      'データは原則デバイス内で処理（クラウドはオプトイン）',
      'ワンクリックで削除・エクスポート可能',
    ],

    faq_title: 'よくある質問',
    faq: [
      { q: 'どんなデータを取り込みますか？', a: 'メッセージ、予定、メモ、音声メモなど。すべて明示的な許可の範囲のみ。' },
      { q: '専門家はどう関わりますか？', a: 'あなたのツインを見ながら解釈・提案を行い、継続的な変化を支援します。' },
      { q: '料金は？', a: '個人はフリーミアム、セッションは回数課金を想定。' },
    ],

    footer_copy: '© Persona Twin – Self-understanding, upgraded.',
    email_placeholder: 'メールアドレス',
  },
  en: {
    nav_logo: 'Persona Twin',
    nav_links: ['Features', 'How it works', 'Security', 'FAQ'],
    cta_join_waitlist: 'Join waitlist',
    switch_label: '日本語',

    hero_badge: 'AI translates your inner voice',
    hero_title: 'See your true patterns from daily life',
    hero_body:
      'We auto-journal your messages and actions, then build a “persona model” that surfaces thinking habits, emotion patterns, and relationship trends on a timeline.',
    hero_cta_primary: 'Try for free',
    hero_cta_secondary: 'Watch demo',

    problems_title: 'Pain points',
    problems: [
      "I don't know my true motives",
      'Therapy repeats the same intro every time — slow and costly',
      'One-off assessments lack longitudinal data',
    ],

    solution_title: 'Solution',
    solution_points: [
      'AI auto-journals & summarizes daily messages/activities',
      'Generates your “persona model”',
      'Visualizes thinking habits, emotion patterns, and relationships over time',
    ],

    product_title: 'Product',
    product_body:
      'A digital persona twin paired with a professional interpreter (counselor/coach/astrologer-like) to guide your meaning-making over time.',

    features_title: 'Key features',
    features: [
      { title: 'Auto journaling', desc: 'Daily summaries from chats, calendar, and notes — effortless continuity.' },
      { title: 'Persona model', desc: 'Values, drives, and biases in graphs and prose.' },
      { title: 'Emotion & thought patterns', desc: 'Find triggers and recovery strategies across time.' },
      { title: 'Relationship insights', desc: 'Communication tendencies and compatibility by person.' },
      { title: 'Pro sessions', desc: 'Share your twin and pick up exactly where you left off.' },
      { title: 'Data sovereignty', desc: 'Local-first encryption. No sharing without consent.' },
    ],

    how_title: 'How it works',
    how_steps: [
      { k: 'Capture', title: 'Capture', desc: 'Securely ingest text, voice, and calendar.' },
      { k: 'Summarize', title: 'Summarize', desc: 'Contextual daily summaries.' },
      { k: 'Model', title: 'Model', desc: 'Update the persona model and patterns.' },
      { k: 'Reflect', title: 'Reflect', desc: 'Timeline insights turn into action.' },
    ],

    security_title: 'Security & privacy',
    security_points: [
      'Protected by end-to-end, zero-knowledge encryption',
      'Local-first processing (cloud is opt-in)',
      'One-click export & deletion',
    ],

    faq_title: 'FAQ',
    faq: [
      { q: 'What data can I connect?', a: 'Messages, calendar, notes, and voice memos — only with explicit permission.' },
      { q: 'How do pros fit in?', a: 'Counselors/coaches interpret your twin and support sustained change.' },
      { q: 'Pricing?', a: 'Freemium for individuals; sessions billed per use.' },
    ],

    footer_copy: '© Persona Twin – Self-understanding, upgraded.',
    email_placeholder: 'Email address',
  },
}

export default function Page() {
  const [lang, setLang] = useState<Lang>('ja')
  const text = DICT[lang] // ← シンプルに参照

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-bold tracking-tight">{text.nav_logo}</div>

          <nav className="hidden md:flex gap-6 text-sm text-slate-600">
            {text.nav_links.map((l) => (
              <a key={l} href={`#${l}`} className="hover:text-slate-900">
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
              className="rounded-full border px-3 py-1.5 text-xs md:text-sm hover:bg-slate-50"
              aria-label="switch language"
            >
              {text.switch_label}
            </button>
            <a
              href="#waitlist"
              className="rounded-full bg-slate-900 text-white px-4 py-2 text-xs md:text-sm hover:bg-black"
            >
              {text.cta_join_waitlist}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10">
        <span className="inline-flex items-center gap-2 text-xs font-medium bg-slate-900 text-white rounded-full px-3 py-1">
          {text.hero_badge}
        </span>
        <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight">
          {text.hero_title}
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">{text.hero_body}</p>
        <div className="mt-6 flex gap-3">
          <a href="#waitlist" className="rounded-lg bg-slate-900 text-white px-5 py-3 text-sm hover:bg-black">
            {text.hero_cta_primary}
          </a>
          <a href="demo" className="rounded-lg border px-5 py-3 text-sm hover:bg-slate-50">
            {text.hero_cta_secondary}
          </a>
        </div>
      </section>

      {/* Problems */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold">{text.problems_title}</h2>
        <ul className="mt-4 grid md:grid-cols-3 gap-4">
          {text.problems.map((p, i) => (
            <li key={i} className="rounded-2xl border p-4 bg-white">
              <div className="text-slate-900 font-medium">{p}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Solution */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold">{text.solution_title}</h2>
        <ul className="mt-4 grid md:grid-cols-3 gap-4">
          {text.solution_points.map((p, i) => (
            <li key={i} className="rounded-2xl border p-4 bg-white">
              <div className="text-slate-900">{p}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Product */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold">{text.product_title}</h2>
        <p className="mt-3 text-slate-600 max-w-3xl">{text.product_body}</p>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold">{text.features_title}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {text.features.map((f, i) => (
            <div key={i} className="rounded-2xl border p-5 bg-white">
              <div className="text-base font-semibold">{f.title}</div>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold">{text.how_title}</h2>
        <ol className="mt-6 relative border-s-l border-slate-200 pl-6">
          {text.how_steps.map((s, i) => (
            <li key={i} className="mb-8">
              <div className="absolute -left-1.5 mt-1 w-3 h-3 rounded-full bg-slate-900" />
              <div className="text-sm uppercase tracking-wider text-slate-500">{s.k}</div>
              <div className="text-base font-semibold">{s.title}</div>
              <div className="text-sm text-slate-600">{s.desc}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Security */}
      <section id="security" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold">{text.security_title}</h2>
        <ul className="mt-4 grid md:grid-cols-3 gap-4">
          {text.security_points.map((p, i) => (
            <li key={i} className="rounded-2xl border p-4 bg-white text-slate-700">
              {p}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold">{text.faq_title}</h2>
        <div className="mt-4 divide-y rounded-2xl border bg-white">
          {text.faq.map((qa, i) => (
            <details key={i} className="p-4 group open:bg-slate-50">
              <summary className="cursor-pointer font-medium list-none">{qa.q}</summary>
              <p className="mt-2 text-slate-600">{qa.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="text-lg font-semibold">{text.cta_join_waitlist}</h3>
          <form className="mt-3 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder={text.email_placeholder}
              className="flex-1 rounded-lg border px-4 py-3"
            />
            <button className="rounded-lg bg-slate-900 text-white px-5 py-3 text-sm hover:bg-black">
              {text.hero_cta_primary}
            </button>
          </form>
          <p className="mt-3 text-xs text-slate-500">
            {lang === 'ja'
              ? '登録により利用規約・プライバシーポリシーに同意したものとみなします。'
              : 'By joining you agree to the Terms & Privacy Policy.'}
          </p>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">{text.footer_copy}</footer>
    </main>
  )
}
