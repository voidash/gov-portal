import Link from "next/link";
import { notFound } from "next/navigation";

import { IssueRow } from "@/components/ui/issue-row";
import { TabNav } from "@/components/ui/tab-nav";
import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { getProjectOverviewOrNull, listProjectIssues } from "@/server/projects/service";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);
  const project = await getProjectOverviewOrNull();

  if (project === null) {
    return (
      <div className="dn-container dn-page-body">
        <div className="dn-state-banner is-attention">{dict.project.noDescription}</div>
      </div>
    );
  }

  const recent = await listProjectIssues({ page: 1, perPage: 8 });

  return (
    <>
      <div className="dn-page-header">
        <div className="dn-container">
          <div className="dn-repo-title">
            <span>{project.fullName.split("/")[0]}</span>
            <span className="dn-repo-title-separator">/</span>
            <a href={project.htmlUrl} target="_blank" rel="noreferrer">
              {project.fullName.split("/")[1] ?? project.fullName}
            </a>
            <span className="Label Label--secondary">Public</span>
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

      <div className="dn-container">
        <div className="dn-project-grid">
          <div>
            <div className="dn-readme">
              <div className="dn-readme-header">{dict.project.about}</div>
              <div className="dn-readme-body">
                <p>{project.description ?? dict.project.noDescription}</p>
                <h2 style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
                  {dict.project.contributeTitle}
                </h2>
                <p>{dict.project.contributeBody}</p>
                <a className="btn" href={project.htmlUrl} target="_blank" rel="noreferrer">
                  {dict.project.visit}
                </a>
              </div>
            </div>

            <h2 style={{ fontSize: "1.1rem", margin: "1.5rem 0 0.75rem" }}>{dict.issues.title}</h2>
            {recent.issues.length === 0 ? (
              <p className="dn-lede">{dict.issues.empty}</p>
            ) : (
              <div className="dn-issue-list">
                {recent.issues.map((issue) => (
                  <IssueRow key={issue.number} issue={issue} locale={locale} />
                ))}
              </div>
            )}
            {recent.total > recent.issues.length ? (
              <p style={{ marginTop: "0.75rem" }}>
                <Link href={localePath(locale, "/issues")}>{dict.home.browseIssues} →</Link>
              </p>
            ) : null}
          </div>

          <aside className="dn-sidebar">
            <div className="dn-sidebar-section">
              <dl>
                <dt>{dict.project.sidebar.repository}</dt>
                <dd>
                  <a href={project.htmlUrl} target="_blank" rel="noreferrer">
                    {project.fullName}
                  </a>
                </dd>
                <dt>{dict.project.sidebar.openIssues}</dt>
                <dd>{project.openIssueCount}</dd>
                <dt>{dict.project.sidebar.members}</dt>
                <dd>{project.memberCount}</dd>
                <dt>{dict.project.sidebar.license}</dt>
                <dd>{project.license ?? "—"}</dd>
                <dt>{dict.project.sidebar.lastSync}</dt>
                <dd>
                  {project.lastSyncedAt !== null
                    ? new Date(project.lastSyncedAt).toLocaleString(
                        locale === "ne" ? "ne-NP" : "en-GB",
                      )
                    : dict.project.sidebar.never}
                </dd>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
