"use client";

import { BuildingsIcon } from "@phosphor-icons/react";

import type { MemberSidebarProps } from "../types/members.types";

export function MemberSidebar({ skills, affiliation, links }: MemberSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Skills Card */}
      {skills.length > 0 ? (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-bold text-foreground">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Affiliation Card */}
      {affiliation !== null ? (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-bold text-foreground">Affiliation</h3>
          <div className="space-y-2.5 text-sm text-foreground">
            <div className="flex items-center gap-2">
              <BuildingsIcon className="size-4 text-muted-foreground" />
              <span className="font-medium">{affiliation}</span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Links Card */}
      {links.length > 0 ? (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-bold text-foreground">Links</h3>
          <div className="flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-full break-all rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              >
                {link.replace(/^https?:\/\//, "")}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
