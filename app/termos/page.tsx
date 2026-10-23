import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso da plataforma SpeakFlow Escolas para servidores das redes de ensino.',
  alternates: { canonical: '/termos' },
}

export default function TermosPage() {
  return <LegalPage file="termos.md" />
}
