"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { LiaLinkedinIn } from "react-icons/lia";
import EmployeeReelGallery from "@/components/EmployeeReelGallery";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  Rocket,
  Smartphone,
  Sparkles,
} from "lucide-react";

const TEAM_MEMBERS = [
  {
    name: "Manoj Rawat",
    initials: "MR",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85",
    designation: "Director",
    discipline: "Leadership & Strategy",
    description:
      "Guiding TechCulture's vision, partnerships, and delivery of scalable technology solutions.",
    linkedin: "https://www.linkedin.com/in/manojrawat1010",
    icon: Rocket,
    gradient: "from-[#005871] via-[#087d8f] to-[#18a4b0]",
    glow: "bg-cyan-300",
  },
  {
    name: "Nikhil Chaudhary",
    initials: "NC",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85",
    designation: "Full Stack Developer",
    discipline: "Web Platforms",
    description:
      "Building responsive interfaces, reliable APIs, and high-performance full-stack applications.",
    linkedin: "https://www.linkedin.com/in/nikhilroyal04",
    icon: Braces,
    gradient: "from-[#fe602f] via-[#f97316] to-[#fb923c]",
    glow: "bg-orange-300",
  },
  {
    name: "Vivek Singh",
    initials: "VS",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=85",
    designation: "Full Stack Engineer",
    discipline: "Product Engineering",
    description:
      "Turning product ideas into dependable digital experiences across frontend and backend systems.",
    linkedin: "https://www.linkedin.com/in/vivek-singh-5b343b281",
    icon: Code2,
    gradient: "from-[#063b51] via-[#005871] to-[#0d9488]",
    glow: "bg-teal-300",
  },
  {
    name: "Rahul Goel",
    initials: "RG",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=700&q=85",
    designation: "Software Engineer",
    discipline: "Software Development",
    description:
      "Engineering maintainable software and collaborating across teams to deliver polished solutions.",
    linkedin: "https://www.linkedin.com/in/rahul-goel-314497240",
    icon: Sparkles,
    gradient: "from-[#f4511e] via-[#fe602f] to-[#fb8c55]",
    glow: "bg-orange-300",
  },
  {
    name: "Ananya",
    initials: "AN",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=85",
    designation: "Full Stack Mobile App Developer",
    discipline: "Mobile Experiences",
    description:
      "Creating smooth, user-focused mobile experiences backed by robust full-stack engineering.",
    linkedin: "https://www.linkedin.com/in/ananya1808",
    icon: Smartphone,
    gradient: "from-[#075266] via-[#0087a0] to-[#12a594]",
    glow: "bg-cyan-300",
  },
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
    <div className="overflow-hidden bg-[#fbfcfc] text-slate-900">
      <section className="relative isolate flex min-h-[670px] items-center overflow-hidden border-b border-teal-900/5 px-5 py-20 sm:px-6 md:min-h-[720px] md:py-24">
        <EmployeeReelGallery
          members={TEAM_MEMBERS}
          className="absolute inset-0 -z-10"
        />

        <motion.div
          className="pointer-events-none container relative z-10 mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={animatedItem}>
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#005871] shadow-lg backdrop-blur-md">
              <Sparkles size={14} className="text-[#fe602f]" />
              The people behind the product
            </span>
          </motion.div>

          <motion.h1
            variants={animatedItem}
            className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 drop-shadow-[0_5px_18px_rgba(255,255,255,0.85)] sm:text-5xl md:text-6xl"
          >
            Meet the minds shaping{" "}
            <span className="bg-gradient-to-r from-[#005871] via-[#008cba] to-[#fe602f] bg-clip-text text-transparent">
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

      <section
        id="team-members"
        className="relative scroll-mt-24 px-5 py-20 sm:px-6 md:py-28"
      >
        <div className="container mx-auto">
          <motion.div
            className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end md:mb-16"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#fe602f]">
                Our team
              </p>
              <h2 className="max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Different strengths. One shared purpose.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
              We blend strategic thinking, thoughtful design, and strong
              engineering to move every project from idea to impact.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={containerVariants}
          >
            {TEAM_MEMBERS.map((member, index) => {
              const Icon = member.icon;

              return (
                <motion.article
                  key={member.name}
                  variants={animatedItem}
                  whileHover={reduceMotion ? undefined : { y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={`group relative min-h-[390px] overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-7 shadow-[0_18px_50px_rgba(2,68,78,0.07)] ${
                    index > 2 ? "xl:translate-x-1/2" : ""
                  }`}
                >
                  <div
                    className={`absolute -right-16 -top-16 h-44 w-44 rounded-full ${member.glow} opacity-20 blur-3xl transition duration-500 group-hover:scale-125 group-hover:opacity-35`}
                  />
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#005871] via-[#008cba] to-[#fe602f]" />

                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div
                        className={`relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-[30px] bg-gradient-to-br ${member.gradient} text-3xl font-bold tracking-tight text-white shadow-xl`}
                      >
                        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.38),transparent_36%)]" />
                        <span className="relative">{member.initials}</span>
                        <span className="absolute -bottom-8 -right-5 h-20 w-20 rounded-full border border-white/20 bg-white/10" />
                      </div>

                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition hover:border-[#008cba] hover:bg-[#008cba] hover:text-white"
                      >
                        <LiaLinkedinIn size={19} />
                      </a>
                    </div>

                    <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#008cba]">
                      <Icon size={15} />
                      {member.discipline}
                    </div>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                      {member.name}
                    </h3>
                    <p className="mt-1.5 font-semibold text-[#fe602f]">
                      {member.designation}
                    </p>
                    <p className="mt-5 border-t border-slate-100 pt-5 text-sm leading-6 text-slate-500">
                      {member.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
