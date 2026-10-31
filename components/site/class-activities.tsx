import { BarChart3, Camera, Sparkles, type LucideIcon } from 'lucide-react'
import { CLASS_ACTIVITY_STEPS } from '@/lib/site-data'
import { Reveal } from './primitives'

const ICONS: LucideIcon[] = [Camera, Sparkles, BarChart3]

export function ClassActivities() {
  return (
    <section id="atividades-da-turma" aria-labelledby="activities-title" className="pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-8 rounded-[2rem] border-2 border-dashed border-input bg-card p-6 sm:p-10">
          <div className="flex flex-col gap-3">
            <p className="w-fit rounded-full bg-pink-soft px-3 py-1 text-sm font-semibold text-pink-strong">
              Complemento para o professor
            </p>
            <h2
              id="activities-title"
              className="text-2xl font-extrabold tracking-tight text-balance text-foreground sm:text-3xl"
            >
              Na sala de aula também: a aula de hoje vira atividade em poucos minutos.
            </h2>
          </div>

          <ol className="grid gap-5 md:grid-cols-3">
            {CLASS_ACTIVITY_STEPS.map((step, i) => {
              const Icon = ICONS[i]
              return (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-foreground">{step.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              )
            })}
          </ol>

          <p className="border-t border-border pt-6 text-lg leading-relaxed font-semibold text-pretty text-foreground">
            O reforço cuida de cada aluno. As Atividades da turma ajudam o professor a conferir a aula do dia.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
