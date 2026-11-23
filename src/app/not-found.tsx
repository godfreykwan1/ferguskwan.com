import type { Metadata } from 'next'
import Eyebrow from '@/components/ui/Eyebrow'
import ButtonLink from '@/components/ui/ButtonLink'

export const metadata: Metadata = {
  title: 'Page not found',
  alternates: { canonical: null },
}

export default function NotFound() {
  return (
    <main className="bg-ink">
      <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 md:px-10 md:py-32">
        <Eyebrow className="mb-4">404</Eyebrow>
        <h1 className="font-display text-[48px] font-normal leading-[1] text-heading md:text-[80px]">
          Page not found
        </h1>
        <div className="mt-10">
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </div>
    </main>
  )
}
