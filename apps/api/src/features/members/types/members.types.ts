import type { PublicMemberDto } from "@gov-portal/shared";
import type { Actor } from "@/hooks";
import type { Dictionary, Locale } from "@/lib/i18n";

export type SortMode = "featured" | "skills";
export type ViewMode = "grid" | "table";
export type MemberTab = "overview" | "contributions";

export interface MemberContribution {
  id: string;
  author: string;
  action: string;
  status: "MERGED" | "OPENED" | "CLOSED";
  date: string;
}

export interface MemberDirectoryProps {
  members: PublicMemberDto[];
  visible: PublicMemberDto[];
  query: string;
  setQuery: (q: string) => void;
  skill: string;
  setSkill: (s: string) => void;
  clear: () => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  effectiveView: ViewMode;
  sortMode: SortMode;
  setSortMode: (s: SortMode) => void;
  locale: Locale;
  dict: Dictionary;
}

export interface MemberProfileHeroProps {
  profile: PublicMemberDto;
  isOwner: boolean;
  actor: Actor | null;
  copied: boolean;
  onShare: () => void;
  locale: Locale;
  dict: Dictionary;
}

export interface MemberTabsProps {
  activeTab: MemberTab;
  onChangeTab: (tab: MemberTab) => void;
}

export interface MemberOverviewTabProps {
  bio: string | null;
  displayName: string;
  contributions: MemberContribution[];
}

export interface MemberSidebarProps {
  skills: string[];
  affiliation: string | null;
  location: string | null;
  links: string[];
}
