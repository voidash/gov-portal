import { Card } from "@/components/ui/card";
import type { ProjectAboutSectionProps } from "../types/project.types";

export function ProjectAboutSection({ project, dict }: ProjectAboutSectionProps) {
  return (
    <section aria-labelledby="about-heading">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="mb-2 block text-sm font-semibold text-primary">
            {dict.project.aboutKicker}
          </p>
          <h2 id="about-heading" className="m-0">
            {dict.project.aboutTitle}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="px-6">
          <h3 className="mt-0 mb-2 font-sans text-xs font-bold tracking-[0.08em] uppercase text-muted-foreground">
            {dict.project.contributeKicker}
          </h3>
          <p className="m-0 text-sm leading-[1.6]">{dict.project.contributeBody}</p>
        </Card>
        <Card className="px-6">
          <h3 className="mt-0 mb-2 font-sans text-xs font-bold tracking-[0.08em] uppercase text-muted-foreground">
            {dict.project.repository}
          </h3>
          <p className="m-0 text-sm leading-[1.6]">
            <a href={project.htmlUrl} target="_blank" rel="noopener noreferrer">
              {project.fullName}
            </a>
          </p>
        </Card>
        <Card className="px-6">
          <h3 className="mt-0 mb-2 font-sans text-xs font-bold tracking-[0.08em] uppercase text-muted-foreground">
            {dict.project.licence}
          </h3>
          <p className="m-0 text-sm leading-[1.6]">
            {project.license ?? dict.project.notPublished}
          </p>
        </Card>
      </div>
    </section>
  );
}
