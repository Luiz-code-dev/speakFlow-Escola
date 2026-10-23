import { Check, ShieldCheck, X } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const HAS = ['Atividades do seu professor', 'Retorno imediato', 'Sua evolução', 'Acesso sem e-mail']
const HAS_NOT = [
  'Rede social',
  'Chat',
  'Anúncios',
  'Compras',
  'Perfil público',
  'Notificações para prender a atenção',
]
const SEALS = [
  'LGPD',
  'ECA Digital (Lei 15.211/2025)',
  'Lei 15.100/2025',
  'Política Nacional de Educação Digital (Lei 14.533/2023)',
]

export function Security() {
  return (
    <section id="seguranca" aria-labelledby="security-title" className="relative overflow-hidden bg-night py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            tone="dark"
            id="security-title"
            eyebrow="Segurança e proteção de dados"
            title="Um ambiente feito só para aprender."
          />
          <div className="relative flex size-36 shrink-0 items-center justify-center self-center" aria-hidden="true">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-brand/40" />
            <span className="absolute inset-4 animate-ping-slow rounded-full bg-pink/30 [animation-delay:1s]" />
            <span className="relative flex size-28 items-center justify-center rounded-full bg-brand shadow-[0_0_60px_rgba(109,40,217,0.8)]">
              <ShieldCheck className="size-14 text-night-foreground" />
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="flex flex-col gap-5 rounded-3xl border border-night-foreground/15 bg-night-foreground/[0.06] p-7">
            <h3 className="text-xl font-bold text-night-foreground">O aluno tem</h3>
            <ul className="flex flex-col gap-3">
              {HAS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-night-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5 rounded-3xl border border-night-foreground/15 bg-night-foreground/[0.06] p-7">
            <h3 className="text-xl font-bold text-night-foreground">O aluno não tem</h3>
            <ul className="flex flex-col gap-3">
              {HAS_NOT.map((item) => (
                <li key={item} className="flex items-center gap-3 text-night-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-pink">
                    <X className="size-3.5" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ul className="flex flex-wrap gap-3" aria-label="Legislação observada">
          {SEALS.map((seal) => (
            <li
              key={seal}
              className="rounded-full border border-night-foreground/25 px-4 py-2 text-sm font-semibold text-night-foreground"
            >
              {seal}
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="max-w-3xl text-2xl leading-snug font-bold text-balance text-night-foreground">
            A inteligência artificial nunca recebe o nome ou a matrícula do aluno. A Secretaria é a
            dona dos dados.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
