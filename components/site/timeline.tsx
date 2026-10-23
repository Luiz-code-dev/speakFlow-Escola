'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { TIMELINE, type TimelineItem } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { LogoMark } from './logo'
import { SectionHeading } from './primitives'

function CircuitLines() {
  const paths = [
    'M0 30 H60 L80 50 H160',
    'M0 70 H40 L60 90 H120 L140 70 H200',
    'M200 20 H150 L130 40 H90',
    'M200 100 H170 L150 120 H60',
  ]
  return (
    <svg
      viewBox="0 0 200 140"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={i % 2 ? '#DB2777' : '#A78BFA'}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.2 + i * 0.25, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  )
}

function TimelineCard({ item, className }: { item: TimelineItem; className?: string }) {
  if (item.highlight) {
    return (
      <article
        className={cn(
          'relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-brand/60 bg-brand-ink p-7 shadow-[0_0_60px_-10px_rgba(109,40,217,0.8)]',
          className,
        )}
      >
        <CircuitLines />
        <div className="relative flex items-center justify-between">
          <p className="text-6xl font-extrabold tracking-tight text-night-foreground">{item.year}</p>
          <LogoMark className="size-12" />
        </div>
        <h3 className="relative text-xl font-bold text-balance text-night-foreground">{item.title}</h3>
        <span className="relative w-fit rounded-full bg-pink px-3 py-1 text-xs font-semibold text-primary-foreground">
          O que muda
        </span>
        <p className="relative leading-relaxed text-night-foreground">{item.text}</p>
      </article>
    )
  }
  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-3xl border border-night-foreground/10 bg-night-foreground/[0.04] p-7',
        className,
      )}
    >
      <p className="text-5xl font-extrabold tracking-tight text-night-foreground/90">{item.year}</p>
      <h3 className="text-xl font-bold text-balance text-night-foreground">{item.title}</h3>
      <span className="w-fit rounded-full border border-night-foreground/20 px-3 py-1 text-xs font-semibold text-pink-soft">
        O que mudou
      </span>
      <p className="leading-relaxed text-night-muted">{item.text}</p>
    </article>
  )
}

function HorizontalTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const x = useTransform(progress, (v) => -v * distance)

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden pt-16">
        <div className="mx-auto w-full max-w-7xl px-6">
          <SectionHeading
            tone="dark"
            eyebrow="Linha do tempo"
            title="A evolução do ensino público no Brasil"
            id="timeline-title"
          />
        </div>
        <motion.div ref={trackRef} style={{ x }} className="relative w-max px-[8vw] pt-8">
          <div className="absolute top-0 right-[8vw] left-[8vw] h-0.5 rounded-full bg-night-foreground/10" aria-hidden="true">
            <motion.div
              style={{ scaleX: progress }}
              className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-pink shadow-[0_0_16px_rgba(219,39,119,0.9)]"
            />
          </div>
          <ol className="flex gap-6">
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative">
                <span
                  className={cn(
                    'absolute -top-[2.4rem] left-7 size-3 rounded-full ring-4 ring-night',
                    item.highlight ? 'bg-pink' : 'bg-night-muted',
                  )}
                  aria-hidden="true"
                />
                <TimelineCard
                  item={item}
                  className={cn('h-full', item.highlight ? 'w-[26rem]' : 'w-[22rem]')}
                />
              </li>
            ))}
          </ol>
        </motion.div>
      </div>
    </div>
  )
}

function VerticalTimeline() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 70%'] })

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-20 sm:px-6">
      <SectionHeading
        tone="dark"
        eyebrow="Linha do tempo"
        title="A evolução do ensino público no Brasil"
        id="timeline-title"
      />
      <ol ref={listRef} className="relative flex flex-col gap-6 pl-8">
        <span className="absolute top-0 bottom-0 left-[0.4rem] w-0.5 bg-night-foreground/10" aria-hidden="true">
          <motion.span
            style={{ scaleY: scrollYProgress }}
            className="block h-full origin-top bg-gradient-to-b from-brand to-pink shadow-[0_0_12px_rgba(219,39,119,0.8)]"
          />
        </span>
        {TIMELINE.map((item) => (
          <motion.li
            key={item.year}
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <span
              className={cn(
                'absolute top-9 -left-[1.95rem] size-3 rounded-full ring-4 ring-night',
                item.highlight ? 'bg-pink' : 'bg-night-muted',
              )}
              aria-hidden="true"
            />
            <TimelineCard item={item} />
          </motion.li>
        ))}
      </ol>
    </div>
  )
}

export function Timeline() {
  const reduce = useReducedMotion()
  return (
    <section id="linha-do-tempo" aria-labelledby="timeline-title" className="overflow-x-clip bg-night">
      {reduce ? (
        <VerticalTimeline />
      ) : (
        <>
          <div className="hidden lg:block">
            <HorizontalTimeline />
          </div>
          <div className="lg:hidden">
            <VerticalTimeline />
          </div>
        </>
      )}
    </section>
  )
}
