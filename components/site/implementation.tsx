import { BarChart3, Handshake, House, Settings2 } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const STEPS = [
  {
    title: 'Acordo',
    text: 'Apresentação à equipe, definição das escolas e prioridades do reforço, formalização do contrato.',
    icon: Handshake,
  },
  {
    title: 'Implantação',
    text: 'Cadastro por planilha, formação de professores, diagnóstico inicial, apresentação às famílias e entrega dos cartões.',
    icon: Settings2,
  },
  {
    title: 'Reforço em casa',
    text: 'Trilhas semanais, visitas quinzenais, suporte direto.',
    icon: House,
  },
  {
    title: 'Resultados',
    text: 'Novo diagnóstico, relatório da rede, ajustes com a Secretaria.',
    icon: BarChart3,
  },
]

export function Implementation() {
  return (
    <section id="implantacao" aria-labelledby="impl-title" className="py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <SectionHeading id="impl-title" eyebrow="Implantação" title="Do acordo aos resultados, em quatro etapas." />
        <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <span
            className="absolute top-7 right-[12%] left-[12%] hidden h-0.5 bg-gradient-to-r from-brand via-pink to-brand lg:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.15} className="relative flex flex-col gap-4">
              <span className="relative mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand text-primary-foreground shadow-lg shadow-brand/30 lg:mx-0 lg:self-center">
                <step.icon className="size-6" aria-hidden="true" />
              </span>
              <div className="flex flex-1 flex-col gap-2 rounded-3xl border border-border bg-card p-6 text-center">
                <p className="text-xs font-semibold tracking-wide text-pink-strong uppercase">Etapa {i + 1}</p>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p className="max-w-3xl text-lg leading-relaxed text-pretty text-foreground">
            Funciona no celular, tablet ou computador. A implantação pode ser na rede toda ou em
            etapas, por grupo de escolas.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
