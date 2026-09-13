import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, localePath } from "@/lib/i18n";
import { NotFoundError } from "@/server/errors";
import { getProjectOverview } from "@/server/projects/service";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  let project = null;
  try {
    project = await getProjectOverview();
  } catch (error) {
    if (!(error instanceof NotFoundError)) {
      throw error;
    }
  }

  return (
    <div className="dn-container">
      <section className="dn-page-body">
        <p className="dn-lede">{dict.home.eyebrow}</p>
        <h1 style={{ fontSize: "2.5rem", marginTop: "0.25rem" }}>{dict.home.title}</h1>
        <p className="dn-lede" style={{ fontSize: "1.05rem" }}>
          {dict.home.lede}
        </p>
        <div className="d-flex flex-wrap gap-2 mt-3">
          <Link className="btn btn-primary" href={localePath(locale, "/issues")}>
            {dict.home.browseIssues}
          </Link>
          <Link className="btn" href={localePath(locale, "/project")}>
            {dict.home.viewProject}
          </Link>
        </div>
      </section>

      {project !== null ? (
        <section aria-label={dict.home.stats.openIssues}>
          <div className="dn-flow-summary mt-4">
            <div>
              <strong>{project.openIssueCount}</strong>
              <span>{dict.home.stats.openIssues}</span>
            </div>
            <div>
              <strong>{project.memberCount}</strong>
              <span>{dict.home.stats.members}</span>
            </div>
            <div>
              <strong style={{ fontSize: "1rem", paddingTop: "0.45rem" }}>
                <a href={project.htmlUrl} target="_blank" rel="noreferrer">
                  {project.fullName}
                </a>
              </strong>
              <span>{dict.home.stats.repo}</span>
            </div>
            <div>
              <strong style={{ fontSize: "0.95rem", paddingTop: "0.5rem" }}>
                {project.lastSyncedAt !== null
                  ? new Date(project.lastSyncedAt).toLocaleString(
                      locale === "ne" ? "ne-NP" : "en-GB",
                    )
                  : dict.home.stats.never}
              </strong>
              <span>{dict.home.stats.lastSync}</span>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mt-6" style={{ marginBottom: "3rem" }}>
        <h2>{dict.home.how.title}</h2>
        <div className="dn-journey mt-3">
          <Link className="dn-journey-step" href={localePath(locale, "/issues")}>
            <span className="Counter">1</span>
            <strong>{dict.home.how.step1Title}</strong>
            <span>{dict.home.how.step1Body}</span>
          </Link>
          <a
            className="dn-journey-step"
            href={project?.htmlUrl ?? "https://github.com/voidash/gov-portal"}
            target="_blank"
            rel="noreferrer"
          >
            <span className="Counter">2</span>
            <strong>{dict.home.how.step2Title}</strong>
            <span>{dict.home.how.step2Body}</span>
          </a>
          <Link className="dn-journey-step" href={localePath(locale, "/members")}>
            <span className="Counter">3</span>
            <strong>{dict.home.how.step3Title}</strong>
            <span>{dict.home.how.step3Body}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
