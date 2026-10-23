'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  BrainCircuit,
  ClipboardList,
  MessageSquareText,
  PenLine,
  Ruler,
  UserCheck,
  ArrowDown,
} from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const INPUTS = [
  { label: 'Atividade', icon: ClipboardList },
  { label: 'Rubrica do componente', icon: Ruler },
  { label: 'Resposta do aluno', icon: PenLine },
]
const OUTPUTS = [
  { label: 'Retorno ao aluno', icon: MessageSquareText },
  { label: 'Nota sugerida (professor aprova)', icon: UserCheck },
  { label: 'Painéis da rede', icon: BarChart3 },
]

const Y = [70, 210, 350]
const PATHS = [
  ...Y.map((y) => `M300 ${y} C 350 ${y}, 340 210, 390 210`),
  ...Y.map((y) => `M610 210 C 660 210, 650 ${y}, 700 ${y}`),
]

function Box({
  label,
  icon: Icon,
  delay,
}: {
  label: string
  icon: typeof ClipboardList
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className="flex h-24 items-center gap-3 rounded-2xl border border-border bg-card px-5 shadow-sm"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="font-semibold text-foreground">{label}</span>
    </motion.div>
  )
}

function Engine() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="relative flex flex-col items-center justify-center gap-3 rounded-3xl bg-brand p-8 text-center text-primary-foreground shadow-xl shadow-brand/30"
    >
      <span className="absolute inset-0 animate-ping-slow rounded-3xl border-2 border-brand" aria-hidden="true" />
      <BrainCircuit className="size-10" aria-hidden="true" />
      <span className="text-xl font-bold">Motor pedagógico com IA</span>
    </motion.div>
  )
}

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="how-title" className="overflow-x-clip bg-card py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:px-6">
        <SectionHeading id="how-title" eyebrow="Como funciona" title="Um único motor, qualquer componente curricular." />

        {/* desktop diagram */}
        <div className="relative hidden h-[420px] lg:block">
          <svg
            viewBox="0 0 1000 420"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {PATHS.map((d, i) => (
              <g key={d}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke="#DDD6FE"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (i < 3 ? 0.3 : 0.9) + (i % 3) * 0.1 }}
                />
                <path
                  d={d}
                  fill="none"
                  stroke={i < 3 ? '#6D28D9' : '#DB2777'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="12 188"
                  vectorEffect="non-scaling-stroke"
                  className="animate-dash"
                  style={{ animationDelay: `${(i % 3) * 0.4}s` }}
                />
              </g>
            ))}
          </svg>
          <div className="relative grid h-full grid-cols-[30%_1fr_30%] items-center gap-[9%]">
            <div className="flex h-full flex-col justify-between">
              {INPUTS.map((b, i) => (
                <Box key={b.label} {...b} delay={i * 0.1} />
              ))}
            </div>
            <Engine />
            <div className="flex h-full flex-col justify-between">
              {OUTPUTS.map((b, i) => (
                <Box key={b.label} {...b} delay={1 + i * 0.1} />
              ))}
            </div>
          </div>
        </div>

        {/* mobile diagram */}
        <div className="flex flex-col gap-4 lg:hidden">
          {INPUTS.map((b, i) => (
            <Box key={b.label} {...b} delay={i * 0.05} />
          ))}
          <ArrowDown className="mx-auto size-6 text-brand" aria-hidden="true" />
          <Engine />
          <ArrowDown className="mx-auto size-6 text-pink" aria-hidden="true" />
          {OUTPUTS.map((b, i) => (
            <Box key={b.label} {...b} delay={i * 0.05} />
          ))}
        </div>

        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-2xl leading-snug font-bold text-balance text-brand-ink sm:text-3xl">
            O motor é o mesmo para todas as disciplinas. O que muda é o conteúdo e a rubrica de
            avaliação.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
