'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Award, Check, Flame, KeyRound, Mic, RefreshCcw, TrendingUp, Volume2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STUDENT_CARDS } from '@/lib/site-data'
import { GradientText, IllustrativeTag, Reveal, SectionHeading, TabletFrame, cardClass } from './primitives'

const ICONS: Record<(typeof STUDENT_CARDS)[number]['icon'], LucideIcon> = {
  key: KeyRound,
  mic: Mic,
  retry: RefreshCcw,
  level: TrendingUp,
  audio: Volume2,
}

export function Students() {
  return (
    <section id="alunos" aria-labelledby="students-title" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="students-title"
            eyebrow="Para alunos"
            title={
              <>
                Seu reforço, <GradientText>do seu jeito</GradientText>.
              </>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {STUDENT_CARDS.map((card, i) => {
              const Icon = ICONS[card.icon]
              return (
                <Reveal
                  as="li"
                  key={card.title}
                  delay={i * 0.06}
                  className={cn(cardClass, 'flex flex-col gap-2 p-5', i === 0 && 'sm:col-span-2')}
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{card.text}</p>
                </Reveal>
              )
            })}
          </ul>
        </div>

        <Reveal className="flex flex-col items-center gap-3">
          <TrailTablet />
          <IllustrativeTag />
        </Reveal>
      </div>
    </section>
  )
}

const LADDER = [
  { label: 'Relembrar', done: true },
  { label: 'Exemplo guiado', done: true },
  { label: 'Praticar', done: true },
  { label: 'Aplicar', current: true },
  { label: 'Explicar com suas palavras' },
]

const DAYS = [
  { d: 'S', on: true },
  { d: 'T', on: true },
  { d: 'Q', on: true },
  { d: 'Q', on: true },
  { d: 'S', on: true },
  { d: 'S' },
  { d: 'D' },
]

function TrailTablet() {
  const reduce = useReducedMotion()
  const ring = 2 * Math.PI * 34

  return (
    <TabletFrame label="Tablet com a tela Minha trilha: Matemática, frações equivalentes, 3 de 5 atividades feitas, 5 dias seguidos de prática e o selo Domina recém-conquistado em comparar frações.">
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Minha trilha</p>
            <p className="text-xl font-extrabold text-foreground">Frações equivalentes</p>
          </div>
          <span className="rounded-full bg-subject-ma/10 px-2.5 py-1 text-xs font-bold text-subject-ma">
            Matemática
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
          <div className="flex items-center gap-4 rounded-2xl bg-card p-4 sm:flex-col sm:justify-center">
            <svg viewBox="0 0 80 80" className="size-20 -rotate-90" aria-hidden="true">
              <defs>
                <linearGradient id="ring-grad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#6D28D9" />
                  <stop offset="100%" stopColor="#DB2777" />
                </linearGradient>
              </defs>
              <circle cx="40" cy="40" r="34" fill="none" stroke="#EDE9FE" strokeWidth="8" />
              <motion.circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="url(#ring-grad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={ring}
                initial={{ strokeDashoffset: reduce ? ring * 0.4 : ring }}
                whileInView={{ strokeDashoffset: ring * 0.4 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
            <p className="text-sm font-bold text-foreground">3 de 5 atividades</p>
          </div>

          <ol className="flex flex-col gap-1.5">
            {LADDER.map((s) => (
              <li
                key={s.label}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold',
                  s.current ? 'bg-brand text-primary-foreground' : s.done ? 'bg-card text-foreground' : 'bg-muted text-muted-foreground',
                )}
              >
                <span
                  className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded-full',
                    s.done ? 'bg-level-yes text-level-yes-ink' : s.current ? 'bg-primary-foreground/25' : 'border border-border',
                  )}
                >
                  {s.done ? <Check className="size-3.5" aria-hidden="true" /> : null}
                </span>
                {s.label}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Flame className="size-4 text-pink" aria-hidden="true" />5 dias seguidos praticando
          </p>
          <div className="flex justify-between gap-1">
            {DAYS.map((day, i) => (
              <span
                key={i}
                className={cn(
                  'flex size-8 items-center justify-center rounded-full text-xs font-bold',
                  day.on ? 'bg-gradient-to-br from-brand to-pink text-primary-foreground' : 'bg-muted text-muted-foreground',
                )}
              >
                {day.d}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.6 }}
          className="relative flex items-center gap-3 overflow-hidden rounded-2xl border-2 border-level-yes-ink/30 bg-level-yes p-4"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-level-yes-ink text-level-yes">
            <Award className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="text-lg font-extrabold text-level-yes-ink">Domina!</p>
            <p className="text-sm font-semibold text-level-yes-ink">Comparar frações · habilidade conquistada</p>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-card/70 to-transparent"
          />
        </motion.div>
      </div>
    </TabletFrame>
  )
}
