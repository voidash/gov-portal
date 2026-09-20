import type { ProjectFactsSheetProps } from "../types/project.types";

export function ProjectFactsSheet({ project, synced, dict }: ProjectFactsSheetProps) {
  return (
    <section
      className="relative overflow-hidden rounded-xl border border-border bg-card"
      aria-labelledby="sheet-heading"
    >
      <div className="flex flex-wrap items-center border-b border-border bg-muted text-xs leading-6 font-semibold tracking-[0.08em] uppercase text-foreground">
        <span id="sheet-heading" className="px-6 py-3">
          {dict.project.sheetTitle}
        </span>
        <span className="px-6 py-3">{project.license ?? dict.project.none}</span>
      </div>
      <div className="grid grid-cols-1 min-[801px]:grid-cols-[repeat(3,minmax(0,1fr))]">
        {[
          {
            label: dict.project.repository,
            value: (
              <a href={project.htmlUrl} target="_blank" rel="noopener noreferrer">
                {project.fullName}
              </a>
            ),
          },
          { label: dict.project.openIssues, value: project.openIssueCount },
          { label: dict.project.members, value: project.memberCount },
        ].map((item) => (
          <div
            key={item.label}
            className="min-w-0 p-5 min-[801px]:[&+&]:border-l min-[801px]:[&+&]:border-border"
          >
            <strong className="mb-2 block text-xs font-semibold tracking-[0.08em] uppercase text-muted-foreground">
              {item.label}
            </strong>
            <span className="block">{item.value}</span>
          </div>
        ))}
      </div>
      <p className="m-0 border-t border-border px-6 py-3 text-sm leading-6 text-muted-foreground">
        {dict.project.lastSync} · {synced}
      </p>
    </section>
  );
}
