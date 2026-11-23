import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/sections/Nav'
import Footer from '@/components/sections/Footer'
import { BASE_OPEN_GRAPH, BASE_TWITTER, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/content/site'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const DEFAULT_TITLE = 'Fergus Kwan | Pianist'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Fergus Kwan',
  },
  description: SITE_DESCRIPTION,
  keywords: ['pianist', 'Vancouver', 'classical music', 'piano recital', 'concerto', 'chamber music', 'piano lessons', 'composer', 'Fergus Kwan'],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    ...BASE_OPEN_GRAPH,
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    ...BASE_TWITTER,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ink font-body text-body antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
