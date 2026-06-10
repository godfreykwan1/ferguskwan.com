import { Resend } from 'resend';

interface Env {
  /** Static-asset binding — serves ./out at runtime */
  ASSETS: { fetch(request: Request | string, init?: RequestInit): Promise<Response> };
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

async function verifyTurnstile(
  token: string,
  ip: string | null,
  secret: string,
): Promise<boolean> {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  });
  const data = await res.json() as { success: boolean };
  return data.success === true;
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  let body: {
    name?: string;
    email?: string;
    lessonType?: string;
    message?: string;
    turnstileToken?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, lessonType, message, turnstileToken } = body;

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for');

  const valid = await verifyTurnstile(turnstileToken ?? '', ip, env.TURNSTILE_SECRET_KEY);
  if (!valid) {
    return Response.json({ error: 'Bot check failed. Please try again.', code: 'TURNSTILE_FAILED' }, { status: 400 });
  }

  const resend = new Resend(env.RESEND_API_KEY);
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Canonical domain: redirect www → non-www with 301
    if (url.hostname === 'www.ferguskwan.com') {
      return Response.redirect(
        `https://ferguskwan.com${url.pathname}${url.search}`,
        301,
      );
    }

    if (request.method === 'POST' && url.pathname === '/api/contact') {
      return handleContact(request, env);
    }

    // Everything else: serve from the static export in ./out
    return env.ASSETS.fetch(request);
  },
};
