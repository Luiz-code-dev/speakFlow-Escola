import { readFile } from 'node:fs/promises'
import path from 'node:path'
import Link from 'next/link'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft } from 'lucide-react'
import { Logo } from './logo'
import { SiteFooter } from './footer'

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-pretty text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 scroll-mt-24 text-pretty border-t border-border pt-8 text-xl font-bold text-foreground sm:text-2xl">
      {children}
    </h2>
  ),
  p: ({ children }) => <p className="leading-relaxed text-muted-foreground">{children}</p>,
  em: ({ children }) => <em className="not-italic text-sm text-muted-foreground">{children}</em>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  ul: ({ children }) => <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-brand">{children}</ul>,
  li: ({ children }) => <li className="leading-relaxed [&>p]:inline">{children}</li>,
  hr: () => <hr className="my-6 border-border" />,
  a: ({ children, href }) => (
    <a href={href} className="font-semibold text-brand underline-offset-4 hover:underline">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="region" aria-label="Tabela" tabIndex={0}>
      <table className="w-full min-w-[36rem] border-collapse overflow-hidden rounded-xl border border-border text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-brand-soft text-brand-ink">{children}</thead>,
  th: ({ children }) => <th className="border-b border-border px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => (
    <td className="border-b border-border bg-card px-4 py-3 align-top leading-relaxed text-muted-foreground">{children}</td>
  ),
}

export async function LegalPage({ file }: { file: string }) {
  const markdown = await readFile(path.join(process.cwd(), 'content', file), 'utf8')

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
      <main id="conteudo" className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-12 sm:px-6 sm:py-16">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {markdown}
        </ReactMarkdown>
      </main>
      <SiteFooter />
    </>
  )
}
