"use client";

import {
  BriefcaseIcon,
  CheckCircleIcon,
  GithubLogoIcon,
  MapPinIcon,
  PencilIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { MemberAvatar } from "@/components/ui/member-avatar";
import { localePath } from "@/lib/i18n";
import type { MemberProfileHeroProps } from "../types/members.types";

export function MemberProfileHero({
  profile,
  isOwner,
  actor,
  copied,
  onShare,
  locale,
  dict,
}: MemberProfileHeroProps) {
  return (
    <div className="border-b border-border bg-muted/30 px-4 py-8 dark:bg-card">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6">
        <div className="flex min-w-0 flex-wrap items-center gap-5">
          <div className="relative">
            <div className="overflow-hidden rounded-full border border-border shadow-xs">
              <MemberAvatar member={profile} size={72} />
            </div>
            <CheckCircleIcon className="absolute -bottom-1 -right-1 size-5 rounded-full bg-primary text-primary-foreground fill-primary" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {profile.displayName}
              </h1>
              {isOwner && actor !== null ? (
                <Chip tone={actor.member.status === "approved" ? "success" : "attention"}>
                  {dict.profile.statusShort[actor.member.status]}
                </Chip>
              ) : null}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
              {profile.headline !== null || profile.affiliation !== null ? (
                <span className="flex items-center gap-1.5">
                  <BriefcaseIcon className="size-4 shrink-0 text-muted-foreground" />
                  <span>{profile.headline ?? profile.affiliation}</span>
                </span>
              ) : null}

              <span className="flex items-center gap-1.5">
                <MapPinIcon className="size-4 shrink-0 text-muted-foreground" />
                <span>{profile.location ?? "Kathmandu Nepal"}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isOwner ? (
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href={localePath(locale, "/profile")} />}
              className="gap-2 cursor-pointer"
            >
              <PencilIcon className="size-4" />
              <span>{dict.profile.title}</span>
            </Button>
          ) : null}
          <div className="relative">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Share profile"
              onClick={onShare}
              className="cursor-pointer"
            >
              <ShareNetworkIcon className="size-4" />
            </Button>
            {copied ? (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-2 py-0.5 text-[11px] font-semibold text-background shadow-xs whitespace-nowrap z-50">
                Copied link!
              </span>
            ) : null}
          </div>
          <Button
            variant="default"
            size="sm"
            render={
              <a
                href={`https://github.com/${profile.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <GithubLogoIcon className="size-4" />
            <span>@{profile.githubUsername}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
