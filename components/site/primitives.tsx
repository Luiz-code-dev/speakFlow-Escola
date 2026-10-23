'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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

export const ctaPrimary =
  'inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-semibold text-primary-foreground shadow-lg shadow-brand/25 transition-colors hover:bg-brand-hover focus-visible:outline-offset-4'

export const ctaSecondary =
  'inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 text-base font-semibold text-brand-ink transition-colors hover:bg-brand-soft'
