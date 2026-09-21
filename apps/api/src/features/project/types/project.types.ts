import type { Issue, Project } from "@gov-portal/api-client";
import type { Dictionary, Locale } from "@/lib/i18n";

export interface ProjectHeroCardProps {
  project: Project;
  synced: string;
  locale: Locale;
  dict: Dictionary;
}

export interface ProjectAboutSectionProps {
  project: Project;
  dict: Dictionary;
}

export interface ProjectIssuesSectionProps {
  recentIssues: Issue[];
  locale: Locale;
  dict: Dictionary;
}

export interface ProjectFactsSheetProps {
  project: Project;
  synced: string;
  dict: Dictionary;
}
