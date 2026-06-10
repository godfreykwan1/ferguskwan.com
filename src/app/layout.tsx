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
        // Actual dimensions: 263×260. Replace with a 1200×630 image for best
        // social-share previews (current file is too small for large-card format).
        width: 263,
        height: 260,
        alt: 'Fergus Kwan — Concert Pianist & Composer',
      },
    ],
  },
  twitter: {
    // summary requires ≥144×144; summary_large_image requires ≥300×157.
    // Current image is 263×260 so summary is the correct card type.
    card: 'summary',
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
