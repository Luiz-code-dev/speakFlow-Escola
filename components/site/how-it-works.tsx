'use client'

import { motion } from 'framer-motion'
import { House, LayoutDashboard, RotateCcw, Route, ScanSearch, Sparkles } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const STEPS = [
  {
    title: 'Diagnóstico',
    text: 'identifica o que o aluno ainda não domina, pelas habilidades da BNCC',
    icon: ScanSearch,
  },
  {
    title: 'Trilha de reforço',
    text: 'atividades nos pontos de dificuldade, indicadas pelo professor',
    icon: Route,
  },
  {
    title: 'Prática em casa',
    text: 'sessões curtas no celular, tablet ou computador, por texto, voz ou quiz',
    icon: House,
  },
  {
    title: 'Retorno da IA',
    text: 'na hora: o que acertou, como melhorar e um exemplo; pode refazer',
    icon: Sparkles,
  },
  {
    title: 'Escola acompanha',
    text: 'o professor vê quem praticou, quem avançou e quem precisa de ajuda',
    icon: LayoutDashboard,
  },
]

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center"
    >
      <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-primary-foreground shadow-lg shadow-brand/30">
        <step.icon className="size-6" aria-hidden="true" />
      </span>
      <div className="flex flex-1 flex-col gap-1.5 rounded-3xl border border-border bg-background p-5 lg:w-full">
        <p className="text-xs font-semibold tracking-wide text-pink-strong uppercase">Etapa {index + 1}</p>
        <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
      </div>
    </motion.li>
  )
}

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="how-title" className="overflow-x-clip bg-card py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:px-6">
        <SectionHeading
          id="how-title"
          eyebrow="Como funciona"
          title="Um ciclo de reforço que se ajusta a cada aluno."
        />

        <div className="flex flex-col gap-6">
          <div className="relative">
            <svg
              className="pointer-events-none absolute top-7 right-[10%] left-[10%] hidden h-1 w-[80%] lg:block"
              viewBox="0 0 100 2"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="#DDD6FE"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
              <line
                x1="0"
                y1="1"
                x2="100"
                y2="1"
                stroke="#6D28D9"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="12 188"
                vectorEffect="non-scaling-stroke"
                className="animate-dash"
              />
            </svg>
            <span
              className="absolute top-7 bottom-7 left-7 w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand via-pink to-brand lg:hidden"
              aria-hidden="true"
            />
            <ol className="relative grid gap-5 lg:grid-cols-5 lg:gap-4">
              {STEPS.map((step, i) => (
                <StepCard key={step.title} step={step} index={i} />
              ))}
            </ol>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-pink/50 px-5 py-4 lg:mx-[10%] lg:justify-center lg:rounded-t-none lg:rounded-b-[2rem] lg:border-t-0 lg:pt-6"
          >
            <RotateCcw className="size-5 shrink-0 text-pink-strong" aria-hidden="true" />
            <p className="font-semibold text-pink-strong">Novo diagnóstico ajusta a trilha</p>
          </motion.div>
        </div>

        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-2xl leading-snug font-bold text-balance text-brand-ink sm:text-3xl">
            O motor de IA é o mesmo para todos os componentes. Muda só o conteúdo e o critério de
            avaliação.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
