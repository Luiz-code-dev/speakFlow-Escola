import { CalendarCheck, GraduationCap, HeartHandshake, House, Sparkles } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const WEEK = [
  {
    day: 'Segunda',
    title: 'A trilha da semana chega',
    text: 'Atividades escolhidas a partir do diagnóstico, começando pelo que o aluno ainda não domina.',
    icon: CalendarCheck,
  },
  {
    day: 'Terça',
    title: 'Pratica no seu ritmo',
    text: 'Em casa, no celular, tablet ou computador: fala, escreve ou resolve, sem medo de errar.',
    icon: House,
  },
  {
    day: 'Quarta',
    title: 'Retorno na hora',
    text: 'A IA mostra o que ele acertou e como melhorar. Ele tenta de novo e vê a própria evolução.',
    icon: Sparkles,
  },
  {
    day: 'Quinta',
    title: 'A família acompanha',
    text: 'O responsável vê o que foi feito e incentiva, mesmo sem dominar o conteúdo.',
    icon: HeartHandshake,
  },
  {
    day: 'Sexta',
    title: 'O professor retoma em sala',
    text: 'Sabe quem avançou e quem precisa de ajuda, e a trilha da próxima semana se ajusta.',
    icon: GraduationCap,
  },
]

export function StudentWeek() {
  return (
    <section id="semana-do-aluno" aria-labelledby="week-title" className="py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <div className="flex flex-col gap-4">
          <SectionHeading id="week-title" eyebrow="Uma semana de reforço" title="Como é a semana do aluno no reforço." />
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
            Um pouco de prática por dia, no ponto certo, com retorno imediato. Sem depender de sala extra,
            horário ou transporte.
          </p>
        </div>
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          <span
            className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 bg-gradient-to-r from-brand via-pink to-brand lg:block"
            aria-hidden="true"
          />
          {WEEK.map((item, i) => (
            <Reveal
              as="li"
              key={item.day}
              delay={i * 0.12}
              className={`relative flex flex-col gap-4 ${i === WEEK.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <span className="relative mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand text-primary-foreground shadow-lg shadow-brand/30">
                <item.icon className="size-6" aria-hidden="true" />
              </span>
              <div className="flex flex-1 flex-col gap-2 rounded-3xl border border-border bg-card p-6 text-center">
                <p className="text-xs font-semibold tracking-wide text-pink-strong uppercase">{item.day}</p>
                <h3 className="text-lg font-bold text-balance text-foreground">{item.title}</h3>
                <p className="leading-relaxed text-pretty text-muted-foreground">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
