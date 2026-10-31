'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { Level } from '@/lib/site-data'

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li'
}) {
  const Comp = as === 'li' ? motion.li : motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-brand to-pink bg-clip-text text-transparent">{children}</span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'light',
  className,
  id,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
  id?: string
}) {
  return (
    <Reveal className={cn('flex max-w-3xl flex-col gap-4', className)}>
      <p
        className={cn(
          'text-sm font-semibold tracking-wide uppercase',
          tone === 'dark' ? 'text-pink-soft' : 'text-pink-strong',
        )}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          'text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl',
          tone === 'dark' ? 'text-night-foreground' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'text-lg leading-relaxed text-pretty',
            tone === 'dark' ? 'text-night-muted' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}

const LEVEL_STYLES: Record<Level, string> = {
  'Ainda não': 'bg-level-no text-level-no-ink',
  'Quase lá': 'bg-level-almost text-level-almost-ink',
  Domina: 'bg-level-yes text-level-yes-ink',
}

export function levelClass(level: Level) {
  return LEVEL_STYLES[level]
}

export function LevelPill({ level, className }: { level: Level; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap',
        LEVEL_STYLES[level],
        className,
      )}
    >
      {level}
    </span>
  )
}

export function IllustrativeTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold text-muted-foreground',
        className,
      )}
    >
      Cenário ilustrativo
    </span>
  )
}

export function PhoneFrame({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div role="img" aria-label={label} className={cn('mx-auto w-full max-w-[20rem]', className)}>
      <div className="rounded-[2.75rem] bg-night p-2.5 shadow-2xl shadow-brand/30">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-background">
          <div aria-hidden="true" className="mx-auto mt-2.5 h-5 w-24 rounded-full bg-night" />
          {children}
        </div>
      </div>
    </div>
  )
}

export function TabletFrame({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div role="img" aria-label={label} className={cn('mx-auto w-full max-w-xl', className)}>
      <div className="rounded-[2rem] bg-night p-3 shadow-2xl shadow-brand/25">
        <div className="overflow-hidden rounded-[1.4rem] bg-background">{children}</div>
      </div>
    </div>
  )
}

export const cardClass = 'rounded-3xl border border-border bg-card shadow-lg shadow-brand/5'

export const ctaPrimary =
  'inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-semibold text-primary-foreground shadow-lg shadow-brand/25 transition-colors hover:bg-brand-hover focus-visible:outline-offset-4'

export const ctaSecondary =
  'inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 text-base font-semibold text-brand-ink transition-colors hover:bg-brand-soft'
