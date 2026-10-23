'use client'

import { useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileSignature, Link2, Lock, LockOpen, ScanLine, ShieldCheck } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const POINTS = [
  { title: 'Imutável', text: 'notas publicadas não podem ser apagadas nem editadas.', icon: Lock },
  { title: 'Assinada', text: 'cada lançamento é encadeado ao anterior e assinado digitalmente.', icon: FileSignature },
  {
    title: 'Verificável',
    text: 'a ata do bimestre tem QR code; qualquer pessoa confere a autenticidade, sem ver dados dos alunos.',
    icon: ScanLine,
  },
  {
    title: 'Retificação com controle',
    text: 'correções só com justificativa e aprovação de outro servidor, com registro completo.',
    icon: ShieldCheck,
  },
]

const BLOCKS = ['7f3a…c21', 'b94e…0d8', '1c6f…a47', 'e28d…5b3']
const SIZE = 21

function useQrCells() {
  return useMemo(() => {
    const cells: boolean[] = []
    let seed = 7
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    const finder = (x: number, y: number) => {
      const inBox = (ox: number, oy: number) => {
        const dx = x - ox
        const dy = y - oy
        if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null
        const edge = dx === 0 || dy === 0 || dx === 6 || dy === 6
        const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4
        return edge || core
      }
      return inBox(0, 0) ?? inBox(SIZE - 7, 0) ?? inBox(0, SIZE - 7)
    }
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        const f = finder(x, y)
        const nearFinder =
          (x <= 7 && y <= 7) || (x >= SIZE - 8 && y <= 7) || (x <= 7 && y >= SIZE - 8)
        cells.push(f !== null ? f : nearFinder ? false : rand() > 0.52)
      }
    }
    return cells
  }, [])
}

function GradesVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const cells = useQrCells()

  return (
    <div ref={ref} className="flex flex-col gap-8 rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-brand/10 sm:p-8" aria-hidden="true">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {BLOCKS.map((hash, i) => (
          <div key={hash} className="flex flex-col items-center gap-3 sm:flex-1 sm:flex-row">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.35, duration: 0.45 }}
              className="flex w-full flex-col gap-1.5 rounded-xl border border-brand/25 bg-brand-soft/60 p-3"
            >
              <span className="text-xs font-semibold text-brand-ink">Lançamento {i + 1}</span>
              <span className="font-mono text-xs text-muted-foreground">{hash}</span>
            </motion.div>
            {i < BLOCKS.length - 1 ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.35 + 0.3 }}
                className="flex shrink-0 items-center text-pink"
              >
                <span className="h-4 w-0.5 bg-pink shadow-[0_0_10px_rgba(219,39,119,0.9)] sm:h-0.5 sm:w-4" />
                <Link2 className="size-4" />
              </motion.span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-muted p-6">
          <motion.div
            initial={{ scale: 1 }}
            animate={inView ? { scale: [1, 1.15, 1] } : {}}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="relative size-16 text-brand"
          >
            <motion.span
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={inView ? { opacity: 0 } : {}}
              transition={{ delay: 1.6, duration: 0.2 }}
            >
              <LockOpen className="size-16" />
            </motion.span>
            <motion.span
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.6, duration: 0.2 }}
            >
              <Lock className="size-16" />
            </motion.span>
          </motion.div>
          <span className="text-sm font-semibold text-foreground">Bimestre fechado</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-muted p-6">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-28" shapeRendering="crispEdges">
            {cells.map((on, i) =>
              on ? (
                <rect
                  key={i}
                  x={i % SIZE}
                  y={Math.floor(i / SIZE)}
                  width="1"
                  height="1"
                  fill="var(--color-night)"
                  style={{
                    opacity: inView ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    transitionDelay: `${1.8 + ((i * 37) % 97) / 100}s`,
                  }}
                />
              ) : null,
            )}
          </svg>
          <span className="text-sm font-semibold text-foreground">Ata verificável</span>
        </div>
      </div>
    </div>
  )
}

export function Grades() {
  return (
    <section id="notas" aria-labelledby="grades-title" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <SectionHeading id="grades-title" eyebrow="Notas com garantia" title="Cada nota protegida do lançamento à ata." />
          <ul className="flex flex-col gap-5">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <p.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="leading-relaxed text-foreground">
                  <strong className="font-bold">{p.title}:</strong> {p.text}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
        <GradesVisual />
      </div>
    </section>
  )
}
