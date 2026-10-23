'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BookOpenCheck,
  Building2,
  Check,
  FileSpreadsheet,
  GraduationCap,
  Mic,
  QrCode,
  School,
  Sparkles,
  Users,
} from 'lucide-react'
import { ROLES, type RoleId } from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './primitives'

const ICONS: Record<RoleId, typeof Building2> = {
  secretaria: Building2,
  coordenacao: BookOpenCheck,
  direcao: School,
  professor: Users,
  aluno: GraduationCap,
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

function Chip({ children, tone }: { children: React.ReactNode; tone: 'ok' | 'wait' | 'alert' }) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-0.5 text-xs font-semibold',
        tone === 'ok' && 'bg-subject-ci/10 text-subject-ci',
        tone === 'wait' && 'bg-brand-soft text-brand-ink',
        tone === 'alert' && 'bg-pink-soft text-pink-strong',
      )}
    >
      {children}
    </span>
  )
}

function Mockup({ role }: { role: RoleId }) {
  switch (role) {
    case 'secretaria':
      return (
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-foreground">Indicadores da rede</p>
          <div className="flex h-36 items-end gap-2 rounded-xl bg-muted p-4">
            {[45, 60, 52, 70, 64, 78, 72, 85].map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
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
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-foreground">Planos de ensino</p>
          {[
            ['Inglês · 7º ano', 'Aprovado', 'ok'],
            ['Matemática · 6º ano', 'Em revisão', 'wait'],
            ['Língua Portuguesa · 9º ano', 'Retificação solicitada', 'alert'],
            ['Ciências · 8º ano', 'Aprovado', 'ok'],
          ].map(([name, status, tone]) => (
            <div key={name} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-foreground">{name}</span>
                <span className="text-xs text-muted-foreground">Habilidades BNCC vinculadas</span>
              </div>
              <Chip tone={tone as 'ok' | 'wait' | 'alert'}>{status}</Chip>
            </div>
          ))}
        </div>
      )
    case 'direcao':
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Turmas</p>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand-ink">
              <FileSpreadsheet className="size-3.5" aria-hidden="true" />
              Importar planilha
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['6º A', '6º B', '7º A', '7º B', '8º A', '9º A'].map((t) => (
              <div key={t} className="flex flex-col gap-2 rounded-xl border border-border p-3">
                <span className="text-sm font-semibold text-foreground">{t}</span>
                <Bar w="70%" tone="muted" />
              </div>
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
            <div className="flex items-center justify-between rounded-lg bg-brand-soft p-3">
              <span className="text-sm font-medium text-brand-ink">Nota sugerida</span>
              <span className="text-xs font-semibold text-brand-ink">Aguardando revisão</span>
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
          <div className="flex items-center gap-3 rounded-xl border border-border p-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-pink text-primary-foreground">
              <Mic className="size-4" aria-hidden="true" />
            </span>
            <div className="flex flex-1 items-center gap-1" aria-hidden="true">
              {Array.from({ length: 16 }, (_, i) => (
                <span
                  key={i}
                  className="h-6 w-1 origin-center animate-wave rounded-full bg-brand"
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
                transition={{ duration: 0.8 }}
                className="block h-full rounded-full bg-gradient-to-r from-brand to-pink"
              />
            </div>
          </div>
        </div>
      )
  }
}

export function Roles() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const role = ROLES[active]
  const Icon = ICONS[role.id]

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = i
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % ROLES.length
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + ROLES.length) % ROLES.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = ROLES.length - 1
    else return
    e.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="papeis" aria-labelledby="roles-title" className="bg-card py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <SectionHeading
          id="roles-title"
          eyebrow="Para cada papel"
          title="Cada pessoa da rede com a tela de que precisa."
        />
        <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
          <div
            role="tablist"
            aria-label="Papéis na rede"
            aria-orientation="vertical"
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {ROLES.map((r, i) => {
              const RIcon = ICONS[r.id]
              return (
                <button
                  key={r.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  id={`role-tab-${r.id}`}
                  aria-selected={active === i}
                  aria-controls="role-panel"
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    'flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold transition-colors',
                    active === i
                      ? 'bg-brand text-primary-foreground shadow-lg shadow-brand/20'
                      : 'bg-muted text-foreground hover:bg-brand-soft hover:text-brand-ink',
                  )}
                >
                  <RIcon className="size-5" aria-hidden="true" />
                  {r.label}
                </button>
              )
            })}
          </div>

          <div
            id="role-panel"
            role="tabpanel"
            aria-labelledby={`role-tab-${role.id}`}
            className="grid gap-6 rounded-[2rem] border border-border bg-background p-5 sm:p-8 md:grid-cols-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="contents"
              >
                <div className="flex flex-col gap-5">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-bold text-foreground">{role.label}</h3>
                  <ul className="flex flex-col gap-3">
                    {role.items.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-foreground">
                        <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-brand/5"
                  aria-hidden="true"
                >
                  <div className="mb-4 flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-border" />
                    <span className="size-2.5 rounded-full bg-border" />
                    <span className="size-2.5 rounded-full bg-border" />
                  </div>
                  <Mockup role={role.id} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
