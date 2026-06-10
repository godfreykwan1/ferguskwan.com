const LINKS = ['About', 'Services', 'Listen', 'Contact'] as const

export default function Footer() {
  return (
    <footer className="bg-primary py-9">
      <div className="mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)]">
        <div className="flex items-center justify-between gap-6 flex-wrap">

          <span className="font-display text-[1.125rem] font-normal tracking-[0.02em] text-ivory">
            Fergus Kwan
          </span>

          <ul className="flex gap-8 list-none flex-wrap">
            {LINKS.map(link => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="font-body text-[0.8125rem] font-light text-ivory/55 hover:text-ivory transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <p className="font-body text-[0.75rem] font-light text-ivory/35">
            &copy; 2025 Fergus Kwan. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  )
}
