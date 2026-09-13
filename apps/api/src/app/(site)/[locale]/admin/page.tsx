import { notFound } from "next/navigation";
import { isAdminGithubId } from "@/config";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getActor } from "@/server/actor";

import { SignInPanel } from "../sign-in-panel";
import { AdminQueue } from "./admin-queue";

export const dynamic = "force-dynamic";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);
  const actor = await getActor();

  if (actor === null) {
    return (
      <div className="dn-container dn-page-body" style={{ maxWidth: "40rem" }}>
        <h1>{dict.admin.title}</h1>
        <p className="dn-lede">{dict.admin.signInBody}</p>
        <SignInPanel label={dict.session.signIn} title={dict.admin.signInTitle} locale={locale} />
      </div>
    );
  }

  if (!isAdminGithubId(actor.githubId)) {
    return (
      <div className="dn-container dn-page-body" style={{ maxWidth: "40rem" }}>
        <h1>{dict.admin.notAuthorizedTitle}</h1>
        <p className="dn-lede">{dict.admin.notAuthorizedBody}</p>
      </div>
    );
  }

  return (
    <div className="dn-container dn-page-body">
      <h1>{dict.admin.title}</h1>
      <p className="dn-lede">{dict.admin.lede}</p>
      <div className="mt-3">
        <AdminQueue dict={dict} />
      </div>
    </div>
  );
}
