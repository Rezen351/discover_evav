// Dictionary loader for i18n (id / en). Adapted from the official Next.js
// internationalization guide (getDictionary / hasLocale pattern).
// NOTE: `import 'server-only'` is intentionally omitted because the `server-only`
// package is not installed in this project and adding dependencies requires
// explicit approval (AGENTS.md §7.2 / Dependencies). This loader is only ever
// imported by Server Components, so the content never reaches the client bundle.

const dictionaries = {
  id: () => import("./locales/id/index"),
  en: () => import("./locales/en/index"),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
