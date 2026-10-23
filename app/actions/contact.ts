'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { z } from 'zod'
import { CONTACT_EMAIL } from '@/lib/site-data'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<string, string>>
}

const schema = z.object({
  nome: z.string().trim().min(2, 'Informe seu nome.').max(120),
  cargo: z.string().trim().min(2, 'Informe seu cargo.').max(120),
  municipio: z.string().trim().min(2, 'Informe o município/UF.').max(120),
  email: z.string().trim().email('Informe um e-mail válido.').max(160),
  telefone: z.string().trim().max(30).optional(),
  alunos: z.string().trim().max(30).optional(),
  mensagem: z.string().trim().min(5, 'Escreva uma mensagem.').max(3000),
  consentimento: z.literal('on', { error: 'É preciso concordar para enviarmos o retorno.' }),
})

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  if (formData.get('website')) {
    return { status: 'success', message: 'Recebemos seu contato. Nossa equipe vai responder em breve.' }
  }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) {
    return {
      status: 'error',
      message: 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.',
    }
  }

  const raw = Object.fromEntries(
    ['nome', 'cargo', 'municipio', 'email', 'telefone', 'alunos', 'mensagem', 'consentimento'].map(
      (k) => [k, formData.get(k) ?? undefined],
    ),
  )
  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0])
      errors[key] ??= issue.message
    }
    return { status: 'error', message: 'Confira os campos destacados.', errors }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY não configurada')
    return {
      status: 'error',
      message: `Não foi possível enviar agora. Escreva para ${CONTACT_EMAIL}.`,
    }
  }

  const d = parsed.data
  const text = [
    `Nome: ${d.nome}`,
    `Cargo: ${d.cargo}`,
    `Município/UF: ${d.municipio}`,
    `E-mail: ${d.email}`,
    `Telefone: ${d.telefone || '—'}`,
    `Alunos na rede (aprox.): ${d.alunos || '—'}`,
    '',
    'Mensagem:',
    d.mensagem,
  ].join('\n')

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'SpeakFlow Escolas <onboarding@resend.dev>',
      to: [CONTACT_EMAIL],
      replyTo: d.email,
      subject: `Demonstração SpeakFlow Escolas — ${d.municipio}`,
      text,
    })
    if (error) throw new Error(error.message)
  } catch (err) {
    console.error('[contact] falha ao enviar', err)
    return {
      status: 'error',
      message: `Não foi possível enviar agora. Escreva para ${CONTACT_EMAIL}.`,
    }
  }

  return { status: 'success', message: 'Recebemos seu contato. Nossa equipe vai responder em breve.' }
}
