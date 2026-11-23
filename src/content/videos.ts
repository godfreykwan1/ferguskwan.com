/*
  Single source of truth for every video on the site.
  To publish real metadata, edit the entries below; nothing else needs to change.
*/

export const VIDEO_CATEGORIES = ['Solo', 'Concerto', 'Chamber', 'Own works'] as const

export type VideoCategory = (typeof VIDEO_CATEGORIES)[number]

export interface Video {
  /** YouTube video ID */
  id: string
  /** Piece and composer */
  title: string
  venue: string
  year: string
  category: VideoCategory
}

export const videos: Video[] = [
  { id: 'szvzTpDnTF8', title: '[Piece, Composer]', venue: '[Venue]', year: '[Year]', category: 'Concerto' },
  { id: 'pn0kxP3fUhw', title: '[Piece, Composer]', venue: '[Venue]', year: '[Year]', category: 'Solo' },
  { id: '0Y7VcvDZ6Jg', title: '[Piece, Composer]', venue: '[Venue]', year: '[Year]', category: 'Chamber' },
  { id: 'PnXUB2GiUlU', title: '[Piece, Composer]', venue: '[Venue]', year: '[Year]', category: 'Solo' },
]

/** hqdefault exists for every video; maxresdefault does not. */
export function thumbnailUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}
