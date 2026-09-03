"use client";

import WebDevInfoPage from "@/components/forWebDevelopment/WebDevInfoPage";
import WebDevCardGrid from "@/components/forWebDevelopment/WebDevCardGrid";
import { hubPages, industryPages } from "@/lib/webdevelopment/catalog";
import { webdevHref } from "@/lib/webdevelopment/paths";

export default function IndustriesHubPage() {
  const page = hubPages.industries;

  return (
    <WebDevInfoPage
      title={page.title}
      summary={page.summary}
      about={page.about}
      highlights={page.highlights}
      productHref={page.productHref}
      ctaLabel={page.ctaLabel}
      relatedLinks={[
        { name: "Products", href: webdevHref("/products") },
        { name: "AI-Automation", href: webdevHref("/ai-automation") },
      ]}
    >
      <h3 className="text-lg font-bold text-slate-900 mb-4">All industries</h3>
      <WebDevCardGrid items={industryPages} />
    </WebDevInfoPage>
  );
}
