"use client";

import { useParams } from "next/navigation";
import WebDevInfoPage from "@/components/forWebDevelopment/WebDevInfoPage";
import { getIndustryBySlug } from "@/lib/webdevelopment/catalog";
import { webdevHref } from "@/lib/webdevelopment/paths";

export default function IndustryDetailPage() {
  const params = useParams();
  const page = getIndustryBySlug(params?.slug);

  if (!page) {
    return (
      <WebDevInfoPage
        title="Industry not found"
        summary="This industry page does not exist yet."
        about="Please go back to the industries catalogue and pick another sector."
        productHref={webdevHref("/industries")}
        ctaLabel="View all industries"
        backHref={webdevHref("/industries")}
        backLabel="Back to Industries"
      />
    );
  }

  return (
    <WebDevInfoPage
      title={page.title}
      summary={page.summary}
      about={page.about}
      highlights={page.highlights}
      productHref={page.productHref}
      ctaLabel={page.ctaLabel}
      backHref={webdevHref("/industries")}
      backLabel="Back to Industries"
      relatedLinks={[
        { name: "All industries", href: webdevHref("/industries") },
        { name: "Products", href: webdevHref("/products") },
        { name: "Contact", href: webdevHref("/contact") },
      ]}
    />
  );
}
