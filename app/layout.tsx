import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { MotionProvider } from '@/components/site/motion-provider'
import { SITE_URL } from '@/lib/site-data'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const title = 'SpeakFlow Escolas — Reforço escolar com inteligência artificial'
const description =
  'Reforço escolar em casa com inteligência artificial: o aluno pratica no que ainda não domina, recebe retorno na hora, e a escola sabe quem avançou e quem precisa de ajuda. Em qualquer componente curricular.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: '%s · SpeakFlow Escolas' },
  description,
  applicationName: 'SpeakFlow Escolas',
  authors: [{ name: 'Codevelop Solutions' }],
  keywords: [
    'educação pública',
    'inteligência artificial',
    'secretaria de educação',
    'BNCC',
    'rede municipal',
    'escola particular',
    'rede privada de ensino',
    'SpeakFlow',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'SpeakFlow Escolas',
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F8F7FC',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-lg bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>{children}</MotionProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
