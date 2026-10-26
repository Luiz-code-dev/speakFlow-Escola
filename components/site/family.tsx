'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Bell,
  CalendarCheck,
  Check,
  Lightbulb,
  School,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal, SectionHeading } from './primitives'

const FAMILY_FEATURES = [
  {
    title: 'Todos os filhos em um só acesso',
    text: 'Quem tem dois ou mais filhos na rede, mesmo em escolas diferentes, troca de um para o outro com um toque.',
    icon: Users,
  },
  {
    title: 'A semana do filho',
    text: 'Dias em que praticou, atividades concluídas e um resumo em linguagem simples.',
    icon: CalendarCheck,
  },
  {
    title: 'Evolução por habilidade',
    text: 'O que o filho já domina, o que está quase lá e o que ainda precisa de atenção.',
    icon: TrendingUp,
  },
  {
    title: 'Como ajudar em casa',
    text: 'Uma dica curta a partir do ponto em que o filho mais precisa, mesmo para quem não domina o conteúdo.',
    icon: Lightbulb,
  },
  {
    title: 'Avisos importantes',
    text: 'Aviso quando o filho fica 7 dias sem praticar e resumo semanal por e-mail, se a família quiser.',
    icon: Bell,
  },
  {
    title: 'Contato da escola',
    text: 'Nome da escola, turma e o contato da secretaria escolar.',
    icon: School,
  },
]

const JOIN_STEPS = [
  {
    title: 'A escola cadastra',
    text: 'O contato dos responsáveis vem na planilha de alunos que a escola já tem.',
  },
  {
    title: 'A família recebe o acesso',
    text: 'Por convite no e-mail ou WhatsApp, ou pelo código de família impresso no cartão do aluno.',
  },
  {
    title: 'Cria a senha e acompanha',
    text: 'Com o mesmo login, acompanha todos os filhos. Para incluir outro filho, basta o código do cartão dele.',
  },
]

const CHILDREN = [
  {
    id: 'ana',
    chip: 'Ana · 6º B',
    days: 4,
    week: 'Ana praticou 4 dias esta semana. Muito bem!',
    subject: 'Matemática',
    skill: 'Frações: parte de um todo',
    progress: [3, 5],
    mastery: [5, 2, 1],
    tip: 'Peça para ela explicar o que é 3/4 usando uma pizza.',
  },
  {
    id: 'pedro',
    chip: 'Pedro · 3º A',
    days: 2,
    week: 'Pedro praticou 2 dias esta semana.',
    subject: 'Língua Portuguesa',
    skill: 'Leitura de palavras com sílabas complexas',
    progress: [1, 4],
    mastery: [3, 3, 2],
    tip: 'Leia junto com ele uma história curta antes de dormir.',
  },
] as const

const WEEK_DAYS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']
const MASTERY = [
  { label: 'Domina', className: 'bg-subject-ge/10 text-subject-ge' },
  { label: 'Quase lá', className: 'bg-subject-es/10 text-subject-es' },
  { label: 'Ainda não', className: 'bg-subject-hi/10 text-subject-hi' },
]

export function FamilyPhone({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || paused) return
    const id = setInterval(() => setActive((v) => (v + 1) % CHILDREN.length), 4000)
    return () => clearInterval(id)
  }, [reduce, paused])

  const child = CHILDREN[active]

  return (
    <div
      className={cn(
        'relative mx-auto w-full rounded-[2.25rem] border-[6px] border-brand-ink bg-background p-3 shadow-2xl shadow-brand/20',
        compact ? 'max-w-[17rem]' : 'max-w-[20rem]',
      )}
    >
      <span className="mx-auto mb-3 block h-1.5 w-16 rounded-full bg-border" aria-hidden="true" />
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <p className="font-bold text-foreground">Olá, Maria</p>
          <span className="rounded-full bg-pink-soft px-2 py-0.5 text-[10px] font-semibold text-pink-strong">
            cenário ilustrativo
          </span>
        </div>

        <div className="flex gap-1.5" role={compact ? undefined : 'group'} aria-label={compact ? undefined : 'Escolher filho'}>
          {CHILDREN.map((c, i) => {
            const cls = cn(
              'rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300',
              i === active ? 'bg-brand text-primary-foreground' : 'bg-muted text-foreground',
            )
            return compact ? (
              <span key={c.id} className={cls}>
                {c.chip}
              </span>
            ) : (
              <button
                key={c.id}
                type="button"
                aria-pressed={i === active}
                onClick={() => {
                  setActive(i)
                  setPaused(true)
                }}
                className={cls}
              >
                {c.chip}
              </button>
            )
          })}
        </div>

        <div aria-live={compact ? undefined : 'polite'}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={child.id}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2.5"
            >
              <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-3">
                <p className="text-xs font-semibold text-muted-foreground">Esta semana</p>
                <ul className="flex justify-between" aria-label={`${child.days} de 7 dias com prática`}>
                  {WEEK_DAYS.map((d, i) => (
                    <li key={i} className="flex flex-col items-center gap-1">
                      <span
                        className={cn(
                          'size-5 rounded-full',
                          i < child.days ? 'bg-brand' : 'border-2 border-border bg-background',
                        )}
                      />
                      <span className="text-[10px] font-semibold text-muted-foreground" aria-hidden="true">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm leading-snug text-foreground">{child.week}</p>
              </div>

              <div className="flex flex-col gap-1.5 rounded-2xl border border-border bg-card p-3">
                <p className="text-xs font-semibold text-muted-foreground">Trilha atual · {child.subject}</p>
                <p className="text-sm leading-snug font-semibold text-foreground">{child.skill}</p>
                <div className="flex items-center gap-2">
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <span
                      className="block h-full rounded-full bg-brand"
                      style={{ width: `${(child.progress[0] / child.progress[1]) * 100}%` }}
                    />
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {child.progress[0]} de {child.progress[1]}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-3">
                <p className="text-xs font-semibold text-muted-foreground">Evolução</p>
                <ul className="flex flex-wrap gap-1.5">
                  {MASTERY.map((m, i) => (
                    <li key={m.label} className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', m.className)}>
                      {m.label} {child.mastery[i]}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 rounded-2xl bg-subject-es/10 p-3">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-subject-es" aria-hidden="true" />
                <p className="text-sm leading-snug text-foreground">
                  <strong className="font-semibold">Como ajudar:</strong> {child.tip}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export function Family() {
  return (
    <section id="familia" aria-labelledby="family-title" className="overflow-x-clip bg-card py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-4 sm:px-6">
        <SectionHeading
          id="family-title"
          eyebrow="Para a família"
          title="A família acompanha cada passo"
          description="Pais e responsáveis têm um acesso só deles, separado do login do aluno, para acompanhar a evolução de cada filho e saber como ajudar em casa."
        />

        <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {FAMILY_FEATURES.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 0.06}>
                <article className="flex h-full gap-4 rounded-3xl border border-border bg-background p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <f.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <h3 className="flex items-start gap-2 font-bold text-foreground">
                      <Check className="mt-1 size-4 shrink-0 text-subject-ge" aria-hidden="true" />
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.15}>
            <FamilyPhone />
          </Reveal>
        </div>

        <div className="flex flex-col gap-6 rounded-[2rem] border border-border bg-background p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-foreground">Como a família entra</h3>
          <ol className="grid gap-5 md:grid-cols-3">
            {JOIN_STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.25 }}
                className="flex gap-4"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="font-bold text-foreground">{step.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
          <p className="flex gap-3 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
            A família vê apenas os próprios filhos. Não vê outros alunos, ranking nem comparação com a
            turma. A escola pode desvincular um responsável quando necessário, por exemplo por decisão
            judicial.
          </p>
        </div>
      </div>
    </section>
  )
}
