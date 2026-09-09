"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  Layers3,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { useBookDemo } from "@/context/BookDemoContext";

const beliefs = [
  {
    number: "01",
    title: "Compliance is designed in",
    description:
      "Security, auditability, and regulatory controls are part of the product architecture from day one—not added after launch.",
    icon: ShieldCheck,
    accent: "text-[#2E3545]",
    surface: "bg-slate-100",
  },
  {
    number: "02",
    title: "One connected lifecycle",
    description:
      "From first verification to ongoing servicing and account closure, every customer interaction works as one connected journey.",
    icon: Workflow,
    accent: "text-[#FE602F]",
    surface: "bg-[#fff1ec]",
  },
  {
    number: "03",
    title: "We ship what scales",
    description:
      "Production-ready platforms, dependable integrations, and thoughtful operations help institutions grow without adding complexity.",
    icon: Layers3,
    accent: "text-[#FE602F]",
    surface: "bg-[#fff1ec]",
  },
];

const stats = [
  { value: "25+", label: "trusted brokers" },
  { value: "9", label: "production-grade services" },
  { value: "360°", label: "client lifecycle coverage" },
  { value: "India", label: "built for regulated growth" },
];

const technologies = [
  "MERN Stack",
  "Next.js",
  "SQL",
  "MongoDB",
  "Node.js",
  "React",
  "React Native",
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutInfoPage() {
  const { openBookDemo } = useBookDemo();
  const reduceMotion = useReducedMotion();
  const animation = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : reveal;

  return (
    <div className="overflow-hidden bg-white text-slate-900">
      <section className="relative isolate min-h-162.5 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 -z-20 bg-[#fdfcfb]" />
        <div className="absolute -right-24 -top-24 -z-10 h-130 w-130 rounded-full bg-[#FE602F]/14 blur-[110px]" />
        <div className="absolute bottom-0 left-[12%] -z-10 h-64 w-64 rounded-full bg-[#2E3545]/8 blur-[90px]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(46,53,69,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(46,53,69,0.035)_1px,transparent_1px)] bg-size-[48px_48px] mask-[linear-gradient(to_bottom,black,transparent_80%)]" />

        <div className="container mx-auto grid min-h-162.5 items-center gap-12 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8">
          <motion.div initial="hidden" animate="visible">
            <motion.div
              variants={animation}
              className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#fff0eb] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#d9471b] ring-1 ring-orange-100"
            >
              <Blocks size={14} />
              About TechCulture AI
            </motion.div>

            <motion.h1
              variants={animation}
              className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#2E3545] sm:text-5xl lg:text-[4rem]"
            >
              Infrastructure for India&apos;s{" "}
              <span className="text-[#FE602F]">financial</span>{" "}
              <span className="text-[#2E3545]">industry.</span>
            </motion.h1>

            <motion.p
              variants={animation}
              className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
            >
              We build secure, scalable, and intelligent digital platforms
              across the complete client lifecycle. With nine production-grade
              services spanning eKYC, onboarding, E-IPO, MFD, and closure, we
              empower financial institutions to grow, innovate, and lead with
              confidence.
            </motion.p>

            <motion.div
              variants={animation}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={openBookDemo}
                className="brand-cta-gradient inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold"
              >
                Book a Demo
                <ArrowRight size={17} />
              </button>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 rounded-full border border-[#2E3545]/20 bg-white px-6 py-3.5 font-semibold text-[#2E3545] shadow-sm transition hover:border-[#FE602F]/50 hover:bg-[#fff5f1] hover:text-[#FE602F]"
              >
                Meet our team
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 38, rotate: 1.5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-117.5"
          >
            <div className="absolute -inset-5 -z-10 rounded-[2.25rem] bg-[#FE602F]/8 blur-2xl" />
            <div className="absolute -inset-3 -z-10 -rotate-2 rounded-4xl border border-[#FE602F]/20 bg-white/70" />

            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#252b38] p-6 text-white shadow-[0_30px_80px_rgba(46,53,69,0.3)] sm:p-8">
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
                aria-hidden
              />
              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#FE602F]/25 blur-3xl" />
              <div className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-white/6 blur-3xl" />

              <div className="relative flex items-center justify-between pb-6">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FE602F] shadow-[0_0_12px_rgba(254,96,47,0.9)]" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffad92]">
                      Built for impact
                    </p>
                  </div>
                  <h2 className="text-2xl font-semibold text-white!">
                    At a glance
                  </h2>
                </div>

                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : { y: [0, -7, 0], rotate: [0, 5, 0] }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#FE602F] text-white shadow-[0_12px_28px_rgba(254,96,47,0.35)]"
                >
                  <Blocks size={23} />
                </motion.span>
              </div>

              <div className="relative grid grid-cols-2 gap-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 12 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: 0.12 + index * 0.08 }}
                    className="group min-h-32 rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm transition-colors hover:border-[#FE602F]/45 hover:bg-white/11 sm:p-5"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.16em] text-white/35">
                        0{index + 1}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-white/25 transition group-hover:bg-[#FE602F]" />
                    </div>
                    <strong className="block text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {stat.value}
                    </strong>
                    <span className="mt-1.5 block text-xs leading-5 text-slate-300">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="relative mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#FE602F]/20 bg-[#FE602F]/10 px-4 py-3.5">
                <span className="flex items-center gap-2 text-xs font-medium text-slate-100">
                  <CheckCircle2 size={16} className="shrink-0 text-[#FE602F]" />
                  Trusted across India
                </span>
                <span className="flex items-center gap-1">
                  {[0, 1, 2].map((item) => (
                    <motion.span
                      key={item}
                      animate={
                        reduceMotion
                          ? undefined
                          : { opacity: [0.35, 1, 0.35] }
                      }
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: item * 0.25,
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-[#FE602F]"
                    />
                  ))}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f7f7f8] py-20 sm:py-24">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mb-11 max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#FE602F]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E3545]">
                What we believe
              </span>
            </div>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#2E3545] sm:text-4xl">
              Three beliefs that shape
              <br />
              everything we <span className="text-[#FE602F]">ship.</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {beliefs.map((belief) => {
              const Icon = belief.icon;

              return (
                <motion.article
                  key={belief.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5 }}
                  className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#FE602F]/30 hover:shadow-[0_18px_45px_rgba(254,96,47,0.1)] sm:p-7"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${belief.surface} ${belief.accent}`}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="text-xs font-bold tracking-[0.14em] text-slate-300">
                      {belief.number}
                    </span>
                  </div>
                  <h3 className="mt-7 text-xl font-semibold text-slate-900">
                    {belief.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {belief.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white py-16 sm:py-20">
        <div className="container mx-auto grid items-start gap-10 px-5 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-8">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#FE602F]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E3545]">
                Our technology stack
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#2E3545] sm:text-4xl">
              Technology we use.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              Modern, dependable technologies for building secure, scalable
              web and mobile products.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {technologies.map((technology, index) => (
              <div
                key={technology}
                className="group flex min-h-14 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-[#fdfcfc] px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#FE602F]/35 hover:bg-[#fff3ef] hover:text-[#FE602F]"
              >
                <span>{technology}</span>
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    index % 3 === 1 ? "bg-[#FE602F]" : "bg-[#2E3545]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
