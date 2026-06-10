import Nav         from '@/components/sections/Nav'
import HeroElegant from '@/components/sections/HeroElegant'
import About        from '@/components/sections/About'
import Services     from '@/components/sections/Services'
import Listen       from '@/components/sections/Listen'
import Contact      from '@/components/sections/Contact'
import Footer       from '@/components/sections/Footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Fergus Kwan',
  jobTitle: 'Concert Pianist & Composer',
  description: 'Concert pianist and composer based in Vancouver, BC. Offering piano lessons, live performances, and original compositions.',
  url: 'https://ferguskwan.com',
  image: 'https://ferguskwan.com/images/fergus.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vancouver',
    addressRegion: 'BC',
    addressCountry: 'CA',
  },
  knowsAbout: ['Classical Piano', 'Music Composition', 'Piano Pedagogy', 'Baroque Music', 'Contemporary Classical Music'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Piano Lessons',
          description: 'One-on-one piano lessons from beginner foundations to concert preparation. In-person in Vancouver or online.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Performances',
          description: 'Solo recitals, concerto appearances, and special events spanning Baroque to contemporary repertoire.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Compositions',
          description: 'Original works and bespoke commissions for solo piano, chamber ensembles, and orchestra.',
        },
      },
    ],
  },
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
