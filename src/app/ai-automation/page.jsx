"use client";

import WebDevInfoPage from "@/components/forWebDevelopment/WebDevInfoPage";
import WebDevCardGrid from "@/components/forWebDevelopment/WebDevCardGrid";
import { hubPages, productPages } from "@/lib/webdevelopment/catalog";
import { webdevHref } from "@/lib/webdevelopment/paths";

const automationRelated = productPages.filter((p) =>
  [
    "whatsapp-automation",
    "ai-virtual-assistant",
    "live-chat-support",
    "email-automation",
    "sms-and-whatsapp-campaigns",
    "lead-management",
    "helpdesk",
  ].includes(p.slug)
);

export default function AiAutomationPage() {
  const page = hubPages["ai-automation"];

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
        { name: "Industries", href: webdevHref("/industries") },
      ]}
    >
      <h3 className="text-lg font-bold text-slate-900 mb-4">
        Related automation products
      </h3>
      <WebDevCardGrid items={automationRelated} />
    </WebDevInfoPage>
  );
}
