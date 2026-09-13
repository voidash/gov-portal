"use client";

import type { AdminMemberDto } from "@gov-portal/shared";
import { useCallback, useEffect, useState } from "react";

import { MemberAvatar } from "@/components/ui/member-avatar";
import type { Dictionary } from "@/lib/i18n";

const TABS = ["pending", "approved", "rejected", "hidden"] as const;
type Tab = (typeof TABS)[number];

function PriorityEditor({
  member,
  busy,
  labels,
  onSave,
}: {
  member: AdminMemberDto;
  busy: boolean;
  labels: { title: string; set: string };
  onSave: (priority: number) => void;
}) {
  const [value, setValue] = useState(String(member.priority));

  useEffect(() => {
    setValue(String(member.priority));
  }, [member.priority]);

  const parsed = Number(value);
  const valid = value.trim() !== "" && Number.isInteger(parsed);

  return (
    <span className="d-flex flex-items-center gap-1">
      <input
        className="form-control input-sm"
        type="number"
        aria-label={labels.title}
        value={value}
        style={{ width: "5rem" }}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        type="button"
        className="btn btn-sm"
        disabled={busy || !valid || parsed === member.priority}
        onClick={() => onSave(parsed)}
      >
        {labels.set}
      </button>
    </span>
  );
}

export function AdminQueue({ dict }: { dict: Dictionary }) {
  const [tab, setTab] = useState<Tab>("pending");
  const [members, setMembers] = useState<AdminMemberDto[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(
    async (nextTab: Tab): Promise<void> => {
      setError(null);
      try {
        const response = await fetch(`/admin/members?status=${nextTab}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`${dict.admin.actionError} (${response.status})`);
        }
        const payload = (await response.json()) as { members: AdminMemberDto[] };
        setMembers(payload.members);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : dict.admin.actionError);
      }
    },
    [dict.admin.actionError],
  );

  useEffect(() => {
    void load(tab);
  }, [tab, load]);

  async function apply(
    target: AdminMemberDto,
    payload: { status?: Tab; priority?: number },
  ): Promise<void> {
    setBusyId(target.id);
    setError(null);
    try {
      const response = await fetch(`/admin/members/${target.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`${dict.admin.actionError} (${response.status})`);
      }
      await load(tab);
    } catch (applyError) {
      setError(applyError instanceof Error ? applyError.message : dict.admin.actionError);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <nav
        className="dn-tabs"
        aria-label={dict.admin.title}
        style={{ borderBottom: "1px solid var(--borderColor-default, #d0d7de)" }}
      >
        {TABS.map((entry) => (
          <button
            key={entry}
            type="button"
            className="dn-tab"
            aria-current={entry === tab ? "page" : undefined}
            onClick={() => setTab(entry)}
            style={{
              background: "transparent",
              border: 0,
              borderBottom: "2px solid transparent",
              cursor: "pointer",
            }}
          >
            {dict.admin.tabs[entry]}
          </button>
        ))}
      </nav>

      {error !== null ? <div className="dn-state-banner is-danger mt-3">{error}</div> : null}

      {members === null ? (
        <p className="dn-lede mt-3">{dict.common.loading}</p>
      ) : members.length === 0 ? (
        <div className="dn-state-banner mt-3">{dict.admin.noMembers}</div>
      ) : (
        <div className="dn-settings-list mt-3">
          {members.map((entry) => {
            const busy = busyId === entry.id;
            return (
              <div className="dn-setting-row" key={entry.id}>
                <div className="d-flex flex-items-center gap-2">
                  <MemberAvatar member={entry} size={40} />
                  <div>
                    <strong>{entry.displayName}</strong>
                    <p>
                      @{entry.githubUsername} · {dict.admin.tabs[entry.status]}
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-items-center gap-2 flex-wrap">
                  <PriorityEditor
                    member={entry}
                    busy={busy}
                    labels={{ title: dict.admin.priority, set: dict.admin.setPriority }}
                    onSave={(priority) => void apply(entry, { priority })}
                  />
                  {entry.status !== "approved" ? (
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      disabled={busy}
                      onClick={() => void apply(entry, { status: "approved" })}
                    >
                      {dict.admin.approve}
                    </button>
                  ) : null}
                  {entry.status !== "rejected" ? (
                    <button
                      type="button"
                      className="btn btn-sm"
                      disabled={busy}
                      onClick={() => void apply(entry, { status: "rejected" })}
                    >
                      {dict.admin.reject}
                    </button>
                  ) : null}
                  {entry.status !== "hidden" ? (
                    <button
                      type="button"
                      className="btn btn-sm"
                      disabled={busy}
                      onClick={() => void apply(entry, { status: "hidden" })}
                    >
                      {dict.admin.hide}
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
