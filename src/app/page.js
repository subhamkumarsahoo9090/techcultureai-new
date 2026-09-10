"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Hero from "@/components/forWebDevelopment/Hero";
import Partners from "@/components/forWebDevelopment/Partners";
import Testimonials from "@/components/forWebDevelopment/Testimonials";
import Contact from "@/components/forWebDevelopment/Contact";
import EcosystemsSection from "@/components/EcosystemsSection";
import MiddlewareTeaser from "@/components/forWebDevelopment/MiddlewareTeaser";
import SupportShowcase from "@/components/forWebDevelopment/SupportShowcase";

const PhoneCarousel = dynamic(
  () => import("@/components/forWebDevelopment/PhoneCarousel"),
  { ssr: false }
);

export default function Page() {
  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <Image
          src="/hero-office-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white/92 via-white/82 to-white/55" />
        <div className="absolute inset-0 bg-linear-to-b from-white/70 via-transparent to-white/90" />
      </div>

      <div className="relative z-10">
        <section id="home" className="scroll-mt-24">
          <Hero />
        </section>
        <EcosystemsSection variant="webdevelopment" />
        <MiddlewareTeaser />
        <PhoneCarousel />
        <SupportShowcase />
        <section id="testimonials" className="scroll-mt-24">
          <Testimonials />
        </section>
        <section id="clients" className="scroll-mt-24">
          <Partners />
        </section>
        <section id="contact" className="scroll-mt-24 relative z-0 pb-8">
          <Contact />
        </section>
      </div>
    </div>
  );
}
