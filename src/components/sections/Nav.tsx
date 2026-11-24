'use client'

import Link from 'next/link'
import { useState } from 'react'
import { NAV_LINKS } from '@/content/site'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 md:px-10">

        <Link
          href="/"
          onClick={close}
          className="inline-flex min-h-11 items-center font-display text-[22px] font-medium text-heading transition-colors hover:text-accent"
        >
          Fergus Kwan
        </Link>

        {/* Desktop nav (1280px and up) */}
        <nav className="hidden xl:block" aria-label="Main navigation">
          <ul className="flex items-center gap-1 xl:gap-3">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center px-2 font-body text-[13px] font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-heading"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle (under 1280px) */}
        <button
          type="button"
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 xl:hidden"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block h-px w-6 bg-heading transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-heading transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-heading transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-line bg-ink px-4 py-4 sm:px-6 xl:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map(link => (
              <li key={link.href} className="border-b border-line last:border-b-0">
                <Link
                  href={link.href}
                  onClick={close}
                  className="flex min-h-12 items-center font-body text-[14px] font-medium uppercase tracking-[0.12em] text-body transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
