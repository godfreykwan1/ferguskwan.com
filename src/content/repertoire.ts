/*
  Repertoire shown on the home page, grouped by category.
  Placeholder list: the real repertoire is to come from Fergus.
*/

export interface RepertoireItem {
  composer: string
  work: string
}

export interface RepertoireGroup {
  category: string
  items: RepertoireItem[]
}

export const repertoire: RepertoireGroup[] = [
  {
    category: 'Solo',
    items: [
      { composer: '[Composer]', work: '[Work]' },
      { composer: '[Composer]', work: '[Work]' },
      { composer: '[Composer]', work: '[Work]' },
    ],
  },
  {
    category: 'Concerto',
    items: [
      { composer: '[Composer]', work: '[Work]' },
      { composer: '[Composer]', work: '[Work]' },
    ],
  },
  {
    category: 'Chamber',
    items: [
      { composer: '[Composer]', work: '[Work]' },
      { composer: '[Composer]', work: '[Work]' },
    ],
  },
]
