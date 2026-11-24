import Eyebrow from '@/components/ui/Eyebrow'
import { repertoire } from '@/content/repertoire'

export default function Repertoire() {
  return (
    <section id="repertoire" className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <Eyebrow className="mb-4">Repertoire</Eyebrow>
        <h2 className="mb-14 font-display text-[40px] font-normal leading-[1.05] text-heading md:text-[56px]">
          From Baroque to contemporary
        </h2>

        <div className="grid grid-cols-1 border-t border-line md:grid-cols-3 md:border-l md:border-t-0">
          {repertoire.map(group => (
            <div
              key={group.category}
              className="border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:py-2"
            >
              <h3 className="font-body text-[13px] font-medium uppercase tracking-[0.24em] text-accent">
                {group.category}
              </h3>
              <ul className="mt-6 space-y-6">
                {group.items.map((item, i) => (
                  <li key={`${item.composer}-${item.work}-${i}`}>
                    <p className="font-display text-[22px] leading-[1.2] text-heading">{item.composer}</p>
                    <p className="mt-1 font-body text-[15px] leading-[1.6] text-body">{item.work}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
