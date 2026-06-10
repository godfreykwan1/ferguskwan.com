'use client'

import { useEffect, useState } from 'react'

const LINKS = ['About', 'Services', 'Listen', 'Contact'] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(28,25,23,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(253,250,246,0.08)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)] h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          className="font-display text-[1.125rem] font-normal tracking-[0.02em] text-ivory transition-opacity hover:opacity-70"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Fergus Kwan
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-[0.75rem] font-medium tracking-[0.12em] uppercase text-ivory/60 hover:text-ivory transition-colors py-3 px-1"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="font-body text-[0.75rem] font-medium tracking-[0.1em] uppercase px-6 py-2.5 border border-ivory/30 text-ivory/80 hover:border-ivory hover:text-ivory transition-colors rounded-sm"
          >
            Book a Lesson
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-3 -mr-3"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-px bg-ivory transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-px bg-ivory transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-ivory transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="md:hidden bg-primary/95 backdrop-blur-md border-t border-ivory/10 px-[clamp(1.5rem,5vw,4rem)] py-6 flex flex-col gap-4"
          aria-label="Mobile navigation"
        >
          {LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-body text-[0.875rem] font-medium tracking-[0.12em] uppercase text-ivory/70 hover:text-ivory transition-colors py-2"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="font-body text-[0.8125rem] font-medium tracking-[0.1em] uppercase px-6 py-3 border border-ivory/30 text-ivory/80 hover:border-ivory hover:text-ivory transition-colors rounded-sm text-center mt-2"
          >
            Book a Lesson
          </a>
        </nav>
      )}
    </header>
  )
}
