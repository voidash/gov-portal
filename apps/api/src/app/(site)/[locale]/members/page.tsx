"use client";

import { ErrorPanel, LoadingPanel } from "@/components/modules/common";
import { MemberDirectory, useMemberDirectory } from "@/features/members";
import { useLocale } from "@/hooks";

export default function MembersPage() {
  const { locale, dict } = useLocale();
  const dir = useMemberDirectory();

  if (dir.isLoading) {
    return <LoadingPanel label={dict.common.loading} />;
  }

  if (dir.error !== undefined) {
    return (
      <ErrorPanel
        message={dir.error.message}
        retryLabel={dict.common.retry}
        title={dict.common.errorTitle}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <MemberDirectory
      members={dir.members}
      visible={dir.visible}
      query={dir.query}
      setQuery={dir.setQuery}
      skill={dir.skill}
      setSkill={dir.setSkill}
      clear={dir.clear}
      viewMode={dir.viewMode}
      setViewMode={dir.setViewMode}
      effectiveView={dir.effectiveView}
      sortMode={dir.sortMode}
      setSortMode={dir.setSortMode}
      locale={locale}
      dict={dict}
    />
  );
}
