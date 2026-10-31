'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { PROBLEM_STATS } from '@/lib/site-data'
import { GradientText, Reveal, SectionHeading, cardClass } from './primitives'

function format(value: number, decimals: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function CountUp({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const shown = reduce ? value : current

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: setCurrent })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {format(shown, decimals)}
        {suffix}
      </span>
      <span className="sr-only">
        {format(value, decimals)}
        {suffix}
      </span>
    </>
  )
}

export function Problem() {
  return (
    <section id="problema" aria-labelledby="problem-title" className="py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <SectionHeading
          id="problem-title"
          eyebrow="O problema"
          title={
            <>
              A dificuldade de hoje <GradientText>quase sempre começou antes</GradientText>.
            </>
          }
        />

        <ul className="grid gap-5 md:grid-cols-3">
          {PROBLEM_STATS.map((s, i) => (
            <Reveal as="li" key={s.text} delay={i * 0.1} className={`${cardClass} flex flex-col gap-3 p-7`}>
              <p className="text-5xl font-extrabold tracking-tight text-brand lg:text-6xl">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="text-lg leading-relaxed font-medium text-foreground">{s.text}</p>
              <p className="mt-auto text-xs text-muted-foreground">Fonte: {s.source}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="max-w-3xl border-l-4 border-pink pl-5">
          <p className="text-xl leading-relaxed font-semibold text-pretty text-foreground">
            Quem não aprendeu frações no 5º ano trava em equações no 7º. O reforço tradicional repete o
            conteúdo do ano; o SpeakFlow volta até o degrau que falta.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
