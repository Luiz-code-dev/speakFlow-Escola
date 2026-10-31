import { ClassActivities } from '@/components/site/class-activities'
import { Contact } from '@/components/site/contact'
import { Demo } from '@/components/site/demo'
import { Families } from '@/components/site/families'
import { Faq } from '@/components/site/faq'
import { SiteFooter } from '@/components/site/footer'
import { SiteHeader } from '@/components/site/header'
import { Hero } from '@/components/site/hero'
import { Problem } from '@/components/site/problem'
import { ReinforcementPath } from '@/components/site/reinforcement-path'
import { Schools } from '@/components/site/schools'
import { Security } from '@/components/site/security'
import { Students } from '@/components/site/students'
import { CONTACT_EMAIL, SITE_URL } from '@/lib/site-data'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Codevelop Solutions',
    legalName: 'CODEVELOP SOLUTIONS LTDA',
    taxID: '51.412.510/0001-07',
    url: SITE_URL,
    email: CONTACT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alameda Salvador, 1057, Edifício Torre América, sala 1802, Caminho das Árvores',
      addressLocality: 'Salvador',
      addressRegion: 'BA',
      postalCode: '41820-790',
      addressCountry: 'BR',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SpeakFlow Escolas',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    inLanguage: 'pt-BR',
    description:
      'Reforço escolar com inteligência artificial: o aluno pratica em casa no que ainda não domina, recebe retorno na hora, e a escola acompanha quem avançou e quem precisa de ajuda.',
    publisher: { '@type': 'Organization', name: 'Codevelop Solutions' },
  },
]

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <Problem />
        <ReinforcementPath />
        <Demo />
        <Students />
        <Families />
        <Schools />
        <ClassActivities />
        <Security />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
