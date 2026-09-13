import Link from "next/link";

import { getDictionary, type Locale, localePath } from "@/lib/i18n";

import { LanguageSwitch } from "./language-switch";
import { SessionMenu } from "./session-menu";
import { SiteNav } from "./site-nav";

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <div className="dn-gov-strip">
        <span>{dict.govStrip.government}</span>
        <span>{dict.govStrip.tagline}</span>
      </div>
      <header className="dn-product-header">
        <div className="dn-header-inner">
          <Link className="dn-brand" href={localePath(locale)}>
            <span className="dn-brand-mark" aria-hidden="true">
              GOV
            </span>
            <span className="dn-brand-copy">
              <strong>{dict.brand}</strong>
              <small>{dict.govStrip.tagline}</small>
            </span>
          </Link>
          <SiteNav
            items={[
              { href: localePath(locale), label: dict.nav.home, exact: true },
              { href: localePath(locale, "/project"), label: dict.nav.project },
              { href: localePath(locale, "/issues"), label: dict.nav.issues },
              { href: localePath(locale, "/members"), label: dict.nav.members },
              { href: localePath(locale, "/about"), label: dict.nav.about },
            ]}
          />
          <div className="dn-header-actions">
            <LanguageSwitch locale={locale} />
            <SessionMenu
              signInLabel={dict.session.signIn}
              signOutLabel={dict.session.signOut}
              statusLabels={dict.profile.statusShort}
            />
          </div>
        </div>
      </header>
    </>
  );
}
