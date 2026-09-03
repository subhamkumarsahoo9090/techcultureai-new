"use client";
import {
  BarChart3,
  Bot,
  Brain,
  Building2,
  CalendarDays,
  ChartLine,
  Cloud,
  Cpu,
  Factory,
  Gavel,
  GraduationCap,
  Headphones,
  HeartPulse,
  Info,
  Landmark,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquare,
  PenLine,
  Phone,
  Plane,
  Radio,
  ScanFace,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Ticket,
  Truck,
  UserPlus,
  UserRound,
  Users,
  Wrench,
  Workflow,
  Zap,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  getIndustryBySlug,
  getProductBySlug,
} from "../lib/webdevelopment/catalog";
import { slugify, webdevHref } from "../lib/webdevelopment/paths";

function resolveProductHref(label, variant) {
  if (variant === "webdevelopment") {
    const slug = slugify(label);
    const page = getProductBySlug(slug);
    return page?.href || webdevHref(`/products/${slug}`);
  }
  return "/services";
}

function resolveIndustryHref(item, variant) {
  if (variant === "webdevelopment") {
    const slug = slugify(item.title);
    const page = getIndustryBySlug(slug);
    return page?.href || webdevHref(`/industries/${slug}`);
  }
  return item.href || "/services";
}

function resolveAutomationHref(service, variant) {
  if (variant === "webdevelopment") {
    return webdevHref("/ai-automation");
  }
  return `/services/${service.slug}`;
}

function resolveAboutHref(item, variant) {
  if (variant === "webdevelopment") {
    if (item.href === "/about-us") return webdevHref("/about");
    if (item.href === "/services") return webdevHref("/products");
    if (item.href === "/contact-us") return webdevHref("/contact");
  }
  return item.href;
}

export const productColumns = [
  [
    {
      title: "IDENTITY & COMPLIANCE",
      icon: ScanFace,
      links: [
        { label: "Aadhaar Verification" },
        { label: "Digital KYC" },
        { label: "Business KYC" },
        { label: "Re-KYC" },
        { label: "Account Closure" },
        { label: "Joint Account KYC" },
      ],
    },
    {
      title: "DIGITAL SIGNATURES",
      icon: PenLine,
      links: [
        { label: "Aadhaar eSign" },
        { label: "Secure eSignature" },
      ],
    },
  ],
  [
    {
      title: "DIGITAL ONBOARDING",
      icon: UserPlus,
      links: [
        { label: "Partner Onboarding" },
        { label: "Vendor Onboarding" },
        { label: "Supplier Onboarding" },
        { label: "Employee Onboarding" },
        { label: "Gig Workforce Onboarding" },
      ],
    },
    {
      title: "AI COMMUNICATION",
      icon: MessageSquare,
      links: [
        { label: "WhatsApp Automation", trailing: "whatsapp" },
        { label: "AI Virtual Assistant", trailingIcon: Bot },
        { label: "Live Chat Support", trailingIcon: MessageCircle },
      ],
    },
  ],
  [
    {
      title: "CUSTOMER ENGAGEMENT",
      icon: ChartLine,
      links: [
        { label: "Lead Management", trailingIcon: UserRound },
        { label: "Sales Pipeline", trailingIcon: BarChart3 },
        { label: "Campaign Management", trailingIcon: Megaphone },
        { label: "Appointment Scheduler", trailingIcon: CalendarDays },
        { label: "Helpdesk", trailingIcon: Ticket },
        { label: "Field Service", trailingIcon: Wrench },
        { label: "Contact Center", trailingIcon: Phone },
        { label: "Email Automation", trailingIcon: Mail },
        { label: "SMS & WhatsApp Campaigns", trailingIcon: MessageSquare },
      ],
    },
    {
      title: "IPO SERVICES",
      icon: Gavel,
      links: [{ label: "Online IPO Bidding", trailingIcon: Landmark }],
    },
  ],
];

export const productCategories = productColumns.flat();


export const industryItems = [
  {
    title: "Banking & FinTech",
    subtitle: "Secure automation for modern finance",
    href: "/services",
    icon: Landmark,
  },
  {
    title: "Healthcare",
    subtitle: "Smarter patient and ops workflows",
    href: "/services",
    icon: HeartPulse,
  },
  {
    title: "Travel & Hospitality",
    subtitle: "Personalized journeys at scale",
    href: "/services",
    icon: Plane,
  },
  {
    title: "Manufacturing",
    subtitle: "Predictive ops and quality AI",
    href: "/services",
    icon: Factory,
  },
  {
    title: "EdTech",
    subtitle: "Adaptive learning experiences",
    href: "/services",
    icon: GraduationCap,
  },
  {
    title: "E-Commerce",
    subtitle: "Conversion-focused commerce AI",
    href: "/services",
    icon: ShoppingCart,
  },
  {
    title: "Logistics",
    subtitle: "Route, fleet and delivery intelligence",
    href: "/services",
    icon: Truck,
  },
  {
    title: "Telecom",
    subtitle: "Customer care and network insights",
    href: "/services",
    icon: Radio,
  },
  {
    title: "Real Estate",
    subtitle: "Lead scoring and virtual tours",
    href: "/services",
    icon: Building2,
  },
  {
    title: "Insurance",
    subtitle: "Faster claims and risk scoring",
    href: "/services",
    icon: ShieldCheck,
  },
];

export const aboutItems = [
  {
    title: "Who We Are",
    subtitle: "Our story, vision and culture",
    href: "/about-us",
    source: "about",
    icon: Users,
  },
  {
    title: "What We Do",
    subtitle: "Services that drive real outcomes",
    href: "/services",
    source: "services",
    icon: Workflow,
  },
  {
    title: "Contact Us",
    subtitle: "Let's build something together",
    href: "/contact-us",
    source: "about",
    icon: Mail,
  },
];

const automationIcons = [Bot, Brain, Cpu, Sparkles, Workflow, Zap, Cloud, Headphones];

function sanitizeSubtitle(input) {
  if (!input || typeof input !== "string") return "";
  // Remove HTML tags (e.g. <div>, <p>, <span>...)
  let text = input.replace(/<[^>]*>/g, " ");
  // Decode common HTML entities that often appear in descriptions
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  // Collapse whitespace
  text = text.replace(/\s+/g, " ").trim();
  return text;
}

const megaThemes = {
  default: {
    accentText: "text-primary",
    accentBg: "bg-primary/5",
    accentBgStrong: "bg-primary/15",
    accentBorder: "border-primary/20",
    accentBorderMd: "border-primary/30",
    accentBorderBottom: "border-primary/50",
    hoverBg: "hover:bg-[#fff5f1]",
    hoverText: "group-hover:text-primary",
    iconHover: "group-hover:bg-primary group-hover:text-white",
    bullet: "bg-primary",
    productsShell:
      "bg-[#faf7f4] rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.22)] border border-orange-100/60",
    productCard:
      "bg-white/80 rounded-xl border border-orange-100/70 p-4 shadow-[0_2px_10px_rgba(255,99,51,0.04)]",
    productIconBox:
      "w-10 h-10 rounded-xl border border-primary/30 bg-[#fff5f1] text-primary",
    sidebarGradient:
      "from-[#ff6333]/15 via-[#fe9272]/20 to-[#040416]/10",
    bar1: "bg-primary/40",
    bar2: "bg-primary/70",
    bar3: "bg-primary",
    bar4: "bg-[#e15226]/80",
    bar5: "bg-[#040416]/50",
    bar6: "bg-[#040416]/35",
    decor: "text-[#040416]/50",
    shellShadow: "shadow-[0_20px_60px_rgba(0,0,0,0.18)]",
    linkHover: "hover:text-primary",
  },
  webdevelopment: {
    accentText: "text-teal-600",
    accentBg: "bg-teal-50",
    accentBgStrong: "bg-teal-100",
    accentBorder: "border-teal-200",
    accentBorderMd: "border-teal-200",
    accentBorderBottom: "border-teal-400/60",
    hoverBg: "hover:bg-teal-50",
    hoverText: "group-hover:text-teal-700",
    iconHover: "group-hover:bg-teal-600 group-hover:text-white",
    bullet: "bg-teal-500",
    productsShell:
      "bg-gradient-to-br from-[#f0fdfa] to-white rounded-2xl shadow-[0_24px_70px_rgba(13,148,136,0.18)] border border-teal-100/80",
    productCard:
      "bg-white/95 rounded-xl border border-teal-100 p-4 shadow-[0_2px_12px_rgba(13,148,136,0.08)]",
    productIconBox:
      "w-10 h-10 rounded-xl border border-teal-200 bg-teal-50 text-teal-600",
    sidebarGradient:
      "from-teal-500/20 via-emerald-400/25 to-teal-900/10",
    bar1: "bg-teal-300/70",
    bar2: "bg-teal-500/80",
    bar3: "bg-teal-600",
    bar4: "bg-emerald-500/80",
    bar5: "bg-teal-800/40",
    bar6: "bg-teal-700/30",
    // White background par clearly dikhane ke liye higher opacity
    decor: "text-teal-700/70",
    shellShadow: "shadow-[0_20px_60px_rgba(13,148,136,0.15)]",
    linkHover: "hover:text-teal-400",
  },
};

function getMegaTheme(variant = "default") {
  return megaThemes[variant] || megaThemes.default;
}

function MegaSidebar({ title, description, children }) {
  return (
    <div className="bg-[#f8f8f8] p-7 flex flex-col justify-between border-r border-gray-100">
      <div>
        <h3 className="text-[22px] font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed">{description}</p>
      </div>
      <div className="mt-8 relative">{children}</div>
    </div>
  );
}

function MegaShell({ children, cols = "grid-cols-[240px_1fr]", theme }) {
  const t = theme || megaThemes.default;
  return (
    <div
      className={`bg-white rounded-2xl ${t.shellShadow} border border-gray-100 overflow-hidden`}
    >
      <div className={`grid ${cols}`}>{children}</div>
    </div>
  );
}

function MegaItem({ icon: Icon, title, subtitle, onClick, theme }) {
  const t = theme || megaThemes.default;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 text-left p-3 rounded-xl ${t.hoverBg} transition-colors duration-200 group`}
    >
      <span
        className={`w-10 h-10 rounded-full border ${t.accentBorder} ${t.accentBg} ${t.accentText} flex items-center justify-center shrink-0 ${t.iconHover} transition-colors duration-200`}
      >
        <Icon size={18} strokeWidth={2} />
      </span>
      <span className="min-w-0 pt-0.5">
        <span className={`block text-[14px] font-bold text-gray-900 ${t.hoverText} transition-colors`}>
          {title}
        </span>
        {subtitle && (
          <span className="block text-[12px] text-gray-500 mt-0.5 leading-snug">
            {subtitle}
          </span>
        )}
      </span>
    </button>
  );
}

export function ProductsMegaPanel({ onNavigate, variant = "default" }) {
  const t = getMegaTheme(variant);

  const renderTrailing = (link) => {
    if (link.trailing === "whatsapp") {
      return <FaWhatsapp className="text-[#25D366] text-[16px] shrink-0" />;
    }
    if (link.trailingIcon) {
      const TrailingIcon = link.trailingIcon;
      return (
        <TrailingIcon
          size={15}
          strokeWidth={2}
          className={`${t.accentText} shrink-0 opacity-80`}
        />
      );
    }
    return null;
  };

  return (
    <div className={`${t.productsShell} overflow-hidden`}>
      <div className="grid grid-cols-3 gap-4 p-5">
        {productColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {column.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.title} className={t.productCard}>
                  <div className="flex items-center gap-3 mb-3.5">
                    <span
                      className={`${t.productIconBox} flex items-center justify-center shrink-0`}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <h4
                      className={`text-[13px] font-bold tracking-[0.06em] ${t.accentText} uppercase inline-block pb-1 border-b-2 ${t.accentBorderBottom}`}
                    >
                      {category.title}
                    </h4>
                  </div>

                  <ul className="space-y-0.5">
                    {category.links.map((link) => (
                      <li key={link.label}>
                        <button
                          type="button"
                          onClick={() =>
                            onNavigate(
                              resolveProductHref(link.label, variant),
                              "products"
                            )
                          }
                          className={`w-full flex items-center justify-between gap-3 text-left py-1.5 px-1 rounded-md ${t.hoverBg} transition-colors duration-200 group`}
                        >
                          <span className="flex items-center gap-2.5 min-w-0">
                            <span className={`w-1.5 h-1.5 rounded-full ${t.bullet} shrink-0`} />
                            <span
                              className={`text-[13.5px] text-gray-800 font-medium ${t.hoverText} transition-colors truncate`}
                            >
                              {link.label}
                            </span>
                          </span>
                          {renderTrailing(link)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function IndustriesMegaPanel({ onNavigate, variant = "default" }) {
  const t = getMegaTheme(variant);

  return (
    <MegaShell theme={t}>
      <MegaSidebar
        title="Industries"
        description="Industry-ready AI and automation solutions tailored for your sector's unique workflows and growth goals."
      >
        <div
          className={`w-full h-28 rounded-xl bg-gradient-to-br ${t.sidebarGradient} flex items-end justify-center overflow-hidden relative`}
        >
          <div className="flex items-end gap-1.5 pb-3 px-4 w-full justify-center">
            <span className={`w-6 h-10 rounded-t-md ${t.bar1}`} />
            <span className={`w-7 h-16 rounded-t-md ${t.bar2}`} />
            <span className={`w-8 h-12 rounded-t-md ${t.bar5}`} />
            <span className={`w-6 h-20 rounded-t-md ${t.bar3}`} />
            <span className={`w-7 h-14 rounded-t-md ${t.bar4}`} />
            <span className={`w-5 h-9 rounded-t-md ${t.bar6}`} />
          </div>
          <Sparkles size={18} className={`absolute top-3 right-4 ${t.accentText}`} />
          <Bot size={20} className={`absolute top-4 left-4 ${t.decor}`} />
        </div>
      </MegaSidebar>

      <div className="grid grid-cols-3 gap-x-4 gap-y-1 p-5">
        {industryItems.map((item) => (
          <MegaItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            theme={t}
            onClick={() =>
              onNavigate(resolveIndustryHref(item, variant), "industries")
            }
          />
        ))}
      </div>
    </MegaShell>
  );
}

export function AutomationMegaPanel({ services = [], onNavigate, variant = "default" }) {
  const t = getMegaTheme(variant);

  return (
    <MegaShell theme={t}>
      <MegaSidebar
        title="AI-Automation"
        description="Intelligent automation services that streamline operations, reduce cost, and unlock scalable growth."
      >
        <div
          className={`w-full h-28 rounded-xl bg-gradient-to-br ${t.sidebarGradient} flex items-center justify-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-30">
            <div
              className={`absolute top-4 left-6 w-10 h-10 rounded-full border-2 ${t.accentBorderMd} border-current ${t.accentText}`}
            />
            <div
              className={`absolute bottom-5 right-8 w-8 h-8 rounded-lg border-2 ${t.bar4} border-current`}
            />
          </div>
          <span
            className={`w-14 h-14 rounded-2xl bg-white shadow-md ${t.accentText} flex items-center justify-center z-[1]`}
          >
            <Bot size={28} strokeWidth={2} />
          </span>
          <Sparkles size={16} className={`absolute top-3 right-4 ${t.accentText}`} />
          <Cpu size={16} className={`absolute bottom-4 left-5 ${t.decor}`} />
        </div>
      </MegaSidebar>

      <div className="grid grid-cols-3 gap-x-4 gap-y-1 p-5">
        {services.length > 0 ? (
          services.map((service, index) => {
            const Icon = automationIcons[index % automationIcons.length];
            return (
              <MegaItem
                key={service._id || service.slug}
                icon={Icon}
                title={service.title}
                subtitle={
                  sanitizeSubtitle(service.shortDescription) ||
                  sanitizeSubtitle(service.description)?.slice(0, 48) ||
                  "Explore this AI automation service"
                }
                theme={t}
                onClick={() =>
                  onNavigate(resolveAutomationHref(service, variant), "automation")
                }
              />
            );
          })
        ) : (
          <div className="col-span-3 px-3 py-8 text-center text-gray-400 text-sm">
            No services available
          </div>
        )}
      </div>
    </MegaShell>
  );
}

export function AboutMegaPanel({ onNavigate, variant = "default" }) {
  const t = getMegaTheme(variant);

  return (
    <MegaShell cols="grid-cols-[220px_1fr]" theme={t}>
      <MegaSidebar
        title="About Us"
        description="Learn who we are, what we build, and how you can partner with TechCulture AI."
      >
        <div
          className={`w-full h-28 rounded-xl bg-gradient-to-br ${t.sidebarGradient} flex items-center justify-center relative overflow-hidden`}
        >
          <span
            className={`w-14 h-14 rounded-2xl bg-white shadow-md ${t.accentText} flex items-center justify-center z-[1]`}
          >
            <Info size={26} strokeWidth={2} />
          </span>
          <Users size={16} className={`absolute top-3 left-4 ${t.decor}`} />
          <Mail size={16} className={`absolute bottom-4 right-5 ${t.accentText}`} />
        </div>
      </MegaSidebar>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-5 content-start">
        {aboutItems.map((item) => (
          <MegaItem
            key={item.href}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            theme={t}
            onClick={() =>
              onNavigate(resolveAboutHref(item, variant), item.source)
            }
          />
        ))}
      </div>
    </MegaShell>
  );
}

export function ProductsMobileMenu({ onNavigate, variant = "default" }) {
  const t = getMegaTheme(variant);

  return (
    <div className="ml-2 mt-2 space-y-4 pb-2">
      {productCategories.map((category) => {
        const Icon = category.icon;
        return (
          <div key={category.title}>
            <div className={`flex items-center gap-2 mb-1.5 ${t.accentText}`}>
              <Icon size={14} />
              <span
                className={`text-[12px] font-bold tracking-wide uppercase inline-block pb-0.5 border-b ${t.accentBorder}`}
              >
                {category.title}
              </span>
            </div>
            <div className="ml-5 space-y-1">
              {category.links.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className={`flex items-center gap-2 w-full text-left text-gray-300 ${t.linkHover} transition-colors duration-200 py-1.5 text-[15px]`}
                  onClick={() =>
                    onNavigate(resolveProductHref(link.label, variant), "products")
                  }
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${t.bullet} shrink-0`} />
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function IndustriesMobileMenu({ onNavigate, variant = "default" }) {
  const t = getMegaTheme(variant);

  return (
    <div className="ml-2 mt-2 space-y-1 pb-2">
      {industryItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.title}
            type="button"
            className="flex items-center gap-3 w-full text-left py-2.5 border-b border-gray-800 last:border-none"
            onClick={() =>
              onNavigate(resolveIndustryHref(item, variant), "industries")
            }
          >
            <span
              className={`w-8 h-8 rounded-full ${t.accentBgStrong} ${t.accentText} flex items-center justify-center shrink-0`}
            >
              <Icon size={15} />
            </span>
            <span>
              <span className="block text-[15px] text-gray-200 font-medium">
                {item.title}
              </span>
              <span className="block text-[12px] text-gray-500">
                {item.subtitle}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function AutomationMobileMenu({ services = [], onNavigate, variant = "default" }) {
  const t = getMegaTheme(variant);

  return (
    <div className="ml-2 mt-2 space-y-1 pb-2">
      {services.length > 0 ? (
        services.map((service, index) => {
          const Icon = automationIcons[index % automationIcons.length];
          return (
            <button
              key={service._id || service.slug}
              type="button"
              className="flex items-center gap-3 w-full text-left py-2.5 border-b border-gray-800 last:border-none"
              onClick={() =>
                onNavigate(resolveAutomationHref(service, variant), "automation")
              }
            >
              <span
                className={`w-8 h-8 rounded-full ${t.accentBgStrong} ${t.accentText} flex items-center justify-center shrink-0`}
              >
                <Icon size={15} />
              </span>
              <span className="text-[15px] text-gray-200 font-medium">
                {service.title}
              </span>
            </button>
          );
        })
      ) : (
        <p className="text-gray-500 text-sm py-2">No services available</p>
      )}
    </div>
  );
}

export function AboutMobileMenu({ onNavigate, variant = "default" }) {
  const t = getMegaTheme(variant);

  return (
    <div className="ml-2 mt-2 space-y-1 pb-2">
      {aboutItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.href}
            type="button"
            className="flex items-center gap-3 w-full text-left py-2.5 border-b border-gray-800 last:border-none"
            onClick={() =>
              onNavigate(resolveAboutHref(item, variant), item.source)
            }
          >
            <span
              className={`w-8 h-8 rounded-full ${t.accentBgStrong} ${t.accentText} flex items-center justify-center shrink-0`}
            >
              <Icon size={15} />
            </span>
            <span>
              <span className="block text-[15px] text-gray-200 font-medium">
                {item.title}
              </span>
              <span className="block text-[12px] text-gray-500">
                {item.subtitle}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
