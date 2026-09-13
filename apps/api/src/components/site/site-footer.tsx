import Link from "next/link";

import { getDictionary, type Locale, localePath } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="dn-footer">
      <div className="dn-container dn-footer-inner">
        <span>{dict.footer.note}</span>
        <span>
          <Link href={localePath(locale, "/about")}>{dict.nav.about}</Link>
          {" · "}
          <a href="https://github.com/voidash/gov-portal" target="_blank" rel="noreferrer">
            {dict.footer.repository}
          </a>
        </span>
      </div>
    </footer>
  );
}
