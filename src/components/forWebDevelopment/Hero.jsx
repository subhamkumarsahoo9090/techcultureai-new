"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import SpotlightCard, { TEAL_SPOTLIGHT, BRAND_SPOTLIGHT } from "@/components/SpotlightCard";
import { useBookDemo } from "@/context/BookDemoContext";

const GradientText = dynamic(() => import("@/components/GradientText"), {
  ssr: false,
  loading: () => (
    <span className="bg-gradient-to-r from-[#2E3545] via-[#FE602F] to-[#2E3545] bg-clip-text text-transparent">
      Digital Solutions Built for Financial Growth
    </span>
  ),
});

const features = [
  {
    title: "Secure by Design",
    desc: "Bank-grade security built into every layer of our solutions",
    bg: "from-emerald-50 to-teal-50",
    ring: "ring-emerald-100",
    hover: "hover:bg-emerald-50/60",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Scalable Architecture",
    desc: "Built to grow with your business from startup to enterprise",
    bg: "from-orange-50 to-amber-50",
    ring: "ring-orange-100",
    hover: "hover:bg-orange-50/60",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Intelligent Solutions",
    desc: "AI-powered insights for smarter decision making",
    bg: "from-sky-50 to-blue-50",
    ring: "ring-sky-100",
    hover: "hover:bg-sky-50/60",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
        <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
        <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z" />
      </svg>
    ),
  },
  {
    title: "Faster Innovation",
    desc: "Accelerate digital transformation with proven frameworks",
    bg: "from-violet-50 to-purple-50",
    ring: "ring-violet-100",
    hover: "hover:bg-violet-50/60",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const heroSlides = [
  {
    src: "/hero-ecosystem-2x.png",
    srcSet: "/hero-ecosystem.png 1024w, /hero-ecosystem-2x.png 2048w",
    alt: "TechCulture AI ecosystem — Digital KYC, live market rails, workforce platforms, and operations intelligence",
  },
  {
    src: "/hrms-ecosystem-transparent.png",
    alt: "TechCulture HRMS ecosystem — onboarding, compensation, learning, analytics, and succession planning",
  },
];

function HeroEcosystemVisual() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  return (
    <div className="relative mx-auto w-full max-w-[520px] pb-10 sm:max-w-[560px] lg:max-w-[620px] lg:translate-x-1 xl:max-w-[680px] xl:translate-x-2">
      <div
        className="pointer-events-none absolute bottom-[10%] left-1/2 z-0 h-[12%] w-[72%] -translate-x-1/2 rounded-[100%] bg-[#2E3545]/20 blur-2xl"
        aria-hidden
      />

      <div className="relative z-[1] aspect-square w-full">
        {heroSlides.map((slide, index) => {
          const isActive = activeSlide === index;

          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={slide.src}
              src={slide.src}
              srcSet={slide.srcSet}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 560px, 680px"
              alt={isActive ? slide.alt : ""}
              width={2048}
              height={2048}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              aria-hidden={!isActive}
              className={`hero-ecosystem-img pointer-events-none absolute inset-0 h-full w-full select-none object-contain transition-all duration-700 ease-out ${
                isActive
                  ? "scale-100 opacity-100"
                  : "scale-[0.96] opacity-0"
              }`}
              style={{
                imageRendering: "auto",
                WebkitBackfaceVisibility: "hidden",
                transformOrigin: "center",
              }}
              draggable={false}
            />
          );
        })}
      </div>

      <div
        className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-orange-100 bg-white/90 px-3 py-2 shadow-lg shadow-orange-500/10 backdrop-blur"
        aria-label="Hero image slides"
      >
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 ${
              activeSlide === index
                ? "w-10 bg-orange-100"
                : "w-2 bg-slate-300 hover:bg-orange-300"
            }`}
            aria-label={`Show hero image ${index + 1}`}
            aria-current={activeSlide === index ? "true" : undefined}
          >
            {activeSlide === index && (
              <span
                key={`timer-${activeSlide}`}
                className="absolute inset-y-0 left-0 bg-[#FE602F] animate-[heroSlideTimer_5s_linear_forwards]"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { openBookDemo } = useBookDemo();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-office-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/82 to-white/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/90" />
      </div>

      <div className="relative z-10 w-full px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-10 lg:pt-10 xl:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <div className="text-center lg:text-left">
            <h1 className="-mt-1 mb-4 text-4xl font-bold leading-[1.12] tracking-tight sm:mb-5 sm:text-5xl lg:-mt-2 lg:text-[3.4rem]">
              <GradientText
                colors={["#2E3545", "#FE602F", "#FF7A4D", "#FE602F", "#2E3545"]}
                animationSpeed={8}
                showBorder={false}
                className="hero-gradient-heading"
              >
                Digital Solutions Built for Financial Growth
              </GradientText>
            </h1>

            <p className="mx-auto mb-6 max-w-xl text-base leading-relaxed text-slate-600 sm:mb-7 sm:text-lg lg:mx-0">
              We build secure, scalable, and intelligent digital platforms that
              empower financial institutions to grow, innovate, and lead with
              confidence.
            </p>

            <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:mb-7 sm:flex-row sm:gap-4 lg:justify-start">
              <a
                href="#overview"
                className="hero-cta-gradient inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#005871]/25 transition hover:brightness-105 hover:shadow-orange-500/20"
              >
                Explore Solutions
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <button
                type="button"
                onClick={openBookDemo}
                className="hero-cta-demo group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-semibold"
              >
                <span className="hero-cta-demo__icon flex h-7 w-7 items-center justify-center rounded-full">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Book a Demo
              </button>
            </div>

            {/* Compact feature boxes under CTAs */}
            <div className="grid grid-cols-1 gap-2.5 text-left sm:grid-cols-2 sm:gap-3">
              {features.map((f, i) => (
                <SpotlightCard
                  key={f.title}
                  spotlightColor={i % 2 === 0 ? TEAL_SPOTLIGHT : BRAND_SPOTLIGHT}
                  className={`dash-card-enter dash-card-enter-${i + 1} group rounded-xl border border-slate-200/80 bg-white/85 p-3 shadow-[0_4px_16px_rgba(46,53,69,0.05)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md ${f.hover}`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${f.bg} ${f.ring} ring-1 shadow-sm transition-transform duration-300 group-hover:scale-105`}
                    >
                      {f.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-0.5 text-[13px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-teal-700">
                        {f.title}
                      </h3>
                      <p className="text-[11px] leading-snug text-slate-500 sm:text-[12px]">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>

          <div className="relative">
            <HeroEcosystemVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
