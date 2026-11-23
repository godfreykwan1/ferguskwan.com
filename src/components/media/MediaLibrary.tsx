'use client'

import { useMemo, useRef, useState } from 'react'
import VideoFacade from '@/components/ui/VideoFacade'
import { VIDEO_CATEGORIES, thumbnailUrl, videos, type VideoCategory } from '@/content/videos'

type Filter = 'All' | VideoCategory

const FILTERS: Filter[] = ['All', ...VIDEO_CATEGORIES]

export default function MediaLibrary() {
  const [filter, setFilter]     = useState<Filter>('All')
  const [activeId, setActiveId] = useState(videos[0]?.id)
  const playerRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () => (filter === 'All' ? videos : videos.filter(v => v.category === filter)),
    [filter],
  )

  // The player always shows a video from the current filter
  const active = filtered.find(v => v.id === activeId) ?? filtered[0]

  function selectFilter(f: Filter) {
    setFilter(f)
    const next = f === 'All' ? videos : videos.filter(v => v.category === f)
    setActiveId(next[0]?.id)
  }

  // Grid card click: load the video into the player (facade, no autoplay) and bring it into view
  function selectVideo(id: string) {
    setActiveId(id)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    playerRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div>
      {/* Filters */}
      <div role="group" aria-label="Filter videos by category" className="flex flex-wrap gap-2">
        {FILTERS.map(f => {
          const selected = f === filter
          return (
            <button
              key={f}
              type="button"
              aria-pressed={selected}
              onClick={() => selectFilter(f)}
              className={`inline-flex min-h-11 items-center border px-5 font-body text-[13px] font-medium uppercase tracking-[0.12em] transition-colors ${
                selected
                  ? 'border-accent bg-accent text-ink'
                  : 'border-line text-muted hover:border-dash hover:text-heading'
              }`}
            >
              {f}
            </button>
          )
        })}
      </div>

      {!active ? (
        <p className="mt-12 border border-dashed border-dash bg-fill px-6 py-16 text-center font-body text-[16px] text-muted">
          No videos in this category yet.
        </p>
      ) : (
        <>
          {/* Now showing */}
          <div ref={playerRef} className="mt-12 scroll-mt-[88px]" aria-live="polite">
            <p className="mb-4 font-body text-[13px] font-medium uppercase tracking-[0.24em] text-accent">
              Now showing · {active.category}
            </p>
            <VideoFacade key={active.id} id={active.id} title={active.title} />
            <p className="mt-4 font-display text-[28px] leading-[1.2] text-heading">{active.title}</p>
            <p className="mt-1 font-body text-[14px] text-muted">{active.venue}, {active.year}</p>
          </div>

          {/* Grid */}
          <ul className="mt-16 grid grid-cols-1 gap-8 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(v => {
              const isActive = v.id === active.id
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    onClick={() => selectVideo(v.id)}
                    aria-current={isActive ? 'true' : undefined}
                    aria-label={`Show ${v.title} (${v.category}) in the player`}
                    className="group block w-full text-left"
                  >
                    <span className={`relative block aspect-video w-full overflow-hidden border bg-fill ${isActive ? 'border-accent' : 'border-line'}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- static export: no image optimizer */}
                      <img
                        src={thumbnailUrl(v.id)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                      />
                    </span>
                    <span className="mt-4 block font-display text-[22px] leading-[1.2] text-heading">{v.title}</span>
                    <span className="mt-1 block font-body text-[14px] text-muted">
                      {v.venue}, {v.year} · {v.category}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
