"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";

import { ErrorPanel, LoadingPanel, StateBanner } from "@/components/modules/common";
import { MemberProfileHero, MemberSidebar, useMemberProfile } from "@/features/members";
import { useActor, useLocale, useMember } from "@/hooks";
import { ApiError } from "@/lib/api-error";
import { localePath } from "@/lib/i18n";

export default function MemberDetailPage() {
  const { locale, dict } = useLocale();
  const { username } = useParams<{ username: string }>();
  const { member: profile, isLoading, error } = useMember(username);
  const { actor } = useActor();
  const { isOwner, isPending, handleShare, copied } = useMemberProfile(profile, actor);

  if (error instanceof ApiError && error.status === 404) {
    notFound();
  }

  if (isLoading) {
    return <LoadingPanel label={dict.common.loading} layout="detail" />;
  }

  if (error !== undefined || profile === undefined) {
    return (
      <ErrorPanel
        message={error?.message ?? dict.common.errorTitle}
        retryLabel={dict.common.retry}
        title={dict.common.errorTitle}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const hasBio = profile.bio !== null;
  const hasSidebar =
    profile.skills.length > 0 || profile.affiliation !== null || profile.links.length > 0;

  return (
    <div className="w-full bg-background min-h-screen">
      {/* Breadcrumb Bar */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href={localePath(locale, "/")} className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={localePath(locale, "/members")}
            className="hover:text-foreground transition-colors"
          >
            {dict.nav.members}
          </Link>
          <span>/</span>
          <span aria-current="page" className="font-medium text-foreground">
            {profile.displayName}
          </span>
        </div>
      </div>

      <MemberProfileHero
        profile={profile}
        isOwner={isOwner}
        actor={actor}
        copied={copied}
        onShare={handleShare}
        locale={locale}
        dict={dict}
      />

      <div className="mx-auto max-w-[1200px] px-4 py-8">
        {isPending && actor !== null ? (
          <StateBanner tone="attention" role="status" className="mb-6">
            {dict.profile.status[actor.member.status]}
          </StateBanner>
        ) : null}

        <div
          className={
            hasBio && hasSidebar
              ? "grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]"
              : "grid grid-cols-1 gap-8"
          }
        >
          {hasBio ? (
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {profile.bio}
              </p>
            </div>
          ) : null}

          {hasSidebar ? (
            <div className={hasBio ? "" : "max-w-sm"}>
              <MemberSidebar
                skills={profile.skills as string[]}
                affiliation={profile.affiliation}
                location={profile.location}
                links={profile.links}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
