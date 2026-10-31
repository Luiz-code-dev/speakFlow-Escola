'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Footprints, Sparkles, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SUBJECTS } from '@/lib/site-data'
import { GradientText, IllustrativeTag, LevelPill, PhoneFrame, ctaPrimary, ctaSecondary } from './primitives'
import { StoreBadges } from './store-badges'

const NeuralCanvas = dynamic(() => import('./neural-canvas'), { ssr: false })

const noopSubscribe = () => () => {}

export function Hero() {
  const reduce = useReducedMotion()
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 lg:pt-36">
      <div className="absolute inset-0 -z-10">{hydrated && reduce === false ? <NeuralCanvas /> : null}</div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:pb-24">
        <div className="flex flex-col gap-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-card/80 px-3 py-1.5 text-sm font-medium text-brand-ink backdrop-blur"
          >
            <Sparkles className="size-4 text-pink" aria-hidden="true" />
            Inteligência artificial alinhada à BNCC
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
          >
            Reforço escolar que <GradientText>encontra onde a dificuldade começa</GradientText>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl"
          >
            O diagnóstico descobre a habilidade que falta, mesmo que seja de anos anteriores. A IA monta a
            trilha, corrige na hora e explica o erro. O aluno pratica em casa, e a escola e a família
            acompanham cada passo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <a href="#contato" className={ctaPrimary}>
              Agendar demonstração
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#como-funciona" className={ctaSecondary}>
              Ver como funciona
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <StoreBadges />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <HeroPhone reduce={reduce === true} />
          <IllustrativeTag />
        </motion.div>
      </div>

      <SubjectStrip />
    </section>
  )
}

const ALTERNATIVES = [
  { n: 2, d: 5, wrong: true },
  { n: 5, d: 6 },
  { n: 2, d: 6 },
  { n: 1, d: 6 },
]

function Frac({ n, d, className }: { n: number; d: number; className?: string }) {
  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span>{n}</span>
      <span className="my-0.5 h-0.5 w-[1.1em] rounded-full bg-current" />
      <span>{d}</span>
    </span>
  )
}

const STATE_MS = 3000

function HeroPhone({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-40px' })
  const [tick, setTick] = useState(0)
  const step = reduce ? 3 : tick

  useEffect(() => {
    if (reduce || !inView) return
    const id = window.setInterval(() => setTick((t) => (t + 1) % 4), STATE_MS)
    return () => window.clearInterval(id)
  }, [reduce, inView])

  const fade = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 },
  }

  return (
    <div ref={ref} className="w-full">
      <PhoneFrame label="Celular com o reforço de Matemática: o aluno erra a soma 1/2 + 1/3 marcando 2/5, a IA explica o erro, propõe relembrar frações equivalentes do 5º ano e a habilidade sobe de Ainda não para Quase lá.">
        <div className="flex h-[34rem] flex-col gap-3 px-4 pt-3 pb-5">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-subject-ma/10 px-2.5 py-1 text-xs font-bold text-subject-ma">
              Matemática · 6º ano
            </span>
            <span className="text-xs font-semibold text-muted-foreground">Diagnóstico 2 de 6</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-brand to-pink" />
          </div>

          <div className="flex flex-col items-center gap-1 pt-1">
            <p className="text-xs font-semibold text-muted-foreground">Quanto é?</p>
            <p className="flex items-center gap-3 text-2xl font-extrabold text-foreground">
              <Frac n={1} d={2} /> + <Frac n={1} d={3} /> = ?
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {ALTERNATIVES.map((a) => {
              const picked = a.wrong && step >= 1
              return (
                <div
                  key={`${a.n}/${a.d}`}
                  className={cn(
                    'relative flex h-14 items-center justify-center rounded-xl border-2 text-base font-bold transition-colors duration-300',
                    picked
                      ? 'border-level-no-ink bg-level-no text-level-no-ink'
                      : 'border-border bg-card text-foreground',
                  )}
                >
                  <Frac n={a.n} d={a.d} />
                  {picked && step === 1 && !reduce ? (
                    <motion.span
                      initial={{ scale: 1.6, opacity: 0.7 }}
                      animate={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 rounded-xl border-2 border-level-no-ink"
                    />
                  ) : null}
                </div>
              )
            })}
          </div>

          <AnimatePresence initial={false}>
            {step >= 1 ? (
              <motion.div key="ia" {...fade} className="rounded-2xl rounded-tl-sm bg-night p-3 text-night-foreground">
                <p className="flex items-center gap-1.5 text-xs font-bold text-pink-soft">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Retorno da IA
                </p>
                <p className="mt-1 text-sm leading-snug">
                  Quase! Você somou os de cima e os de baixo. Para somar frações, primeiro deixamos os
                  pedaços do mesmo tamanho.
                </p>
              </motion.div>
            ) : null}

            {step >= 2 ? (
              <motion.div
                key="degrau"
                {...fade}
                className="flex items-center gap-3 rounded-2xl border border-brand/25 bg-brand-soft p-3"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-primary-foreground">
                  <Footprints className="size-4" aria-hidden="true" />
                </span>
                <p className="text-sm leading-snug font-semibold text-brand-ink">
                  Degrau: vamos relembrar frações equivalentes (5º ano)
                </p>
              </motion.div>
            ) : null}

            {step >= 3 ? (
              <motion.div
                key="nivel"
                {...fade}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-3"
              >
                <p className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                  <TrendingUp className="size-3.5 text-level-yes-ink" aria-hidden="true" />
                  Subiu de nível
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground">Soma de frações</span>
                  <span className="flex items-center gap-1.5">
                    <LevelPill level="Ainda não" className="opacity-50 line-through" />
                    <motion.span
                      initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.3 }}
                    >
                      <LevelPill level="Quase lá" />
                    </motion.span>
                  </span>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </PhoneFrame>
    </div>
  )
}

function SubjectStrip() {
  return (
    <div className="border-y border-border bg-card/70 backdrop-blur">
      <ul
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 py-5 sm:px-6"
        aria-label="Componentes curriculares"
      >
        {SUBJECTS.map((s) => (
          <li
            key={s.label}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold"
            style={{ color: s.color }}
          >
            <span className="size-2 rounded-full bg-current" aria-hidden="true" />
            {s.label}
          </li>
        ))}
        <li className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand-ink">
          + todos os componentes da BNCC
        </li>
      </ul>
    </div>
  )
}
