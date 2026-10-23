'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { NEED_STATS } from '@/lib/site-data'
import { Reveal, SectionHeading } from './primitives'

function Counter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setDisplay,
    })
    return () => controls.stop()
  }, [inView, reduce, value])

  const formatted = display.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  const final = value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {formatted}
        {suffix}
      </span>
      <span className="sr-only">
        {final}
        {suffix}
      </span>
    </span>
  )
}

export function Need() {
  return (
    <section id="necessidade" aria-labelledby="need-title" className="py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <SectionHeading
          id="need-title"
          eyebrow="A necessidade"
          title="A aprendizagem ainda não chega a todos os alunos."
        />

        <ul className="grid gap-5 md:grid-cols-3">
          {NEED_STATS.map((stat, i) => (
            <Reveal as="li" key={stat.source + stat.value} delay={i * 0.1}>
              <article className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-card p-7 shadow-sm">
                <span
                  className="h-1.5 w-12 rounded-full"
                  style={{ backgroundColor: stat.color }}
                  aria-hidden="true"
                />
                <p className="text-6xl font-extrabold tracking-tight text-foreground tabular-nums lg:text-7xl">
                  <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </p>
                <p className="text-lg leading-relaxed text-foreground">{stat.text}</p>
                <p className="mt-auto text-sm text-muted-foreground">Fonte: {stat.source}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="max-w-3xl text-xl leading-relaxed text-pretty text-muted-foreground">
            Com turmas de 30 alunos ou mais, o professor não consegue dar retorno individual a cada
            produção escrita ou oral. E a Secretaria só vê os resultados quando as avaliações
            externas chegam.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
