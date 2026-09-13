import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getActor } from "@/server/actor";
import { toSelfMemberDto } from "@/server/members/dto";
import { SignInPanel } from "../sign-in-panel";
import { ProfileForm } from "./profile-form";

export const dynamic = "force-dynamic";

export default async function ProfilePagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);
  const actor = await getActor();

  if (actor === null) {
    return (
      <div className="dn-container dn-page-body" style={{ maxWidth: "40rem" }}>
        <h1>{dict.profile.title}</h1>
        <p className="dn-lede">{dict.profile.signInBody}</p>
        <SignInPanel label={dict.session.signIn} title={dict.profile.signInTitle} locale={locale} />
      </div>
    );
  }

  return (
    <div className="dn-container">
      <div className="dn-form-layout">
        <div>
          <h1>{dict.profile.title}</h1>
          <div
            className={`dn-state-banner ${actor.status === "approved" ? "is-success" : "is-attention"}`}
          >
            {dict.profile.status[actor.status]}
          </div>
          <div className="mt-4">
            <ProfileForm member={toSelfMemberDto(actor)} dict={dict} />
          </div>
        </div>
        <aside className="dn-sidebar">
          <div className="dn-sidebar-section">
            <strong>{dict.session.signIn}</strong>
            <p className="dn-field-help" style={{ marginTop: "0.5rem" }}>
              @{actor.githubUsername}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
