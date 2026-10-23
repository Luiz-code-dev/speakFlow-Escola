import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = {
  title: 'Aviso de Privacidade',
  description: 'Como o SpeakFlow Escolas trata dados pessoais de alunos, responsáveis, servidores e visitantes, conforme a LGPD.',
  alternates: { canonical: '/privacidade' },
}

export default function PrivacidadePage() {
  return <LegalPage file="privacidade.md" />
}
