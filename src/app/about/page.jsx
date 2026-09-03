"use client";

import Link from "next/link";
import WebDevInfoPage from "@/components/forWebDevelopment/WebDevInfoPage";
import { aboutItems } from "@/components/HeaderMegaMenus";
import { hubPages } from "@/lib/webdevelopment/catalog";
import { webdevHref, mainSiteHref } from "@/lib/webdevelopment/paths";
import SpotlightCard, { TEAL_SPOTLIGHT } from "@/components/SpotlightCard";

export default function AboutInfoPage() {
  const page = hubPages.about;

  return (
    <WebDevInfoPage
      title={page.title}
      summary={page.summary}
      about={page.about}
      highlights={page.highlights}
      productHref={page.productHref}
      ctaLabel={page.ctaLabel}
      relatedLinks={[
        { name: "Contact", href: webdevHref("/contact") },
        { name: "Our Workspace", href: webdevHref("/our-workspace") },
      ]}
    >
      <h3 className="text-lg font-bold text-slate-900 mb-4">Explore</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {aboutItems.map((item) => (
          <SpotlightCard
            key={item.href}
            spotlightColor={TEAL_SPOTLIGHT}
            className="rounded-2xl border border-teal-100 bg-white shadow-sm hover:border-teal-300 transition"
          >
            <Link href={mainSiteHref(item.href)} className="block p-5">
              <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
              <p className="text-sm text-slate-500 mb-3">{item.subtitle}</p>
              <span className="text-sm font-semibold text-teal-600">
                Open page →
              </span>
            </Link>
          </SpotlightCard>
        ))}
      </div>
    </WebDevInfoPage>
  );
}
