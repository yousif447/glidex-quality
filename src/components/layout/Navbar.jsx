"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X, Phone, Mail, Languages } from "lucide-react";
import Image from "next/image";

import { t as getCommon } from "@/app/i18n/common";

function buildNav(lang, dict) {
  const p = (slug) => `/${lang}/${slug}`;
  return [
    {
      label: dict.about,
      href: p("about-us"),
      children: [
        { label: dict.companyOverview, href: p("about-us") },
        { label: dict.industriesServed, href: p("industries-served") },
        { label: dict.resources, href: p("resources") },
      ],
    },
    {
      label: dict.services,
      href: p("our-service"),
    },
    { label: dict.partners, href: p("our-partners") },
    { label: dict.blog, href: p("blog") },
    { label: dict.reports, href: p("reports") },
    { label: dict.faq, href: p("faqs") },
    {
      label: dict.validation,
      href: p("validation"),
    },
    { label: dict.contact, href: p("contact-us") },
  ];
}

export default function Navbar({ lang, settings }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const dict = getCommon(lang);
  const navItems = buildNav(lang, dict);
  const isAr = lang === "ar";

  const toggleLanguage = () => {
    const newLang = isAr ? "en" : "ar";
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  };

  const LangButton = ({ mobile = false }) => (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all font-medium ${
        mobile
          ? "w-full justify-between border-b border-[#f1f5f9] text-[#0f172a]"
          : "text-[#022d60] hover:bg-[#022d60]/5"
      }`}
    >
      <div className="flex items-center gap-2">
        <Languages
          size={16}
          className={mobile ? "text-[#022d60]" : "text-[#00844a]"}
        />
        <span className="text-sm">{isAr ? "EN" : "AR"}</span>
      </div>
      {mobile && (
        <span className="text-[10px] font-mono text-slate-400">
          Switch Language
        </span>
      )}
    </button>
  );

  const phone = settings?.phone ?? "+20 102 629 4642";
  const email = settings?.email ?? "info@glidexquality.com";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#022d60] text-white text-sm py-2 px-6 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 hover:text-[#00844a] transition-colors"
          >
            <Phone size={12} />
            <span className="font-mono">{phone}</span>
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 hover:text-[#00844a] transition-colors"
          >
            <Mail size={12} />
            {email}
          </a>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-200">
          <span className="w-2 h-2 rounded-full bg-[#00844a] inline-block animate-pulse" />
          EGAC Accredited · IAF Recognized
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-[#022d60]/10 border-b border-[#e2e8f0]"
            : "bg-white border-b border-[#e2e8f0]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${lang}`}
            className="flex relative w-20 h-20 gap-3 group"
          >
            <div>
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 ${lang == "ar" ? "px-2" : "px-4"} py-2 rounded-lg text-sm font-medium text-[#0f172a] hover:text-[#022d60] hover:bg-[#022d60]/5 transition-all`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white rounded-2xl shadow-2xl shadow-[#022d60]/15 border border-[#e2e8f0] p-2 min-w-56 animate-scale-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-[#0f172a] hover:bg-[#022d60] hover:text-white transition-all group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00844a] group-hover:bg-white transition-colors" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <LangButton />
            <div className="w-px h-6 bg-slate-200 mx-1" />
            <Link
              href={`/${lang}/validation`}
              className="text-sm font-medium text-[#022d60] border border-[#022d60]/20 px-4 py-2 rounded-xl hover:border-[#022d60] transition-all"
            >
              {dict.verifyCertificate}
            </Link>
            <Link
              href={`/${lang}/contact-us`}
              className="text-sm w-fit font-semibold text-white bg-gradient-to-r from-[#022d60] to-[#0a4a9c] px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-[#022d60]/30 hover:-translate-y-0.5 transition-all"
            >
              {dict.getCertified}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[#022d60]/5 hover:bg-[#022d60]/10 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={20} className="text-[#022d60]" />
            ) : (
              <Menu size={20} className="text-[#022d60]" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-white border-t border-[#e2e8f0] px-6 py-4 animate-fade-in">
            <LangButton mobile />
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block py-3 font-medium text-[#0f172a] border-b border-[#f1f5f9]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block py-2 text-sm text-[#64748b] hover:text-[#022d60]"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href={`/${lang}/contact-us`}
                className="text-center bg-[#022d60] text-white py-3 rounded-xl font-semibold"
                onClick={() => setOpen(false)}
              >
                {dict.getCertified}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
