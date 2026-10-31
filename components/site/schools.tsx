'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Landmark, Route } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CLASS_MAP, CLASS_SKILLS, ROLE_TABS } from '@/lib/site-data'
import { GradientText, IllustrativeTag, Reveal, SectionHeading, TabletFrame, levelClass } from './primitives'

export function Schools() {
  const [activeId, setActiveId] = useState<(typeof ROLE_TABS)[number]['id']>('secretaria')
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const active = ROLE_TABS.find((t) => t.id === activeId) ?? ROLE_TABS[0]

  function onKeyDown(e: React.KeyboardEvent, index: number) {
    const last = ROLE_TABS.length - 1
    const map: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }
    const next = map[e.key]
    if (next === undefined) return
    e.preventDefault()
    setActiveId(ROLE_TABS[next].id)
    tabsRef.current[next]?.focus()
  }

  return (
    <section id="escolas" aria-labelledby="schools-title" className="py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <SectionHeading
          id="schools-title"
          eyebrow="Para escolas e redes"
          title={
            <>
              Cada papel vê <GradientText>o que precisa</GradientText> para agir.
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <div
              role="tablist"
              aria-label="Papéis na rede"
              className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-card p-1 sm:grid-cols-4"
            >
              {ROLE_TABS.map((t, i) => {
                const selected = t.id === activeId
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      tabsRef.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={`role-tab-${t.id}`}
                    aria-selected={selected}
                    aria-controls={`role-panel-${t.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(t.id)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cn(
                      'rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                      selected ? 'bg-brand text-primary-foreground' : 'text-muted-foreground hover:bg-brand-soft hover:text-brand-ink',
                    )}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>

            <div
              role="tabpanel"
              id={`role-panel-${active.id}`}
              aria-labelledby={`role-tab-${active.id}`}
              className="flex flex-col gap-4"
            >
              <h3 className="text-2xl font-bold text-foreground">{active.title}</h3>
              <ul className="flex flex-col gap-3">
                {active.items.map((item) => (
                  <li key={item} className="flex gap-3 text-lg leading-relaxed text-foreground">
                    <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                      <Check className="size-4" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Reveal className="flex flex-col items-center gap-3">
            <ClassMapTablet />
            <IllustrativeTag />
          </Reveal>
        </div>

        <Reveal className="flex flex-col gap-4 rounded-3xl bg-brand-soft p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-primary-foreground">
            <Landmark className="size-6" aria-hidden="true" />
          </span>
          <p className="text-lg leading-relaxed font-semibold text-pretty text-brand-ink">
            Alinhado ao Pacto Nacional pela Recomposição das Aprendizagens (Decreto 12.391/2025): diagnóstico
            das defasagens e prática para superá-las.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const SHORT = { 'Ainda não': 'Não', 'Quase lá': 'Quase', Domina: 'Domina' } as const
const HIGHLIGHT = 'Davi E.'

function ClassMapTablet() {
  const reduce = useReducedMotion()

  return (
    <TabletFrame label="Tablet com o Mapa da turma do 6º ano B: seis alunos com nomes fictícios e quatro habilidades de frações e porcentagem, com cada célula colorida pelo nível. O aluno Davi está destacado e sua ficha mostra o erro comum de somar numerador com numerador e a sugestão de trilha em frações equivalentes do 4º ano.">
      <div className="flex flex-col gap-4 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Matemática · 6º ano B</p>
            <p className="text-lg font-extrabold text-foreground">Mapa da turma</p>
          </div>
          <div className="hidden items-center gap-2 text-xs font-semibold sm:flex">
            {(['Ainda não', 'Quase lá', 'Domina'] as const).map((l) => (
              <span key={l} className="flex items-center gap-1 text-muted-foreground">
                <span className={cn('size-3 rounded', levelClass(l))} />
                {l}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-card">
          <div className="grid grid-cols-[5.5rem_repeat(4,minmax(0,1fr))] gap-1 p-2 text-xs">
            <span />
            {CLASS_SKILLS.map((s) => (
              <span key={s} className="px-1 pb-1 text-center leading-tight font-semibold text-muted-foreground">
                {s}
              </span>
            ))}
            {CLASS_MAP.map((row) => {
              const hl = row.name === HIGHLIGHT
              return (
                <div key={row.name} className="contents">
                  <span
                    className={cn(
                      'flex items-center rounded-md px-1.5 font-semibold',
                      hl ? 'bg-brand text-primary-foreground' : 'text-foreground',
                    )}
                  >
                    {row.name}
                  </span>
                  {row.levels.map((l, i) => (
                    <span
                      key={i}
                      className={cn(
                        'flex h-8 items-center justify-center rounded-md font-bold',
                        levelClass(l),
                        hl && 'ring-2 ring-brand',
                      )}
                    >
                      {SHORT[l]}
                    </span>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col gap-3 rounded-2xl border-2 border-brand/30 bg-card p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-bold text-foreground">Ficha de Davi E.</p>
            <span className="rounded-full bg-level-no px-2.5 py-1 text-xs font-bold text-level-no-ink">
              Precisa de atenção
            </span>
          </div>
          <p className="text-sm leading-snug text-foreground">
            <span className="font-semibold">Erro comum:</span> soma numerador com numerador e denominador com
            denominador (1/2 + 1/3 = 2/5).
          </p>
          <div className="flex flex-col gap-2 rounded-xl bg-brand-soft p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
              <Route className="size-4 shrink-0" aria-hidden="true" />
              Trilha sugerida: Frações equivalentes (4º ano)
            </p>
            <span className="w-fit rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-primary-foreground">
              Aceitar trilha
            </span>
          </div>
        </motion.div>
      </div>
    </TabletFrame>
  )
}
