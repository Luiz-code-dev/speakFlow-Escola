import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from './logo'
import { SiteFooter } from './footer'

export function LegalPage({ title, content }: { title: string; content: string }) {
  return (
    <>
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/" aria-label="SpeakFlow Escolas — página inicial">
            <Logo />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar
          </Link>
        </div>
      </header>
      <main id="conteudo" className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{title}</h1>
        <div className="leading-relaxed whitespace-pre-line text-muted-foreground">{content}</div>
      </main>
      <SiteFooter />
    </>
  )
}
