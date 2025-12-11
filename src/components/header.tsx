'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Globe } from 'lucide-react';
import { useState } from 'react';

const navigationLinks = [
  { href: '/about', tr: 'Hakkında', en: 'About' },
  { href: '/products', tr: 'Ürünler', en: 'Products' },
  { href: '/cases', tr: 'Projeler', en: 'Cases' },
  { href: '/downloads', tr: 'İndir', en: 'Downloads' },
  { href: '/contact', tr: 'İletişim', en: 'Contact' },
];

export default function Header({ lang = 'tr' }: { lang?: string }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = (tr: string, en: string) => lang === 'tr' ? tr : en;
  const isActive = (href: string) => pathname?.includes(href);

  return (
    <header className="md:static sticky top-0 z-50 bg-black text-white border-b border-gray-800">
      <div className="mx-auto max-w-full px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${lang}`} className="text-2xl font-bold tracking-tight">
            ARTSYWALL
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-white border-b-2 border-white pb-1'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t(link.tr, link.en)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 text-sm">
              <Link
                href={`/tr${pathname?.replace(/^\/(tr|en)/, '') || ''}`}
                className={`transition-colors ${
                  lang === 'tr' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                TR
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href={`/en${pathname?.replace(/^\/(tr|en)/, '') || ''}`}
                className={`transition-colors ${
                  lang === 'en' ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-white font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(link.tr, link.en)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
