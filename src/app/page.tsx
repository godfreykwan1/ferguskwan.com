import Hero            from '@/components/sections/Hero'
import CredentialStrip from '@/components/sections/CredentialStrip'
import FeaturedVideos  from '@/components/sections/FeaturedVideos'
import Repertoire      from '@/components/sections/Repertoire'
import About           from '@/components/sections/About'
import Disciplines     from '@/components/sections/Disciplines'
import Events          from '@/components/sections/Events'
import Contact         from '@/components/sections/Contact'
import { SITE_URL }    from '@/content/site'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Fergus Kwan',
      jobTitle: 'Pianist and Composer',
      description:
        'Vancouver-based pianist, performing repertoire from Baroque to contemporary, in solo recital, concerto and chamber music.',
      url: SITE_URL,
      image: `${SITE_URL}/images/fergus-portrait.jpg`,
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
        <Hero />
        <CredentialStrip />
        <FeaturedVideos />
        <Repertoire />
        <About />
        <Disciplines />
        <Events />
        <Contact />
      </main>
    </>
  )
}
