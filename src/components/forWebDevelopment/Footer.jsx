"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { LiaLinkedinIn } from "react-icons/lia";

import { useSite } from "../../context/siteContext";
import {
  navLinks,
  productPages,
  industryPages,
} from "../../lib/webdevelopment/catalog";
import { webdevHref, mainSiteHref } from "../../lib/webdevelopment/paths";

const FOOTER_LOGO = "/tc-app-logo.png";

const Footer = () => {
  const { settingsData, setSettingsData } = useSite();
  const [serviceLinks, setServiceLinks] = useState([]);
  const [visible, setVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    async function fetchSettings() {
      if (!settingsData) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/site-settings`
          );
          if (res.status === 200) {
            setSettingsData(res.data.data);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }

    async function fetchServices() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/services?showOnHeader=true`
        );
        if (res.status === 200) {
          setServiceLinks(res.data.services || []);
        }
      } catch {
        // silent — footer still works without services
      }
    }

    fetchSettings();
    fetchServices();
  }, [settingsData, setSettingsData]);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const currentYear = new Date().getFullYear();
  const footerProducts = productPages.slice(0, 6);
  const footerIndustries = [
    {
      title: "All Industries",
      href: webdevHref("/industries"),
      slug: "all-industries",
    },
    ...industryPages.slice(0, 5),
  ];
  const aboutFooterLinks = [
    { name: "About Us", href: webdevHref("/about") },
    { name: "Our Team", href: webdevHref("/team") },
    { name: "Who We Are", href: mainSiteHref("/about-us") },
    { name: "What We Do", href: mainSiteHref("/services") },
    { name: "Contact Us", href: webdevHref("/contact") },
  ];

  const socials = [
    { href: settingsData?.facebook, icon: FaFacebookF, label: "Facebook" },
    { href: settingsData?.instagram, icon: FaInstagram, label: "Instagram" },
    { href: settingsData?.linkedin, icon: LiaLinkedinIn, label: "LinkedIn" },
  ];

  return (
    <footer
      ref={footerRef}
      className={`site-footer theme-site-footer text-white ${
        visible ? "site-footer--visible" : ""
      }`}
    >
      <div className="site-footer__glow" aria-hidden />

      <div className="site-footer__inner container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Brand */}
          <div
            className="site-footer__col sm:col-span-2 lg:col-span-4"
            style={{ "--i": 0 }}
          >
            <Link
              href={webdevHref("/")}
              className="site-footer__logo inline-flex items-center transition hover:opacity-90"
            >
              <Image
                src={FOOTER_LOGO}
                alt="Tech Culture AI"
                width={220}
                height={72}
                className="h-12 w-auto object-contain sm:h-14"
                priority={false}
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              We build intelligent, scalable digital products using modern
              technologies to drive sustainable growth.
            </p>

            <div className="mt-6 space-y-3">
              {settingsData?.email && (
                <a
                  href={`mailto:${settingsData.email}`}
                  className="site-footer__contact group flex items-center gap-3 text-sm text-white/75"
                >
                  <span className="site-footer__icon-wrap">
                    <MdOutlineMail size={16} />
                  </span>
                  <span className="truncate transition-colors group-hover:text-white">
                    {settingsData.email}
                  </span>
                </a>
              )}
              {settingsData?.contactNo && (
                <a
                  href={`tel:${settingsData.contactNo}`}
                  className="site-footer__contact group flex items-center gap-3 text-sm text-white/75"
                >
                  <span className="site-footer__icon-wrap">
                    <MdOutlinePhone size={16} />
                  </span>
                  <span className="transition-colors group-hover:text-white">
                    {settingsData.contactNo}
                  </span>
                </a>
              )}
            </div>

            <div className="mt-7 flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href || "#"}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="site-footer__social"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="site-footer__col lg:col-span-2" style={{ "--i": 1 }}>
            <h4 className="site-footer__heading">Navigation</h4>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="site-footer__link">
                    {l.name}
                  </Link>
                </li>
              ))}
              {footerIndustries.slice(0, 2).map((item) => (
                <li key={`navigation-${item.slug}`}>
                  <Link href={item.href} className="site-footer__link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI-Automation */}
          <div className="site-footer__col lg:col-span-2" style={{ "--i": 2 }}>
            <h4 className="site-footer__heading">AI-Automation</h4>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link
                  href={webdevHref("/ai-automation")}
                  className="site-footer__link site-footer__link--accent"
                >
                  Overview
                </Link>
              </li>
              {serviceLinks.length > 0
                ? serviceLinks.slice(0, 5).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={mainSiteHref(`/services/${s.slug}`)}
                        className="site-footer__link"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))
                : (
                  <li>
                    <Link
                      href={mainSiteHref("/services")}
                      className="site-footer__link"
                    >
                      All Services
                    </Link>
                  </li>
                )}
              {footerIndustries.slice(2, 3).map((item) => (
                <li key={`automation-${item.slug}`}>
                  <Link href={item.href} className="site-footer__link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="site-footer__col lg:col-span-2" style={{ "--i": 3 }}>
            <h4 className="site-footer__heading">Products</h4>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link
                  href={webdevHref("/products")}
                  className="site-footer__link site-footer__link--accent"
                >
                  All Products
                </Link>
              </li>
              {footerProducts.map((p) => (
                <li key={p.slug}>
                  <Link href={p.href} className="site-footer__link">
                    {p.title}
                  </Link>
                </li>
              ))}
              {footerIndustries.slice(3, 5).map((item) => (
                <li key={`products-${item.slug}`}>
                  <Link href={item.href} className="site-footer__link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="site-footer__col lg:col-span-2" style={{ "--i": 4 }}>
            <h4 className="site-footer__heading">About Us</h4>
            <ul className="mt-5 space-y-2.5">
              {aboutFooterLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="site-footer__link">
                    {item.name}
                  </Link>
                </li>
              ))}
              {footerIndustries.slice(5).map((item) => (
                <li key={`about-${item.slug}`}>
                  <Link href={item.href} className="site-footer__link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom border-t border-white/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-5 py-6 sm:py-7 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-sm text-white/50">
            © {currentYear} TechCulture Technologies Pvt. Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5 text-sm text-white/50">
            <Link href={webdevHref("/contact")} className="transition hover:text-white">
              Privacy
            </Link>
            <Link href={webdevHref("/contact")} className="transition hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
