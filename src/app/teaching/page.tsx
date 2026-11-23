import type { Metadata } from 'next'
import Eyebrow from '@/components/ui/Eyebrow'
import ButtonLink from '@/components/ui/ButtonLink'
import StudioCards from '@/components/teaching/StudioCards'
import Levels from '@/components/teaching/Levels'
import HowToStart from '@/components/teaching/HowToStart'
import StudentResults from '@/components/teaching/StudentResults'
import { BASE_OPEN_GRAPH, BASE_TWITTER, SITE_URL, SOUND_OF_MUSIC_URL } from '@/content/site'

const TITLE = 'Piano lessons'
const DESCRIPTION =
  'One-on-one piano lessons with Fergus Kwan for all levels, from first foundations to advanced repertoire, technique and competition preparation. In person in Port Coquitlam or Burnaby, or online.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/teaching' },
  openGraph: {
    ...BASE_OPEN_GRAPH,
    url: `${SITE_URL}/teaching`,
    title: `${TITLE} | Fergus Kwan`,
    description: DESCRIPTION,
  },
  twitter: {
    ...BASE_TWITTER,
    title: `${TITLE} | Fergus Kwan`,
    description: DESCRIPTION,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/teaching#piano-lessons`,
  name: 'Piano Lessons',
  serviceType: 'Music Instruction',
  description:
    'One-on-one piano lessons for all levels, from first foundations to advanced repertoire, technique and competition preparation. In person in Port Coquitlam or Burnaby, or online.',
  url: `${SITE_URL}/teaching`,
  provider: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Fergus Kwan' },
  areaServed: [
    {
      '@type': 'City',
      name: 'Port Coquitlam',
      containedInPlace: { '@type': 'AdministrativeArea', name: 'British Columbia' },
    },
    {
      '@type': 'City',
      name: 'Burnaby',
      containedInPlace: { '@type': 'AdministrativeArea', name: 'British Columbia' },
    },
  ],
}

export default function TeachingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* Hero */}
        <section className="bg-ink">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:px-10 md:py-24">
            <Eyebrow className="mb-4">Teaching</Eyebrow>
            <h1 className="max-w-[900px] font-display text-[48px] font-normal leading-[1] text-heading md:text-[80px]">
              Piano lessons with a performer
            </h1>
            <p className="mt-8 max-w-[640px] font-body text-[18px] leading-[1.7] text-body">
              One-on-one lessons for all levels, from first foundations to advanced repertoire,
              technique and competition preparation.
            </p>
            <div className="mt-10">
              <ButtonLink href="/#contact">Enquire about lessons</ButtonLink>
            </div>
          </div>
        </section>

        <StudioCards />
        <Levels />
        <StudentResults />
        <HowToStart />

        {/* CTA */}
        <section className="border-t border-line bg-ink-2">
          <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:px-10 md:py-28">
            <h2 className="font-display text-[40px] font-normal leading-[1.05] text-heading md:text-[56px]">
              Ready to begin?
            </h2>
            <p className="mt-6 max-w-[640px] font-body text-[17px] leading-[1.75] text-body">
              Private lessons: contact Fergus directly. Lessons at the academy: book through Sound
              of Music Academy.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/#contact">Contact Fergus</ButtonLink>
              <ButtonLink href={SOUND_OF_MUSIC_URL} variant="secondary" external>
                Sound of Music Academy
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
