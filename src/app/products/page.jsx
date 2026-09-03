"use client";

import WebDevInfoPage from "@/components/forWebDevelopment/WebDevInfoPage";
import WebDevCardGrid from "@/components/forWebDevelopment/WebDevCardGrid";
import { hubPages, productPages } from "@/lib/webdevelopment/catalog";
import { webdevHref } from "@/lib/webdevelopment/paths";

export default function ProductsHubPage() {
  const page = hubPages.products;

  return (
    <WebDevInfoPage
      title={page.title}
      summary={page.summary}
      about={page.about}
      highlights={page.highlights}
      productHref={page.productHref}
      ctaLabel={page.ctaLabel}
      backHref={webdevHref("/")}
      relatedLinks={[
        { name: "Industries", href: webdevHref("/industries") },
        { name: "AI-Automation", href: webdevHref("/ai-automation") },
        { name: "Middleware", href: webdevHref("/middleware") },
      ]}
    >
      <h3 className="text-lg font-bold text-slate-900 mb-4">All products</h3>
      <WebDevCardGrid items={productPages} />
    </WebDevInfoPage>
  );
}
