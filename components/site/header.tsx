'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { FAMILY_LOGIN_URL, NAV_ITEMS } from '@/lib/site-data'
import { Logo } from './logo'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#inicio" aria-label="SpeakFlow Escolas — início" className="rounded-lg">
          <Logo />
        </a>

        <nav aria-label="Seções da página" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.slice(1).map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-2 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-brand-soft hover:text-brand-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={FAMILY_LOGIN_URL}
            className="hidden h-10 shrink-0 items-center rounded-xl px-3 text-sm font-semibold whitespace-nowrap text-brand-ink transition-colors hover:bg-brand-soft sm:inline-flex"
          >
            Sou responsável
          </a>
          <a
            href="#contato"
            className="hidden h-10 shrink-0 items-center rounded-xl whitespace-nowrap bg-brand px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-hover sm:inline-flex"
          >
            Agendar demonstração
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card text-foreground xl:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card p-6">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Logo />
              <nav aria-label="Seções da página (menu móvel)" className="mt-4">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-brand-soft hover:text-brand-ink"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href="#contato"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex h-12 items-center justify-center rounded-xl bg-brand px-4 font-semibold text-primary-foreground hover:bg-brand-hover"
              >
                Agendar demonstração
              </a>
              <a
                href={FAMILY_LOGIN_URL}
                className="mt-2 inline-flex h-12 items-center justify-center rounded-xl border border-brand/30 px-4 font-semibold text-brand-ink hover:bg-brand-soft"
              >
                Sou responsável
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
