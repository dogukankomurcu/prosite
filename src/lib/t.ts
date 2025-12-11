import tr from '@/messages/tr.json';
import en from '@/messages/en.json';
import type { Locale } from './i18n';

const dict = { tr, en } as const;
export function t(locale: Locale, key: keyof typeof tr & keyof typeof en): string {
  return String(dict[locale][key] ?? key);
}
