"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  ChevronRight,
  Landmark,
  Layers,
  Network,
  Rocket,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useBookDemo } from "@/context/BookDemoContext";
import { webdevHref } from "@/lib/webdevelopment/paths";
import ScrollReveal from "@/components/ScrollReveal";

const STACK_CATEGORIES = [
  {
    id: "ai",
    label: "AI & Machine Learning",
    icon: Brain,
    cta: "Explore AI Solutions",
    image: "/ai.gif",
    imageAlt: "AI & Machine Learning platforms",
    techs: [
      "OpenAI",
      "Anthropic Claude",
      "Google Gemini",
      "Meta Llama",
      "Mistral AI",
      "LangGraph",
      "LlamaIndex",
      "CrewAI",
      "Pinecone",
      "Weaviate",
      "PyTorch",
      "Hugging Face",
      "TensorFlow",
      "Scikit-learn",
    ],
  },
  {
    id: "banking-fintech",
    label: "Banking & Fintech",
    icon: Landmark,
    cta: "Explore Fintech Solutions",
    image: null,
    imageAlt: "Banking and fintech platforms",
    techs: [
      "eKYC / DigiLocker",
      "Re-KYC",
      "Account Closure",
      "Trading Apps",
      "Mutual Fund",
      "IPO Bidding",
      "CKYC / KRA",
      "Video KYC",
      "Aadhaar APIs",
      "Secure Onboarding",
      "Compliance Workflows",
      "Audit Trails",
    ],
  },
  {
    id: "products",
    label: "Products & Platforms",
    icon: Layers,
    cta: "Explore Our Products",
    image: null,
    imageAlt: "TechCulture products and platforms",
    techs: [
      "Trading Applications",
      "Mutual Fund",
      "HRMS",
      "GIS Application",
      "IPO",
      "LMS",
      "Tracking System",
      "Custom SaaS",
      "Admin Portals",
      "Dashboards",
      "Role-Based Access",
      "Analytics",
    ],
  },
  {
    id: "middleware",
    label: "Middleware & Integrations",
    icon: Network,
    cta: "Explore Middleware",
    image: null,
    imageAlt: "Middleware and integration layer",
    techs: [
      "API Gateway",
      "Request Routing",
      "Identity Middleware",
      "Status Sync",
      "Webhooks",
      "SSO / OAuth",
      "REST APIs",
      "Message Queues",
      "Data Mapping",
      "Partner Integrations",
      "Retry & Failover",
      "Monitoring",
    ],
  },
  {
    id: "web-mobile",
    label: "Web, Mobile & SaaS",
    icon: Smartphone,
    cta: "Explore App Solutions",
    image: null,
    imageAlt: "Web, mobile and SaaS development",
    techs: [
      "E-Commerce",
      "Corporate Websites",
      "Mobile Applications",
      "Custom SaaS",
      "React / Next.js",
      "React Native",
      "Flutter",
      "Node.js",
      "Cloud Hosting",
      "CI/CD",
      "Push Notifications",
      "CMS",
    ],
  },
];

export default function TechnologyStackSection() {
  const { openBookDemo } = useBookDemo();
  const [activeId, setActiveId] = useState(STACK_CATEGORIES[0].id);
  const active =
    STACK_CATEGORIES.find((item) => item.id === activeId) || STACK_CATEGORIES[0];
  const ActiveIcon = active.icon;

  return (
    <section className="relative z-10 overflow-hidden bg-[#faf9f6] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(46,53,69,0.12) 1px, transparent 0)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse 55% 45% at 8% 12%, #000 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 55% 45% at 8% 12%, #000 20%, transparent 70%)",
          }}
        />
        <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-[#FE602F]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#2E3545]/8 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <ScrollReveal direction="up" delay={0.03} duration={0.65}>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#FE602F] uppercase shadow-sm">
              <Sparkles size={13} />
              Technology Stack & Platforms
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-[#2E3545]! sm:text-3xl lg:text-4xl">
              Powering Ideas with{" "}
              <span className="bg-linear-to-r from-[#FE602F] to-[#e55528] bg-clip-text text-transparent">
                Modern Technology
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#667085] sm:text-base">
              We leverage cutting-edge tools, frameworks and platforms to build
              scalable, secure and high-performing digital solutions for your
              business.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.08} duration={0.7} className="mt-12">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.15fr_1.1fr] lg:items-stretch lg:gap-6">
            <div className="rounded-3xl border border-orange-100/80 bg-white p-3 shadow-[0_10px_30px_rgba(46,53,69,0.05)] sm:p-4">
              <div className="flex flex-col gap-2">
                {STACK_CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const isActive = category.id === active.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveId(category.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3.5 py-3.5 text-left transition ${
                        isActive
                          ? "bg-linear-to-r from-[#FE602F] to-[#e55528] text-white! shadow-[0_10px_24px_rgba(254,96,47,0.28)]"
                          : "text-[#2E3545]! hover:bg-[#fff5f1]"
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                          isActive
                            ? "bg-white/20 text-white!"
                            : "bg-[#fff0eb] text-[#FE602F]!"
                        }`}
                      >
                        <Icon size={17} strokeWidth={2} />
                      </span>
                      <span
                        className={`min-w-0 flex-1 text-[13px] font-semibold leading-snug sm:text-sm ${
                          isActive ? "text-white!" : "text-[#2E3545]!"
                        }`}
                      >
                        {category.label}
                      </span>
                      <ChevronRight
                        size={16}
                        className={`shrink-0 ${isActive ? "text-white!" : "text-slate-400"}`}
                      />
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 border-t border-slate-100 px-2 pt-4 text-center">
                <div className="mb-2 flex items-center justify-center gap-1.5">
                  {STACK_CATEGORIES.map((category) => (
                    <span
                      key={category.id}
                      className={`h-1.5 w-1.5 rounded-full ${
                        category.id === active.id ? "bg-[#FE602F]" : "bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[11px] font-medium tracking-wide text-slate-400">
                  Smarter Technology. Better Tomorrow.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-orange-100/70 bg-linear-to-br from-[#2E3545] via-[#3a4254] to-[#1a1f2a] shadow-[0_16px_40px_rgba(46,53,69,0.18)] min-h-[280px] sm:min-h-[340px] lg:min-h-full">
              {active.image ? (
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  unoptimized={/\.gif($|\?)/i.test(active.image)}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              ) : (
                <div className="relative flex h-full min-h-[280px] flex-col items-center justify-center gap-4 p-8 text-center sm:min-h-[340px]">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-10 left-8 h-24 w-24 rounded-full bg-[#FE602F]/25 blur-2xl" />
                    <div className="absolute right-6 bottom-12 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
                  </div>
                  <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-[#FE602F] ring-1 ring-white/20 backdrop-blur-sm">
                    <ActiveIcon size={30} strokeWidth={1.8} />
                  </span>
                  <div className="relative">
                    <p className="text-lg font-semibold text-white!">{active.label}</p>
                    <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-white/60">
                      Visual coming soon — drop your image here for this category.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex h-full flex-col rounded-3xl border border-orange-100/80 bg-white p-5 shadow-[0_10px_30px_rgba(46,53,69,0.05)] sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-[#2E3545]! sm:text-lg">
                  Popular Technologies
                </h3>
                <Link
                  href={webdevHref("/contact")}
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#FE602F] transition hover:text-[#d9471b]"
                >
                  View All
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="flex flex-wrap content-start gap-2">
                {active.techs.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-[#2E3545] shadow-[0_1px_2px_rgba(46,53,69,0.04)] transition hover:border-[#FE602F]/35 hover:text-[#FE602F]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={openBookDemo}
                className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-[#FE602F] to-[#e55528] px-5 py-3.5 text-sm font-semibold text-white! shadow-[0_12px_28px_rgba(254,96,47,0.28)] transition hover:brightness-105"
              >
                <Rocket size={16} />
                {active.cta}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
