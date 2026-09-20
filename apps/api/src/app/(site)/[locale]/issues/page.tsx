"use client";

import {
  IssuesHeader,
  IssuesLabelPills,
  IssuesList,
  IssuesPagination,
  IssuesSearchForm,
  useIssuesPage,
} from "@/features/issues";

export default function IssuesPage() {
  const {
    q,
    label,
    page,
    issues,
    labels,
    total,
    totalPages,
    starterCount,
    isLoading,
    error,
    navigate,
    locale,
    dict,
  } = useIssuesPage();

  return (
    <section className="py-12" aria-labelledby="issues-heading">
      <div className="container">
        <IssuesHeader total={total} starterCount={starterCount} dict={dict} />

        <IssuesSearchForm q={q} label={label} labels={labels} onNavigate={navigate} dict={dict} />

        <IssuesLabelPills q={q} label={label} labels={labels} locale={locale} dict={dict} />

        <IssuesList
          issues={issues}
          isLoading={isLoading}
          error={error}
          locale={locale}
          dict={dict}
        />

        <IssuesPagination page={page} totalPages={totalPages} onNavigate={navigate} dict={dict} />
      </div>
    </section>
  );
}
