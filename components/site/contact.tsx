'use client'

import { useActionState } from 'react'
import { CheckCircle2, Loader2, Mail } from 'lucide-react'
import { sendContact, type ContactState } from '@/app/actions/contact'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CONTACT_EMAIL } from '@/lib/site-data'

const initial: ContactState = { status: 'idle' }

const FIELDS = [
  { name: 'nome', label: 'Nome', type: 'text', autoComplete: 'name', required: true },
  { name: 'cargo', label: 'Cargo', type: 'text', autoComplete: 'organization-title', required: true },
  { name: 'rede', label: 'Rede ou escola', type: 'text', autoComplete: 'organization', required: true },
  { name: 'municipio', label: 'Município e UF', type: 'text', autoComplete: 'address-level2', required: true },
  { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email', required: true },
  { name: 'telefone', label: 'Telefone', type: 'tel', autoComplete: 'tel', required: false },
] as const

const inputClass = 'h-12 rounded-xl bg-card px-4 text-base'

export function Contact() {
  const [state, action, pending] = useActionState(sendContact, initial)
  const errors = state.errors ?? {}

  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="bg-gradient-to-br from-brand to-pink py-20 text-primary-foreground lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold tracking-wide text-pink-soft uppercase">Contato</p>
            <h2
              id="contact-title"
              className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Leve o reforço com IA para a sua rede.
            </h2>
            <p className="text-lg leading-relaxed text-pretty text-brand-soft">
              Conte um pouco sobre a sua rede ou escola. Nossa equipe entra em contato para agendar a
              demonstração.
            </p>
          </div>
          <a
            href="#formulario-contato"
            className="inline-flex h-12 w-fit items-center justify-center rounded-xl bg-card px-6 font-semibold text-brand-ink shadow-lg transition-colors hover:bg-brand-soft"
          >
            Agendar demonstração
          </a>
          <div className="flex flex-col gap-2 rounded-3xl bg-primary-foreground/10 p-6">
            <p className="font-semibold">Prefere escrever?</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 font-semibold break-all underline-offset-4 hover:underline"
            >
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div
          id="formulario-contato"
          className="scroll-mt-24 rounded-[2rem] bg-card p-6 text-foreground shadow-2xl shadow-night/30 sm:p-8"
        >
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
