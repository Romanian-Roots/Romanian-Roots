
import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    await sgMail.send({
      to: process.env.EMAIL_USER!,
      from: 'capsulaculturala@gmail.com', // your verified sender
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('SendGrid error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
