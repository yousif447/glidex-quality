"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ lang }) {
  const pathname = usePathname();

  // Dictionary للترجمة
  const translations = {
    en: {
      home: "Home",
      "about-us": "About Us",
      "our-service": "Our Services",
      "contact-us": "Contact Us",
      blog: "Blogs",
      reports: "Reports",
      faqs: "FAQs",
      validation: "Validation",
      "our-partners": "Our Partners",
      "industries-served": "Industries Served",
      resources: "Resources"
    },
    ar: {
      home: "الرئيسية",
      "about-us": "من نحن",
      "our-service": "خدماتنا",
      "contact-us": "تواصل معنا",
      blog: "المدونة",
      reports: "التقارير",
      faqs: "الأسئلة الشائعة",
      validation: "التحقق",
      "our-partners": "شركاؤنا",
      "industries-served": "القطاعات التي نخدمها",
      resources: "المصادر"
    },
  };

  // حذف lang من الـ pathname
  const withoutLang = pathname.replace(new RegExp(`^/${lang}`), "");

  const segments = withoutLang.split("/").filter(Boolean);

  // لو الصفحة الرئيسية
  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => {
    const href = `/${lang}/${segments.slice(0, i + 1).join("/")}`;

    // لو فيه ترجمة استخدمها
    const label =
      translations[lang]?.[seg] ||
      seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    return { label, href };
  });

  return (
    <nav className="bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm flex-wrap">
        
        <Link
          href={`/${lang}`}
          className="flex items-center gap-1 text-[#64748b] hover:text-[#022d60] transition-colors"
        >
          <Home size={14} />
          <span>{translations[lang].home}</span>
        </Link>

        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-[#cbd5e1]" />

            {i === crumbs.length - 1 ? (
              <span className="text-[#022d60] font-medium">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-[#64748b] hover:text-[#022d60] transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}