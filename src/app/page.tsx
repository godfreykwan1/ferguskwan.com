import Nav         from '@/components/sections/Nav'
import HeroElegant from '@/components/sections/HeroElegant'
import About        from '@/components/sections/About'
import Services     from '@/components/sections/Services'
import Listen       from '@/components/sections/Listen'
import Contact      from '@/components/sections/Contact'
import Footer       from '@/components/sections/Footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://ferguskwan.com/#person',
      name: 'Fergus Kwan',
      jobTitle: 'Concert Pianist & Composer',
      description:
        'Concert pianist and composer based in Vancouver, BC. Offering piano lessons, live performances, and original compositions.',
      url: 'https://ferguskwan.com',
      image: 'https://ferguskwan.com/images/fergus.jpg',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Vancouver',
        addressRegion: 'BC',
        addressCountry: 'CA',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of British Columbia',
      },
      sameAs: ['https://www.youtube.com/@ferguskwan'],
      knowsAbout: [
        'Classical Piano',
        'Music Composition',
        'Piano Pedagogy',
        'Baroque Music',
        'Contemporary Classical Music',
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://ferguskwan.com/#piano-lessons',
      name: 'Piano Lessons',
      serviceType: 'Music Instruction',
      description:
        'One-on-one piano lessons from beginner foundations to concert preparation. In-person in Vancouver or online.',
      provider: { '@id': 'https://ferguskwan.com/#person' },
      areaServed: {
        '@type': 'City',
        name: 'Vancouver',
        containedInPlace: { '@type': 'Country', name: 'Canada' },
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Nav />
        <HeroElegant variant="b5" />
        <About />
        <Services />
        <Listen />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
