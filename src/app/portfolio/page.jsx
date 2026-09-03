"use client";

import WebDevInfoPage from "@/components/forWebDevelopment/WebDevInfoPage";
import { hubPages } from "@/lib/webdevelopment/catalog";
import { webdevHref } from "@/lib/webdevelopment/paths";

export default function PortfolioInfoPage() {
  const page = hubPages.portfolio;
  return (
    <WebDevInfoPage
      title={page.title}
      summary={page.summary}
      about={page.about}
      highlights={page.highlights}
      productHref={page.productHref}
      ctaLabel={page.ctaLabel}
      relatedLinks={[
        { name: "Technologies", href: webdevHref("/technologies") },
        { name: "Products", href: webdevHref("/products") },
      ]}
    />
  );
}
