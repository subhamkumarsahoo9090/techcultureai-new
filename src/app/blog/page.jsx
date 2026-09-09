"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Search,
  Sparkles,
} from "lucide-react";
import {
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
} from "react-icons/si";
import { blog } from "@/lib/blog";

const FILTERS = [
  { value: "all", label: "All insights" },
  { value: "brokers", label: "Brokers" },
  { value: "mfd", label: "MFD" },
  { value: "nbfc", label: "NBFC" },
];

const floatingLogos = [
  {
    Icon: SiReact,
    label: "React",
    position: "left-[2%] top-[16%] sm:left-[8%]",
    color: "text-[#61dafb]",
    delay: 0,
  },
  {
    Icon: SiNextdotjs,
    label: "Next.js",
    position: "right-[2%] top-[12%] sm:right-[8%]",
    color: "text-[#2E3545]",
    delay: 0.4,
  },
  {
    Icon: SiNodedotjs,
    label: "Node.js",
    position: "bottom-[8%] left-[10%] sm:left-[16%]",
    color: "text-[#4f9f43]",
    delay: 0.8,
  },
  {
    Icon: SiMongodb,
    label: "MongoDB",
    position: "bottom-[5%] right-[10%] sm:right-[15%]",
    color: "text-[#47a248]",
    delay: 1.2,
  },
];

function formatDate(value) {
  if (!value) return "TechCulture Insights";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function ArticleImage({ article, className = "" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={article.heroImage}
      alt={article.heroImageAlt || article.title}
      loading="lazy"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

function ArticleCard({ article, index, reduceMotion }) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07 }}
      whileHover={reduceMotion ? undefined : { y: -7 }}
      className="group h-full"
    >
      <Link
        href={`/blog/${article.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_14px_40px_rgba(46,53,69,0.06)] transition duration-300 hover:border-[#FE602F]/30 hover:shadow-[0_22px_55px_rgba(254,96,47,0.11)]"
      >
        <div className="relative h-52 overflow-hidden bg-slate-100">
          <ArticleImage
            article={article}
            className="transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#202632]/55 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#252b38]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            {article.vertical && article.vertical !== "all"
              ? article.vertical
              : article.tags?.[0] || "Fintech"}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} className="text-[#FE602F]" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={13} className="text-[#FE602F]" />
              {article.readMinutes || 5} min read
            </span>
          </div>

          <h2 className="mt-4 line-clamp-2 text-xl font-semibold leading-snug tracking-[-0.02em] text-[#2E3545] transition group-hover:text-[#FE602F]">
            {article.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
            {article.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <div className="flex min-w-0 gap-1.5 overflow-hidden">
              {(article.tags || []).slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="truncate rounded-full bg-[#fff1ec] px-2.5 py-1 text-[10px] font-semibold text-[#d9471b]"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <span className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#2E3545] transition group-hover:text-[#FE602F]">
              Read
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPage() {
  const reduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const publishedPosts = useMemo(
    () =>
      blog
        .filter((article) => article.status === "PUBLISHED")
        .sort(
          (a, b) =>
            new Date(b.publishedAt || 0).getTime() -
            new Date(a.publishedAt || 0).getTime()
        ),
    []
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return publishedPosts.filter((article) => {
      const matchesFilter =
        activeFilter === "all" || article.vertical === activeFilter;
      const searchText = [
        article.title,
        article.subtitle,
        article.excerpt,
        ...(article.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [activeFilter, publishedPosts, query]);

  const featuredPost = publishedPosts[0];
  const visiblePosts = filteredPosts
    .filter((article) => article.slug !== featuredPost?.slug)
    .slice(0, visibleCount);

  const updateFilter = (value) => {
    setActiveFilter(value);
    setVisibleCount(12);
  };

  return (
    <div className="overflow-hidden bg-white text-[#2E3545]">
      <section className="relative isolate overflow-hidden bg-[#fdfcfb] py-16 sm:py-20 lg:py-24">
        <div className="absolute -right-32 -top-32 -z-20 h-150 w-150 rounded-full bg-[#FE602F]/13 blur-[120px]" />
        <div className="absolute -bottom-40 left-[8%] -z-20 h-96 w-96 rounded-full bg-[#2E3545]/7 blur-[110px]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(46,53,69,0.055)_1px,transparent_1px)] bg-size-[26px_26px] opacity-50" />

        <div className="container mx-auto grid items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-[#FE602F]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                TechCulture AI Journal
              </span>
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-[4rem]">
              Ideas for building better{" "}
              <span className="text-[#FE602F]">financial technology.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Practical insights on digital KYC, onboarding, automation,
              compliance, and the technology shaping India&apos;s financial
              ecosystem.
            </p>

            <label className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 pl-4 shadow-[0_12px_35px_rgba(46,53,69,0.07)] focus-within:border-[#FE602F]/50 focus-within:ring-4 focus-within:ring-[#FE602F]/8">
              <Search size={19} className="shrink-0 text-[#FE602F]" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(12);
                }}
                placeholder="Search articles, KYC, APIs..."
                className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm text-[#2E3545] outline-none placeholder:text-slate-400"
              />
              <span className="hidden rounded-xl bg-[#2E3545] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white sm:block">
                {publishedPosts.length} articles
              </span>
            </label>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto h-80 w-full max-w-117.5 sm:h-96"
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -10, 0], rotate: [0, 1.5, 0] }
              }
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 flex h-48 w-[82%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-4xl border border-[#FE602F]/20 bg-white p-6 shadow-[0_30px_80px_rgba(46,53,69,0.16)] sm:h-56"
            >
              <div className="absolute inset-3 rounded-3xl border border-dashed border-[#2E3545]/10" />
              <Image
                src="/tc-new-logo-2.png"
                alt="TechCulture AI"
                width={1024}
                height={275}
                priority
                className="relative h-auto w-full object-contain"
              />
            </motion.div>

            {floatingLogos.map(({ Icon, label, position, color, delay }) => (
              <motion.div
                key={label}
                animate={
                  reduceMotion
                    ? undefined
                    : { y: [0, -9, 0], rotate: [0, 5, -3, 0] }
                }
                transition={{
                  duration: 3.8,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute ${position} flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_12px_30px_rgba(46,53,69,0.12)] sm:h-16 sm:w-16`}
                title={label}
              >
                <Icon className={`text-2xl sm:text-3xl ${color}`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {featuredPost && !query && activeFilter === "all" && (
        <section className="relative overflow-hidden bg-[#fffaf8] py-16 sm:py-20">
          <div className="absolute -right-28 -top-40 h-96 w-96 rounded-full bg-[#FE602F]/9 blur-[110px]" />
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FE602F]">
                  <Sparkles size={14} />
                  Featured insight
                </span>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  A perspective worth exploring.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-500">
                A focused read selected by the TechCulture AI editorial team.
              </p>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group relative grid overflow-hidden rounded-4xl border border-[#FE602F]/15 bg-white shadow-[0_24px_70px_rgba(46,53,69,0.12)] transition-shadow duration-500 hover:shadow-[0_30px_85px_rgba(254,96,47,0.16)] lg:grid-cols-[0.88fr_1.12fr]"
              >
                <span className="absolute inset-x-0 top-0 z-20 h-1 bg-linear-to-r from-[#FE602F] via-[#ff9877] to-[#2E3545]" />

                <div className="relative order-2 flex flex-col justify-center overflow-hidden p-7 sm:p-10 lg:order-1 lg:p-12">
                  <div className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-[#FE602F]/8 blur-3xl" />
                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#fff0eb] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#d9471b]">
                        <BookOpen size={13} />
                        Editor&apos;s choice
                      </span>
                      {(featuredPost.tags || []).slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-semibold text-slate-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="mt-6 text-2xl font-semibold leading-[1.18] tracking-tight text-[#2E3545] transition-colors group-hover:text-[#d9471b] sm:text-3xl lg:text-[2.15rem]">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-500 sm:text-[15px]">
                      {featuredPost.excerpt}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-6 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={14} className="text-[#FE602F]" />
                        {formatDate(featuredPost.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock3 size={14} className="text-[#FE602F]" />
                        {featuredPost.readMinutes || 5} min read
                      </span>
                    </div>

                    <span className="mt-7 inline-flex items-center gap-3 font-semibold text-[#2E3545] transition group-hover:text-[#FE602F]">
                      Read full article
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FE602F] text-white shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowRight size={16} />
                      </span>
                    </span>
                  </div>
                </div>

                <div className="relative order-1 min-h-72 overflow-hidden bg-slate-100 lg:order-2 lg:min-h-110">
                  <ArticleImage
                    article={featuredPost}
                    className="transition duration-1000 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#252b38]/45 via-transparent to-transparent" />
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <section className="bg-[#f7f7f8] py-16 sm:py-20">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FE602F]">
                Knowledge hub
              </span>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
                {query ? "Search results" : "Latest insights"}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {filteredPosts.length} articles found
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => updateFilter(filter.value)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeFilter === filter.value
                      ? "bg-[#FE602F] text-white shadow-lg shadow-orange-500/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-[#FE602F]/35 hover:text-[#FE602F]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {visiblePosts.length > 0 ? (
            <>
              <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {visiblePosts.map((article, index) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    index={index}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>

              {visibleCount <
                filteredPosts.filter(
                  (article) => article.slug !== featuredPost?.slug
                ).length && (
                <div className="mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + 12)}
                    className="brand-cta-gradient inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold"
                  >
                    Load more articles
                    <ArrowRight size={17} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <Search className="mx-auto text-[#FE602F]" size={28} />
              <h3 className="mt-4 text-lg font-semibold">No articles found</h3>
              <p className="mt-2 text-sm text-slate-500">
                Try another keyword or select a different category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
