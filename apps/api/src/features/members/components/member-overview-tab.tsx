"use client";

import { CaretRightIcon } from "@phosphor-icons/react";

import type { MemberOverviewTabProps } from "../types/members.types";

export function MemberOverviewTab({ bio, displayName, contributions }: MemberOverviewTabProps) {
  return (
    <div className="space-y-8">
      {/* Bio Prose */}
      <div>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {bio ??
            "I work on payment rails and I am interested in how public systems handle money. Happy to mentor on Django, especially for a first contribution to a government repository."}
        </p>
      </div>

      {/* Contributions Section */}
      <div>
        <h2 className="mb-4 text-lg font-bold tracking-tight text-foreground">Contributions</h2>

        <div className="overflow-hidden rounded-xl border border-border bg-card divide-y divide-border">
          {contributions.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-4 p-4 text-sm transition-colors hover:bg-muted/40"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="font-semibold text-foreground">{item.author || displayName}</span>
                <span className="text-muted-foreground">{item.action}</span>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                {item.status === "MERGED" ? (
                  <span className="rounded-full bg-primary px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                    {item.status}
                  </span>
                ) : item.status === "OPENED" ? (
                  <span className="rounded-full border border-border bg-muted px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.status}
                  </span>
                ) : (
                  <span className="rounded-full bg-destructive/10 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-destructive">
                    {item.status}
                  </span>
                )}

                <span className="text-xs text-muted-foreground">{item.date}</span>

                <CaretRightIcon className="size-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
