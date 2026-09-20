"use client";

import { Button } from "@/components/ui/button";
import type { IssuesPaginationProps } from "../types/issues.types";

export function IssuesPagination({ page, totalPages, onNavigate, dict }: IssuesPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-6 flex flex-wrap items-center gap-2" aria-label={dict.issues.title}>
      {page > 1 ? (
        <Button variant="secondary" onClick={() => onNavigate({ page: page - 1 })}>
          ←
        </Button>
      ) : null}
      <span className="text-sm text-muted-foreground">
        {page} / {totalPages}
      </span>
      {page < totalPages ? (
        <Button variant="secondary" onClick={() => onNavigate({ page: page + 1 })}>
          →
        </Button>
      ) : null}
    </nav>
  );
}
