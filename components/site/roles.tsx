'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  BarChart3,
  BookOpen,
  BookOpenCheck,
  Building2,
  Check,
  ClipboardCheck,
  FileSpreadsheet,
  GraduationCap,
  LayoutGrid,
  Link2,
  ListTodo,
  Lock,
  Mic,
  Network,
  PenLine,
  Presentation,
  QrCode,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { ROLES, type RoleId } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './primitives'

const ROLE_ICONS: Record<RoleId, typeof Building2> = {
  secretaria: Building2,
  coordenacao: BookOpenCheck,
  direcao: School,
  professor: Users,
  aluno: GraduationCap,
}

type GroupIcon = (typeof ROLES)[number]['groups'][number]['icon']

const GROUP_ICONS: Record<GroupIcon, typeof Building2> = {
  network: Network,
  grid: LayoutGrid,
  chart: BarChart3,
  shield: ShieldCheck,
  book: BookOpen,
  users: Users,
  clipboard: ClipboardCheck,
  target: Target,
  sheet: FileSpreadsheet,
  qr: QrCode,
  school: School,
  sparkles: Sparkles,
  pen: PenLine,
  lock: Lock,
  projector: Presentation,
  list: ListTodo,
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

function ReviewChip() {
  const states: [string, ChipTone][] = [
    ['Em revisão', 'wait'],
    ['Aprovado', 'ok'],
  ]
  const [label, tone] = states[useCycle(states.length, 2600)]
  return <Chip tone={tone}>{label}</Chip>
}

function TeacherStatus() {
  const states = ['Aguardando revisão', 'Revisada pelo professor', 'Publicada']
  const label = states[useCycle(states.length, 2200)]
  return <span className="text-xs font-semibold text-brand-ink">{label}</span>
}

function Mockup({ role }: { role: RoleId }) {
  switch (role) {
    case 'secretaria':
      return (
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-foreground">Indicadores da rede</p>
          <div className="flex h-28 items-end gap-2 rounded-xl bg-muted p-3">
            {[45, 60, 52, 70, 64, 78, 72, 85].map((h, i) => (
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
              <p className="text-xs font-semibold text-muted-foreground">Matriz curricular</p>
              <Bar w="80%" />
              <Bar w="60%" tone="muted" />
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-border p-3">
              <p className="text-xs font-semibold text-muted-foreground">Relatório do bimestre</p>
              <Bar w="70%" tone="pink" />
              <Bar w="50%" tone="muted" />
            </div>
          </div>
        </div>
      )
    case 'coordenacao':
      return (
        <div className="flex flex-col gap-2.5">
          <p className="text-sm font-semibold text-foreground">Planos de ensino</p>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
            <span className="text-sm font-medium text-foreground">Inglês · 7º ano</span>
            <Chip tone="ok">Aprovado</Chip>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
            <span className="text-sm font-medium text-foreground">Matemática · 6º ano</span>
            <ReviewChip />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
            <span className="text-sm font-medium text-foreground">Português · 9º ano</span>
            <Chip tone="alert">Retificação</Chip>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
            <span className="text-sm font-medium text-foreground">Ciências · 8º ano</span>
            <Chip tone="ok">Aprovado</Chip>
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
          <div className="grid grid-cols-3 gap-2">
            {['6º A', '6º B', '7º A', '7º B', '8º A', '9º A'].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="flex flex-col gap-2 rounded-xl border border-border p-2.5"
              >
                <span className="text-sm font-semibold text-foreground">{t}</span>
                <Bar w="70%" tone="muted" />
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
            <QrCode className="size-8 text-brand" aria-hidden="true" />
            <div className="flex flex-1 flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground">Cartões de acesso</span>
              <Bar w="60%" />
            </div>
          </div>
        </div>
      )
    case 'professor':
      return (
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-foreground">Produções da turma</p>
          <div className="flex flex-col gap-3 rounded-xl border border-border p-4">
            <span className="flex items-center gap-2 text-xs font-semibold text-pink-strong">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Primeira correção pela IA
            </span>
            <Bar w="95%" tone="muted" />
            <Bar w="85%" tone="muted" />
            <Bar w="60%" tone="muted" />
            <div className="flex items-center justify-between gap-2 rounded-lg bg-brand-soft p-3">
              <span className="text-sm font-medium text-brand-ink">Nota sugerida</span>
              <TeacherStatus />
            </div>
          </div>
          <span className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-primary-foreground">
            <Check className="size-4" aria-hidden="true" />
            Revisar e publicar
          </span>
        </div>
      )
    case 'aluno':
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
            <QrCode className="size-8 text-brand" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">Entrar com cartão QR</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border p-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-pink text-primary-foreground">
              <Mic className="size-4" aria-hidden="true" />
            </span>
            <div className="flex flex-1 items-center gap-1 overflow-hidden" aria-hidden="true">
              {Array.from({ length: 16 }, (_, i) => (
                <span
                  key={i}
                  className="h-6 w-1 shrink-0 origin-center animate-wave rounded-full bg-brand"
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-xl border border-brand/20 bg-brand-soft/60 p-4">
            <span className="text-sm font-semibold text-brand-ink">Retorno na hora</span>
            <Bar w="90%" />
            <Bar w="65%" tone="pink" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Minha evolução</span>
            <div className="h-2 rounded-full bg-border">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="block h-full rounded-full bg-gradient-to-r from-brand to-pink"
              />
            </div>
          </div>
        </div>
      )
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
        {role.groups.map((group, i) => {
          const GIcon = GROUP_ICONS[group.icon]
          return (
            <motion.li
              key={group.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <GIcon className="size-4.5" aria-hidden="true" />
                </span>
                <h4 className="font-semibold text-foreground">{group.title}</h4>
              </div>
              <ul className="flex flex-col gap-2">
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

      <div className="flex flex-col gap-3 rounded-2xl bg-brand-soft/60 p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
          <Link2 className="size-4" aria-hidden="true" />
          Conectado com
        </span>
        <ul className="flex flex-wrap gap-2">
          {role.connections.map((c) => (
            <li
              key={c}
              className="rounded-full border border-brand/20 bg-card px-3 py-1 text-sm font-medium text-brand-ink"
            >
              {c}
            </li>
          ))}
        </ul>
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
          title="Uma plataforma, cinco perfis, cada um com a sua área"
          description="Cada pessoa entra e vê só o que precisa para o seu trabalho. Tudo conectado: o que a Secretaria define chega à escola, à sala de aula e ao aluno."
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
