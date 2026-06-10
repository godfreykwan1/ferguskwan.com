const SERVICES = [
  {
    number: '001',
    tag:    'Piano Lessons',
    heading: 'One-on-one tuition from first note to concert stage',
    body:   'Lessons shaped around your level and ambitions — beginner foundations through advanced repertoire, technique, and competition preparation. In-person in Vancouver or online.',
    cta:    'Enquire about lessons',
    image:  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=240&q=80&auto=format&fit=crop',
  },
  {
    number: '002',
    tag:    'Performances',
    heading: 'Recitals and engagements spanning Baroque to the present day',
    body:   'Solo recitals, concerto appearances, and special events. Appearances include the Chan Centre, VSO Day of Music, and stages across Europe and North America. Programmes tailored to your occasion.',
    cta:    'Book a performance',
    image:  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=240&q=80&auto=format&fit=crop',
  },
  {
    number: '003',
    tag:    'Compositions',
    heading: 'Original works and bespoke commissions for any ensemble',
    body:   'From solo piano miniatures to full orchestral scores — original works and commissions premiered at UBC, ChamberFest, and private events. All enquiries welcome.',
    cta:    'Commission a work',
    image:  'https://images.unsplash.com/photo-1482627750753-afdba16659ef?w=240&q=80&auto=format&fit=crop',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-[clamp(4rem,8vw,8rem)]">
      <div className="mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)]">

        <header className="mb-[clamp(3rem,6vw,5.5rem)]">
          <p className="font-body text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-secondary mb-4">
            Services
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.15] text-primary">
            What I Offer
          </h2>
        </header>

        <div>
          {SERVICES.map(s => (
            <div
              key={s.number}
              className="group grid items-start border-t border-[#E5E1DA] py-[clamp(2rem,4vw,3rem)] grid-cols-1 sm:grid-cols-[72px_2px_1fr]"
              style={{ gap: '0 2rem' }}
            >
              {/* Number */}
              <span
                className="hidden sm:block font-display font-light leading-none pt-0.5"
                style={{ fontSize: '2.5rem', color: '#D6D3D1', letterSpacing: '-0.02em' }}
              >
                {s.number}
              </span>

              {/* Amber vertical rule */}
              <div className="hidden sm:block self-stretch bg-accent" style={{ minHeight: '88px' }} />

              {/* Content + thumbnail */}
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <p className="font-body text-[0.5625rem] font-medium tracking-[0.2em] uppercase text-accent mb-2.5">
                    {s.tag}
                  </p>
                  <h3 className="font-display text-[clamp(1.625rem,2.6vw,2.375rem)] font-normal italic leading-[1.2] text-primary mb-3.5">
                    {s.heading}
                  </h3>
                  <p className="font-body text-[0.9375rem] font-light leading-[1.8] text-secondary max-w-[520px]">
                    {s.body}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 mt-5 font-body text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    {s.cta} →
                  </a>
                </div>

                {/* Thumbnail */}
                <div className="hidden md:block w-[112px] h-[112px] overflow-hidden flex-shrink-0 mt-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.tag}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Closing rule */}
          <div className="border-t border-[#E5E1DA]" />
        </div>

      </div>
    </section>
  )
}
