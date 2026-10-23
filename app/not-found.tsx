import Link from 'next/link'
import { Logo } from '@/components/site/logo'

export default function NotFound() {
  return (
    <main id="conteudo" className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <Logo />
      <p className="text-7xl font-extrabold tracking-tight text-brand">404</p>
      <h1 className="text-2xl font-bold text-balance text-foreground">Página não encontrada</h1>
      <Link
        href="/"
        className="inline-flex h-12 items-center rounded-xl bg-brand px-6 font-semibold text-primary-foreground hover:bg-brand-hover"
      >
        Voltar para a página inicial
      </Link>
    </main>
  )
}
