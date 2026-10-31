'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'
import { ClipboardCheck, Footprints, House, Route, Sparkles, TrendingUp, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PATH_STEPS, STAIRS, type Level } from '@/lib/site-data'
import { GradientText, IllustrativeTag, LevelPill, Reveal, SectionHeading, cardClass } from './primitives'

const ICONS: LucideIcon[] = [ClipboardCheck, Footprints, Route, House, Sparkles, TrendingUp]

export function ReinforcementPath() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(PATH_STEPS.length - 1, Math.floor(p * PATH_STEPS.length)))
  })

  const lit = (i: number) => reduce || i <= active

  return (
    <section id="como-funciona" aria-labelledby="path-title" className="bg-card py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:px-6">
        <SectionHeading
          id="path-title"
          eyebrow="Como funciona"
          title={
            <>
              O caminho do <GradientText>reforço</GradientText>.
            </>
          }
          description="Do diagnóstico à habilidade dominada, cada etapa leva à próxima."
        />

        <ol ref={listRef} className="relative flex flex-col gap-8 lg:grid lg:grid-cols-6 lg:gap-5">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-6 w-1 rounded-full bg-muted lg:hidden">
            <motion.div
              style={{ scaleY: reduce ? 1 : fill }}
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-brand to-pink"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute top-6 right-[8%] left-[8%] hidden h-1 rounded-full bg-muted lg:block"
          >
            <motion.div
              style={{ scaleX: reduce ? 1 : fill }}
              className="h-full w-full origin-left rounded-full bg-gradient-to-r from-brand to-pink"
            />
          </div>

          {PATH_STEPS.map((step, i) => {
            const Icon = ICONS[i]
            return (
              <li key={step.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
                <span
                  className={cn(
                    'relative z-10 flex size-13 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500',
                    lit(i)
                      ? 'border-brand bg-brand text-primary-foreground shadow-lg shadow-brand/30'
                      : 'border-border bg-card text-muted-foreground',
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1.5 pt-1 lg:pt-0">
                  <p
                    className={cn(
                      'text-xs font-bold tracking-wide uppercase transition-colors duration-500',
                      lit(i) ? 'text-pink-strong' : 'text-muted-foreground',
                    )}
                  >
                    Etapa {i + 1}
                  </p>
                  <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <Stairs />
      </div>
    </section>
  )
}

type StairPhase = { at: number; levels: (Level | null)[]; caption: string; gap?: boolean }

const PHASES: StairPhase[] = [
  { at: 2, levels: [null, null, 'Ainda não'], caption: 'O diagnóstico começa no 6º ano: problemas com frações.' },
  { at: 1, levels: [null, 'Ainda não', 'Ainda não'], caption: 'Desce ao pré-requisito do 5º ano.' },
  {
    at: 0,
    levels: ['Ainda não', 'Ainda não', 'Ainda não'],
    caption: 'Encontrou onde a lacuna começa: frações equivalentes.',
    gap: true,
  },
  { at: 0, levels: ['Quase lá', 'Ainda não', 'Ainda não'], caption: 'A trilha começa por aqui.' },
  { at: 1, levels: ['Domina', 'Quase lá', 'Ainda não'], caption: 'Dominou e subiu um degrau.' },
  { at: 2, levels: ['Domina', 'Domina', 'Quase lá'], caption: 'De volta ao 6º ano, agora com a base no lugar.' },
]

const STAIR_HEIGHTS = ['h-24', 'h-40', 'h-56']

function Stairs() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-80px' })
  const reduce = useReducedMotion()
  const [tick, setTick] = useState(0)
  const phase = PHASES[reduce ? PHASES.length - 1 : tick]

  useEffect(() => {
    if (reduce || !inView) return
    const id = window.setInterval(() => setTick((t) => (t + 1) % PHASES.length), 1900)
    return () => window.clearInterval(id)
  }, [reduce, inView])

  return (
    <Reveal className={`${cardClass} grid gap-10 bg-background p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold tracking-wide text-pink-strong uppercase">Etapa 2 · O degrau</p>
        <h3 className="text-2xl font-extrabold tracking-tight text-balance text-foreground sm:text-3xl">
          Desce até onde a lacuna começa. Depois sobe, degrau por degrau.
        </h3>
        <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
          Se o aluno do 6º ano não resolve problemas com frações, o diagnóstico verifica o 5º e o 4º ano.
          A trilha começa no degrau que falta e só avança quando ele domina.
        </p>
        <IllustrativeTag />
      </div>

      <div
        ref={ref}
        role="img"
        aria-label="Escada com três degraus: 4º ano, frações equivalentes; 5º ano, soma de frações; 6º ano, problemas com frações. O marcador desce do 6º ao 4º ano, onde está a lacuna, e depois sobe até o 6º conforme o aluno domina cada habilidade."
        className="flex flex-col gap-5"
      >
        <div className="flex items-end gap-1.5 sm:gap-3" aria-hidden="true">
          {STAIRS.map((stair, i) => {
            const level = phase.levels[i]
            const here = phase.at === i
            return (
              <div key={stair.grade} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <div className="flex h-10 items-end">
                  {here ? (
                    <motion.span
                      layoutId="stair-marker"
                      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                      className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-pink text-sm font-bold text-primary-foreground shadow-lg shadow-pink/30"
                    >
                      A
                    </motion.span>
                  ) : null}
                </div>
                <div
                  className={cn(
                    'flex w-full min-w-0 flex-col justify-between gap-2 rounded-xl border-2 p-1.5 transition-colors duration-500 sm:rounded-2xl sm:p-3',
                    STAIR_HEIGHTS[i],
                    here && phase.gap ? 'border-pink bg-pink-soft' : here ? 'border-brand bg-brand-soft' : 'border-border bg-card',
                  )}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-brand-ink">{stair.grade}</span>
                    <span className="text-xs leading-tight font-semibold hyphens-auto text-foreground sm:text-sm">
                      {stair.skill}
                    </span>
                  </div>
                  {level ? (
                    <LevelPill level={level} className="max-w-full rounded-lg leading-tight sm:rounded-full" />
                  ) : (
                    <span className="max-w-full rounded-lg bg-muted px-1.5 py-1 text-center text-xs leading-tight font-semibold text-muted-foreground sm:rounded-full sm:px-2.5">
                      A verificar
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <p aria-hidden="true" className="min-h-12 text-center text-base font-semibold text-foreground">
          {phase.caption}
        </p>
      </div>
    </Reveal>
  )
}
