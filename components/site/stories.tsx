import Image from 'next/image'
import { STORIES } from '@/lib/site-data'
import { Reveal, SectionHeading } from './primitives'

export function Stories() {
  return (
    <section aria-labelledby="stories-title" className="py-20 lg:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6">
        <SectionHeading
          id="stories-title"
          eyebrow="Impacto"
          title="Como o SpeakFlow Escolas contribui para o desenvolvimento intelectual e tecnológico"
        />
        <ul className="grid gap-6 md:grid-cols-2">
          {STORIES.map((story, i) => (
            <Reveal as="li" key={story.title} delay={(i % 2) * 0.1}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                <div className="relative aspect-[16/9] bg-brand-soft">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3 p-7">
                  <span className="w-fit rounded-full bg-pink-soft px-3 py-1 text-xs font-semibold text-pink-strong">
                    Cenário ilustrativo
                  </span>
                  <h3 className="text-xl font-bold text-balance text-foreground">{story.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{story.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
