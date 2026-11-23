import type { Metadata } from 'next'

export const SITE_URL = 'https://ferguskwan.com'
export const SITE_NAME = 'Fergus Kwan'

export const SITE_DESCRIPTION =
  'Fergus Kwan is a Vancouver-based pianist, performing repertoire from Baroque to contemporary, in solo recital, concerto and chamber music.'

/*
  Next.js merges metadata shallowly: a page that sets openGraph replaces the
  whole root openGraph object. Pages spread these bases so the image survives.
*/
export const BASE_OPEN_GRAPH = {
  type: 'website',
  locale: 'en_CA',
  siteName: SITE_NAME,
  images: [
    {
      url: '/images/og-fergus.jpg',
      // 1200x630, the recommended size for large link previews.
      width: 1200,
      height: 630,
      alt: 'Fergus Kwan, pianist',
    },
  ],
} satisfies Metadata['openGraph']

export const BASE_TWITTER = {
  // summary_large_image needs at least 300x157; og-fergus.jpg is 1200x630.
  card: 'summary_large_image',
  images: ['/images/og-fergus.jpg'],
} satisfies Metadata['twitter']

export const NAV_LINKS = [
  { label: 'About',        href: '/#about' },
  { label: 'Media',        href: '/media' },
  { label: 'Compositions', href: '/#compositions' },
  { label: 'Events',       href: '/#events' },
  { label: 'Teaching',     href: '/teaching' },
  { label: 'Contact',      href: '/#contact' },
] as const

export const CREDENTIALS = [
  'Chan Centre for the Performing Arts',
  'Vancouver Chopin Society',
  'Chilliwack Symphony Orchestra',
  'VSO Day of Music',
  'Canadian Music Competition',
] as const

export const STUDIED_WITH = [
  'Dr. Corey Hamm',
  'Dr. Henri-Paul Sicsic',
  'Prof. Rena Sharon',
  'Dr. Jennifer Butler',
  'Prof. Serra Hwang',
] as const

export const MASTERCLASSES = [
  'Jon Kimura Parker',
  'Henry Kramer',
  'Ilana Vered',
  'Nelson Goerner',
] as const

export const RECOGNITION = [
  'Canadian Music Competition',
  'Vancouver Westcoast Music Society',
  'Pacific Youth International Competition',
  'Architecture of Music Competition',
  'Elevato International Piano Competition',
  'Best Performance of a work by Chopin (Vancouver Chopin Society)',
  "Best Performance of Jordan Nobles' The Architect's Dream (Architecture of Music Competition)",
] as const

/*
  Student results shown on /teaching.
  Festival and category are to be confirmed with Fergus.
  Never include student names.
*/
export const STUDENT_ACHIEVEMENTS = [
  {
    result: 'Second place',
    competition: 'VAYA International Festivals',
    url: 'https://vayafestivals.ca/',
    year: '2026',
    detail: '[Festival (e.g. LangleyLive! or Online International Music Festival) / category]',
  },
] as const

export const CONTACT_EMAIL = 'fergus@ferguskwan.com'

export const SOUND_OF_MUSIC_URL = 'https://soundofmusicacademy.com/'
