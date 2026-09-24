"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Award, Target, Users, Zap } from "lucide-react";
import { useBookDemo } from "@/context/BookDemoContext";
import { webdevHref } from "@/lib/webdevelopment/paths";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import {
  AiBankIcon,
  AiBrainIcon,
  AiBuildingIcon,
  AiCodeIcon,
  AiGlobeIcon,
  AiLayersIcon,
  AiNetworkIcon,
  AiNeuralDecor,
  AiPhoneIcon,
  AiPipelineIcon,
  AiShieldIcon,
  AiSparkCluster,
} from "@/components/forWebDevelopment/AnimatedAiIcons";
import Partners from "@/components/forWebDevelopment/Partners";
import Testimonials from "@/components/forWebDevelopment/Testimonials";
import TechnologyStackSection from "@/components/forWebDevelopment/TechnologyStackSection";

const HERO_VIDEOS = ["/heroVideo1.mp4", "/heroVideo2.mp4"];

const highlightStats = [
  { value: "1000+", label: "Projects Delivered", Icon: Target },
  { value: "25+", label: "Years Experience", Icon: Award },
  { value: "97%", label: "Client Retention", Icon: Users },
  { value: "100%", label: "Global Reach", Icon: Zap },
];

const pillars = [
  {
    title: "Banking & Fintech",
    description:
      "KYC, onboarding, trading and compliance platforms built for modern finance.",
    href: webdevHref("/banking-fintech"),
    Icon: AiBankIcon,
  },
  {
    title: "Products",
    description:
      "Trading, HRMS, mutual funds, GIS and IPO tools ready for scale.",
    href: webdevHref("/products"),
    Icon: AiLayersIcon,
  },
  {
    title: "Middleware",
    description:
      "Integration layer that connects systems, data and digital journeys.",
    href: webdevHref("/middleware"),
    Icon: AiNetworkIcon,
  },
];

const capabilities = [
  {
    title: "Websites & Web Apps",
    description:
      "Corporate sites, portals, dashboards and full-stack web platforms tailored to your workflows.",
    Icon: AiGlobeIcon,
  },
  {
    title: "Mobile Applications",
    description:
      "iOS and Android apps built for performance, security and a smooth user experience.",
    Icon: AiPhoneIcon,
  },
  {
    title: "Custom Software",
    description:
      "From enterprise systems to niche tools — we design and engineer software that fits your business.",
    Icon: AiCodeIcon,
  },
  {
    title: "End-to-End Delivery",
    description:
      "Discovery, UI/UX, development, testing, deployment and ongoing support under one roof.",
    Icon: AiPipelineIcon,
  },
];

const audiences = [
  {
    title: "Government & Public Sector",
    description:
      "Secure, compliant digital systems for departments, boards and citizen-facing services.",
    points: [
      "Portals & e-governance platforms",
      "Identity, KYC & compliance flows",
      "Secure hosting-ready architecture",
    ],
    Icon: AiShieldIcon,
  },
  {
    title: "Private Enterprises",
    description:
      "Product teams and businesses that need reliable software to scale operations and revenue.",
    points: [
      "Fintech, HRMS & trading products",
      "Customer apps & internal tools",
      "API, middleware & integrations",
    ],
    Icon: AiBuildingIcon,
  },
];

const stats = [
  { value: "Web + Mobile", label: "Any platform you need", Icon: AiGlobeIcon },
  { value: "Govt + Private", label: "Both sectors served", Icon: AiShieldIcon },
  { value: "Custom build", label: "Not just off-the-shelf", Icon: AiCodeIcon },
  { value: "End-to-end", label: "Design to deployment", Icon: AiPipelineIcon },
];

const ease = [0.22, 1, 0.36, 1];

function ColorWash({ variant = "light" }) {
  const reduce = useReducedMotion();
  const dark = variant === "dark";

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute inset-0"
        style={{
          background: dark
            ? "linear-gradient(120deg, #2E3545 0%, #3a3342 42%, #4a3838 72%, #2E3545 100%)"
            : "linear-gradient(120deg, #ffffff 0%, #fff1ea 32%, #f3f4f6 68%, #ffffff 100%)",
          backgroundSize: "220% 220%",
        }}
        animate={
          reduce
            ? undefined
            : { backgroundPosition: ["0% 40%", "100% 60%", "0% 40%"] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className={`absolute -left-24 top-8 h-80 w-80 rounded-full blur-3xl ${
          dark ? "bg-[#FE602F]/35" : "bg-[#FE602F]/20"
        }`}
        animate={reduce ? undefined : { x: [0, 120, 20, 0], y: [0, 40, 90, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className={`absolute right-[-4rem] bottom-0 h-72 w-72 rounded-full blur-3xl ${
          dark ? "bg-[#FE602F]/20" : "bg-[#2E3545]/10"
        }`}
        animate={reduce ? undefined : { x: [0, -90, -20, 0], y: [0, -50, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function HeroVideoBackground() {
  const [active, setActive] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    const video = videoRefs.current[active];
    if (!video) return;

    videoRefs.current.forEach((el, i) => {
      if (!el || i === active) return;
      el.pause();
      el.currentTime = 0;
    });

    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }, [active]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {HERO_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={src}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          onEnded={() => setActive((prev) => (prev + 1) % HERO_VIDEOS.length)}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-r from-black from-0% via-black/95 via-[15%] to-transparent to-[72%]" />
    </div>
  );
}

export default function HomePage() {
  const { openBookDemo } = useBookDemo();
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-5rem)] flex-col justify-center px-5 pb-20 pt-10 sm:px-8 lg:px-10 xl:px-20">
        <HeroVideoBackground />

        <div className="relative z-10 mr-auto w-full max-w-2xl lg:max-w-3xl [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
            <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur-md"
          >
            <AiBrainIcon size={26} />
            <span className="text-xs font-semibold tracking-wide text-white/90 uppercase">
              AI-powered software studio
            </span>
          </motion.div>

          <div className="relative">
            <AiSparkCluster className="-right-4 -top-6 hidden sm:block" />
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease }}
              className="text-2xl font-bold tracking-tight text-white! sm:text-3xl"
            >
              TechCulture AI
            </motion.p>
          </div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
            className="mt-5 max-w-3xl text-3xl font-semibold leading-[1.15] tracking-tight text-white! sm:text-4xl lg:text-5xl"
          >
            A software company building{" "}
            <span className="text-[#FE602F]!">intelligent products</span> that
            scale
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
          >
            We design and develop websites, mobile apps and custom software for
            government and private organizations — from idea to production.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.26, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href={webdevHref("/banking-fintech")}
              className="inline-flex items-center gap-2 rounded-full bg-[#FE602F] px-6 py-3 text-sm font-semibold text-white! transition hover:bg-[#e55528] hover:scale-[1.03] active:scale-[0.98]"
            >
              Explore Banking & Fintech
              <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              onClick={openBookDemo}
              className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white! backdrop-blur-sm transition hover:bg-white/20 hover:scale-[1.03] active:scale-[0.98]"
            >
              Book a demo
            </button>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden bg-white px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <ScrollReveal
            direction="up"
            delay={0.04}
            duration={0.65}
            stagger={0.08}
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
          >
            {highlightStats.map((item) => {
              const Icon = item.Icon;
              return (
                <ScrollRevealItem key={item.label} direction="up">
                  <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-[#f6f3ee] px-4 py-7 text-center sm:px-5 sm:py-8">
                    <span className="mb-3 inline-flex text-[#FE602F]">
                      <Icon size={28} strokeWidth={1.8} />
                    </span>
                    <p className="text-2xl font-bold tracking-tight text-[#2E3545]! sm:text-3xl">
                      {item.value}
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[#2E3545]/80 sm:text-[15px]">
                      {item.label}
                    </p>
                  </div>
                </ScrollRevealItem>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal direction="fade" delay={0.04} duration={0.7}>
        <section id="clients" className="scroll-mt-24">
          <Partners />
        </section>
      </ScrollReveal>

      {/* Who we are */}
      <section className="relative z-10 overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <ColorWash />
        <AiNeuralDecor className="opacity-50" />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <ScrollReveal direction="left" delay={0.04} duration={0.75}>
            <p className="text-sm font-semibold tracking-wide text-[#FE602F]">
              Who we are
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#2E3545]! sm:text-3xl lg:text-4xl">
              We are a full-stack software company
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#667085] sm:text-lg">
              TechCulture AI builds intelligent, scalable digital solutions for
              every kind of organization. Whether you need a citizen portal, a
              banking product, an enterprise tool or a consumer mobile app — we
              turn requirements into production-ready software.
            </p>
          </ScrollReveal>

          <ScrollReveal
            direction="right"
            delay={0.1}
            duration={0.75}
            stagger={0.1}
            className="divide-y divide-[#e8e6e1] border-y border-[#e8e6e1]"
          >
            {stats.map((stat) => {
              const Icon = stat.Icon;
              return (
                <ScrollRevealItem
                  key={stat.value}
                  direction="right"
                  className="flex items-center gap-4 py-4"
                >
                  <Icon size={44} />
                  <div>
                    <p className="text-base font-semibold text-[#2E3545]! sm:text-lg">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-sm text-[#667085]">{stat.label}</p>
                  </div>
                </ScrollRevealItem>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      <TechnologyStackSection />

      {/* Capabilities */}
      <section className="relative z-10 overflow-hidden bg-[#faf9f6] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <ColorWash />

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <ScrollReveal direction="fade" delay={0.03} duration={0.65}>
            <p className="text-sm font-semibold tracking-wide text-[#FE602F]">
              What we build
            </p>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-[#2E3545]! sm:text-3xl">
              Any type of software — websites, apps and beyond
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#667085]">
              From simple marketing sites to complex enterprise systems, our
              team delivers software that is secure, usable and built to grow
              with you.
            </p>
          </ScrollReveal>

          <ScrollReveal
            direction="up"
            delay={0.06}
            duration={0.55}
            stagger={0.12}
            className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {capabilities.map((item) => {
              const Icon = item.Icon;
              return (
                <ScrollRevealItem
                  key={item.title}
                  direction="scale"
                  className="border-t-2 border-[#FE602F] pt-5"
                >
                  <Icon size={56} />
                  <h3 className="mt-4 text-base font-semibold text-[#2E3545]!">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#667085]">
                    {item.description}
                  </p>
                </ScrollRevealItem>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* Focus */}
      <section className="relative z-10 overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-12">
        <ColorWash />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <ScrollReveal direction="down" delay={0.02} duration={0.6}>
            <p className="text-sm font-semibold tracking-wide text-[#FE602F]">
              Our focus
            </p>
            <h2 className="mt-2 max-w-xl text-2xl font-semibold tracking-tight text-[#2E3545]! sm:text-3xl">
              Platforms across banking, products and middleware
            </h2>
          </ScrollReveal>

          <ScrollReveal
            direction="up"
            delay={0.05}
            duration={0.55}
            stagger={0.14}
            className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-8"
          >
            {pillars.map((item) => {
              const Icon = item.Icon;
              return (
                <ScrollRevealItem key={item.title} direction="up">
                  <Link
                    href={item.href}
                    className="group flex items-start gap-4 border-b border-[#e8e6e1] py-6 transition hover:border-[#FE602F]"
                  >
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#fff0eb]">
                      <Icon size={40} />
                    </span>
                    <span>
                      <h3 className="text-lg font-semibold text-[#2E3545]!">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#667085]">
                        {item.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FE602F] transition group-hover:gap-2.5">
                        View
                        <ArrowRight size={14} />
                      </span>
                    </span>
                  </Link>
                </ScrollRevealItem>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* Who we serve */}
      <section className="relative z-10 overflow-hidden bg-[#faf9f6] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <ColorWash />
        <AiNeuralDecor className="opacity-40" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <ScrollReveal direction="up" delay={0.03} duration={0.7}>
            <p className="text-sm font-semibold tracking-wide text-[#FE602F]">
              Who we serve
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-[#2E3545]! sm:text-3xl">
              Trusted for government and private sector projects
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#667085]">
              The same engineering discipline applies whether you are a public
              institution or a growing private business — clear requirements,
              secure architecture and dependable delivery.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {audiences.map((item, index) => {
              const Icon = item.Icon;
              return (
                <ScrollReveal
                  key={item.title}
                  direction={index === 0 ? "left" : "right"}
                  delay={0.06 + index * 0.08}
                  duration={0.75}
                >
                  <div
                    className={
                      index === 0
                        ? "h-full rounded-3xl bg-[#2E3545] p-8 text-white"
                        : "h-full rounded-3xl border border-[#FE602F]/30 bg-white p-8"
                    }
                  >
                    <span
                      className={
                        index === 0
                          ? "inline-flex rounded-2xl bg-white p-2"
                          : "inline-flex"
                      }
                    >
                      <Icon size={56} />
                    </span>
                    <h3
                      className={`mt-5 text-xl font-semibold ${
                        index === 0 ? "text-white!" : "text-[#2E3545]!"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        index === 0 ? "text-white/70" : "text-[#667085]"
                      }`}
                    >
                      {item.description}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {item.points.map((point, i) => (
                        <motion.li
                          key={point}
                          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{
                            delay: 0.15 + i * 0.08,
                            duration: 0.4,
                            ease,
                          }}
                          className={`flex items-start gap-2 text-sm ${
                            index === 0 ? "text-white/90" : "text-[#2E3545]"
                          }`}
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FE602F]" />
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <ScrollReveal direction="up" delay={0.05} duration={0.75}>
        <section id="testimonials" className="scroll-mt-24">
          <Testimonials />
        </section>
      </ScrollReveal>

      {/* CTA */}
      <section className="relative z-10 overflow-hidden bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <ScrollReveal
          direction="scale"
          delay={0.04}
          duration={0.7}
          className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 overflow-hidden rounded-3xl border border-[#e8e6e1] bg-linear-to-br from-[#2E3545] to-[#1a1f2a] px-8 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-12"
        >
          <div className="pointer-events-none absolute -right-6 -top-6 opacity-80" aria-hidden>
            <AiBrainIcon size={96} />
          </div>
          <AiSparkCluster className="right-16 bottom-8 hidden sm:block" />

          <div className="relative max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white! sm:text-3xl">
              Have a software idea? Let&apos;s build it together.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/70">
              Tell us what you need — a website, a mobile app, or a complete
              custom platform. We&apos;ll help you shape it and ship it.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openBookDemo}
              className="inline-flex items-center gap-2 rounded-full bg-[#FE602F] px-6 py-3 text-sm font-semibold text-white! transition hover:bg-[#e55528] hover:scale-[1.03] active:scale-[0.98]"
            >
              Book a demo
              <ArrowRight size={16} />
            </button>
            <Link
              href={webdevHref("/contact")}
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/5 px-6 py-3 text-sm font-semibold text-white! transition hover:bg-white/15 hover:scale-[1.03] active:scale-[0.98]"
            >
              Contact us
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
