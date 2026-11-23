import { cn } from '@/lib/utils'

/** Dashed box marking where a real photo will go. */
export default function Placeholder({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={cn(
        'flex items-center justify-center border border-dashed border-dash bg-fill p-6 text-center',
        className,
      )}
    >
      <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-label">
        {label}
      </span>
    </div>
  )
}
