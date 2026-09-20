import { ArrowLink } from "@/components/modules/common";
import { IssueRow } from "@/components/ui/issue-row";
import { localePath } from "@/lib/i18n";
import type { ProjectIssuesSectionProps } from "../types/project.types";

export function ProjectIssuesSection({ recentIssues, locale, dict }: ProjectIssuesSectionProps) {
  return (
    <section aria-labelledby="github-issues-heading">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="mb-2 block text-sm font-semibold text-primary">
            {dict.project.issuesKicker}
          </p>
          <h2 id="github-issues-heading" className="m-0">
            {dict.project.issuesTitle}
          </h2>
        </div>
        <ArrowLink href={localePath(locale, "/issues")}>{dict.project.allIssues} →</ArrowLink>
      </div>
      {recentIssues.length === 0 ? (
        <div
          className="grid justify-items-start gap-2 rounded-xl border border-dashed border-border bg-card px-6 py-8"
          role="status"
        >
          <strong className="m-0 font-heading text-lg leading-tight font-semibold">
            {dict.project.noIssues}
          </strong>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {recentIssues.map((issue) => (
            <IssueRow key={issue.number} issue={issue} locale={locale} />
          ))}
        </div>
      )}
    </section>
  );
}
