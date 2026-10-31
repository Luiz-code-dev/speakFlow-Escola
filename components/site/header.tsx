'use client'

import { useState } from 'react'
import { ChevronDown, LogIn, Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { LOGIN_LINKS, NAV_ITEMS } from '@/lib/site-data'
import { Logo } from './logo'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#inicio" aria-label="SpeakFlow Escolas — início" className="shrink-0 rounded-lg">
          <Logo />
        </a>

        <nav aria-label="Seções da página" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-brand-soft hover:text-brand-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-soft aria-expanded:bg-brand-soft md:inline-flex">
              Entrar
              <ChevronDown className="size-4" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-72 rounded-2xl p-2">
              {LOGIN_LINKS.map((link) => (
                <DropdownMenuItem
                  key={link.label}
                  render={<a href={link.href} />}
                  className="flex flex-col items-start gap-0.5 rounded-xl px-3 py-2.5"
                >
                  <span className="font-semibold text-foreground">{link.label}</span>
                  <span className="text-xs text-muted-foreground">{link.description}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="#contato"
            className="hidden h-10 items-center rounded-xl bg-brand px-4 text-sm font-semibold whitespace-nowrap text-primary-foreground transition-colors hover:bg-brand-hover sm:inline-flex"
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
            <SheetContent side="right" className="w-80 overflow-y-auto bg-card p-6">
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
              <div className="mt-6 flex flex-col gap-2 border-t border-border pt-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <LogIn className="size-4" aria-hidden="true" />
                  Entrar
                </p>
                <ul className="flex flex-col gap-1">
                  {LOGIN_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex flex-col rounded-lg px-3 py-2.5 hover:bg-brand-soft"
                      >
                        <span className="font-semibold text-foreground">{link.label}</span>
                        <span className="text-sm text-muted-foreground">{link.description}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
