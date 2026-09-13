import Link from "next/link";
import { notFound } from "next/navigation";

import { IssueRow } from "@/components/ui/issue-row";
import { TabNav } from "@/components/ui/tab-nav";
import { getDictionary, isLocale, type Locale, localePath } from "@/lib/i18n";
import { listIssueLabels, listProjectIssues } from "@/server/projects/service";

export const dynamic = "force-dynamic";

type IssuesSearchParams = {
  q?: string;
  label?: string;
  page?: string;
};

export default async function IssuesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<IssuesSearchParams>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const activeLocale: Locale = locale;
  const dict = getDictionary(activeLocale);
  const query = await searchParams;

  const q = typeof query.q === "string" && query.q.trim().length > 0 ? query.q.trim() : undefined;
  const label =
    typeof query.label === "string" && query.label.trim().length > 0
      ? query.label.trim()
      : undefined;
  const parsedPage = Number.parseInt(query.page ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const perPage = 15;

  const [result, labels] = await Promise.all([
    listProjectIssues({
      page,
      perPage,
      ...(q !== undefined ? { q } : {}),
      ...(label !== undefined ? { label } : {}),
    }),
    listIssueLabels(),
  ]);
  const totalPages = Math.max(1, Math.ceil(result.total / perPage));

  function pageHref(target: number): string {
    const search = new URLSearchParams();
    if (q !== undefined) {
      search.set("q", q);
    }
    if (label !== undefined) {
      search.set("label", label);
    }
    if (target > 1) {
      search.set("page", String(target));
    }
    const suffix = search.size > 0 ? `?${search.toString()}` : "";
    return localePath(activeLocale, `/issues${suffix}`);
  }

  return (
    <>
      <div className="dn-page-header">
        <div className="dn-container">
          <div className="dn-repo-title">
            <span>{dict.nav.project}</span>
            <span className="dn-repo-title-separator">/</span>
            <strong>{dict.issues.title}</strong>
          </div>
          <TabNav
            items={[
              { href: localePath(activeLocale, "/project"), label: dict.project.tabs.overview },
              { href: localePath(activeLocale, "/issues"), label: dict.project.tabs.issues },
              { href: localePath(activeLocale, "/about"), label: dict.project.tabs.contribute },
            ]}
          />
        </div>
      </div>

      <div className="dn-container dn-page-body">
        <p className="dn-lede">{dict.issues.lede}</p>

        <form
          className="d-flex flex-wrap gap-2 mt-3 mb-4"
          method="get"
          action={localePath(activeLocale, "/issues")}
        >
          <input
            className="form-control"
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder={dict.issues.searchPlaceholder}
            aria-label={dict.issues.searchPlaceholder}
            style={{ maxWidth: "20rem" }}
          />
          <select
            className="form-select"
            name="label"
            defaultValue={label ?? ""}
            aria-label={dict.issues.allLabels}
            style={{ maxWidth: "16rem" }}
          >
            <option value="">{dict.issues.allLabels}</option>
            {labels.map((facet) => (
              <option key={facet.name} value={facet.name}>
                {facet.name} ({facet.count})
              </option>
            ))}
          </select>
          <button className="btn" type="submit">
            {dict.issues.search}
          </button>
        </form>

        {result.issues.length === 0 ? (
          <div className="dn-state-banner">{dict.issues.empty}</div>
        ) : (
          <div className="dn-issue-list">
            {result.issues.map((issue) => (
              <IssueRow key={issue.number} issue={issue} locale={locale} />
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <nav
            className="d-flex flex-items-center flex-justify-between mt-4"
            aria-label="Pagination"
          >
            {page > 1 ? (
              <Link className="btn btn-sm" href={pageHref(page - 1)}>
                ←
              </Link>
            ) : (
              <span />
            )}
            <span className="dn-lede">
              {page} / {totalPages}
            </span>
            {page < totalPages ? (
              <Link className="btn btn-sm" href={pageHref(page + 1)}>
                →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        ) : null}
      </div>
    </>
  );
}
