import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales } from '@/lib/i18n';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/api')) return;

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  // Basit tercih: tarayıcı diline göre, yoksa tr
  const header = req.headers.get('accept-language') || '';
  const preferred = locales.find((l) => header.toLowerCase().startsWith(l)) ?? 'tr';

  return NextResponse.redirect(new URL(`/${preferred}${pathname}`, req.url));
}

export const config = { matcher: ['/((?!_next).*)'] };
