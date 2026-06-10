import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Geist } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  title: 'Fergus Kwan — Concert Pianist & Composer',
  description:
    'Fergus Kwan is a concert pianist and composer based in Vancouver. Piano lessons, live performances, and original compositions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(cormorant.variable, inter.variable, "font-sans", geist.variable)}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
