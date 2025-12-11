export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { ContactSchema } from '@/lib/contact-schema';
import nodemailer from 'nodemailer';

const {
  SMTP_HOST,
  SMTP_PORT = '465',
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM = 'no-reply@example.com',
  MAIL_TO = MAIL_FROM,
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_PORT === '465', // 465 SSL, 587 STARTTLS
  auth: { user: SMTP_USER!, pass: SMTP_PASS! },
  logger: true,   // nodemailer log
  debug: true
  // Eğer cPanel self-signed ise, sorun yaşarsan şunu AÇ:
  // tls: { rejectUnauthorized: false },
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation', issues: parsed.error.flatten() }, { status: 422 });
  }

  try {
    // SMTP bağlantısını doğrula
    await transporter.verify();

    const { name, email, message } = parsed.data;
    const info = await transporter.sendMail({
      from: MAIL_FROM,                 // kendi domainindeki gerçek mailbox
      to: MAIL_TO,
      subject: `Yeni iletişim: ${name}`,
      text: `Gönderen: ${name} <${email}>\n\n${message}`,
      replyTo: `${name} <${email}>`,
    });

    console.log('MAIL SENT:', info.messageId, info.response);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('MAIL ERROR:', err);
    return NextResponse.json({ ok: false, error: 'mail_failed' }, { status: 500 });
  }
}
