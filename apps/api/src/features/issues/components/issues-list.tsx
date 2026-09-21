"use client";

import Link from "next/link";

import { ErrorPanel, LoadingPanel } from "@/components/modules/common";
import { Button } from "@/components/ui/button";
import { IssueRow } from "@/components/ui/issue-row";
import { localePath } from "@/lib/i18n";
import type { IssuesListProps } from "../types/issues.types";

export function IssuesList({ issues, isLoading, error, locale, dict }: IssuesListProps) {
  if (error !== undefined) {
    return (
      <ErrorPanel
        message={error.message}
        retryLabel={dict.common.retry}
        title={dict.common.errorTitle}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (isLoading) {
    return <LoadingPanel label={dict.common.loading} layout="rows" />;
  }

  if (issues.length === 0) {
    return (
      <div
        className="grid justify-items-start gap-2 rounded-md border border-dashed border-border bg-card px-6 py-8"
        role="status"
      >
        <strong className="m-0 font-heading text-lg leading-tight font-semibold">
          {dict.issues.emptyTitle}
        </strong>
        <p className="m-0 max-w-[62ch]">{dict.issues.emptyBody}</p>
        <Button variant="outline" render={<Link href={localePath(locale, "/issues")} />}>
          {dict.issues.clear}
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      {issues.map((issue) => (
        <IssueRow key={issue.number} issue={issue} locale={locale} />
      ))}
    </div>
  );
}
