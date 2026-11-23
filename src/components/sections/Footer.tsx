import Link from 'next/link'
import { NAV_LINKS } from '@/content/site'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">

        <Link
          href="/"
          className="inline-flex min-h-11 items-center font-display text-[22px] font-medium text-heading transition-colors hover:text-accent"
        >
          Fergus Kwan
        </Link>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center font-body text-[13px] uppercase tracking-[0.12em] text-label transition-colors hover:text-heading"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="font-body text-[13px] text-label">
          &copy; 2026 Fergus Kwan. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
