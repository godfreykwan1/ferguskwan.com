import { cn } from '@/lib/utils'

export default function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn('font-body text-[13px] font-medium uppercase tracking-[0.24em] text-accent', className)}>
      {children}
    </p>
  )
}
