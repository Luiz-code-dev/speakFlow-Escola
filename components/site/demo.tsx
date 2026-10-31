'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import dynamic from 'next/dynamic'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Banana, Cat, House, Lightbulb, Mic, RotateCcw, Sparkles, Sun, Target, ThumbsUp, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DEMO_CASES, type DemoCase } from '@/lib/site-data'
import { GradientText, LevelPill, SectionHeading } from './primitives'

const NeuralCanvas = dynamic(() => import('./neural-canvas'), { ssr: false })
const noopSubscribe = () => () => {}

const PICTURE_ICONS = { banana: Banana, cat: Cat, sun: Sun, house: House }

export function Demo() {
  const [activeId, setActiveId] = useState(DEMO_CASES[0].id)
  const [run, setRun] = useState(0)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const reduce = useReducedMotion()
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )
  const active = DEMO_CASES.find((c) => c.id === activeId) ?? DEMO_CASES[0]

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const last = DEMO_CASES.length - 1
    const next =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1) : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : null
    if (next === null) return
    e.preventDefault()
    setActiveId(DEMO_CASES[next].id)
    tabsRef.current[next]?.focus()
  }

  return (
    <section
      id="demonstracao"
      aria-labelledby="demo-title"
      className="relative isolate overflow-hidden bg-night py-20 text-night-foreground lg:py-28"
    >
      <div className="absolute inset-0 -z-10 opacity-60">{hydrated && reduce === false ? <NeuralCanvas /> : null}</div>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6">
        <SectionHeading
          id="demo-title"
          tone="dark"
          eyebrow="Demonstração"
          title={
            <>
              Veja a IA <GradientText>explicar o erro</GradientText>, e não só corrigir.
            </>
          }
        />

        <div
          role="tablist"
          aria-label="Exemplos de atividade"
          className="flex w-full gap-1 overflow-x-auto rounded-2xl border border-night-foreground/15 bg-night-foreground/5 p-1 sm:w-fit"
        >
          {DEMO_CASES.map((c, i) => {
            const selected = c.id === activeId
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabsRef.current[i] = el
                }}
                type="button"
                role="tab"
                id={`demo-tab-${c.id}`}
                aria-selected={selected}
                aria-controls={`demo-panel-${c.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(c.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  'flex shrink-0 flex-col items-start rounded-xl px-4 py-2.5 text-left transition-colors',
                  selected ? 'bg-night-foreground text-night' : 'text-night-muted hover:bg-night-foreground/10',
                )}
              >
                <span className="text-sm font-bold">{c.tab}</span>
                <span className={cn('text-xs', selected ? 'text-brand-ink' : 'text-night-muted')}>{c.meta}</span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`demo-panel-${active.id}`}
          aria-labelledby={`demo-tab-${active.id}`}
          className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <StudentSide demo={active} />
          <Feedback key={`${active.id}-${run}`} demo={active} onReplay={() => setRun((r) => r + 1)} />
        </div>

        <p className="text-sm text-night-muted">Demonstração. Atividade de reforço.</p>
      </div>
    </section>
  )
}

function StudentSide({ demo }: { demo: DemoCase }) {
  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-night-foreground/15 bg-night-foreground/5 p-6">
      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-pink-soft uppercase">
          <Target className="size-4" aria-hidden="true" />
          Habilidade da BNCC
        </p>
        <p className="text-lg font-semibold text-night-foreground">{demo.skill}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-night-muted uppercase">
          {demo.kind === 'pictures' ? <Volume2 className="size-4" aria-hidden="true" /> : null}
          {demo.kind === 'pictures' ? 'O app lê em voz alta' : 'Atividade'}
        </p>
        <p className="text-base leading-relaxed text-night-foreground">{demo.prompt}</p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl bg-night-foreground p-4 text-night">
        <p className="text-xs font-bold tracking-wide text-brand-ink uppercase">Resposta do aluno</p>
        {demo.kind === 'voice' ? (
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pink text-primary-foreground">
              <Mic className="size-5" aria-hidden="true" />
            </span>
            <span aria-hidden="true" className="flex h-8 flex-1 items-center gap-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className="w-1 flex-1 animate-wave rounded-full bg-brand"
                  style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 7) * 0.12}s` }}
                />
              ))}
            </span>
            <span className="text-xs font-semibold text-muted-foreground">0:24</span>
          </div>
        ) : null}
        {demo.kind === 'pictures' && demo.pictures ? (
          <ul className="grid grid-cols-4 gap-2" aria-label="Figuras">
            {demo.pictures.map((p) => {
              const Icon = PICTURE_ICONS[p.icon]
              return (
                <li
                  key={p.label}
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-xl border-2 p-2 text-xs font-bold',
                    p.chosen ? 'border-level-yes-ink bg-level-yes text-level-yes-ink' : 'border-border bg-card text-foreground',
                  )}
                >
                  <Icon className="size-8" aria-hidden="true" />
                  {p.label}
                  {p.chosen ? <span className="sr-only"> (escolhida)</span> : null}
                </li>
              )
            })}
          </ul>
        ) : null}
        <p className={cn('leading-relaxed', demo.kind === 'voice' && 'text-sm italic')}>
          {demo.kind === 'voice' ? `Transcrição: “${demo.answer}”` : demo.answer}
        </p>
      </div>
    </div>
  )
}

const BLOCKS = [
  { key: 'right', title: 'O que você acertou', icon: ThumbsUp },
  { key: 'improve', title: 'Como melhorar', icon: Lightbulb },
  { key: 'example', title: 'Um exemplo', icon: Sparkles },
] as const

function Feedback({ demo, onReplay }: { demo: DemoCase; onReplay: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const texts = BLOCKS.map((b) => demo.feedback[b.key])
  const total = texts.reduce((sum, t) => sum + t.length, 0)
  const [typed, setTyped] = useState(0)
  const shown = reduce ? total : typed
  const done = shown >= total

  useEffect(() => {
    if (!inView || reduce) return
    const id = window.setInterval(() => {
      setTyped((t) => {
        if (t >= total) {
          window.clearInterval(id)
          return t
        }
        return t + 3
      })
    }, 24)
    return () => window.clearInterval(id)
  }, [inView, reduce, total])

  let offset = 0
  return (
    <div ref={ref} className="flex flex-col gap-4 rounded-3xl bg-card p-6 text-foreground shadow-2xl shadow-brand/30">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-bold text-brand-ink">
          <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand to-pink text-primary-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          Retorno da IA
        </p>
        <button
          type="button"
          onClick={onReplay}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-muted-foreground hover:bg-brand-soft hover:text-brand-ink"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Repetir
        </button>
      </div>

      <div className="sr-only">
        {BLOCKS.map((b, i) => (
          <p key={b.key}>
            {b.title}: {texts[i]}
          </p>
        ))}
        <p>Nível: {demo.level}</p>
      </div>

      <div aria-hidden="true" className="flex flex-col gap-3">
        {BLOCKS.map((b, i) => {
          const start = offset
          offset += texts[i].length
          const visible = texts[i].slice(0, Math.max(0, shown - start))
          const typing = shown > start && shown < start + texts[i].length
          const Icon = b.icon
          return (
            <div
              key={b.key}
              className={cn(
                'flex flex-col gap-1 rounded-2xl p-4 transition-opacity duration-300',
                b.key === 'improve' ? 'bg-pink-soft' : 'bg-muted',
                shown > start || i === 0 ? 'opacity-100' : 'opacity-40',
              )}
            >
              <p className={cn('flex items-center gap-2 text-sm font-bold', b.key === 'improve' ? 'text-pink-strong' : 'text-brand-ink')}>
                <Icon className="size-4" aria-hidden="true" />
                {b.title}
              </p>
              <p className="min-h-6 leading-relaxed">
                {visible}
                {typing ? <span className="ml-0.5 inline-block h-4 w-0.5 animate-caret bg-brand align-middle" /> : null}
              </p>
            </div>
          )
        })}

        <div className="flex h-9 items-center gap-2">
          {done ? (
            <motion.div
              initial={reduce ? false : { scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16 }}
              className="flex items-center gap-2"
            >
              <span className="text-sm font-semibold text-muted-foreground">Nível na habilidade:</span>
              <LevelPill level={demo.level} className="text-sm" />
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
