"use client";

import Link from "next/link";

import { localePath } from "@/lib/i18n";
import type { IssuesLabelPillsProps } from "../types/issues.types";

const QUICK_LINK_CLASS =
  "inline-flex min-h-8 items-center gap-2 rounded-full border border-border px-3 text-sm text-foreground no-underline hover:bg-muted aria-[current=true]:border-primary aria-[current=true]:bg-primary/5 aria-[current=true]:text-primary";

export function IssuesLabelPills({ q, label, labels, locale, dict }: IssuesLabelPillsProps) {
  if (labels.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-muted-foreground">
        {dict.issues.filterBy}
      </span>
      {labels.map((facet) => {
        const isCurrent = label === facet.name;
        const search = new URLSearchParams();
        if (!isCurrent) {
          search.set("label", facet.name);
        }
        if (q !== undefined && q.trim().length > 0) {
          search.set("q", q.trim());
        }
        const suffix = search.size > 0 ? `?${search.toString()}` : "";
        const href = localePath(locale, `/issues${suffix}`);

        return (
          <Link
            key={facet.name}
            href={href}
            aria-current={isCurrent ? "true" : undefined}
            className={QUICK_LINK_CLASS}
          >
            {facet.name}
            <span className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-full border border-border px-2 text-xs leading-tight font-semibold tabular-nums text-muted-foreground">
              {facet.count}
            </span>
          </Link>
        );
      })}
      {label !== undefined || q !== undefined ? (
        <Link href={localePath(locale, "/issues")} className={`${QUICK_LINK_CLASS} border-dashed`}>
          {dict.issues.clear}
        </Link>
      ) : null}
    </div>
  );
}
