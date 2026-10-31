'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, HeartHandshake, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FAMILY_ENABLED, FAMILY_ITEMS, FAMILY_LOGIN_URL, FAMILY_ONBOARDING, type Level } from '@/lib/site-data'
import { GradientText, IllustrativeTag, LevelPill, PhoneFrame, Reveal, SectionHeading, ctaSecondary } from './primitives'

export function Families() {
  return (
    <section id="familias" aria-labelledby="families-title" className="bg-card py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal className="order-last flex flex-col items-center gap-3 lg:order-first">
          <FamilyPhone />
          <IllustrativeTag />
        </Reveal>

        <div className="flex flex-col gap-8">
          <SectionHeading
            id="families-title"
            eyebrow="Para famílias"
            title={
              <>
                Acompanhe o seu filho, <GradientText>mesmo sem dominar o conteúdo</GradientText>.
              </>
            }
          />

          <ul className="grid gap-3 sm:grid-cols-2">
            {FAMILY_ITEMS.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-foreground">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-background p-6">
            <h3 className="text-lg font-bold text-foreground">Como a família entra</h3>
            <ol className="flex flex-col gap-3 md:flex-row md:gap-4">
              {FAMILY_ONBOARDING.map((step, i) => (
                <li key={step} className="flex flex-1 gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {FAMILY_ENABLED ? (
            <a href={FAMILY_LOGIN_URL} className={cn(ctaSecondary, 'w-fit')}>
              Entrar na área da família
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}

const CHILDREN: {
  name: string
  grade: string
  days: number
  subject: string
  skill: string
  level: Level
  tip: string
}[] = [
  {
    name: 'Ana',
    grade: '6º ano',
    days: 4,
    subject: 'Matemática',
    skill: 'Frações',
    level: 'Quase lá',
    tip: 'Na hora do lanche, peça para Ana dividir um bolo em partes iguais e dizer que fração cada pessoa comeu.',
  },
  {
    name: 'Pedro',
    grade: '3º ano',
    days: 3,
    subject: 'Língua Portuguesa',
    skill: 'Palavras com R e RR',
    level: 'Ainda não',
    tip: 'Leiam juntos uma receita e procurem palavras com R e RR, como "caro" e "carro".',
  },
]

const WEEK = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']

function FamilyPhone() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-60px' })
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const child = CHILDREN[index]

  useEffect(() => {
    if (reduce || !inView) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % CHILDREN.length), 4500)
    return () => window.clearInterval(id)
  }, [reduce, inView])

  return (
    <div ref={ref} className="w-full">
      <PhoneFrame label="Celular com a área da família: Olá, Maria. Abas dos filhos Ana, do 6º ano, e Pedro, do 3º ano. Ana praticou 4 dias nesta semana, está praticando frações no nível Quase lá, com uma dica de como ajudar hoje.">
        <div className="flex h-[34rem] flex-col gap-3 px-4 pt-3 pb-5">
          <p className="text-xl font-extrabold text-foreground">Olá, Maria</p>
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
            {CHILDREN.map((c, i) => (
              <span
                key={c.name}
                className={cn(
                  'flex flex-col items-center rounded-lg py-1.5 text-sm font-bold transition-colors duration-300',
                  i === index ? 'bg-card text-brand-ink shadow-sm' : 'text-muted-foreground',
                )}
              >
                {c.name}
                <span className="text-xs font-medium">{c.grade}</span>
              </span>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={child.name}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35 }}
              className="flex flex-1 flex-col gap-3"
            >
              <div className="flex flex-col gap-2 rounded-2xl bg-card p-3">
                <p className="text-sm font-bold text-foreground">Esta semana: {child.days} dias praticados</p>
                <div className="flex justify-between">
                  {WEEK.map((d, i) => (
                    <span
                      key={i}
                      className={cn(
                        'flex size-7 items-center justify-center rounded-full text-xs font-bold',
                        i < child.days ? 'bg-brand text-primary-foreground' : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5 rounded-2xl bg-card p-3">
                <p className="text-xs font-semibold text-muted-foreground">{child.subject}</p>
                <p className="text-sm font-bold text-foreground">
                  {child.name} está praticando: {child.skill}
                </p>
                <LevelPill level={child.level} className="w-fit" />
              </div>

              <div className="flex flex-col gap-1.5 rounded-2xl bg-brand-soft p-3">
                <p className="flex items-center gap-1.5 text-sm font-bold text-brand-ink">
                  <HeartHandshake className="size-4" aria-hidden="true" />
                  Como ajudar hoje
                </p>
                <p className="text-sm leading-snug text-brand-ink">{child.tip}</p>
              </div>

              <span className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-2.5 text-sm font-semibold text-foreground">
                <MessageCircle className="size-4" aria-hidden="true" />
                Falar com a escola
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </PhoneFrame>
    </div>
  )
}
