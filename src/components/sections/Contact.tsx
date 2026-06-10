'use client'

import { useRef, useState } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<TurnstileInstance>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!turnstileToken) {
      setErrorMsg('Please wait for the bot check to complete.')
      setStatus('error')
      return
    }
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:           fd.get('name'),
        email:          fd.get('email'),
        lessonType:     fd.get('lesson-type'),
        message:        fd.get('message'),
        turnstileToken,
      }),
    })
    if (res.ok) {
      setStatus('sent')
    } else {
      const data = await res.json().catch(() => ({}))
      setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
      setStatus('error')
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    }
  }

  return (
    <>
      <style>{`
        .contact-input::placeholder {
          color: #A8A29E;
          opacity: 1;
        }
      `}</style>
      <section id="contact" className="bg-surface py-[clamp(4rem,8vw,8rem)]">
      <div className="mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(3rem,7vw,6rem)] items-start">

          {/* Left */}
          <div>
            <p className="font-body text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-foreground/70 mb-5">
              Contact
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.15] text-primary mb-5">
              Get in Touch
            </h2>
            <p className="font-body text-[1rem] font-light text-foreground/90 leading-[1.8] mb-10">
              Whether you&apos;re interested in lessons, a performance enquiry, or a composition
              commission — Fergus would love to hear from you.
            </p>
            <div className="flex flex-col gap-5">
              {[
                { label: 'Location', value: 'Vancouver, BC' },
                { label: 'Email',    value: 'fergus@ferguskwan.com' },
              ].map(d => (
                <div key={d.label}>
                  <span className="block font-body text-[0.6875rem] font-medium tracking-[0.12em] uppercase text-foreground/70 mb-1">
                    {d.label}
                  </span>
                  <span className="font-body text-[1rem] font-light text-foreground/90">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid grid-cols-2 gap-5">
              {[
                { id: 'name',  label: 'Name',  type: 'text',  placeholder: 'Your full name', autoComplete: 'name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', autoComplete: 'email' },
              ].map(f => (
                <div key={f.id} className="flex flex-col gap-2">
                  <label
                    htmlFor={f.id}
                    className="font-body text-[0.6875rem] font-medium tracking-[0.1em] uppercase text-secondary"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.id} name={f.id} type={f.type}
                    placeholder={f.placeholder} autoComplete={f.autoComplete} required
                    className="contact-input font-body text-[1rem] font-light text-primary bg-ivory border border-primary/20 rounded-sm px-4 py-3 w-full focus:outline-none focus:border-accent"
                    style={{ borderColor: '#C4BFB8' }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="lesson-type"
                className="font-body text-[0.6875rem] font-medium tracking-[0.1em] uppercase text-secondary"
                style={{ color: 'var(--color-secondary)' }}
              >
                Lesson Type
              </label>
              <select
                id="lesson-type" name="lesson-type"
                className="font-body text-[1rem] font-light text-primary bg-ivory border border-primary/20 rounded-sm px-4 py-3 w-full focus:outline-none focus:border-accent appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2344403C' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  paddingRight: '2.5rem',
                }}
              >
                <option value="" disabled>Select a lesson type</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="coaching">Performance Coaching</option>
                <option value="other">Other Enquiry</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-body text-[0.6875rem] font-medium tracking-[0.1em] uppercase text-secondary"
                style={{ color: 'var(--color-secondary)' }}
              >
                Message
              </label>
              <textarea
                id="message" name="message" required
                placeholder="Tell me a little about your background and what you are looking for…"
                className="contact-input font-body text-[1rem] font-light text-primary bg-ivory border border-primary/20 rounded-sm px-4 py-3 w-full focus:outline-none focus:border-accent resize-y min-h-[130px]"
                style={{ borderColor: '#C4BFB8' }}
              />
            </div>

            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken(null)}
              options={{ theme: 'light' }}
            />

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent' || !turnstileToken}
              className="self-start font-body text-[0.8125rem] font-medium tracking-[0.1em] uppercase px-10 py-[0.9375rem] bg-primary text-ivory border border-primary rounded-sm hover:bg-accent hover:border-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 disabled:opacity-65 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message Sent' : 'Send Enquiry'}
            </button>

            {status === 'error' && (
              <p className="font-body text-[0.8125rem] text-red-600">{errorMsg}</p>
            )}
          </form>

        </div>
      </div>
    </section>
    </>
  )
}
