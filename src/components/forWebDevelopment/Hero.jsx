"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
} from "lucide-react";
import SpotlightCard, { TEAL_SPOTLIGHT, BRAND_SPOTLIGHT } from "@/components/SpotlightCard";
import { useBookDemo } from "@/context/BookDemoContext";

const GradientText = dynamic(() => import("@/components/GradientText"), {
  ssr: false,
  loading: () => (
    <span className="bg-linear-to-r from-[#2E3545] via-[#FE602F] to-[#2E3545] bg-clip-text text-transparent">
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

const INITIAL_FORM = {
  fullName: "",
  workEmail: "",
  phone: "",
  company: "",
  location: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return EMAIL_REGEX.test(String(email).trim());
}

function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(String(phone).trim());
}

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-sm leading-5 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#FE602F] focus:ring-2 focus:ring-[#FE602F]/20";

const labelClass = "mb-1.5 block text-xs font-semibold text-[#2E3545]";

function FieldIcon({ icon: Icon, align = "center" }) {
  return (
    <span
      className={`pointer-events-none absolute left-3.5 z-10 flex h-4 w-4 items-center justify-center text-[#FE602F] ${
        align === "top" ? "top-3.5" : "top-1/2 -translate-y-1/2"
      }`}
    >
      <Icon size={16} strokeWidth={2} className="shrink-0" />
    </span>
  );
}

function HeroBookDemoForm() {
  const { openBookDemo } = useBookDemo();
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({ workEmail: "", phone: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue =
      name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
    if (name === "workEmail" || name === "phone") {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateFormFields = () => {
    const next = { workEmail: "", phone: "" };

    if (!form.workEmail.trim()) {
      next.workEmail = "Work email is required.";
    } else if (!isValidEmail(form.workEmail)) {
      next.workEmail = "Enter a valid work email address.";
    }

    if (!form.phone.trim()) {
      next.phone = "Phone number is required.";
    } else if (form.phone.length !== 10) {
      next.phone = "Phone number must be exactly 10 digits.";
    } else if (!isValidPhone(form.phone)) {
      next.phone = "Enter a valid 10-digit mobile number.";
    }

    setFieldErrors(next);
    return !next.workEmail && !next.phone;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFormFields()) return;

    openBookDemo({
      step: "schedule",
      form: {
        ...form,
        company: form.company || "N/A",
        location: form.location || "N/A",
      },
    });
  };

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg xl:translate-x-1">
      <div className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-linear-to-br from-[#FE602F]/20 via-transparent to-[#2E3545]/15 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-orange-100/80 bg-white/95 shadow-[0_24px_60px_rgba(46,53,69,0.14)] backdrop-blur-sm">
        <div className="border-b border-orange-50 bg-linear-to-br from-[#fff4ef] via-white to-[#f5f5f6] px-5 py-4 sm:px-6">
          <div className="mb-3 flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0eb] text-[#FE602F] ring-1 ring-orange-100">
              <CalendarDays size={18} strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold tracking-tight text-[#2E3545] sm:text-2xl">
                Schedule a walkthrough
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Share a few details and pick a slot that works for you.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 px-5 py-5 sm:px-6">
          <div>
            <label htmlFor="hero-fullName" className={labelClass}>
              Full name <span className="text-[#FE602F]">*</span>
            </label>
            <div className="relative">
              <FieldIcon icon={UserRound} />
              <input
                id="hero-fullName"
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="space-y-3.5">
            <div>
              <label htmlFor="hero-workEmail" className={labelClass}>
                Work email <span className="text-[#FE602F]">*</span>
              </label>
              <div className="relative">
                <FieldIcon icon={Mail} />
                <input
                  id="hero-workEmail"
                  name="workEmail"
                  type="email"
                  required
                  value={form.workEmail}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={`${fieldClass} ${
                    fieldErrors.workEmail
                      ? "border-orange-400 focus:border-orange-500 focus:ring-orange-500/20"
                      : ""
                  }`}
                  aria-invalid={Boolean(fieldErrors.workEmail)}
                />
              </div>
              {fieldErrors.workEmail && (
                <p className="mt-1 text-xs text-orange-600">{fieldErrors.workEmail}</p>
              )}
            </div>

            <div>
              <label htmlFor="hero-phone" className={labelClass}>
                Phone <span className="text-[#FE602F]">*</span>
              </label>
              <div className="relative">
                <FieldIcon icon={Phone} />
                <input
                  id="hero-phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className={`${fieldClass} ${
                    fieldErrors.phone
                      ? "border-orange-400 focus:border-orange-500 focus:ring-orange-500/20"
                      : ""
                  }`}
                  aria-invalid={Boolean(fieldErrors.phone)}
                />
              </div>
              {fieldErrors.phone && (
                <p className="mt-1 text-xs text-orange-600">{fieldErrors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="hero-message" className={labelClass}>
              What are you looking to solve?{" "}
              <span className="text-[#FE602F]">*</span>
            </label>
            <div className="relative">
              <FieldIcon icon={MessageSquareText} align="top" />
              <textarea
                id="hero-message"
                name="message"
                required
                rows={3}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements..."
                className={`${fieldClass} min-h-24 resize-y`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="brand-cta-gradient group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white!"
          >
            Continue to Schedule
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
          <p className="text-center text-[11px] text-slate-400">
            * Required fields. Next: pick a demo slot.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function Hero() {
  const { openBookDemo } = useBookDemo();

  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="relative z-10 w-full px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-10 lg:pt-10 xl:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14" style={{marginLeft:"100px"}}>
          <div className="text-center lg:text-left">
            <h1 className="-mt-1 mb-4 text-4xl font-bold leading-[1.12] tracking-tight sm:mb-5 sm:text-5xl lg:-mt-2 lg:text-[3.4rem]">
              <GradientText
                colors={["#2E3545", "#FE602F", "#FF7A4D", "#FE602F", "#2E3545"]}
                animationSpeed={4}
                showBorder={false}
                className="hero-gradient-heading"
              >
                Digital Solutions Built for Financial Growth
              </GradientText>
            </h1>

            <p className="mx-auto mb-6 max-w-xl text-base leading-relaxed text-slate-600 sm:mb-7 sm:text-lg lg:mx-0">
              We build secure, scalable, and intelligent digital platforms
              across the complete client lifecycle. With nine production-grade
              services spanning eKYC, onboarding, E-IPO, MFD, and closure, we
              empower financial institutions to grow, innovate, and lead with
              confidence — trusted by 25+ brokers.
            </p>

            <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:mb-7 sm:flex-row sm:gap-4 lg:justify-start">
              <a
                href="#overview"
                className="hero-cta-gradient inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#2E3545]/20 transition hover:brightness-105"
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

            <div className="grid grid-cols-1 gap-2.5 text-left sm:grid-cols-2 sm:gap-3">
              {features.map((f, i) => (
                <SpotlightCard
                  key={f.title}
                  spotlightColor={i % 2 === 0 ? TEAL_SPOTLIGHT : BRAND_SPOTLIGHT}
                  className={`dash-card-enter dash-card-enter-${i + 1} group rounded-xl border border-slate-200/80 bg-white/85 p-3 shadow-[0_4px_16px_rgba(46,53,69,0.05)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md ${f.hover}`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${f.bg} ${f.ring} ring-1 shadow-sm transition-transform duration-300 group-hover:scale-105`}
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
            <HeroBookDemoForm />
          </div>
        </div>
      </div>
    </section>
  );
}
