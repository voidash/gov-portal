"use client";

import type { PublicMemberDto } from "@gov-portal/shared";
import { SKILLS } from "@gov-portal/shared";
import { BuildingsIcon, MapPinIcon, RowsIcon, SquaresFourIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { useMemo } from "react";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { MemberDirectoryProps, SortMode } from "../types/members.types";

export function MemberDirectory({
  members,
  visible,
  query,
  setQuery,
  skill,
  setSkill,
  clear,
  viewMode,
  setViewMode,
  effectiveView,
  sortMode,
  setSortMode,
  locale,
  dict,
}: MemberDirectoryProps) {
  const categories = useMemo(() => {
    const present = new Set(members.flatMap((m) => m.skills as string[]));
    return SKILLS.filter((s) => present.has(s));
  }, [members]);

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Header */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-16">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            {dict.members.title}
          </h1>
          <p className="mt-2 text-base text-primary-foreground/90 sm:text-lg">
            People who chose to contribute.
          </p>
        </div>
      </div>

      {/* Skill Category Tabs */}
      <div className="border-b border-border bg-muted/40">
        <div
          role="tablist"
          aria-label={dict.members.skillLabel}
          className="mx-auto flex max-w-[1200px] gap-6 overflow-x-auto px-4 sm:px-8 lg:px-16"
        >
          <button
            type="button"
            role="tab"
            aria-selected={skill === ""}
            onClick={() => setSkill("")}
            className={cn(
              "cursor-pointer whitespace-nowrap border-b-2 py-3.5 text-sm font-medium transition-colors",
              skill === ""
                ? "border-primary font-semibold text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {dict.members.allSkills}
          </button>
          {categories.map((entry) => (
            <button
              key={entry}
              type="button"
              role="tab"
              aria-selected={skill === entry}
              onClick={() => setSkill(entry)}
              className={cn(
                "cursor-pointer whitespace-nowrap border-b-2 py-3.5 text-sm font-medium transition-colors",
                skill === entry
                  ? "border-primary font-semibold text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {dict.members.skillNames[entry]}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-8 lg:px-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full items-center gap-2 sm:max-w-md"
          >
            <Input
              type="search"
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 bg-card"
            />
            <Button type="submit" variant="secondary" className="h-10 px-4">
              {dict.members.search}
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-3 ml-auto">
            <select
              aria-label={dict.members.sortLabel}
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="h-10 rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="featured">{dict.members.sortFeatured}</option>
              <option value="skills">{dict.members.sortSkills}</option>
            </select>

            <div className="hidden rounded-md border border-border bg-card p-1 sm:inline-flex">
              <Button
                size="sm"
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                onClick={() => setViewMode("grid")}
                className="gap-1.5 h-8 px-3 text-xs font-medium"
              >
                <SquaresFourIcon className="size-4" />
                Grid
              </Button>
              <Button
                size="sm"
                variant={viewMode === "table" ? "secondary" : "ghost"}
                onClick={() => setViewMode("table")}
                className="gap-1.5 h-8 px-3 text-xs font-medium"
              >
                <RowsIcon className="size-4" />
                Table
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8">
          {visible.length === 0 ? (
            <div className="grid justify-items-start gap-2 rounded-xl border border-dashed border-border bg-card p-8">
              <strong className="text-lg font-semibold text-foreground">
                {dict.members.emptyTitle}
              </strong>
              <p className="text-sm text-muted-foreground">{dict.members.emptyBody}</p>
              <Button variant="outline" onClick={() => clear()} className="mt-2">
                {dict.members.clear}
              </Button>
            </div>
          ) : effectiveView === "grid" ? (
            <MemberGridView members={visible} locale={locale} dict={dict} />
          ) : (
            <MemberTableView members={visible} locale={locale} dict={dict} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Grid View ─────────────────────────────────────────────────────────── */

function MemberGridView({
  members,
  locale,
  dict,
}: {
  members: PublicMemberDto[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <Card
          key={member.githubId}
          className="flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-xs"
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage
                    src={member.avatarUrl ?? `https://github.com/${member.githubUsername}.png`}
                    alt={member.displayName}
                  />
                  <AvatarFallback>{member.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  <AvatarBadge className="size-4 text-primary fill-primary" />
                </Avatar>
                <div className="min-w-0">
                  <Link
                    href={localePath(locale, `/members/${member.githubUsername}`)}
                    className="block truncate text-base font-bold text-foreground transition-colors hover:text-primary"
                  >
                    {member.displayName}
                  </Link>
                  <p className="truncate text-xs text-muted-foreground">
                    {member.headline ?? `@${member.githubUsername}`}
                  </p>
                </div>
              </div>
            </div>

            {member.affiliation !== null || member.location !== null ? (
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {member.affiliation !== null ? (
                  <span className="flex items-center gap-1">
                    <BuildingsIcon className="size-3.5 shrink-0" />
                    <span>{member.affiliation}</span>
                  </span>
                ) : null}
                {member.affiliation !== null && member.location !== null ? <span>|</span> : null}
                {member.location !== null ? (
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="size-3.5 shrink-0" />
                    <span>{member.location}</span>
                  </span>
                ) : null}
              </div>
            ) : null}

            {member.skills.length > 0 ? (
              <MemberSkillChips skills={member.skills as string[]} />
            ) : null}
          </div>

          <div className="pt-5 mt-4 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              render={<Link href={localePath(locale, `/members/${member.githubUsername}`)} />}
              className="w-full sm:w-auto"
            >
              {dict.members.viewProfile}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ─── Table View ─────────────────────────────────────────────────────────── */

function MemberTableView({
  members,
  locale,
  dict,
}: {
  members: PublicMemberDto[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase font-bold tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3.5">MEMBER</th>
              <th className="px-5 py-3.5">ROLE</th>
              <th className="px-5 py-3.5">ORGANISATION</th>
              <th className="px-5 py-3.5">CITY</th>
              <th className="px-5 py-3.5">SKILLS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((member) => (
              <tr key={member.githubId} className="transition-colors hover:bg-muted/30">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={member.avatarUrl ?? `https://github.com/${member.githubUsername}.png`}
                        alt={member.displayName}
                      />
                      <AvatarFallback>
                        {member.displayName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={localePath(locale, `/members/${member.githubUsername}`)}
                        className="font-bold text-foreground hover:text-primary transition-colors block"
                      >
                        {member.displayName}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        @{member.githubUsername}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{member.headline ?? "—"}</td>
                <td className="px-5 py-4 font-semibold text-foreground">
                  {member.affiliation ?? "—"}
                </td>
                <td className="px-5 py-4 text-muted-foreground">{member.location ?? "—"}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.length > 0
                      ? (member.skills as string[]).map((s) => (
                          <span
                            key={s}
                            className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs text-foreground"
                          >
                            {s}
                          </span>
                        ))
                      : "—"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Skill chips (shared sub-component) ────────────────────────────────── */

function MemberSkillChips({ skills }: { skills: string[] }) {
  if (skills.length === 0) return null;
  const shown = skills.slice(0, 2);
  const hidden = skills.slice(2);
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-1">
      {shown.map((s) => (
        <span
          key={s}
          className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs text-foreground"
        >
          {s}
        </span>
      ))}
      {hidden.length > 0 && (
        <div className="relative group inline-flex">
          <span
            title={hidden.join(", ")}
            className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground cursor-pointer transition-colors hover:bg-accent hover:text-foreground"
          >
            +{hidden.length} more
          </span>
          <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:pointer-events-auto z-50">
            <div className="flex flex-wrap gap-1 rounded-md border border-border bg-popover p-2 text-xs font-normal text-popover-foreground shadow-md whitespace-nowrap max-w-[220px]">
              {hidden.map((s) => (
                <span key={s} className="rounded bg-muted px-1.5 py-0.5 text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
