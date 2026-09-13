"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LOCALES, type Locale } from "@/lib/i18n";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const rest = pathname.split("/").filter(Boolean).slice(1).join("/");

  return (
    <span className="dn-lang-switch">
      {LOCALES.map((entry, index) => (
        <span key={entry}>
          {index > 0 ? " | " : null}
          <Link
            href={`/${entry}${rest.length > 0 ? `/${rest}` : ""}`}
            aria-current={entry === locale ? "true" : undefined}
          >
            {entry === "en" ? "EN" : "ने"}
          </Link>
        </span>
      ))}
    </span>
  );
}
