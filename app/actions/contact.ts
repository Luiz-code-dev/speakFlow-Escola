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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

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
  const rows: [string, string][] = [
    ['Nome', d.nome],
    ['Cargo', d.cargo],
    ['Município/UF', d.municipio],
    ['E-mail', d.email],
    ['Telefone', d.telefone || '—'],
    ['Alunos na rede (aprox.)', d.alunos || '—'],
  ]
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', 'Mensagem:', d.mensagem].join('\n')
  const html = `<div style="font-family:Inter,Arial,sans-serif;color:#1F1A2E;max-width:560px">
<h2 style="color:#4C1D95;margin:0 0 16px">Novo pedido de demonstração</h2>
<table style="border-collapse:collapse;width:100%">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#5B5470;white-space:nowrap">${k}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`,
    )
    .join('')}</table>
<p style="margin:20px 0 6px;color:#5B5470">Mensagem</p>
<p style="margin:0;white-space:pre-wrap;line-height:1.6">${escapeHtml(d.mensagem)}</p>
<p style="margin-top:24px;font-size:12px;color:#5B5470">Enviado pelo formulário de speakflowescola.com.br. Responda este e-mail para falar direto com o contato.</p>
</div>`

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'SpeakFlow Escolas <onboarding@resend.dev>',
      to: [process.env.B2B_NOTIFY_EMAIL || CONTACT_EMAIL],
      replyTo: d.email,
      subject: `Demonstração SpeakFlow Escolas — ${d.municipio.replace(/[\r\n]+/g, ' ')}`,
      text,
      html,
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
