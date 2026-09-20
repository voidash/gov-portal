"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useIssueLabels, useLocale, useProjectIssues } from "@/hooks";
import { localePath } from "@/lib/i18n";
import { ISSUES_PER_PAGE } from "@/shared/constants";
import type { IssueFilter } from "../types/issues.types";

/**
 * Owns all URL-param parsing, derived counts, and navigation for the
 * issues listing page. Nothing here touches the DOM or returns JSX.
 */
export function useIssuesPage() {
  const { locale, dict } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q")?.trim() || undefined;
  const label = searchParams.get("label")?.trim() || undefined;
  const parsedPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const { issues, total, isLoading, error } = useProjectIssues({
    page,
    perPage: ISSUES_PER_PAGE,
    q,
    label,
  });
  const { labels } = useIssueLabels();

  const totalPages = Math.max(1, Math.ceil(total / ISSUES_PER_PAGE));
  const starterCount = labels
    .filter((f) => f.name.toLowerCase().includes("good first"))
    .reduce((sum, f) => sum + f.count, 0);

  function navigate(next: IssueFilter): void {
    const search = new URLSearchParams();
    const nextQ = "q" in next ? next.q : q;
    const nextLabel = "label" in next ? next.label : label;
    const nextPage = next.page ?? 1;

    if (nextQ !== undefined && nextQ.trim().length > 0) {
      search.set("q", nextQ.trim());
    }
    if (nextLabel !== undefined && nextLabel.trim().length > 0) {
      search.set("label", nextLabel.trim());
    }
    if (nextPage > 1) {
      search.set("page", String(nextPage));
    }

    const suffix = search.size > 0 ? `?${search.toString()}` : "";
    router.push(localePath(locale, `/issues${suffix}`));
  }

  return {
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
  };
}
