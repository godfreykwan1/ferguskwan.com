'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { thumbnailUrl } from '@/content/videos'

/*
  Click-to-play YouTube facade. Renders a static thumbnail and a play button;
  the youtube-nocookie iframe is only created after the visitor clicks.
  Give it a `key` of the video id so switching videos resets it to the facade.
*/
export default function VideoFacade({
  id,
  title,
  className,
}: {
  id: string
  title: string
  className?: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={cn('relative aspect-video w-full overflow-hidden bg-fill', className)}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-offset-[-3px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export: no image optimizer */}
          <img
            src={thumbnailUrl(id)}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-ink/85 transition-colors group-hover:bg-accent"
          >
            <svg width="18" height="20" viewBox="0 0 18 20" className="ml-1 fill-accent group-hover:fill-ink">
              <path d="M0 0L18 10L0 20Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}
