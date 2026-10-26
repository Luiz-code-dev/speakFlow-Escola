'use client'

import { motion } from 'framer-motion'
import {
  CloudOff,
  HeartHandshake,
  House,
  LayoutDashboard,
  QrCode,
  School,
  Sparkles,
  Timer,
  WifiOff,
} from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const FEATURES = [
  {
    title: 'Acesso simples',
    text: 'O aluno leva para casa um cartão com QR code. Entra sem e-mail, no celular, tablet ou computador da família.',
    icon: QrCode,
  },
  {
    title: 'Sessões curtas',
    text: 'Atividades rápidas, pensadas para caber na rotina, com uma trilha que mostra o próximo passo.',
    icon: Timer,
  },
  {
    title: 'Retorno na hora',
    text: 'O aluno vê o que acertou, como melhorar e um exemplo, e pode tentar de novo.',
    icon: Sparkles,
  },
  {
    title: 'Nada se perde',
    text: 'O que o aluno escreve é salvo automaticamente, mesmo se a internet cair.',
    icon: CloudOff,
  },
  {
    title: 'Família junto',
    text: 'Pais e responsáveis veem o resumo do que o filho praticou na semana.',
    icon: HeartHandshake,
  },
  {
    title: 'Escola no controle',
    text: 'O professor indica as trilhas e vê quem não praticou e quem precisa de ajuda.',
    icon: LayoutDashboard,
  },
]

const WEEK = [
  { where: 'Na escola', what: 'professor indica a trilha', icon: School },
  { where: 'Em casa', what: 'aluno pratica', icon: House },
  { where: 'Na hora', what: 'IA explica', icon: Sparkles },
  { where: 'No painel', what: 'escola acompanha', icon: LayoutDashboard },
]

export function HomePractice() {
  return (
    <section id="reforco-em-casa" aria-labelledby="home-title" className="overflow-x-clip py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:px-6">
        <SectionHeading
          id="home-title"
          eyebrow="Reforço em casa"
          title="Feito para o aluno praticar em casa"
          description="O reforço acontece fora do horário de aula, sem depender de sala, transporte ou contraturno. A escola entrega o acesso, a família acompanha e o professor vê tudo no painel."
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal as="li" key={f.title} delay={i * 0.08}>
              <article className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-card p-6 shadow-sm">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <f.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold text-foreground">{f.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        <div className="flex flex-col gap-6 rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-brand/10 sm:p-8">
          <h3 className="text-2xl font-bold text-foreground">Uma semana de reforço</h3>
          <div className="relative">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-0.5 origin-left bg-gradient-to-r from-brand via-pink to-brand md:block"
              aria-hidden="true"
            />
            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-6 bottom-6 left-6 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-brand via-pink to-brand md:hidden"
              aria-hidden="true"
            />
            <ol className="relative grid gap-5 md:grid-cols-4 md:gap-4">
              {WEEK.map((step, i) => (
                <motion.li
                  key={step.where}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.3 }}
                  className="flex items-center gap-4 md:flex-col md:text-center"
                >
                  <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-4 border-card bg-brand text-primary-foreground">
                    <step.icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="leading-snug text-foreground">
                    <strong className="block font-bold">{step.where}</strong>
                    <span className="text-muted-foreground">{step.what}</span>
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        <Reveal>
          <article className="flex flex-col gap-4 rounded-3xl bg-brand-soft p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-card text-brand">
              <WifiOff className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-balance text-brand-ink">
                E o aluno sem aparelho ou internet em casa?
              </h3>
              <p className="max-w-3xl leading-relaxed text-foreground">
                A escola pode reservar horários no laboratório ou na biblioteca, e a rede pode
                fornecer tablets com chip de dados para quem mais precisa. O painel mostra quem não
                está praticando, para a escola agir cedo.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
