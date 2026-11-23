import { STUDENT_ACHIEVEMENTS } from '@/content/site'

export default function StudentResults() {
  return (
    <section className="border-t border-line bg-ink-2">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <h2 className="mb-12 font-display text-[40px] font-normal leading-[1.05] text-heading md:text-[56px]">
          Student achievements
        </h2>

        <ul className="border-t border-line">
          {STUDENT_ACHIEVEMENTS.map(a => (
            <li
              key={`${a.competition}-${a.year}-${a.result}`}
              className="grid grid-cols-1 gap-2 border-b border-line py-6 md:grid-cols-[200px_1fr] md:gap-8"
            >
              <p className="font-body text-[13px] font-medium uppercase tracking-[0.24em] text-accent md:pt-3">
                {a.result}
              </p>
              <div>
                {a.url ? (
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex min-h-11 items-center font-display text-[26px] leading-[1.2] text-heading underline-offset-4 hover:underline"
                  >
                    {a.competition}
                  </a>
                ) : (
                  <p className="font-display text-[26px] leading-[1.2] text-heading">{a.competition}</p>
                )}
                <p className="mt-1 font-body text-[15px] leading-[1.6] text-muted">
                  {a.year} · {a.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 font-body text-[15px] leading-[1.6] text-muted">
          Students also prepare for competitions and examinations at every level.
        </p>
      </div>
    </section>
  )
}
