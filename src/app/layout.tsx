import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ferguskwan.com'),
  title: {
    default: 'Fergus Kwan — Concert Pianist & Composer',
    template: '%s | Fergus Kwan',
  },
  description:
    'Fergus Kwan is a concert pianist and composer based in Vancouver. Piano lessons, live performances, and original compositions.',
  keywords: ['pianist', 'composer', 'piano lessons', 'Vancouver', 'classical music', 'concert pianist', 'Fergus Kwan'],
  authors: [{ name: 'Fergus Kwan', url: 'https://ferguskwan.com' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://ferguskwan.com',
    siteName: 'Fergus Kwan',
    title: 'Fergus Kwan — Concert Pianist & Composer',
    description: 'Concert pianist and composer based in Vancouver. Piano lessons, live performances, and original compositions.',
    images: [
      {
        url: '/images/fergus.jpg',
        width: 1200,
        height: 630,
        alt: 'Fergus Kwan — Concert Pianist & Composer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fergus Kwan — Concert Pianist & Composer',
    description: 'Concert pianist and composer based in Vancouver. Piano lessons, live performances, and original compositions.',
    images: ['/images/fergus.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(cormorant.variable, inter.variable, "font-sans")}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
