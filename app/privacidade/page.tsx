import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = {
  title: 'Aviso de Privacidade',
  alternates: { canonical: '/privacidade' },
}

const CONTENT = `TODO: colar texto aprovado pelo jurídico`

export default function PrivacidadePage() {
  return <LegalPage title="Aviso de Privacidade" content={CONTENT} />
}
