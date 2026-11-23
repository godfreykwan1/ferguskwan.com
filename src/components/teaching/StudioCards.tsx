import Link from 'next/link'
import { SOUND_OF_MUSIC_URL } from '@/content/site'

const LINK =
  'mt-8 inline-flex min-h-11 items-center self-start font-body text-[14px] font-medium uppercase tracking-[0.08em] text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline'

function Detail({ term, value }: { term: string; value: string }) {
  return (
    <div className="border-t border-line py-3">
      <dt className="font-body text-[13px] font-medium uppercase tracking-[0.16em] text-label">{term}</dt>
      <dd className="mt-1 font-body text-[16px] text-heading">{value}</dd>
    </div>
  )
}

export default function StudioCards() {
  return (
    <section className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <h2 className="mb-12 font-display text-[40px] font-normal leading-[1.05] text-heading md:text-[56px]">
          Two ways to study
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="flex flex-col border border-line bg-ink p-8 md:p-10">
            <p className="font-body text-[13px] font-medium uppercase tracking-[0.24em] text-accent">Private studio</p>
            <h3 className="mt-4 font-display text-[32px] font-normal leading-[1.1] text-heading">Port Coquitlam or online</h3>
            <p className="mt-4 font-body text-[16px] leading-[1.7] text-body">
              Lessons arranged directly with Fergus, at his home studio in Port Coquitlam or online.
            </p>
            <dl className="mt-8 flex-1">
              <Detail term="Location" value="Home studio, Port Coquitlam" />
              <Detail term="Lesson length" value="[30 / 45 / 60 min]" />
              <Detail term="Rate" value="[YOUR RATE]" />
            </dl>
            <Link href="/#contact" className={LINK}>Enquire with Fergus</Link>
          </article>

          <article className="flex flex-col border border-line bg-ink p-8 md:p-10">
            <p className="font-body text-[13px] font-medium uppercase tracking-[0.24em] text-accent">At a music school</p>
            <h3 className="mt-4 font-display text-[32px] font-normal leading-[1.1] text-heading">Sound of Music Academy</h3>
            <p className="mt-4 font-body text-[16px] leading-[1.7] text-body">
              Fergus also teaches at Sound of Music Academy in Burnaby. Scheduling, billing and
              enrolment are handled by the academy.
            </p>
            <dl className="mt-8 flex-1">
              <Detail term="Location" value="Crystal Mall, #1632 - 4500 Kingsway, Burnaby" />
            </dl>
            <a href={SOUND_OF_MUSIC_URL} target="_blank" rel="noopener" className={LINK}>
              Visit soundofmusicacademy.com
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
