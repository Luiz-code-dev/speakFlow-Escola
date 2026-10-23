'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Lightbulb, Loader2, Quote, Sparkles, TrendingUp } from 'lucide-react'
import { DEMO_CASES, type DemoCase } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './primitives'

type Phase = 'typing' | 'ready' | 'analyzing' | 'done'

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('*').map((part, i) => (i % 2 ? <em key={i} className="font-semibold">{part}</em> : part))}
    </>
  )
}

const formatScore = (n: number) =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

function ScoreRing({ score }: { score: number }) {
  const r = 42
  const c = 2 * Math.PI * r
  return (
    <div className="relative size-28 shrink-0">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-brand-soft)" strokeWidth="9" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - score / 10) }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-foreground">{formatScore(score)}</span>
        <span className="text-xs text-muted-foreground">de 10</span>
      </div>
    </div>
  )
}

const BARS = Array.from({ length: 28 }, (_, i) => 0.3 + Math.abs(Math.sin(i * 1.7)) * 0.7)

function AnswerPanel({ demo, typed, phase }: { demo: DemoCase; typed: string; phase: Phase }) {
  const typing = phase === 'typing'
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-muted p-5">
      <p className="text-sm font-semibold text-muted-foreground">
        {demo.mode === 'speech' ? 'Transcrição da fala do aluno' : 'Resposta do aluno'}
      </p>
      {demo.mode === 'speech' ? (
        <div className="flex h-12 items-center gap-1" aria-hidden="true">
          {BARS.map((h, i) => (
            <span
              key={i}
              className={cn('w-1.5 origin-center rounded-full bg-brand', typing && 'animate-wave')}
              style={{ height: `${(typing ? h : 0.2) * 100}%`, animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
      ) : null}
      <p className="min-h-20 text-lg leading-relaxed text-foreground">
        {typed}
        {typing ? <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-brand align-middle" aria-hidden="true" /> : null}
      </p>
    </div>
  )
}

function Feedback({ demo }: { demo: DemoCase }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      <div className="flex items-center gap-5">
        <ScoreRing score={demo.score} />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-muted-foreground">Nota sugerida</p>
          <p className="text-sm leading-relaxed text-foreground">
            Nota sugerida — o professor revisa antes de publicar
          </p>
        </div>
      </div>
      <FeedbackList title="O que você acertou" icon={Check} items={demo.hits} tone="good" />
      <FeedbackList title="Como melhorar" icon={TrendingUp} items={demo.improve} tone="improve" />
      <div className="flex flex-col gap-2 rounded-2xl border border-brand/20 bg-brand-soft/60 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
          <Quote className="size-4" aria-hidden="true" />
          Exemplo de resposta
        </p>
        <p className="leading-relaxed text-foreground">{demo.example}</p>
      </div>
    </motion.div>
  )
}

function FeedbackList({
  title,
  icon: Icon,
  items,
  tone,
}: {
  title: string
  icon: typeof Check
  items: string[]
  tone: 'good' | 'improve'
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 leading-relaxed text-foreground">
            <span
              className={cn(
                'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full',
                tone === 'good' ? 'bg-subject-ci text-primary-foreground' : 'bg-pink-soft text-pink-strong',
              )}
            >
              {tone === 'good' ? <Icon className="size-3" aria-hidden="true" /> : <Lightbulb className="size-3" aria-hidden="true" />}
            </span>
            <span>
              <Rich text={item} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Demo() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [typed, setTyped] = useState('')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const demo = DEMO_CASES[active]

  useEffect(() => {
    if (phase !== 'typing') return
    if (reduce) {
      setTyped(demo.answer)
      setPhase('ready')
      return
    }
    let i = typed.length
    const id = window.setInterval(() => {
      i += 1
      setTyped(demo.answer.slice(0, i))
      if (i >= demo.answer.length) {
        window.clearInterval(id)
        setPhase('ready')
      }
    }, 32)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, demo, reduce])

  useEffect(() => {
    if (phase !== 'analyzing') return
    const id = window.setTimeout(() => setPhase('done'), reduce ? 300 : 1500)
    return () => window.clearTimeout(id)
  }, [phase, reduce])

  const select = (index: number) => {
    setActive(index)
    setTyped('')
    setPhase('typing')
  }

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = index
    if (e.key === 'ArrowRight') next = (index + 1) % DEMO_CASES.length
    else if (e.key === 'ArrowLeft') next = (index - 1 + DEMO_CASES.length) % DEMO_CASES.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = DEMO_CASES.length - 1
    else return
    e.preventDefault()
    select(next)
    tabRefs.current[next]?.focus()
  }

  const runFeedback = () => {
    setTyped(demo.answer)
    setPhase('analyzing')
  }

  return (
    <section id="demonstracao" aria-labelledby="demo-title" className="py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <SectionHeading
          id="demo-title"
          eyebrow="Demonstração interativa"
          title="Veja o retorno que cada aluno recebe."
          description="Escolha um componente, acompanhe a resposta do aluno e veja como a plataforma devolve o retorno."
        />

        <div className="flex flex-col gap-6 rounded-[2rem] border border-border bg-card p-4 shadow-xl shadow-brand/10 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div role="tablist" aria-label="Componente da demonstração" className="flex flex-wrap gap-2">
              {DEMO_CASES.map((d, i) => (
                <button
                  key={d.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  id={`demo-tab-${d.id}`}
                  aria-selected={active === i}
                  aria-controls="demo-panel"
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    'rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors',
                    active === i
                      ? 'bg-brand text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-brand-soft hover:text-brand-ink',
                  )}
                >
                  {d.tab}
                </button>
              ))}
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-pink/30 bg-pink-soft px-3 py-1 text-xs font-bold tracking-wide text-pink-strong uppercase">
              Demonstração
            </span>
          </div>

          <div
            id="demo-panel"
            role="tabpanel"
            aria-labelledby={`demo-tab-${demo.id}`}
            className="grid gap-6 lg:grid-cols-2"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold" style={{ color: demo.color }}>
                  {demo.subject} · {demo.grade}
                </p>
                <p className="text-xl font-bold text-balance text-foreground">{demo.prompt}</p>
              </div>
              <AnswerPanel demo={demo} typed={typed} phase={phase} />
              <button
                type="button"
                onClick={runFeedback}
                disabled={phase === 'analyzing' || phase === 'done'}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 font-semibold text-primary-foreground transition-colors hover:bg-brand-hover disabled:opacity-60"
              >
                <Sparkles className="size-4" aria-hidden="true" />
                Ver retorno da IA
              </button>
            </div>

            <div
              className="flex min-h-80 flex-col justify-center rounded-2xl border border-dashed border-border p-5 sm:p-6"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                {phase === 'analyzing' ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 text-center"
                  >
                    <Loader2 className="size-10 animate-spin text-brand" aria-hidden="true" />
                    <p className="font-semibold text-foreground">Analisando a resposta com a rubrica do componente…</p>
                  </motion.div>
                ) : phase === 'done' ? (
                  <Feedback key="done" demo={demo} />
                ) : (
                  <motion.p
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center leading-relaxed text-muted-foreground"
                  >
                    Clique em &quot;Ver retorno da IA&quot; para ver a nota sugerida e as orientações
                    para o aluno.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Simulação com respostas pré-escritas. Nenhuma inteligência artificial é acionada nesta página.
          </p>
        </div>
      </div>
    </section>
  )
}
