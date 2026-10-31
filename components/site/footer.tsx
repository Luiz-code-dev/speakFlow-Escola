import Link from 'next/link'
import { CODEVELOP_URL, CONTACT_EMAIL } from '@/lib/site-data'
import { Logo } from './logo'
import { StoreBadges } from './store-badges'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="leading-relaxed text-muted-foreground">
              Uma solução{' '}
              <a
                href={CODEVELOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand underline-offset-4 hover:underline"
              >
                Codevelop Solutions
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
              .
            </p>
            <StoreBadges />
          </div>
          <address className="flex max-w-md flex-col gap-2 text-sm leading-relaxed text-muted-foreground not-italic">
            <p className="font-semibold text-foreground">CODEVELOP SOLUTIONS LTDA · CNPJ 51.412.510/0001-07</p>
            <p>
              Alameda Salvador, 1057, Edifício Torre América, sala 1802, Caminho das Árvores,
              Salvador/BA, CEP 41820-790
            </p>
            <p>
              Contato e encarregado de dados:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-brand underline-offset-4 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </address>
        </div>
        <div className="flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <nav aria-label="Links institucionais">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <Link href="/termos" className="hover:text-brand-ink hover:underline">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-brand-ink hover:underline">
                  Aviso de Privacidade
                </Link>
              </li>
              <li>
                <a href="https://speakflow.ia.br" className="hover:text-brand-ink hover:underline">
                  speakflow.ia.br
                </a>
              </li>
              <li>
                <a
                  href={CODEVELOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-ink hover:underline"
                >
                  codevelop.com.br
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </nav>
          <p>© 2026 Codevelop Solutions. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
