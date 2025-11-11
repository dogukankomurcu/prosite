import type { ReactNode } from 'react';
import '../globals.css';
import Link from 'next/link';
import { assertLocale } from '@/lib/i18n';

export default function LangLayout({ children, params }: { children: ReactNode; params: { lang: string } }) {
  const lang = assertLocale(params.lang);
  return (
    <html lang={lang}>
      <body className="min-h-dvh antialiased">
        <header className="border-b">
          <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
            <Link href={`/${lang}`} className="font-semibold">Pro Site</Link>
            <nav className="flex gap-4 text-sm">
              <Link href={`/${lang}/products`}>Ürünler</Link>
              <Link href={`/${lang}/cases`}>Projeler</Link>
              <Link href={`/${lang}/downloads`}>İndir</Link>
              <Link href={`/${lang}/contact`}>İletişim</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
        <footer className="border-t mt-12">
          <div className="mx-auto max-w-6xl p-4 text-sm text-gray-500">
            © {new Date().getFullYear()} Pro Site
          </div>
        </footer>
      </body>
    </html>
  );
}
