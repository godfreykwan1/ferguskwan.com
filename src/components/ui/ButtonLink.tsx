import Link from 'next/link'
import { cn } from '@/lib/utils'

const BASE =
  'inline-flex min-h-12 items-center justify-center px-7 py-3 text-center font-body text-[14px] font-medium uppercase tracking-[0.08em] transition-colors'

const VARIANTS = {
  primary:   'bg-accent text-ink hover:bg-accent-hover',
  secondary: 'border border-heading text-heading hover:border-accent hover:text-accent',
} as const

export default function ButtonLink({
  href,
  variant = 'primary',
  external = false,
  className,
  children,
}: {
  href: string
  variant?: keyof typeof VARIANTS
  external?: boolean
  className?: string
  children: React.ReactNode
}) {
  const classes = cn(BASE, VARIANTS[variant], className)

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
