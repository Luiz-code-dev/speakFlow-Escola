'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  BarChart3,
  BookOpenCheck,
  Building2,
  Check,
  ClipboardCheck,
  FileSpreadsheet,
  GraduationCap,
  HeartHandshake,
  KeyRound,
  Lightbulb,
  Link2,
  ListTodo,
  Network,
  QrCode,
  Route,
  School,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { ROLES, type RoleId } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { FamilyPhone } from './family'
import { SectionHeading } from './primitives'
import { TrailMockup } from './trail-mockup'

const ROLE_ICONS: Record<RoleId, typeof Building2> = {
  secretaria: Building2,
  coordenacao: BookOpenCheck,
  direcao: School,
  professor: Users,
  aluno: GraduationCap,
  familia: HeartHandshake,
}

type GroupIcon = (typeof ROLES)[number]['groups'][number]['icon']

const GROUP_ICONS: Record<GroupIcon, typeof Building2> = {
  network: Network,
  chart: BarChart3,
  clipboard: ClipboardCheck,
  target: Target,
  route: Route,
  sheet: FileSpreadsheet,
  users: Users,
  sparkles: Sparkles,
  list: ListTodo,
  key: KeyRound,
  lightbulb: Lightbulb,
}

function Bar({ w, tone = 'brand' }: { w: string; tone?: 'brand' | 'pink' | 'muted' }) {
  return (
    <span
      className={cn(
        'block h-2 rounded-full',
        tone === 'brand' && 'bg-brand/25',
        tone === 'pink' && 'bg-pink/25',
        tone === 'muted' && 'bg-border',
      )}
      style={{ width: w }}
    />
  )
}

type ChipTone = 'ok' | 'wait' | 'alert'

function Chip({ children, tone }: { children: React.ReactNode; tone: ChipTone }) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors duration-500',
        tone === 'ok' && 'bg-subject-ci/10 text-subject-ci',
        tone === 'wait' && 'bg-brand-soft text-brand-ink',
        tone === 'alert' && 'bg-pink-soft text-pink-strong',
      )}
    >
      {children}
    </span>
  )
}

function useCycle(length: number, ms: number) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((v) => (v + 1) % length), ms)
    return () => clearInterval(id)
  }, [reduce, length, ms])
  return i
}

function RecoveryChip() {
  const states: [string, ChipTone][] = [
    ['Em defasagem', 'alert'],
    ['Recuperando', 'wait'],
  ]
  const [label, tone] = states[useCycle(states.length, 2600)]
  return <Chip tone={tone}>{label}</Chip>
}

type Cell = 'ok' | 'near' | 'no'

const HEATMAP_SKILLS = ['Frações', 'Decimais', 'Gráficos', 'Área']
const HEATMAP: Cell[][] = [
  ['ok', 'ok', 'near', 'ok'],
  ['no', 'near', 'ok', 'near'],
  ['near', 'ok', 'ok', 'no'],
  ['no', 'no', 'near', 'near'],
  ['ok', 'near', 'ok', 'ok'],
]
const CELL_TONE: Record<Cell, string> = {
  ok: 'bg-subject-ge',
  near: 'bg-subject-es',
  no: 'bg-subject-hi',
}

function Heatmap() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-foreground">Turma 6º B · habilidades</p>
      <div className="grid grid-cols-[3.5rem_repeat(4,minmax(0,1fr))] gap-1.5 text-[10px] font-semibold text-muted-foreground">
        <span />
        {HEATMAP_SKILLS.map((s) => (
          <span key={s} className="truncate text-center">
            {s}
          </span>
        ))}
        {HEATMAP.map((row, r) => (
          <div key={r} className="contents">
            <span className="self-center">Aluno {r + 1}</span>
            {row.map((cell, c) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + (r * 4 + c) * 0.03 }}
                className={cn('h-6 rounded-md', CELL_TONE[cell])}
              />
            ))}
          </div>
        ))}
      </div>
      <ul className="flex flex-wrap gap-3 text-xs text-foreground">
        {(
          [
            ['ok', 'Domina'],
            ['near', 'Quase lá'],
            ['no', 'Ainda não'],
          ] as const
        ).map(([tone, label]) => (
          <li key={tone} className="flex items-center gap-1.5">
            <span className={cn('size-3 rounded-sm', CELL_TONE[tone])} />
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Mockup({ role }: { role: RoleId }) {
  switch (role) {
    case 'secretaria':
      return (
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-foreground">Participação semanal da rede</p>
          <div className="flex h-28 items-end gap-2 rounded-xl bg-muted p-3">
            {[40, 52, 58, 64, 70, 74, 80, 86].map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
                className={cn('flex-1 rounded-t-md', i % 2 ? 'bg-brand' : 'bg-pink')}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2 rounded-xl border border-border p-3">
              <p className="text-xs font-semibold text-muted-foreground">Em defasagem</p>
              <Bar w="70%" tone="pink" />
              <Bar w="45%" tone="pink" />
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-border p-3">
              <p className="text-xs font-semibold text-muted-foreground">Recuperadas</p>
              <Bar w="55%" />
              <Bar w="80%" />
            </div>
          </div>
        </div>
      )
    case 'coordenacao':
      return (
        <div className="flex flex-col gap-2.5">
          <p className="text-sm font-semibold text-foreground">Habilidades prioritárias</p>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
            <span className="text-sm font-medium text-foreground">Frações · 6º ano</span>
            <RecoveryChip />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
            <span className="text-sm font-medium text-foreground">Leitura · 9º ano</span>
            <Chip tone="wait">Recuperando</Chip>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
            <span className="text-sm font-medium text-foreground">Trilha da Escola B</span>
            <Chip tone="ok">Aprovada</Chip>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
            <span className="text-sm font-medium text-foreground">Escola C · 7º ano</span>
            <Chip tone="alert">Precisa de apoio</Chip>
          </div>
        </div>
      )
    case 'direcao':
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-foreground">Turmas</p>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand-ink">
              <FileSpreadsheet className="size-3.5" aria-hidden="true" />
              Importar planilha
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
            <QrCode className="size-8 text-brand" aria-hidden="true" />
            <div className="flex flex-1 flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground">Cartões para levar para casa</span>
              <Bar w="75%" />
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border border-border p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-foreground">Sem praticar na semana</span>
              <Chip tone="alert">Atenção</Chip>
            </div>
            <Bar w="65%" tone="muted" />
            <Bar w="45%" tone="muted" />
          </div>
        </div>
      )
    case 'professor':
      return <Heatmap />
    case 'aluno':
      return <TrailMockup feedbackDelay={0.8} />
    case 'familia':
      return <FamilyPhone compact />
  }
}

function useMeasuredHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [height, setHeight] = useState<number | 'auto'>('auto')
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, height] as const
}

function RolePanel({ role }: { role: (typeof ROLES)[number] }) {
  const Icon = ROLE_ICONS[role.id]
  const groups = role.groups
  return (
    <div className="flex flex-col gap-6 p-5 sm:p-8">
      <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,20rem)] md:items-start">
        <div className="flex flex-col gap-4">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <h3 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">{role.label}</h3>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{role.summary}</p>
        </div>
        <div className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-lg shadow-brand/5" aria-hidden="true">
          <div className="mb-3 flex gap-1.5">
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
          </div>
          <Mockup role={role.id} />
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {groups.map((group, i) => {
          const GIcon = GROUP_ICONS[group.icon]
          const spanFull = groups.length % 2 === 1 && i === groups.length - 1
          return (
            <motion.li
              key={group.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
              className={cn(
                'flex flex-col gap-3 rounded-2xl border border-border bg-card p-5',
                spanFull && 'sm:col-span-2',
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <GIcon className="size-4.5" aria-hidden="true" />
                </span>
                <h4 className="font-semibold text-foreground">{group.title}</h4>
              </div>
              <ul className={cn('grid gap-2', spanFull && group.items.length > 2 && 'sm:grid-cols-2')}>
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                    <Check className="mt-1 size-3.5 shrink-0 text-brand" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          )
        })}
      </ul>

      <div className="flex flex-col gap-3 rounded-2xl bg-brand-soft/60 p-4">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
          <Link2 className="size-4" aria-hidden="true" />
          Conectado com
        </span>
        <ol className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <li
              key={r.id}
              aria-current={r.id === role.id ? 'true' : undefined}
              className={cn(
                'rounded-xl border px-3 py-2 text-sm leading-snug',
                r.id === role.id
                  ? 'border-brand bg-brand text-primary-foreground'
                  : 'border-brand/20 bg-card text-foreground',
              )}
            >
              <strong className="font-semibold">{r.label}</strong>
              <span className={r.id === role.id ? '' : 'text-muted-foreground'}> · {r.connection}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function Roles() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [contentRef, height] = useMeasuredHeight<HTMLDivElement>()
  const role = ROLES[active]

  const select = (i: number) => {
    setActive(i)
    tabRefs.current[i]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = i
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % ROLES.length
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + ROLES.length) % ROLES.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = ROLES.length - 1
    else return
    e.preventDefault()
    select(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="papeis" aria-labelledby="roles-title" className="bg-card py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <SectionHeading
          id="roles-title"
          eyebrow="Para cada papel"
          title="Uma plataforma, seis perfis, cada um com a sua área"
          description="Cada pessoa entra e vê só o que precisa. Tudo conectado: o que a Secretaria define chega à escola, ao professor, ao aluno em casa e à família que acompanha."
        />
        <div className="grid min-w-0 gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
          <div
            role="tablist"
            aria-label="Perfis da plataforma"
            className="-mx-4 flex min-w-0 snap-x gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {ROLES.map((r, i) => {
              const RIcon = ROLE_ICONS[r.id]
              return (
                <button
                  key={r.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`role-tab-${r.id}`}
                  aria-selected={active === i}
                  aria-controls="role-panel"
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    'flex shrink-0 snap-start items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold transition-colors',
                    active === i
                      ? 'bg-brand text-primary-foreground shadow-lg shadow-brand/20'
                      : 'bg-muted text-foreground hover:bg-brand-soft hover:text-brand-ink',
                  )}
                >
                  <RIcon className="size-5 shrink-0" aria-hidden="true" />
                  {r.label}
                </button>
              )
            })}
          </div>

          <motion.div
            id="role-panel"
            role="tabpanel"
            aria-labelledby={`role-tab-${role.id}`}
            animate={{ height }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 overflow-hidden rounded-[2rem] border border-border bg-background"
          >
            <div ref={contentRef}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <RolePanel role={role} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
