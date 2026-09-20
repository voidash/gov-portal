"use client";

import type { MemberTabsProps } from "../types/members.types";

export function MemberTabs({ activeTab, onChangeTab }: MemberTabsProps) {
  return (
    <div className="border-b border-border bg-background px-4">
      <div className="mx-auto flex max-w-[1200px] gap-8 overflow-x-auto">
        <button
          type="button"
          onClick={() => onChangeTab("overview")}
          className={`py-3.5 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === "overview"
              ? "border-primary text-primary font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => onChangeTab("contributions")}
          className={`py-3.5 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === "contributions"
              ? "border-primary text-primary font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Contributions
        </button>
      </div>
    </div>
  );
}
