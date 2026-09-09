"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  Fingerprint,
  Layers,
  Link2,
  PenLine,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  Zap,
} from "lucide-react";
import { webdevHref } from "../../lib/webdevelopment/paths";
import SpotlightCard, { BRAND_SPOTLIGHT } from "@/components/SpotlightCard";

const flowSteps = [
  {
    id: 1,
    title: "Customer eSign",
    desc: "Customer initiates e-sign request.",
    color: "from-[#FE602F] to-[#ff8a62]",
    ring: "ring-orange-200",
    bg: "bg-[#fff0eb]",
    text: "text-[#d9471b]",
    icon: PenLine,
  },
  {
    id: 2,
    title: "Verifier",
    desc: "Verifies the request and validates details.",
    color: "from-[#2E3545] to-[#525d72]",
    ring: "ring-slate-300",
    bg: "bg-slate-100",
    text: "text-[#2E3545]",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Middleware",
    desc: "Central engine routes, transforms & aggregates.",
    color: "from-[#FE602F] to-[#e94e20]",
    ring: "ring-orange-200",
    bg: "bg-[#fff0eb]",
    text: "text-[#d9471b]",
    icon: Layers,
  },
  {
    id: 4,
    title: "Back Office",
    desc: "Receives processed response / final status.",
    color: "from-[#2E3545] to-[#525d72]",
    ring: "ring-slate-300",
    bg: "bg-slate-100",
    text: "text-[#2E3545]",
    icon: Building2,
  },
];

const engineFeatures = [
  "Request Routing",
  "Response Aggregation",
  "Data Transformation",
  "Unified Audit & Logging",
];

const systems = [
  {
    title: "UCC",
    subtitle: "Unified Clearing Corp.",
    color: "border-orange-200 bg-[#fff7f4]",
    accent: "text-[#d9471b]",
    badge: "bg-[#FE602F]",
    items: [
      { label: "API Based", children: ["NSE", "BSE", "STAR MF"] },
      { label: "File Based", children: ["MCX", "NCDEX"] },
    ],
  },
  {
    title: "DP",
    subtitle: "Depository Partners",
    color: "border-slate-200 bg-slate-50/80",
    accent: "text-[#2E3545]",
    badge: "bg-[#2E3545]",
    items: [
      { label: "CDSL", children: [] },
      { label: "NSDL", children: [] },
    ],
  },
  {
    title: "KRA",
    subtitle: "KYC Registration Agency",
    color: "border-orange-200 bg-[#fff7f4]",
    accent: "text-[#d9471b]",
    badge: "bg-[#FE602F]",
    items: [
      { label: "CVL", children: [] },
      { label: "NDML", children: [] },
      { label: "CKYC", children: [] },
    ],
  },
];

const values = [
  {
    title: "Single Source of Truth",
    desc: "One trusted view of every request and response.",
    icon: ShieldCheck,
  },
  {
    title: "Simplified Integration",
    desc: "Connect once — reach UCC, DP and KRA systems.",
    icon: Link2,
  },
  {
    title: "Centralized Control",
    desc: "Route, transform and audit from one engine.",
    icon: SlidersHorizontal,
  },
  {
    title: "Real-time Processing",
    desc: "Fast status delivery for approvals and errors.",
    icon: Zap,
  },
];

export default function MiddlewarePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeSystem, setActiveSystem] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSystem((prev) => (prev + 1) % systems.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white text-slate-800 w-full min-w-0 overflow-x-hidden">
      {/* Hero */}
      <section className="relative pt-10 md:pt-14 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#fff8f5] via-white to-[#f5f5f6] pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-105 h-105 bg-[#FE602F]/12 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-90 h-90 bg-[#2E3545]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff0eb] text-[#d9471b] text-xs font-bold tracking-wider uppercase ring-1 ring-orange-100 mb-4">
              <Layers size={14} />
              Middleware · Central Engine
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
              One engine. Every request.{" "}
              <span className="bg-linear-to-r from-[#FE602F] via-[#e94e20] to-[#2E3545] bg-clip-text text-transparent">
                Unified responses.
              </span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl">
              Our middleware sits between customer eSign, verification, and
              market systems — routing requests, aggregating responses, and
              delivering a single final status to back office.
            </p>
          </div>
        </div>
      </section>

      {/* Animated flow steps */}
      <section className="pb-10 md:pb-14">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flowSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <SpotlightCard
                  key={step.id}
                  spotlightColor={BRAND_SPOTLIGHT}
                  className={`rounded-2xl border transition-all duration-500 ${
                    isActive
                      ? `ring-2 ${step.ring} shadow-lg shadow-slate-200/80 scale-[1.02] bg-white border-transparent`
                      : "bg-white/70 border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className="w-full text-left p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`w-11 h-11 rounded-xl bg-linear-to-br ${step.color} text-white flex items-center justify-center shadow-md`}
                      >
                        <Icon size={20} />
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${step.bg} ${step.text}`}
                      >
                        Step {step.id}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-snug">{step.desc}</p>
                    {isActive && (
                      <div className="mt-3 h-1 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          key={activeStep}
                          className={`h-full bg-linear-to-r ${step.color} animate-[middlewareProgress_2.2s_linear]`}
                        />
                      </div>
                    )}
                  </button>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Diagram */}
      <section className="pb-14 md:pb-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Architecture at a glance
            </h2>
            <p className="text-slate-500">
              Middleware Central Engine flow — request down, responses back up.
            </p>
          </div>

          <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
            <div className="w-full bg-white p-2 sm:p-4 md:p-6">
              <Image
                src="/middleware-central-engine.png"
                alt="Middleware Central Engine architecture diagram"
                width={2048}
                height={1364}
                quality={100}
                unoptimized
                priority
                className="w-full h-auto object-contain"
                sizes="100vw"
              />
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#2E3545] rounded" />
              Request Flow
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-8 border-t-2 border-dashed border-[#FE602F]" />
              Response Flow
            </span>
            <span className="inline-flex items-center gap-2 text-[#d9471b] font-medium">
              <CheckCircle2 size={16} />
              All responses return to Middleware
            </span>
          </div>
        </div>
      </section>

      {/* Engine + systems */}
      <section className="py-14 md:py-20 bg-linear-to-b from-[#f7f7f8] via-white to-[#fff7f4]">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="rounded-3xl border border-slate-700 bg-linear-to-br from-[#171b24] via-[#2E3545] to-[#434c5f] text-white p-7 sm:p-9 shadow-xl shadow-slate-500/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FE602F]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center ring-1 ring-white/20">
                <Layers size={24} />
              </span>
              <div>
                <p className="text-[#ffad92] text-xs font-bold tracking-wider uppercase">
                  Central Engine
                </p>
                <h3 className="text-2xl font-bold text-white">Middleware</h3>
              </div>
            </div>
            <p className="text-slate-200 mb-6 leading-relaxed">
              Acts as the brain — routing requests to external systems and
              aggregating every response into one final status for back office.
            </p>
            <ul className="space-y-3">
              {engineFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 ring-1 ring-white/10"
                >
                  <CheckCircle2 size={18} className="text-[#FE602F] shrink-0" />
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Connected systems
            </h3>
            <p className="text-slate-500 mb-6">
              Middleware talks to UCC, Depository Partners, and KRAs — then
              returns a unified response.
            </p>

            <div className="space-y-4">
              {systems.map((system, index) => (
                <button
                  key={system.title}
                  type="button"
                  onClick={() => setActiveSystem(index)}
                  className={`w-full text-left rounded-2xl border p-5 transition-all duration-400 ${
                    system.color
                  } ${
                    activeSystem === index
                      ? "ring-2 ring-offset-2 ring-[#FE602F]/35 shadow-md scale-[1.01]"
                      : "opacity-85 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`w-9 h-9 rounded-lg ${system.badge} text-white text-sm font-bold flex items-center justify-center`}
                    >
                      {system.title}
                    </span>
                    <div>
                      <h4 className={`font-bold ${system.accent}`}>
                        {system.title}
                      </h4>
                      <p className="text-xs text-slate-500">{system.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {system.items.map((item) => (
                      <span
                        key={item.label}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/80 text-xs font-semibold text-slate-700 ring-1 ring-black/5"
                      >
                        {item.label}
                        {item.children?.length > 0 && (
                          <span className="text-slate-400 font-normal">
                            · {item.children.join(", ")}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-14 md:py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Why teams choose this middleware
            </h2>
            <p className="text-slate-500">
              Built for financial workflows where accuracy, auditability, and
              speed matter.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <SpotlightCard
                  key={item.title}
                  spotlightColor={BRAND_SPOTLIGHT}
                  className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#FE602F]/35 transition-all group"
                >
                  <span className="w-11 h-11 rounded-xl bg-linear-to-br from-[#fff0eb] to-orange-50 text-[#FE602F] ring-1 ring-orange-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-24">
        <div className="container">
          <div className="rounded-3xl bg-linear-to-r from-[#171b24] via-[#2E3545] to-[#434c5f] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl shadow-slate-500/25">
            <div className="absolute -right-8 -top-8 w-48 h-48 bg-[#FE602F]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="relative max-w-2xl">
              <div className="flex items-center gap-2 mb-3 text-[#ffad92] text-sm font-semibold">
                <UserRound size={16} />
                <Fingerprint size={16} />
                Ready to integrate
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white! mb-3">
                Bring Middleware into your stack
              </h2>
              <p className="text-slate-200 mb-6 leading-relaxed">
                Route eSign, verification, UCC, DP and KRA traffic through one
                central engine — with unified audit logs and real-time status.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={webdevHref("/#contact")}
                  className="brand-cta-gradient inline-flex items-center justify-center px-6 py-3 rounded-full font-bold"
                >
                  Talk to us
                </Link>
                <Link
                  href={webdevHref("/")}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition"
                >
                  Explore Web Development
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes middlewareProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
