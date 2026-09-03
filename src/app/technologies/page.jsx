"use client";

import WebDevInfoPage from "@/components/forWebDevelopment/WebDevInfoPage";
import { hubPages } from "@/lib/webdevelopment/catalog";
import { webdevHref } from "@/lib/webdevelopment/paths";

export default function TechnologiesInfoPage() {
  const page = hubPages.technologies;
  return (
    <WebDevInfoPage
      title={page.title}
      summary={page.summary}
      about={page.about}
      highlights={page.highlights}
      productHref={page.productHref}
      ctaLabel={page.ctaLabel}
      relatedLinks={[
        { name: "Portfolio", href: webdevHref("/portfolio") },
        { name: "Our Workspace", href: webdevHref("/our-workspace") },
      ]}
    />
  );
}
