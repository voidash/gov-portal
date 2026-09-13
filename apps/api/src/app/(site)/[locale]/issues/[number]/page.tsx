import type { IssueDto } from "@gov-portal/shared";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LabelChip } from "@/components/ui/label-chip";
import { Markdown } from "@/components/ui/markdown";
import { TabNav } from "@/components/ui/tab-nav";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { NotFoundError } from "@/server/errors";
import { getProjectIssue } from "@/server/projects/service";

export const dynamic = "force-dynamic";

export default async function IssueDetailPage({
  params,
}: {
  params: Promise<{ locale: string; number: string }>;
}) {
  const { locale, number } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  if (!/^\d+$/.test(number)) {
    notFound();
  }

  let issue: IssueDto;
  try {
    issue = await getProjectIssue(Number(number));
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }

  const updated = new Date(issue.updatedAt).toLocaleString(locale === "ne" ? "ne-NP" : "en-GB");

  return (
    <>
      <div className="dn-page-header">
        <div className="dn-container">
          <div className="dn-repo-title">
            <Link href={localePath(locale, "/issues")}>{dict.issues.title}</Link>
            <span className="dn-repo-title-separator">/</span>
            <strong>#{issue.number}</strong>
          </div>
          <TabNav
            items={[
              { href: localePath(locale, "/project"), label: dict.project.tabs.overview },
              { href: localePath(locale, "/issues"), label: dict.project.tabs.issues },
              { href: localePath(locale, "/about"), label: dict.project.tabs.contribute },
            ]}
          />
        </div>
      </div>

      <div className="dn-container dn-page-body">
        <Link className="dn-lede" href={localePath(locale, "/issues")}>
          ← {dict.issue.back}
        </Link>

        <h1 style={{ fontSize: "1.75rem", marginTop: "1rem" }}>
          {issue.title} <span className="dn-lede">#{issue.number}</span>
        </h1>

        <div className="d-flex flex-wrap flex-items-center gap-2 mt-2 mb-3">
          <span className={`State ${issue.state === "open" ? "State--open" : "State--closed"}`}>
            {issue.state}
          </span>
          {issue.labels.map((label) => (
            <LabelChip key={label.name} label={label} />
          ))}
        </div>

        <p className="dn-lede">
          {dict.issue.openedBy} @{issue.authorLogin} · {dict.issue.updated} {updated}
        </p>

        <div className="dn-readme mt-4">
          <div className="dn-readme-header">
            {dict.issue.openedBy} @{issue.authorLogin}
          </div>
          <div className="dn-readme-body">
            {issue.body !== null && issue.body.trim().length > 0 ? (
              <Markdown>{issue.body}</Markdown>
            ) : (
              <p className="dn-lede">{dict.project.noDescription}</p>
            )}
          </div>
        </div>

        <p className="mt-3">
          <a className="btn" href={issue.htmlUrl} target="_blank" rel="noreferrer">
            {dict.issue.github}
          </a>
        </p>
      </div>
    </>
  );
}
