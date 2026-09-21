import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { localePath } from "@/lib/i18n";
import type { ProjectHeroCardProps } from "../types/project.types";

export function ProjectHeroCard({ project, synced, locale, dict }: ProjectHeroCardProps) {
  const [owner, name] = project.fullName.split("/");

  return (
    <Card className="mb-10 gap-0 px-8">
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
        <div className="min-w-0">
          <p className="m-0 text-sm font-semibold text-primary">{owner} /</p>
          <h1 id="project-heading" className="m-0 mt-1 text-3xl leading-[1.08] tracking-[-0.01em]">
            {name ?? project.fullName}
          </h1>
          <p className="mt-3 mb-0 max-w-[68ch] text-base leading-[1.55] text-muted-foreground">
            {project.description ?? dict.project.none}
          </p>
        </div>

        <dl
          className="m-0 flex flex-none gap-6 whitespace-nowrap"
          aria-label={dict.project.aboutTitle}
        >
          <div className="flex flex-col-reverse">
            <dt className="text-sm text-muted-foreground">{dict.project.openIssues}</dt>
            <dd className="m-0 font-heading text-2xl font-semibold">{project.openIssueCount}</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-sm text-muted-foreground">{dict.project.members}</dt>
            <dd className="m-0 font-heading text-2xl font-semibold">{project.memberCount}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
        <Chip tone="outline">{dict.project.publicLabel}</Chip>
        <Chip tone="success">{dict.project.openLabel}</Chip>
        <span className="text-sm text-muted-foreground">
          <strong className="font-semibold text-foreground">{dict.project.lastSync}</strong>{" "}
          {synced}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button render={<Link href={localePath(locale, "/issues")} />}>
          {dict.project.chooseIssue}
        </Button>
        <Button
          variant="outline"
          render={<a href={project.htmlUrl} target="_blank" rel="noopener noreferrer" />}
        >
          {dict.project.viewOnGitHub}
        </Button>
        <p className="m-0 text-sm text-muted-foreground">{dict.project.githubSourceNote}</p>
      </div>
    </Card>
  );
}
