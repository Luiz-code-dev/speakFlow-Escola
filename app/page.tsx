import { Contact } from '@/components/site/contact'
import { Demo } from '@/components/site/demo'
import { Faq } from '@/components/site/faq'
import { SiteFooter } from '@/components/site/footer'
import { SiteHeader } from '@/components/site/header'
import { Hero } from '@/components/site/hero'
import { HomePractice } from '@/components/site/home-practice'
import { HowItWorks } from '@/components/site/how-it-works'
import { Implementation } from '@/components/site/implementation'
import { Need } from '@/components/site/need'
import { Roles } from '@/components/site/roles'
import { Security } from '@/components/site/security'
import { Stories } from '@/components/site/stories'
import { Timeline } from '@/components/site/timeline'
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
        <Need />
        <Timeline />
        <Stories />
        <HowItWorks />
        <Demo />
        <HomePractice />
        <Roles />
        <Security />
        <Implementation />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
