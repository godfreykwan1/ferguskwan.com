import { Resend } from 'resend';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyTurnstile(token: string, ip: string | null) {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret:   process.env.TURNSTILE_SECRET_KEY,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  const { name, email, lessonType, message, turnstileToken } = await req.json();

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const ip = req.headers.get('cf-connecting-ip') ?? req.headers.get('x-forwarded-for');
  const valid = await verifyTurnstile(turnstileToken ?? '', ip);
  if (!valid) {
    return Response.json({ error: 'Bot check failed. Please try again.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Contact Form <onboarding@resend.dev>',
    to: 'kwan.godfrey@gmail.com',
    replyTo: email,
    subject: `New enquiry from ${name}`,
    text: [
      `Name:        ${name}`,
      `Email:       ${email}`,
      `Lesson type: ${lessonType || 'Not specified'}`,
      '',
      message,
    ].join('\n'),
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
