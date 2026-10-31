import { DatabaseZap, EyeOff, ShieldCheck, Users, type LucideIcon } from 'lucide-react'
import { LAWS, SAFETY_ITEMS } from '@/lib/site-data'
import { GradientText, Reveal, SectionHeading, cardClass } from './primitives'

const ICONS: LucideIcon[] = [ShieldCheck, EyeOff, DatabaseZap, Users]

export function Security() {
  return (
    <section id="seguranca" aria-labelledby="security-title" className="bg-card py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <SectionHeading
          id="security-title"
          eyebrow="Segurança e proteção"
          title={
            <>
              Um ambiente feito <GradientText>só para aprender</GradientText>.
            </>
          }
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SAFETY_ITEMS.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal as="li" key={item.title} delay={i * 0.08} className={`${cardClass} flex flex-col gap-3 bg-background p-6`}>
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{item.text}</p>
              </Reveal>
            )
          })}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="font-semibold text-foreground">Legislação observada:</p>
          <ul className="flex flex-wrap gap-2">
            {LAWS.map((law) => (
              <li
                key={law}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-semibold text-brand-ink"
              >
                {law}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
