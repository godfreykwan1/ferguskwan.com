/*
  Upcoming performances. Replace the placeholder rows with real events.
*/

export interface PerformanceEvent {
  date: string
  title: string
  venue: string
  city: string
  works: string
}

export const events: PerformanceEvent[] = [
  { date: '[DATE]', title: '[Programme title]', venue: '[Venue]', city: '[City]', works: '[Works on programme]' },
  { date: '[DATE]', title: '[Programme title]', venue: '[Venue]', city: '[City]', works: '[Works on programme]' },
]
