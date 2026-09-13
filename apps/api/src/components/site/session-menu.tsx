"use client";

import type { SelfMemberDto } from "@gov-portal/shared";
import { useEffect, useState } from "react";

import { signInWithGitHub, signOut } from "@/lib/auth-client";

export function SessionMenu({
  signInLabel,
  signOutLabel,
  statusLabels,
  greetingLabel,
}: {
  signInLabel: string;
  signOutLabel: string;
  statusLabels: Record<SelfMemberDto["status"], string>;
  greetingLabel: string;
}) {
  const [member, setMember] = useState<SelfMemberDto | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/profile", { credentials: "include" })
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }
        return (await response.json()) as { member: SelfMemberDto };
      })
      .then((payload) => {
        if (!cancelled) {
          setMember(payload?.member ?? null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMember(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoaded(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loaded) {
    return null;
  }

  if (member === null) {
    return (
      <button
        className="btn btn-sm dn-signin"
        type="button"
        onClick={() => void signInWithGitHub(window.location.pathname)}
      >
        {signInLabel}
      </button>
    );
  }

  return (
    <>
      <span className="dn-greeting">
        {greetingLabel} {member.displayName}
      </span>
      <span className="Label Label--secondary">{statusLabels[member.status]}</span>
      <button
        className="btn btn-sm"
        type="button"
        disabled={busy}
        onClick={() => {
          setBusy(true);
          signOut().catch(() => setBusy(false));
        }}
      >
        {signOutLabel}
      </button>
    </>
  );
}
