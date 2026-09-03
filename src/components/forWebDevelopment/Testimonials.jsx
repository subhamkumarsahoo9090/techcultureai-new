"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";
import { useSite } from "../../context/siteContext";
import axios from "axios";
import Image from "next/image";
import SpotlightCard, { TEAL_SPOTLIGHT } from "@/components/SpotlightCard";

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { testimonialData, setTestimonialData } = useSite();

  useEffect(() => {
    const fetchTestimonialData = async () => {
      if (!testimonialData) {
        try {
          const res = await axios.get(`${apiBaseUrl}/api/testimonials`);
          setTestimonialData(res.data.testimonials);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchTestimonialData();
  }, [apiBaseUrl, testimonialData, setTestimonialData]);

  const pageCount = useMemo(() => {
    if (!testimonialData?.length) return 1;
    return Math.max(1, Math.ceil(testimonialData.length / 3));
  }, [testimonialData]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % pageCount);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + pageCount) % pageCount);
  };

  const renderStars = (rating = 5) => {
    const safeRating = Math.min(5, Math.max(0, Number(rating) || 5));
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < safeRating ? "text-amber-400" : "text-slate-200"
        }`}
      />
    ));
  };

  const visibleTestimonials =
    testimonialData?.slice(activeSlide * 3, activeSlide * 3 + 3) || [];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-b from-white via-[#f0fdfa]/50 to-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-teal-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/5 w-64 h-64 bg-emerald-100/30 rounded-full blur-[90px]" />
      </div>

      <div className="container relative mx-auto px-6">
        <div className="flex justify-between items-center mb-12 gap-4">
          <div className="w-10 hidden sm:block" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 text-center tracking-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Happy Clients
            </span>
          </h2>
          <div className="flex space-x-2 shrink-0">
            <button
              type="button"
              onClick={prevSlide}
              className="w-10 h-10 border border-teal-200 rounded-full flex items-center justify-center text-teal-700 bg-white hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-colors duration-300 shadow-sm"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-10 h-10 border border-teal-600 rounded-full flex items-center justify-center bg-gradient-to-r from-teal-600 to-emerald-500 text-white hover:from-teal-700 hover:to-emerald-600 transition-colors duration-300 shadow-md shadow-teal-500/20"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <SpotlightCard
              key={testimonial?._id || `${testimonial?.name}-${index}`}
              spotlightColor={TEAL_SPOTLIGHT}
              className="bg-white/90 border border-teal-100/80 p-7 sm:p-8 rounded-2xl shadow-[0_8px_30px_rgba(13,148,136,0.06)] relative"
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-500 rounded-full flex items-center justify-center shadow-md shadow-teal-500/25 z-[2]">
                <FaQuoteLeft className="text-white w-4 h-4" />
              </div>

              <div className="flex mb-4">{renderStars(testimonial?.rating ?? 5)}</div>

              <p className="text-slate-600 mb-6 italic leading-relaxed text-[15px]">
                &ldquo;{testimonial?.message}&rdquo;
              </p>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-teal-50 ring-1 ring-teal-100 flex items-center justify-center overflow-hidden shrink-0">
                    {testimonial?.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial?.name || "Client"}
                        width={44}
                        height={44}
                        quality={100}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-teal-600 font-bold text-sm">
                        {(testimonial?.name || "C").charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-slate-800 truncate">
                      {testimonial?.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {testimonial?.title}
                    </p>
                  </div>
                </div>
                {testimonial?.company && (
                  <span className="text-teal-600 font-bold text-sm shrink-0">
                    {testimonial.company}
                  </span>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    index === activeSlide
                      ? "bg-gradient-to-r from-teal-600 to-emerald-500"
                      : "bg-slate-200"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
