import { notFound } from "next/navigation";

import { getDictionary, isLocale } from "@/lib/i18n";

export const dynamic = "force-static";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const dict = getDictionary(locale);

  return (
    <div className="dn-container dn-page-body" style={{ maxWidth: "48rem" }}>
      <h1>{dict.about.title}</h1>
      <p className="dn-lede">{dict.about.lede}</p>

      <section className="mt-4">
        <h2>{dict.about.sections.findTitle}</h2>
        <p>{dict.about.sections.findBody}</p>
      </section>
      <section className="mt-4">
        <h2>{dict.about.sections.workTitle}</h2>
        <p>{dict.about.sections.workBody}</p>
      </section>
      <section className="mt-4">
        <h2>{dict.about.sections.recordTitle}</h2>
        <p>{dict.about.sections.recordBody}</p>
      </section>
      <section className="mt-4">
        <h2>{dict.about.sections.limitsTitle}</h2>
        <p>{dict.about.sections.limitsBody}</p>
      </section>
    </div>
  );
}
