"use client";

import { useState } from "react";

import { signInWithGitHub } from "@/lib/auth-client";
import type { Locale } from "@/lib/i18n";

export function SignInPanel({
  label,
  title,
  locale,
}: {
  label: string;
  title: string;
  locale: Locale;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="dn-state-banner mt-3">
      <strong>{title}</strong>
      <div className="mt-2">
        <button
          className="btn btn-primary"
          type="button"
          disabled={busy}
          onClick={() => {
            setBusy(true);
            signInWithGitHub(`/${locale}/profile`).catch(() => setBusy(false));
          }}
        >
          {label}
        </button>
      </div>
    </div>
  );
}
