import { CREDENTIALS } from '@/content/site'

export default function CredentialStrip() {
  return (
    <section aria-labelledby="credentials-label" className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 md:px-10">
        <p
          id="credentials-label"
          className="mb-6 font-body text-[13px] font-medium uppercase tracking-[0.24em] text-label"
        >
          Performed with &amp; recognized by
        </p>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {CREDENTIALS.map(c => (
            <li
              key={c}
              className="border-l border-line pl-4 font-display text-[20px] leading-[1.3] text-heading"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
