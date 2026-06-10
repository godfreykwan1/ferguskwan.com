'use client'

import { useEffect, useRef, useState } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const CONFIRM_HEADING_ID = 'contact-confirm-heading'

const INPUT_BASE =
  'contact-input font-body text-[1rem] font-light text-primary bg-ivory border rounded-sm px-4 py-3 w-full focus:outline-none focus:border-accent disabled:opacity-60 disabled:cursor-not-allowed'

export default function Contact() {
  const [status,        setStatus]        = useState<Status>('idle')
  const [errorMsg,      setErrorMsg]      = useState('')
  const [successEmail,  setSuccessEmail]  = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [resetKey,      setResetKey]      = useState(0)
  const turnstileRef = useRef<TurnstileInstance>(null)
  const confirmRef   = useRef<HTMLDivElement>(null)

  // Move focus to the confirmation panel once it renders
  useEffect(() => {
    if (status === 'sent') confirmRef.current?.focus()
  }, [status])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!turnstileToken) {
      setErrorMsg('Please wait for the bot check to complete.')
      setStatus('error')
      return
    }

    // Snapshot FormData before disabling inputs (disabled fields are excluded from FormData)
    const fd    = new FormData(e.currentTarget)
    const email = fd.get('email') as string
    setSuccessEmail(email)
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:           fd.get('name'),
          email,
          lessonType:     fd.get('lesson-type'),
          message:        fd.get('message'),
          turnstileToken,
        }),
      })

      if (res.ok) {
        setStatus('sent')
        return
      }

      const data = await res.json().catch(() => ({})) as { code?: string }
      const msg  = data.code === 'TURNSTILE_FAILED'
        ? 'Verification failed — please complete the bot check again.'
        : 'Something went wrong — please try again.'
      setErrorMsg(msg)
      setStatus('error')
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    } catch {
      setErrorMsg('Could not reach the server — please check your connection and try again.')
      setStatus('error')
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    }
  }

  function handleReset() {
    setStatus('idle')
    setSuccessEmail('')
    setErrorMsg('')
    setTurnstileToken(null)
    setResetKey(k => k + 1)
    turnstileRef.current?.reset()
  }

  const sending = status === 'sending'

  return (
    <>
      <style>{`
        .contact-input::placeholder { color: #A8A29E; opacity: 1; }
      `}</style>
      <section id="contact" className="bg-surface py-[clamp(4rem,8vw,8rem)]">
        <div className="mx-auto max-w-[1200px] px-[clamp(1.5rem,5vw,4rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(3rem,7vw,6rem)] items-start">

            {/* Left — contact info */}
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

            {/* Right — success panel or form */}
            {status === 'sent' ? (
              <div
                ref={confirmRef}
                tabIndex={-1}
                role="status"
                aria-labelledby={CONFIRM_HEADING_ID}
                className="flex flex-col items-center text-center py-16 gap-6 focus:outline-none"
              >
                {/* Checkmark circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ border: '2px solid var(--color-accent)' }}
                  aria-hidden="true"
                >
                  <svg width="26" height="19" viewBox="0 0 26 19" fill="none" aria-hidden="true">
                    <path
                      d="M2 9.5L9.5 17L24 2"
                      stroke="var(--color-accent)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="flex flex-col gap-3">
                  <h3
                    id={CONFIRM_HEADING_ID}
                    className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-normal text-primary"
                  >
                    Message sent
                  </h3>
                  <p
                    className="font-body text-[1rem] font-light leading-[1.8]"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    I&apos;ll get back to you at{' '}
                    <span className="text-primary font-normal">{successEmail}</span>{' '}
                    soon.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-2 font-body text-[0.8125rem] font-medium tracking-[0.1em] uppercase text-accent hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                key={resetKey}
                className="flex flex-col gap-5"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Name + Email row */}
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { id: 'name',  label: 'Name',  type: 'text',  placeholder: 'Your full name', autoComplete: 'name' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', autoComplete: 'email' },
                  ].map(f => (
                    <div key={f.id} className="flex flex-col gap-2">
                      <label
                        htmlFor={f.id}
                        className="font-body text-[0.6875rem] font-medium tracking-[0.1em] uppercase"
                        style={{ color: 'var(--color-secondary)' }}
                      >
                        {f.label}
                      </label>
                      <input
                        id={f.id} name={f.id} type={f.type}
                        placeholder={f.placeholder} autoComplete={f.autoComplete} required
                        disabled={sending}
                        className={INPUT_BASE}
                        style={{ borderColor: '#C4BFB8' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Lesson type */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="lesson-type"
                    className="font-body text-[0.6875rem] font-medium tracking-[0.1em] uppercase"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    Lesson Type
                  </label>
                  <select
                    id="lesson-type" name="lesson-type"
                    disabled={sending}
                    className="font-body text-[1rem] font-light text-primary bg-ivory border border-primary/20 rounded-sm px-4 py-3 w-full focus:outline-none focus:border-accent appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="font-body text-[0.6875rem] font-medium tracking-[0.1em] uppercase"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message" name="message" required
                    placeholder="Tell me a little about your background and what you are looking for…"
                    disabled={sending}
                    className={`${INPUT_BASE} resize-y min-h-[130px]`}
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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending || !turnstileToken}
                  className="self-start inline-flex items-center gap-2.5 font-body text-[0.8125rem] font-medium tracking-[0.1em] uppercase px-10 py-[0.9375rem] bg-primary text-ivory border border-primary rounded-sm hover:bg-accent hover:border-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 disabled:opacity-65 disabled:cursor-not-allowed"
                >
                  {sending && (
                    <span
                      aria-hidden="true"
                      className="inline-block w-3.5 h-3.5 rounded-full border-2 animate-spin flex-shrink-0"
                      style={{ borderColor: 'rgba(253,250,246,0.3)', borderTopColor: '#FDFAF6' }}
                    />
                  )}
                  {sending ? 'Sending…' : 'Send Enquiry'}
                </button>

                {/* Error message */}
                {status === 'error' && (
                  <p
                    role="alert"
                    className="font-body text-[0.875rem] leading-[1.6] px-4 py-3 rounded-sm"
                    style={{
                      color:      '#7C2D12',
                      background: 'rgba(124,45,18,0.07)',
                      border:     '1px solid rgba(124,45,18,0.2)',
                    }}
                  >
                    {errorMsg}
                  </p>
                )}
              </form>
            )}

          </div>
        </div>
      </section>
    </>
  )
}
