import type { IssueDto } from "@gov-portal/shared";
import Link from "next/link";

import { getDictionary, type Locale, localePath } from "@/lib/i18n";

import { LabelChip } from "./label-chip";

export function IssueRow({ issue, locale }: { issue: IssueDto; locale: Locale }) {
  const dict = getDictionary(locale);
  const updated = new Date(issue.updatedAt).toLocaleDateString(locale === "ne" ? "ne-NP" : "en-GB");

  return (
    <div className="dn-issue-row">
      <span className="dn-state-dot" aria-hidden="true" />
      <div>
        <Link className="dn-issue-title" href={localePath(locale, `/issues/${issue.number}`)}>
          #{issue.number} · {issue.title}
        </Link>
        <div className="dn-issue-meta">
          {dict.issues.openedBy} @{issue.authorLogin} · {dict.issues.updated} {updated}
        </div>
        {issue.labels.length > 0 ? (
          <div className="dn-labels">
            {issue.labels.map((label) => (
              <LabelChip key={label.name} label={label} />
            ))}
          </div>
        ) : null}
      </div>
      <div className="dn-issue-aside">
        {issue.commentsCount} {dict.issues.comments}
      </div>
    </div>
  );
}
