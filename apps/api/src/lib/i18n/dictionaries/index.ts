import type { Dictionary, Locale } from "../types";
import { en } from "./en";
import { ne } from "./ne";

export const dictionaries: Record<Locale, Dictionary> = { en, ne };

export { en, ne };
