import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FAQ } from '@/lib/site-data'
import { SectionHeading } from './primitives'

export function Faq() {
  return (
    <section id="perguntas" aria-labelledby="faq-title" className="bg-card py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading id="faq-title" eyebrow="Perguntas frequentes" title="O que as redes costumam perguntar." />
        <Accordion className="rounded-3xl border border-border bg-background px-6">
          {FAQ.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-border">
              <AccordionTrigger className="py-5 text-lg font-semibold text-foreground hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
