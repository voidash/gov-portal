"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { IssuesSearchFormProps } from "../types/issues.types";

const SELECT_CLASS =
  "h-9 w-full min-w-0 rounded-md border border-input bg-card px-2.5 py-1 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function IssuesSearchForm({ q, label, labels, onNavigate, dict }: IssuesSearchFormProps) {
  return (
    <search>
      <form
        className="mb-6 grid grid-cols-1 items-end gap-4 rounded-md border border-border bg-card p-4 sm:grid-cols-[1fr_1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const nextQ = String(form.get("q") ?? "").trim();
          const nextLabel = String(form.get("label") ?? "").trim();
          onNavigate({
            q: nextQ || undefined,
            label: nextLabel || undefined,
            page: 1,
          });
        }}
      >
        <Field>
          <FieldLabel htmlFor="issue-search">{dict.issues.searchLabel}</FieldLabel>
          <Input
            id="issue-search"
            name="q"
            type="search"
            defaultValue={q ?? ""}
            key={q ?? ""}
            placeholder={dict.issues.searchPlaceholder}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="issue-label">{dict.issues.filterBy}</FieldLabel>
          <select
            id="issue-label"
            name="label"
            defaultValue={label ?? ""}
            key={label ?? ""}
            onChange={(event) => {
              const selected = event.target.value.trim();
              onNavigate({
                label: selected || undefined,
                page: 1,
              });
            }}
            className={SELECT_CLASS}
          >
            <option value="">{dict.issues.allLabels}</option>
            {labels.map((facet) => (
              <option key={facet.name} value={facet.name}>
                {facet.name} ({facet.count})
              </option>
            ))}
          </select>
        </Field>
        <Button type="submit">{dict.issues.search}</Button>
      </form>
    </search>
  );
}
