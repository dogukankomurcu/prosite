import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { name, email, message } = await req.json().catch(() => ({}));
  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 });
  }
  return NextResponse.json({ ok: true });
}
