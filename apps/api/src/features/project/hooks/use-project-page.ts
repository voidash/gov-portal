"use client";

import { useLocale, useProject, useProjectIssues } from "@/hooks";
import { formatDateTime } from "@/lib/format";

/**
 * Aggregates all data fetching and derived values for the project page.
 * Returns everything components need without exposing any render logic.
 */
export function useProjectPage() {
  const { locale, dict } = useLocale();
  const { project, isLoading, error } = useProject();
  const { issues: recentIssues } = useProjectIssues({ page: 1, perPage: 8 }, project !== null);

  const synced =
    project !== null && project.lastSyncedAt !== null
      ? formatDateTime(project.lastSyncedAt, locale)
      : dict.project.never;

  return { locale, dict, project, recentIssues, synced, isLoading, error };
}
