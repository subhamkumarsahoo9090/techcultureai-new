"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/forWebDevelopment/Hero";
import Partners from "@/components/forWebDevelopment/Partners";
import Testimonials from "@/components/forWebDevelopment/Testimonials";
import Contact from "@/components/forWebDevelopment/Contact";
import EcosystemsSection from "@/components/EcosystemsSection";
import MiddlewareTeaser from "@/components/forWebDevelopment/MiddlewareTeaser";

const PhoneCarousel = dynamic(
  () => import("@/components/forWebDevelopment/PhoneCarousel"),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <section id="home" className="scroll-mt-24">
        <Hero />
      </section>
      <EcosystemsSection variant="webdevelopment" />
      <MiddlewareTeaser />
      <PhoneCarousel />
      <section id="testimonials" className="scroll-mt-24">
        <Testimonials />
      </section>
      <section id="clients" className="scroll-mt-24">
        <Partners />
      </section>
      <section id="contact" className="scroll-mt-24 relative z-0 pb-8">
        <Contact />
      </section>
    </>
  );
}
