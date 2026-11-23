const LEVELS = [
  { title: 'Beginners',             text: 'Reading, posture and healthy technique from the first lesson.' },
  { title: 'Intermediate',          text: 'Building repertoire and technique. [Exam boards taught: TBC]' },
  { title: 'Advanced',              text: 'Advanced repertoire, interpretation and competition preparation.' },
  { title: 'Performance coaching',  text: 'Preparing a recital, audition or competition programme.' },
] as const

export default function Levels() {
  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <h2 className="mb-12 font-display text-[40px] font-normal leading-[1.05] text-heading md:text-[56px]">
          Who lessons are for
        </h2>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEVELS.map(l => (
            <li key={l.title} className="border border-line bg-ink-2 p-8">
              <h3 className="font-display text-[26px] font-normal leading-[1.15] text-heading">{l.title}</h3>
              <p className="mt-4 font-body text-[16px] leading-[1.7] text-body">{l.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
