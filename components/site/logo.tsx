import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('size-9 shrink-0', className)} aria-hidden="true">
      <path
        d="M8 4h24a6 6 0 0 1 6 6v15a6 6 0 0 1-6 6H18l-7.5 6.2c-.8.6-1.9.1-1.9-.9V31H8a6 6 0 0 1-6-6V10a6 6 0 0 1 6-6Z"
        fill="#6D28D9"
      />
      <rect x="10" y="15" width="3" height="6" rx="1.5" fill="#fff" />
      <rect x="15.5" y="11" width="3" height="14" rx="1.5" fill="#fff" />
      <rect x="21" y="13" width="3" height="10" rx="1.5" fill="#fff" />
      <rect x="26.5" y="16" width="3" height="4" rx="1.5" fill="#fff" />
    </svg>
  )
}

export function Logo({
  className,
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span
        className={cn(
          'text-lg font-extrabold tracking-tight',
          tone === 'dark' ? 'text-night-foreground' : 'text-foreground',
        )}
      >
        SpeakFlow{' '}
        <span className={tone === 'dark' ? 'text-pink-soft' : 'text-pink-strong'}>Escolas</span>
      </span>
    </span>
  )
}
