const STEPS = [
  { n: '01', title: 'Send an enquiry',                         text: "Tell Fergus the student's level, goals and preferred times." },
  { n: '02', title: '[Trial lesson or consultation: TBC]',     text: '[Describe the first meeting once the policy is set.]' },
  { n: '03', title: 'Weekly lessons',                          text: 'A regular slot, in person or online.' },
] as const

export default function HowToStart() {
  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <h2 className="mb-12 font-display text-[40px] font-normal leading-[1.05] text-heading md:text-[56px]">
          How to start
        </h2>

        <ol className="grid grid-cols-1 border-t border-line md:grid-cols-3 md:border-l md:border-t-0">
          {STEPS.map(s => (
            <li key={s.n} className="border-b border-line py-10 md:border-b-0 md:border-r md:px-8 md:py-2">
              <span className="font-display text-[40px] leading-none text-accent" aria-hidden="true">{s.n}</span>
              <h3 className="mt-6 font-display text-[28px] font-normal leading-[1.15] text-heading">{s.title}</h3>
              <p className="mt-4 font-body text-[16px] leading-[1.7] text-body">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
