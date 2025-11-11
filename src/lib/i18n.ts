export const locales = ['tr', 'en'] as const;
export type Locale = typeof locales[number];
export function assertLocale(maybe: string): Locale {
  return (locales as readonly string[]).includes(maybe) ? (maybe as Locale) : 'tr';
}
