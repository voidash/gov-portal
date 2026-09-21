"use client";

import { useMemo, useState } from "react";

import { useMediaQuery, useMemberFilters, useMembers } from "@/hooks";
import { MEMBER_SKILL_PREVIEW_COUNT } from "@/shared/constants";
import type { SortMode, ViewMode } from "../types/members.types";

/**
 * Owns all stateful logic for the member directory page:
 * filtering, sorting, view mode, and responsive compaction.
 */
export function useMemberDirectory() {
  const { members, isLoading, error } = useMembers();
  const { query, setQuery, skill, setSkill, filtered, clear } = useMemberFilters(members);

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  // Table view requires ~860px to stay readable — phones always get the card grid.
  const isCompact = useMediaQuery("(max-width: 639px)");
  const effectiveView: ViewMode = isCompact ? "grid" : viewMode;

  const [sortMode, setSortMode] = useState<SortMode>("featured");

  const visible = useMemo(() => {
    const rows = [...filtered];
    if (sortMode === "skills") {
      return rows.sort(
        (a, b) => b.skills.length - a.skills.length || a.displayName.localeCompare(b.displayName),
      );
    }
    return rows.sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [filtered, sortMode]);

  return {
    members,
    visible,
    isLoading,
    error,
    // filter
    query,
    setQuery,
    skill,
    setSkill,
    clear,
    // view
    viewMode,
    setViewMode,
    effectiveView,
    // sort
    sortMode,
    setSortMode,
    // derived
    skillPreviewCount: MEMBER_SKILL_PREVIEW_COUNT,
  };
}
