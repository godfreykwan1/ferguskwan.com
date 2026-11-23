import type { Metadata } from 'next'
import Eyebrow from '@/components/ui/Eyebrow'
import MediaLibrary from '@/components/media/MediaLibrary'
import { BASE_OPEN_GRAPH, BASE_TWITTER, SITE_URL } from '@/content/site'

const TITLE = 'Media'
const DESCRIPTION = 'Watch and listen to performances by Vancouver-based pianist Fergus Kwan: solo, concerto and chamber music.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/media' },
  openGraph: {
    ...BASE_OPEN_GRAPH,
    url: `${SITE_URL}/media`,
    title: `${TITLE} | Fergus Kwan`,
    description: DESCRIPTION,
  },
  twitter: {
    ...BASE_TWITTER,
    title: `${TITLE} | Fergus Kwan`,
    description: DESCRIPTION,
  },
}

export default function MediaPage() {
  return (
    <main className="bg-ink">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <Eyebrow className="mb-4">Media</Eyebrow>
        <h1 className="mb-12 font-display text-[48px] font-normal leading-[1] text-heading md:text-[80px]">
          Watch &amp; listen
        </h1>
        <MediaLibrary />
      </div>
    </main>
  )
}
