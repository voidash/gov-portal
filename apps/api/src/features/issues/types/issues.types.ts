import type { Issue, IssueLabelFacet } from "@gov-portal/api-client";
import type { Dictionary, Locale } from "@/lib/i18n";

/** Represents a single URL-navigation intent from the issues filter/search bar. */
export interface IssueFilter {
  q?: string;
  label?: string;
  page?: number;
}

export interface IssuesSearchFormProps {
  q?: string;
  label?: string;
  labels: IssueLabelFacet[];
  onNavigate: (next: IssueFilter) => void;
  dict: Dictionary;
}

export interface IssuesLabelPillsProps {
  q?: string;
  label?: string;
  labels: IssueLabelFacet[];
  locale: Locale;
  dict: Dictionary;
}

export interface IssuesListProps {
  issues: Issue[];
  isLoading: boolean;
  error?: Error;
  locale: Locale;
  dict: Dictionary;
}

export interface IssuesPaginationProps {
  page: number;
  totalPages: number;
  onNavigate: (next: IssueFilter) => void;
  dict: Dictionary;
}

export interface IssuesHeaderProps {
  total: number;
  starterCount: number;
  dict: Dictionary;
}
