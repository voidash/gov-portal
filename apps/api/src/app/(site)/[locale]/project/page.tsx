"use client";

import Link from "next/link";

import { ErrorPanel, LoadingPanel } from "@/components/modules/common";
import { Button } from "@/components/ui/button";
import {
  ProjectAboutSection,
  ProjectFactsSheet,
  ProjectHeroCard,
  ProjectIssuesSection,
  useProjectPage,
} from "@/features/project";
import { localePath } from "@/lib/i18n";

export default function ProjectPage() {
  const { locale, dict, project, recentIssues, synced, isLoading, error } = useProjectPage();

  if (isLoading) {
    return <LoadingPanel label={dict.common.loading} layout="detail" />;
  }

  if (error !== undefined) {
    return (
      <ErrorPanel
        message={error.message}
        retryLabel={dict.common.retry}
        title={dict.common.errorTitle}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (project === null) {
    return (
      <section className="py-12" aria-labelledby="project-heading">
        <div className="container">
          <div
            className="grid justify-items-start gap-2 rounded-xl border border-dashed border-border bg-card px-6 py-8"
            role="status"
          >
            <strong className="m-0 font-heading text-lg leading-tight font-semibold">
              {dict.project.noIssues}
            </strong>
            <p className="m-0 max-w-[62ch]">{dict.project.contributeBody}</p>
            <Button variant="outline" render={<Link href={localePath(locale, "/")} />}>
              {dict.home.seeProject}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12" aria-labelledby="project-heading">
      <div className="container">
        <nav
          className="mb-6 flex flex-wrap gap-2 text-sm text-muted-foreground"
          aria-label={dict.project.kicker}
        >
          <Link href={localePath(locale, "/")} className="text-primary no-underline">
            {dict.brand}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <ProjectHeroCard project={project} synced={synced} locale={locale} dict={dict} />

        <div className="grid gap-8">
          <ProjectAboutSection project={project} dict={dict} />
          <ProjectIssuesSection recentIssues={recentIssues} locale={locale} dict={dict} />
          <ProjectFactsSheet project={project} synced={synced} dict={dict} />
        </div>
      </div>
    </section>
  );
}
