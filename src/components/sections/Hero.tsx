import Eyebrow from '@/components/ui/Eyebrow'
import ButtonLink from '@/components/ui/ButtonLink'

export default function Hero() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-[1200px] px-4 pb-12 pt-16 sm:px-6 md:px-10 md:pb-16 md:pt-24">
        <Eyebrow className="mb-6">Pianist · Vancouver</Eyebrow>

        <h1 className="font-display text-[clamp(64px,10vw,148px)] font-normal leading-[0.92] tracking-[-0.01em] text-heading">
          Fergus Kwan
        </h1>

        <p className="mt-8 max-w-[640px] font-body text-[18px] leading-[1.7] text-body md:text-[20px]">
          Performing repertoire from Baroque to contemporary, in solo recital, concerto and chamber music.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/media">Watch performances</ButtonLink>
          <ButtonLink href="/#contact" variant="secondary">Performance enquiries</ButtonLink>
        </div>
      </div>

      {/*
        Full-width hero image. Source is ~1.94:1 with Fergus small and on the left;
        object-position 25% 80% keeps him, the bench and his feet in frame at every box ratio.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element -- static export: no image optimizer */}
      <img
        src="/images/hero-2000.jpg"
        srcSet="/images/hero-1200.jpg 1200w, /images/hero-2000.jpg 2000w"
        sizes="100vw"
        alt="Fergus Kwan performing on a Steinway concert grand"
        width={2000}
        height={1030}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="block aspect-[4/3] w-full bg-fill object-cover object-[25%_80%] sm:aspect-[16/9] lg:aspect-[21/9]"
      />
    </section>
  )
}
