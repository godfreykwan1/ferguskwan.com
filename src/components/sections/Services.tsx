import { AnimatedFeatureCard } from '@/components/ui/animated-feature-card'

const SERVICES = [
  {
    number: '001',
    color:  'orange' as const,
    tag:    'Piano Lessons',
    title:  'One-on-one lessons from beginner foundations to advanced repertoire and competition preparation.',
    image:  'https://images.unsplash.com/photo-1576487236230-eaa4afe9b453?w=400&q=80&auto=format&fit=crop',
  },
  {
    number: '002',
    color:  'blue' as const,
    tag:    'Performances',
    title:  'Recitals, concerto appearances, and special events spanning Baroque to contemporary music.',
    image:  'https://images.unsplash.com/photo-1687398000550-409442905c12?w=400&q=80&auto=format&fit=crop',
  },
  {
    number: '003',
    color:  'purple' as const,
    tag:    'Compositions',
    title:  'Original works, orchestration, and bespoke commissions — premiered at UBC and ChamberFest.',
    image:  'https://images.unsplash.com/photo-1482627750753-afdba16659ef?w=400&q=80&auto=format&fit=crop',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-[clamp(4rem,8vw,8rem)]">
      <div className="mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)]">

        <header className="mb-[clamp(2.5rem,5vw,4rem)]">
          <p className="font-body text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-secondary mb-4">
            Services
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.15] text-primary">
            What I Offer
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start justify-items-center">
          {SERVICES.map(s => (
            <AnimatedFeatureCard
              key={s.number}
              index={s.number}
              color={s.color}
              tag={s.tag}
              title={s.title}
              imageSrc={s.image}
              className="w-full"
            />
          ))}
        </div>

      </div>
    </section>
  )
}
