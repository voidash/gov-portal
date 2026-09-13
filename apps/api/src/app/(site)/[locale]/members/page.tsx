import { SKILLS } from "@gov-portal/shared";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MemberAvatar } from "@/components/ui/member-avatar";

import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { toPublicMemberDto } from "@/server/members/dto";
import { listDirectoryMembers } from "@/server/members/service";

export const dynamic = "force-dynamic";

type MembersSearchParams = {
  q?: string;
  skill?: string;
};

export default async function MembersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<MembersSearchParams>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);
  const query = await searchParams;

  const q = typeof query.q === "string" ? query.q.trim().toLowerCase() : "";
  const skill =
    typeof query.skill === "string" && (SKILLS as readonly string[]).includes(query.skill)
      ? query.skill
      : undefined;

  const members = (await listDirectoryMembers()).map(toPublicMemberDto);
  const filtered = members.filter((member) => {
    if (skill !== undefined && !(member.skills as string[]).includes(skill)) {
      return false;
    }
    if (q.length === 0) {
      return true;
    }
    return (
      member.displayName.toLowerCase().includes(q) ||
      member.githubUsername.toLowerCase().includes(q) ||
      (member.headline ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="dn-container dn-page-body">
      <h1>{dict.members.title}</h1>
      <p className="dn-lede">{dict.members.lede}</p>

      <form
        className="d-flex flex-wrap gap-2 mt-3 mb-4"
        method="get"
        action={localePath(locale, "/members")}
      >
        <input
          className="form-control"
          type="search"
          name="q"
          defaultValue={query.q ?? ""}
          placeholder={dict.members.search}
          aria-label={dict.members.search}
          style={{ maxWidth: "20rem" }}
        />
        <select
          className="form-select"
          name="skill"
          defaultValue={skill ?? ""}
          aria-label={dict.members.skill}
          style={{ maxWidth: "16rem" }}
        >
          <option value="">{dict.members.allSkills}</option>
          {SKILLS.map((entry) => (
            <option key={entry} value={entry}>
              {entry}
            </option>
          ))}
        </select>
        <button className="btn" type="submit">
          {dict.issues.search}
        </button>
      </form>

      {filtered.length === 0 ? (
        <div className="dn-state-banner">{dict.members.empty}</div>
      ) : (
        <div className="dn-member-grid">
          {filtered.map((member) => (
            <Link
              key={member.githubId}
              className="dn-member-card"
              href={localePath(locale, `/members/${member.githubUsername}`)}
            >
              <MemberAvatar member={member} />
              <div>
                <h3>{member.displayName}</h3>
                <p className="dn-lede" style={{ margin: 0 }}>
                  @{member.githubUsername}
                </p>
                {member.headline !== null ? (
                  <p style={{ margin: "0.25rem 0" }}>{member.headline}</p>
                ) : null}
                {member.skills.length > 0 ? (
                  <ul className="dn-skill-list">
                    {member.skills.map((entry) => (
                      <li key={entry} className="dn-skill-chip">
                        {entry}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
