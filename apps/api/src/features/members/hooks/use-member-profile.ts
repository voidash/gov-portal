"use client";

import type { PublicMemberDto } from "@gov-portal/shared";
import { useState } from "react";
import type { Actor } from "@/hooks";
import { SHARE_TOAST_DURATION_MS } from "@/shared/constants";

/**
 * Owns share-button state + ownership/pending derivation for the member
 * profile page. Keeps all stateful business logic out of the page file.
 */
export function useMemberProfile(profile: PublicMemberDto | undefined, actor: Actor | null) {
  const [copied, setCopied] = useState(false);

  const isOwner =
    actor !== null && profile !== undefined && actor.member.githubId === profile.githubId;

  const isPending = isOwner && actor !== null && actor.member.status !== "approved";

  async function handleShare(): Promise<void> {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: profile?.displayName ?? "Member Profile", url });
        return;
      } catch {
        // fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), SHARE_TOAST_DURATION_MS);
    } catch {
      // silently ignore — clipboard may be unavailable
    }
  }

  return { isOwner, isPending, handleShare, copied };
}
