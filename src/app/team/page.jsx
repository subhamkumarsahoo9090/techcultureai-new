"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { LiaLinkedinIn } from "react-icons/lia";
import EmployeeReelGallery from "@/components/EmployeeReelGallery";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { team } from "@/lib/teams";

const FEATURED_LEADERS = ["Manoj Rawat", "Mukesh Chaudhari"];

function getDiscipline(role = "") {
  const value = role.toLowerCase();

  if (
    value.includes("developer") ||
    value.includes("technology") ||
    value.includes("engineer") ||
    value === "it"
  ) {
    return "Technology";
  }
  if (
    value.includes("operation") ||
    value.includes("backoffice") ||
    value.includes("depository") ||
    value.includes("rms") ||
    value.includes("risk")
  ) {
    return "Operations";
  }
  if (
    value.includes("sales") ||
    value.includes("marketing") ||
    value.includes("regional")
  ) {
    return "Growth";
  }
  if (value.includes("human") || value.includes("hr")) {
    return "People";
  }
  return "Business";
}

const TEAM_MEMBERS = team.data
  .filter(
    (member) =>
      Boolean(member.imageUrl) &&
      (FEATURED_LEADERS.includes(member.name) ||
        member.name === "Rahul Goel" ||
        member.roleId?.name?.toLowerCase().includes("developer"))
  )
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
  .map((member) => ({
    id: member._id,
    name: member.name,
    initials: member.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    image: member.imageUrl.replace(/^http:/, "https:"),
    designation: member.roleId?.name || "Team Member",
    discipline: getDiscipline(member.roleId?.name),
    linkedin: member.linkedIn,
    order: member.order,
    gradient: "from-[#2E3545] to-[#FE602F]",
  }));

const EXECUTIVE_LEADERS = TEAM_MEMBERS.filter((member) =>
  FEATURED_LEADERS.includes(member.name)
);
const WIDER_TEAM = TEAM_MEMBERS.filter(
  (member) => !FEATURED_LEADERS.includes(member.name)
);

const leadershipDescriptions = [
  "Transforming strategy into efficient operations and consistently strong customer outcomes.",
  "Leading technology strategy and building secure, scalable platforms for the future.",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TeamPage() {
  const reduceMotion = useReducedMotion();
  const animatedItem = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : itemVariants;

  return (
    <div className="overflow-hidden bg-white text-[#2E3545]">
      <section className="relative isolate flex min-h-167.5 items-center overflow-hidden border-b border-[#2E3545]/5 px-5 py-20 sm:px-6 md:min-h-180 md:py-24">
        <EmployeeReelGallery
          members={TEAM_MEMBERS.slice(0, 8)}
          className="absolute inset-0 -z-10"
        />

        <motion.div
          className="pointer-events-none container relative z-10 mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={animatedItem}
            className="mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 drop-shadow-[0_5px_18px_rgba(255,255,255,0.85)] sm:text-5xl md:text-6xl"
          >
            Meet the minds shaping{" "}
            <span className="bg-linear-to-r from-[#2E3545] via-[#FE602F] to-[#2E3545] bg-clip-text text-transparent">
              what comes next
            </span>
          </motion.h1>

          <motion.p
            variants={animatedItem}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] sm:text-lg"
          >
            A focused team of strategists and engineers united by curiosity,
            craftsmanship, and the ambition to build technology that creates
            meaningful business impact.
          </motion.p>

          <motion.div
            variants={animatedItem}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#team-members"
              className="brand-cta-gradient pointer-events-auto group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
            >
              Meet our team
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <Link
              href="/contact"
              className="brand-cta-outline pointer-events-auto inline-flex items-center gap-2 rounded-full border bg-white/85 px-6 py-3.5 text-sm font-semibold shadow-lg backdrop-blur-md transition hover:-translate-y-0.5"
            >
              Work with us
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section id="team-members" className="relative scroll-mt-24 bg-[#fffaf8] px-5 py-20 sm:px-6 md:py-28">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#FE602F]/9 blur-[110px]" />
        <div className="container mx-auto">
          <motion.div
            className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end md:mb-16"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FE602F]">
                Executive leadership
              </p>
              <h2 className="max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Vision at the top. Ownership at every level.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
              Meet the leaders guiding strategy, governance, operations, and
              technology across the organisation.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
          >
            {EXECUTIVE_LEADERS.map((member, index) => (
              <motion.article
                key={member.id}
                variants={animatedItem}
                whileHover={reduceMotion ? undefined : { y: -9 }}
                transition={{ duration: 0.28 }}
                className="group relative overflow-hidden rounded-4xl border border-[#2E3545]/10 bg-[#2E3545] shadow-[0_22px_60px_rgba(46,53,69,0.2)]"
              >
                <div className="relative aspect-[4/4.8] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 24vw"
                    unoptimized
                    className="object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#202531] via-[#202531]/12 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#2E3545]/75 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                    Leadership · 0{index + 1}
                  </span>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/90 text-[#2E3545] transition hover:border-[#FE602F] hover:bg-[#FE602F] hover:text-white"
                    >
                      <LiaLinkedinIn size={18} />
                    </a>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="text-xl font-bold text-white!">{member.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#ff9877]">
                      {member.designation}
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/10 p-5">
                  <p className="text-sm leading-6 text-slate-300">
                    {leadershipDescriptions[index]}
                  </p>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#FE602F] transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#f7f7f8] px-5 py-20 sm:px-6 md:py-28">
        <div className="container mx-auto">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
          >
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FE602F]">
                Our people
              </p>
              <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                The team turning ideas into impact.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
              Specialists across technology, operations, compliance, growth,
              research, and customer experience.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={containerVariants}
            className="grid grid-cols-2 gap-4 md:grid-cols-3"
          >
            {WIDER_TEAM.map((member) => (
              <motion.article
                key={member.id}
                variants={animatedItem}
                whileHover={reduceMotion ? undefined : { y: -7 }}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(46,53,69,0.06)] transition hover:border-[#FE602F]/30 hover:shadow-[0_18px_45px_rgba(254,96,47,0.1)]"
              >
                <div className="relative aspect-[4/4.4] overflow-hidden bg-slate-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 20vw"
                    unoptimized
                    className="object-cover object-top transition duration-600 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#2E3545]/35 to-transparent opacity-70" />
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#2E3545] opacity-0 shadow-md transition group-hover:opacity-100 hover:bg-[#FE602F] hover:text-white"
                    >
                      <LiaLinkedinIn size={16} />
                    </a>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#FE602F]">
                    {member.discipline}
                  </span>
                  <h3 className="mt-2 line-clamp-1 text-base font-bold text-[#2E3545]">
                    {member.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                    {member.designation}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>

        </div>
      </section>

    </div>
  );
}
