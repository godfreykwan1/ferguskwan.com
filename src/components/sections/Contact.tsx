'use client'

import { useEffect, useRef, useState } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import Eyebrow from '@/components/ui/Eyebrow'
import { CONTACT_EMAIL } from '@/content/site'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const CONFIRM_HEADING_ID = 'contact-confirm-heading'

/*
  The Worker reads this field as `lessonType` and prints it in the email,
  so option values are the human-readable labels.
*/
const ENQUIRY_TYPES = [
  'Performance booking',
  'Composition commission',
  'Private lessons',
  'Other',
] as const

const LABEL = 'font-body text-[13px] font-medium uppercase tracking-[0.16em] text-label'

export default function Contact() {
  const [status,         setStatus]         = useState<Status>('idle')
  const [errorMsg,       setErrorMsg]       = useState('')
  const [successEmail,   setSuccessEmail]   = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [resetKey,       setResetKey]       = useState(0)
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
        ? 'Verification failed. Please complete the bot check again.'
        : 'Something went wrong. Please try again.'
      setErrorMsg(msg)
      setStatus('error')
      turnstileRef.current?.reset()
      setTurnstileToken(null)
    } catch {
      setErrorMsg('Could not reach the server. Please check your connection and try again.')
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
    <section id="contact" className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[5fr_7fr] md:gap-16">

          {/* Left: contact details */}
          <div>
            <Eyebrow className="mb-4">Contact</Eyebrow>
            <h2 className="mb-6 font-display text-[40px] font-normal leading-[1.05] text-heading md:text-[56px]">
              Get in touch
            </h2>
            <p className="mb-10 font-body text-[17px] leading-[1.75] text-body">
              For performance bookings, commissions and lesson enquiries.
            </p>

            <dl className="space-y-6 border-t border-line pt-8">
              <div>
                <dt className={`${LABEL} mb-1`}>Email</dt>
                <dd>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex min-h-11 items-center font-body text-[17px] text-heading underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={`${LABEL} mb-1`}>Based in</dt>
                <dd className="font-body text-[17px] text-heading">Vancouver, BC</dd>
              </div>
            </dl>
          </div>

          {/* Right: success panel or form */}
          {status === 'sent' ? (
            <div
              ref={confirmRef}
              tabIndex={-1}
              role="status"
              aria-labelledby={CONFIRM_HEADING_ID}
              className="flex flex-col items-start gap-6 border border-line bg-ink-2 p-8 focus:outline-none md:p-12"
            >
              <div
                className="flex h-14 w-14 items-center justify-center border border-accent text-accent"
                aria-hidden="true"
              >
                <svg width="24" height="18" viewBox="0 0 26 19" fill="none" aria-hidden="true">
                  <path d="M2 9.5L9.5 17L24 2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex flex-col gap-3">
                <h3
                  id={CONFIRM_HEADING_ID}
                  className="font-display text-[36px] font-normal leading-[1.1] text-heading"
                >
                  Message sent
                </h3>
                <p className="font-body text-[17px] leading-[1.75] text-body">
                  I&apos;ll get back to you at{' '}
                  <span className="text-heading">{successEmail}</span>{' '}
                  soon.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-11 items-center font-body text-[14px] font-medium uppercase tracking-[0.08em] text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              key={resetKey}
              className="flex flex-col gap-6"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { id: 'name',  label: 'Name',  type: 'text',  placeholder: 'Your full name', autoComplete: 'name' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com', autoComplete: 'email' },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label htmlFor={f.id} className={LABEL}>{f.label}</label>
                    <input
                      id={f.id} name={f.id} type={f.type}
                      placeholder={f.placeholder} autoComplete={f.autoComplete} required
                      disabled={sending}
                      className="field"
                    />
                  </div>
                ))}
              </div>

              {/* Enquiry type (sent as lessonType; see worker.ts) */}
              <div className="flex flex-col gap-2">
                <label htmlFor="lesson-type" className={LABEL}>Enquiry type</label>
                <select
                  id="lesson-type" name="lesson-type"
                  defaultValue=""
                  required
                  disabled={sending}
                  className="field"
                >
                  <option value="" disabled>Select an enquiry type</option>
                  {ENQUIRY_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className={LABEL}>Message</label>
                <textarea
                  id="message" name="message" required
                  disabled={sending}
                  className="field"
                />
              </div>

              <div className="turnstile-box">
                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken(null)}
                  options={{ theme: 'dark' }}
                />
              </div>

              <button
                type="submit"
                disabled={sending || !turnstileToken}
                className="inline-flex min-h-12 items-center justify-center gap-3 self-start bg-accent px-8 py-3 font-body text-[14px] font-medium uppercase tracking-[0.08em] text-ink transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending && (
                  <span
                    aria-hidden="true"
                    className="inline-block h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
                  />
                )}
                {sending ? 'Sending…' : 'Send enquiry'}
              </button>

              {status === 'error' && (
                <p
                  role="alert"
                  className="border border-error/40 bg-error/10 px-4 py-3 font-body text-[15px] leading-[1.6] text-error"
                >
                  {errorMsg}
                </p>
              )}
            </form>
          )}

        </div>
      </div>
    </section>
  )
}
