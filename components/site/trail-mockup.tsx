'use client'

import { motion } from 'framer-motion'
import { Check, Mic, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const WAVE = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 1, 0.7, 0.45, 0.85, 0.6, 0.95, 0.5, 0.75, 0.4]
const STEPS = ['done', 'done', 'done', 'current', 'todo'] as const

export function TrailMockup({ withWave = false, feedbackDelay = 1.4 }: { withWave?: boolean; feedbackDelay?: number }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-subject-ma/10 px-3 py-1 text-xs font-semibold text-subject-ma">
          Matemática · 6º ano
        </span>
        <span className="text-xs font-semibold text-muted-foreground">Minha trilha</span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-muted-foreground">Habilidade</p>
        <p className="text-lg font-bold text-foreground">Frações: parte de um todo</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-foreground">3 de 5 atividades</span>
          <span className="text-brand">60%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-brand-soft">
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block h-full rounded-full bg-gradient-to-r from-brand to-pink"
          />
        </div>
        <ol className="flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <li
              key={i}
              className={cn(
                'flex size-6 items-center justify-center rounded-full text-[10px] font-bold',
                s === 'done' && 'bg-brand text-primary-foreground',
                s === 'current' && 'border-2 border-pink bg-pink-soft text-pink-strong',
                s === 'todo' && 'bg-muted text-muted-foreground',
              )}
            >
              {s === 'done' ? <Check className="size-3" /> : i + 1}
            </li>
          ))}
        </ol>
      </div>

      {withWave ? (
        <div className="flex items-center gap-3 rounded-2xl bg-muted p-3">
          <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-pink text-primary-foreground">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-pink" />
            <Mic className="relative size-4" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="truncate text-xs font-semibold text-foreground">Explique em áudio como pensou</span>
            <div className="flex h-6 items-center gap-1 overflow-hidden">
              {WAVE.map((h, i) => (
                <span
                  key={i}
                  className="w-1 shrink-0 origin-center animate-wave rounded-full bg-brand"
                  style={{ height: `${h * 100}%`, animationDelay: `${i * 0.07}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: feedbackDelay, duration: 0.5 }}
        className="flex flex-col gap-2.5 rounded-2xl border border-brand/20 bg-brand-soft/60 p-4"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
          <Sparkles className="size-4 text-pink" />
          Retorno na hora
        </span>
        <span className="h-2 w-11/12 rounded-full bg-brand/25" />
        <span className="h-2 w-8/12 rounded-full bg-brand/25" />
        <span className="h-2 w-9/12 rounded-full bg-pink/25" />
      </motion.div>
    </div>
  )
}
