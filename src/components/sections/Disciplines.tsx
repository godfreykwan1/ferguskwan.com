import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'

const COLUMNS = [
  {
    id: 'performances',
    numeral: 'I',
    title: 'Performances',
    text: 'Solo recitals, concerto appearances and special events, with programmes tailored to each occasion.',
    link: { label: 'Book a performance', href: '/#contact' },
  },
  {
    id: 'compositions',
    numeral: 'II',
    title: 'Compositions',
    text: 'Original works including “after hours”, “Three Character Pieces” and “To Them”, performed at the UBC Premiere Concert and ChamberFest. Commissions for any ensemble.',
    link: { label: 'Enquire about a commission', href: '/#contact' },
  },
  {
    id: 'teaching',
    numeral: 'III',
    title: 'Teaching',
    text: 'Private lessons in Port Coquitlam or online, and on faculty at Sound of Music Academy in Burnaby. All levels, through to competition preparation.',
    link: { label: 'About lessons', href: '/teaching' },
  },
] as const

export default function Disciplines() {
  return (
    <section id="work" className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <Eyebrow className="mb-4">Work</Eyebrow>
        <h2 className="mb-14 font-display text-[40px] font-normal leading-[1.05] text-heading md:text-[56px]">
          Perform · Compose · Teach
        </h2>

        <div className="grid grid-cols-1 border-t border-line md:grid-cols-3 md:border-l md:border-t-0">
          {COLUMNS.map(col => (
            <article
              key={col.id}
              id={col.id}
              className="flex flex-col border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:py-2"
            >
              <span className="font-display text-[40px] leading-none text-accent" aria-hidden="true">
                {col.numeral}
              </span>
              <h3 className="mt-6 font-display text-[32px] font-normal leading-[1.1] text-heading">
                {col.title}
              </h3>
              <p className="mt-4 flex-1 font-body text-[16px] leading-[1.7] text-body">
                {col.text}
              </p>
              <Link
                href={col.link.href}
                className="mt-6 inline-flex min-h-11 items-center self-start font-body text-[14px] font-medium uppercase tracking-[0.08em] text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
              >
                {col.link.label}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
