import type { Issue, IssueLabelFacet, IssueList } from "@gov-portal/api-client";
import useSWR from "swr";

import { apiClient } from "@/lib/api-client";

export type IssuesQuery = {
  page: number;
  perPage: number;
  q?: string;
  label?: string;
};

function issuesKey(query: IssuesQuery): string {
  const search = new URLSearchParams({
    page: String(query.page),
    perPage: String(query.perPage),
  });
  const q = query.q?.trim();
  const label = query.label?.trim();
  if (q) {
    search.set("q", q);
  }
  if (label) {
    search.set("label", label);
  }
  return `/v1/project/issues?${search.toString()}`;
}

/** Paginated, filterable issue list for the given query. Pass `enabled: false`
 * to skip fetching — e.g. while the parent project hasn't resolved yet. */
export function useProjectIssues(query: IssuesQuery, enabled = true) {
  const q = query.q?.trim() || undefined;
  const label = query.label?.trim() || undefined;
  const cleanQuery: IssuesQuery = {
    page: query.page,
    perPage: query.perPage,
    ...(q !== undefined ? { q } : {}),
    ...(label !== undefined ? { label } : {}),
  };

  const { data, error, isLoading } = useSWR<IssueList>(enabled ? issuesKey(cleanQuery) : null, () =>
    apiClient.listIssues(cleanQuery),
  );
  return {
    issues: data?.issues ?? [],
    total: data?.total ?? 0,
    isLoading,
    error: error as Error | undefined,
  };
}

/** A single issue by number. */
export function useProjectIssue(number: number | undefined) {
  const fetchIssue = number === undefined ? null : () => apiClient.getIssue(number);
  const { data, error, isLoading } = useSWR<Issue>(
    number !== undefined ? `/v1/project/issues/${number}` : null,
    fetchIssue,
  );
  return {
    issue: data,
    isLoading,
    error: error as Error | undefined,
  };
}

/** Open-issue label facets, used to build the filter chips. */
export function useIssueLabels() {
  const { data, error, isLoading } = useSWR<IssueLabelFacet[]>("/v1/project/issues/labels", () =>
    apiClient.listIssueLabels(),
  );
  return {
    labels: data ?? [],
    isLoading,
    error: error as Error | undefined,
  };
}
