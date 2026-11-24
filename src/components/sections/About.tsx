import Eyebrow from '@/components/ui/Eyebrow'
import { MASTERCLASSES, RECOGNITION, STUDIED_WITH } from '@/content/site'

function NameList({ heading, names }: { heading: string; names: readonly string[] }) {
  return (
    <div>
      <h3 className="mb-4 font-body text-[13px] font-medium uppercase tracking-[0.24em] text-label">
        {heading}
      </h3>
      <ul className="space-y-2">
        {names.map(n => (
          <li key={n} className="font-body text-[16px] leading-[1.6] text-body">{n}</li>
        ))}
      </ul>
    </div>
  )
}

function ComingSoonLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex min-h-11 items-center gap-3 font-body text-[14px] font-medium uppercase tracking-[0.08em] text-muted">
      {children}
      <span className="border border-dash px-2 py-0.5 text-[11px] tracking-[0.16em] text-label">
        Coming soon
      </span>
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[5fr_7fr] md:gap-16">

          <div className="relative aspect-[4/5] w-full overflow-hidden bg-fill">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export: no image optimizer */}
            <img
              src="/images/fergus-portrait.jpg"
              alt="Fergus Kwan at the piano"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          <div>
            <Eyebrow className="mb-4">About</Eyebrow>
            <h2 className="mb-8 font-display text-[40px] font-normal leading-[1.05] text-heading md:text-[56px]">
              A life shaped by music
            </h2>

            <div className="space-y-5 font-body text-[17px] leading-[1.75] text-body">
              <p>
                Fergus Kwan is a Vancouver-based pianist. A graduate of the University of British
                Columbia with a Bachelor of Music in Piano Performance and Composition, he is
                currently pursuing a Master&apos;s degree with Dr. David Fung.
              </p>
              <p>
                He has given recitals for the Vancouver Chopin Society, Vancouver Westcoast Music
                Society and Mastery School of Music, and has appeared in the Five Piano Fantasy concert
                at the Chan Centre, at VSO Day of Music and the Gifted Artists Concerto Gala. He has
                performed with the Chilliwack Symphony Orchestra and in countries across Europe and
                North America.
              </p>
              <p>
                As a composer, his works include &ldquo;after hours&rdquo;, &ldquo;fleeting dreams,
                fleeting memories&rdquo; and &ldquo;To Them&rdquo;, performed at the UBC Premiere
                Concert and ChamberFest. He has worked with Professor Rena Sharon to bring new works
                for voice and piano to students at UBC, and orchestrated and performed Alexina
                Louie&apos;s <em>Memories in an Ancient Garden</em> with the Chilliwack Symphony
                Orchestra.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-2">
              <NameList heading="Studied with" names={STUDIED_WITH} />
              <NameList heading="Masterclasses" names={MASTERCLASSES} />
            </div>

            <div className="mt-10 border-t border-line pt-10">
              <NameList heading="Recognition" names={RECOGNITION} />
            </div>

            <div className="mt-10 flex flex-col gap-2 sm:flex-row sm:gap-8">
              <ComingSoonLink>Full biography</ComingSoonLink>
              <ComingSoonLink>Download press kit (PDF)</ComingSoonLink>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
