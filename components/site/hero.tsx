'use client'

import { useSyncExternalStore } from 'react'
import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mic, Sparkles } from 'lucide-react'
import { SUBJECTS } from '@/lib/site-data'
import { ctaPrimary, ctaSecondary } from './primitives'

const NeuralCanvas = dynamic(() => import('./neural-canvas'), { ssr: false })

const noopSubscribe = () => () => {}

export function Hero() {
  const reduce = useReducedMotion()
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      <div className="absolute inset-0 -z-10">{hydrated && reduce === false ? <NeuralCanvas /> : null}</div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-card/80 px-3 py-1.5 text-sm font-medium text-brand-ink backdrop-blur"
          >
            <Sparkles className="size-4 text-pink" aria-hidden="true" />
            Inteligência artificial para redes municipais de ensino
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Cada aluno com retorno imediato.{' '}
            <span className="text-brand">Cada nota com garantia.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl"
          >
            Aprendizagem com inteligência artificial para toda a rede municipal, em qualquer
            componente curricular.
          </motion.p>

          <ul className="flex flex-wrap gap-2" aria-label="Componentes curriculares">
            {SUBJECTS.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.07, type: 'spring', stiffness: 260, damping: 20 }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm"
              >
                <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} aria-hidden="true" />
                {s.label}
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + SUBJECTS.length * 0.07, type: 'spring', stiffness: 260, damping: 20 }}
              className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand-ink"
            >
              + todos os componentes da BNCC
            </motion.li>
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <a href="#contato" className={ctaPrimary}>
              Agendar demonstração
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#como-funciona" className={ctaSecondary}>
              Ver como funciona
            </a>
          </motion.div>
        </div>

        <TabletMockup />
      </div>
    </section>
  )
}

const WAVE = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 1, 0.7, 0.45, 0.85, 0.6, 0.95, 0.5, 0.75, 0.4, 0.65, 0.9]

function TabletMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto hidden w-full max-w-md lg:block"
      aria-hidden="true"
    >
      <div className="rounded-[2.25rem] bg-night p-3 shadow-2xl shadow-brand/30">
        <div className="flex flex-col gap-5 rounded-[1.6rem] bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-ink">
              Inglês · 7º ano
            </span>
            <span className="text-xs text-muted-foreground">Atividade da semana</span>
          </div>
          <p className="text-lg font-semibold text-foreground">Talk about your daily routine.</p>

          <div className="flex items-center gap-4 rounded-2xl bg-muted p-4">
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-pink text-primary-foreground">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-pink" />
              <Mic className="relative size-5" />
            </span>
            <div className="flex h-12 flex-1 items-center gap-1">
              {WAVE.map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 origin-center animate-wave rounded-full bg-brand"
                  style={{ height: `${h * 100}%`, animationDelay: `${i * 0.07}s` }}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-col gap-3 rounded-2xl border border-brand/20 bg-brand-soft/60 p-4"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
              <Sparkles className="size-4 text-pink" />
              Retorno imediato
            </div>
            <div className="flex flex-col gap-2">
              <span className="h-2 w-11/12 rounded-full bg-brand/25" />
              <span className="h-2 w-8/12 rounded-full bg-brand/25" />
              <span className="h-2 w-9/12 rounded-full bg-pink/25" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
