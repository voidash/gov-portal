import { PageHeader } from "@/components/modules/common";
import type { IssuesHeaderProps } from "../types/issues.types";

export function IssuesHeader({ total, starterCount, dict }: IssuesHeaderProps) {
  return (
    <PageHeader
      aside={
        <dl className="m-0 flex flex-none gap-5 whitespace-nowrap" aria-label={dict.issues.title}>
          <div className="flex flex-col-reverse">
            <dt className="text-sm text-muted-foreground">{dict.issues.openLabel}</dt>
            <dd className="m-0 font-heading text-lg font-semibold">{total}</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-sm text-muted-foreground">{dict.issues.firstIssueLabel}</dt>
            <dd className="m-0 font-heading text-lg font-semibold">{starterCount}</dd>
          </div>
        </dl>
      }
      kicker={dict.issues.kicker}
      lede={dict.issues.lede}
      title={dict.issues.title}
      titleId="issues-heading"
    />
  );
}
