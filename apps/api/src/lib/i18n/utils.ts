import { dictionaries } from "./dictionaries";
import type { Dictionary, Locale } from "./types";

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function localePath(locale: Locale, path = ""): string {
  const normalized = path.startsWith("/") || path === "" ? path : `/${path}`;
  return `/${locale}${normalized}`;
}
