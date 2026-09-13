import Link from "next/link";
import { notFound } from "next/navigation";

import { MemberAvatar } from "@/components/ui/member-avatar";
import type { Member } from "@/db/schema";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { getActor } from "@/server/actor";
import { NotFoundError } from "@/server/errors";
import { toPublicMemberDto } from "@/server/members/dto";
import { getVisibleMemberByUsername } from "@/server/members/service";

export const dynamic = "force-dynamic";

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ locale: string; username: string }>;
}) {
  const { locale, username } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  const viewer = await getActor();
  let member: Member;
  try {
    member = await getVisibleMemberByUsername(username, viewer);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return (
        <div className="dn-container dn-page-body">
          <div className="dn-state-banner is-attention">
            <strong>{dict.member.notFoundTitle}</strong>
            <p style={{ margin: "0.35rem 0 0" }}>{dict.member.notFoundBody}</p>
          </div>
          <p className="mt-3">
            <Link href={localePath(locale, "/members")}>← {dict.member.back}</Link>
          </p>
        </div>
      );
    }
    throw error;
  }

  const isOwner = viewer !== null && viewer.id === member.id;
  const isPublic = member.status === "approved";
  const profile = toPublicMemberDto(member);

  return (
    <div className="dn-container dn-page-body">
      <Link className="dn-lede" href={localePath(locale, "/members")}>
        ← {dict.member.back}
      </Link>

      {!isPublic && isOwner ? (
        <div className="dn-state-banner is-attention mt-3">
          {dict.profile.status[member.status]}
        </div>
      ) : null}

      <header className="dn-profile-header mt-3">
        <MemberAvatar member={profile} size={96} className="dn-profile-avatar" />
        <div>
          <h1 style={{ margin: 0 }}>{member.displayName}</h1>
          <p className="dn-lede" style={{ margin: "0.25rem 0" }}>
            <a
              href={`https://github.com/${member.githubUsername}`}
              target="_blank"
              rel="noreferrer"
            >
              @{member.githubUsername}
            </a>
          </p>
          {member.headline !== null ? (
            <p style={{ margin: "0.25rem 0" }}>{member.headline}</p>
          ) : null}
        </div>
      </header>

      {member.affiliation !== null || member.location !== null ? (
        <div className="dn-sidebar-section mt-3" style={{ maxWidth: "28rem" }}>
          <dl>
            {member.affiliation !== null ? (
              <>
                <dt>{dict.profile.fields.affiliation}</dt>
                <dd>{member.affiliation}</dd>
              </>
            ) : null}
            {member.location !== null ? (
              <>
                <dt>{dict.profile.fields.location}</dt>
                <dd>{member.location}</dd>
              </>
            ) : null}
          </dl>
        </div>
      ) : null}

      {member.bio !== null ? (
        <section className="mt-4">
          <h2>{dict.member.about}</h2>
          <p style={{ whiteSpace: "pre-line" }}>{member.bio}</p>
        </section>
      ) : null}

      {member.links.length > 0 ? (
        <section className="mt-4">
          <h2>{dict.member.links}</h2>
          <ul>
            {member.links.map((link) => (
              <li key={link}>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {member.skills.length > 0 ? (
        <section className="mt-4">
          <h2>{dict.member.skills}</h2>
          <ul className="dn-skill-list">
            {member.skills.map((skill) => (
              <li key={skill} className="dn-skill-chip">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-4">
        <a
          className="btn btn-sm"
          href={`https://github.com/${member.githubUsername}`}
          target="_blank"
          rel="noreferrer"
        >
          {dict.member.viewOnGithub}
        </a>
      </p>
    </div>
  );
}
