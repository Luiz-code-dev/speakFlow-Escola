'use client'

import { useActionState } from 'react'
import { CheckCircle2, Loader2, Mail } from 'lucide-react'
import { sendContact, type ContactState } from '@/app/actions/contact'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CONTACT_EMAIL } from '@/lib/site-data'
import { SectionHeading } from './primitives'

const initial: ContactState = { status: 'idle' }

const FIELDS = [
  { name: 'nome', label: 'Nome', type: 'text', autoComplete: 'name', required: true },
  { name: 'cargo', label: 'Cargo', type: 'text', autoComplete: 'organization-title', required: true },
  { name: 'municipio', label: 'Município/UF', type: 'text', autoComplete: 'address-level2', required: true },
  { name: 'email', label: 'E-mail institucional', type: 'email', autoComplete: 'email', required: true },
  { name: 'telefone', label: 'Telefone (opcional)', type: 'tel', autoComplete: 'tel', required: false },
  { name: 'alunos', label: 'Número aproximado de alunos da rede (opcional)', type: 'text', autoComplete: 'off', required: false },
] as const

const inputClass = 'h-12 rounded-xl bg-card px-4 text-base'

export function Contact() {
  const [state, action, pending] = useActionState(sendContact, initial)
  const errors = state.errors ?? {}

  return (
    <section id="contato" aria-labelledby="contact-title" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="contact-title"
            eyebrow="Contato"
            title="Agende uma demonstração"
            description="Conte um pouco sobre a sua rede. Nossa equipe entra em contato para apresentar a plataforma."
          />
          <div className="flex flex-col gap-2 rounded-3xl border border-border bg-card p-6">
            <p className="font-semibold text-foreground">Prefere escrever?</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 font-semibold break-all text-brand underline-offset-4 hover:underline"
            >
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-brand/10 sm:p-8">
          {state.status === 'success' ? (
            <div role="status" className="flex min-h-80 flex-col items-center justify-center gap-4 text-center">
              <CheckCircle2 className="size-14 text-brand" aria-hidden="true" />
              <p className="text-xl font-bold text-balance text-foreground">{state.message}</p>
            </div>
          ) : (
            <form action={action} noValidate className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <div key={f.name} className="flex flex-col gap-2">
                    <Label htmlFor={f.name} className="text-foreground">
                      {f.label}
                    </Label>
                    <Input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      required={f.required}
                      aria-invalid={errors[f.name] ? true : undefined}
                      aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                      className={inputClass}
                    />
                    {errors[f.name] ? (
                      <p id={`${f.name}-error`} className="text-sm text-destructive">
                        {errors[f.name]}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="mensagem" className="text-foreground">
                  Mensagem
                </Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  required
                  aria-invalid={errors.mensagem ? true : undefined}
                  aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
                  className="min-h-32 rounded-xl bg-card px-4 py-3 text-base"
                />
                {errors.mensagem ? (
                  <p id="mensagem-error" className="text-sm text-destructive">
                    {errors.mensagem}
                  </p>
                ) : null}
              </div>

              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Não preencha este campo</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <input
                    id="consentimento"
                    name="consentimento"
                    type="checkbox"
                    required
                    aria-invalid={errors.consentimento ? true : undefined}
                    aria-describedby={errors.consentimento ? 'consentimento-error' : undefined}
                    className="mt-1 size-5 shrink-0 accent-brand"
                  />
                  <label htmlFor="consentimento" className="text-sm leading-relaxed text-foreground">
                    Concordo com o uso destes dados para retorno do contato, conforme o{' '}
                    <a href="/privacidade" className="font-semibold text-brand underline underline-offset-4">
                      Aviso de Privacidade
                    </a>
                    .
                  </label>
                </div>
                {errors.consentimento ? (
                  <p id="consentimento-error" className="text-sm text-destructive">
                    {errors.consentimento}
                  </p>
                ) : null}
              </div>

              {state.status === 'error' && state.message ? (
                <p role="alert" className="rounded-xl bg-pink-soft p-3 text-sm font-medium text-pink-strong">
                  {state.message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={pending}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 font-semibold text-primary-foreground transition-colors hover:bg-brand-hover disabled:opacity-60"
              >
                {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                {pending ? 'Enviando…' : 'Agendar demonstração'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
