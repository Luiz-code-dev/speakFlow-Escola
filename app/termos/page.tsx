import type { Metadata } from 'next'
import { LegalPage } from '@/components/site/legal-page'

export const metadata: Metadata = { title: 'Termos de Uso', alternates: { canonical: '/termos' } }

const CONTENT = `TODO: colar texto aprovado pelo jurídico`

export default function TermosPage() {
  return <LegalPage title="Termos de Uso" content={CONTENT} />
}
