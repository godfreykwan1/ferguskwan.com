import Eyebrow from '@/components/ui/Eyebrow'
import { events } from '@/content/events'

export default function Events() {
  return (
    <section id="events" className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <Eyebrow className="mb-4">Events</Eyebrow>
        <h2 className="mb-12 font-display text-[40px] font-normal leading-[1.05] text-heading md:text-[56px]">
          Upcoming performances
        </h2>

        <ul className="border-t border-line">
          {events.map((e, i) => (
            <li
              key={i}
              className="grid grid-cols-1 gap-2 border-b border-line py-8 md:grid-cols-[200px_1fr] md:gap-8"
            >
              <p className="font-body text-[13px] font-medium uppercase tracking-[0.24em] text-accent md:pt-2">
                {e.date}
              </p>
              <div>
                <p className="font-display text-[28px] leading-[1.2] text-heading">{e.title}</p>
                <p className="mt-2 font-body text-[15px] leading-[1.6] text-muted">
                  {e.venue}, {e.city} · {e.works}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
