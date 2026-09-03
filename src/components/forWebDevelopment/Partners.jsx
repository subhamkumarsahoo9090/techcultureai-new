"use client";

import Marquee from "react-fast-marquee";
import { useSite } from "../../context/siteContext";
import { useEffect } from "react";
import Image from "next/image";
import axios from "axios";

/**
 * Force HTTPS + Cloudinary transforms so black logo backgrounds
 * become transparent and the mark renders at original clarity.
 */
function toOriginalLogoUrl(url = "") {
  if (!url) return "";

  let src = String(url).trim().replace(/^http:\/\//i, "https://");

  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    // Avoid stacking transforms if already present
    if (!src.includes("/upload/e_") && !src.includes("/upload/f_")) {
      src = src.replace(
        "/upload/",
        // negate → white bg, drop white, negate back → original mark on transparent
        "/upload/f_png,e_negate,e_make_transparent:30,e_negate,q_auto:best/"
      );
    }
  }

  return src;
}

function getPartner(client) {
  if (typeof client === "string") {
    return {
      logo: toOriginalLogoUrl(client),
      href: toOriginalLogoUrl(client),
      name: "Technology partner",
    };
  }

  const rawLogo = client?.logo || client?.image || client?.url || "";
  const logo = toOriginalLogoUrl(rawLogo);
  const href =
    client?.website ||
    client?.link ||
    client?.href ||
    client?.siteUrl ||
    logo;

  return {
    logo,
    href: href || "#",
    name: client?.name || client?.title || "Technology partner",
  };
}

export default function Partners() {
  const { settingsData, setSettingsData } = useSite();

  useEffect(() => {
    async function fetchData() {
      if (!settingsData) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/site-settings`
          );
          if (res.status === 200) {
            setSettingsData(res.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [settingsData, setSettingsData]);

  const clients = settingsData?.clients || [];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f0fdfa]/50 to-white py-14 md:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 right-1/4 h-80 w-80 rounded-full bg-teal-200/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/5 h-64 w-64 rounded-full bg-emerald-100/30 blur-[90px]" />
      </div>

      <div className="container relative mx-auto px-6">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-slate-700 sm:text-3xl">
          Our{" "}
          <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
            Technology
          </span>{" "}
          Partner
        </h2>

        {clients.length > 0 ? (
          <Marquee className="marquee__" direction="left" speed={40} gradient={false}>
            {clients.map((client, index) => {
              const partner = getPartner(client);
              if (!partner.logo) return null;

              return (
                <a
                  key={`${partner.logo}-${index}`}
                  href={partner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={partner.name}
                  className="partner-logo-link mx-4 flex h-[100px] w-[190px] items-center justify-center bg-transparent px-3 transition hover:scale-[1.05] sm:mx-5 sm:h-[110px] sm:w-[200px]"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={180}
                    height={72}
                    quality={100}
                    unoptimized
                    className="partner-logo-img h-auto max-h-16 w-auto max-w-[160px] object-contain"
                    style={{
                      filter: "none",
                      WebkitFilter: "none",
                      opacity: 1,
                      mixBlendMode: "normal",
                    }}
                  />
                </a>
              );
            })}
          </Marquee>
        ) : (
          <p className="text-center text-sm text-slate-400">Loading partners…</p>
        )}
      </div>
    </section>
  );
}
