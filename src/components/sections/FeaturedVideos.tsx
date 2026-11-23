import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import VideoFacade from '@/components/ui/VideoFacade'
import { videos, type Video } from '@/content/videos'

function Caption({ video, large = false }: { video: Video; large?: boolean }) {
  return (
    <div className="mt-4">
      <p className={`font-display text-heading ${large ? 'text-[28px]' : 'text-[22px]'} leading-[1.2]`}>
        {video.title}
      </p>
      <p className="mt-1 font-body text-[14px] text-muted">
        {video.venue}, {video.year} · {video.category}
      </p>
    </div>
  )
}

export default function FeaturedVideos() {
  const [featured, ...rest] = videos
  const cards = rest.slice(0, 3)

  return (
    <section id="watch" className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:px-10 md:py-28">

        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow className="mb-4">Watch</Eyebrow>
            <h2 className="font-display text-[40px] font-normal leading-[1.05] text-heading md:text-[56px]">
              Selected performances
            </h2>
          </div>
          <Link
            href="/media"
            className="inline-flex min-h-11 items-center self-start font-body text-[14px] font-medium uppercase tracking-[0.08em] text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline md:self-auto"
          >
            All videos
          </Link>
        </div>

        {featured && (
          <div>
            <VideoFacade id={featured.id} title={featured.title} />
            <Caption video={featured} large />
          </div>
        )}

        <ul className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {cards.map(v => (
            <li key={v.id}>
              <VideoFacade id={v.id} title={v.title} />
              <Caption video={v} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
