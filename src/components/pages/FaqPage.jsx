"use client";
import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ChevronDown } from "lucide-react";

const stripHtml = (html) => html?.replace(/<[^>]*>/g, '') ?? '';

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      className={`bg-white rounded-2xl border transition-all ${isOpen ? "border-[#022d60]/20 shadow-lg shadow-[#022d60]/8" : "border-[#e2e8f0] hover:border-[#022d60]/10"}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-7 text-left"
      >
        <span className="font-semibold text-[#0f172a] text-sm md:text-base leading-snug">
          {q}
        </span>
        <ChevronDown
          size={20}
          className={`text-[#022d60] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-7 pb-7">
          <div className="h-px bg-[#f1f5f9] mb-5" />
          <p className="text-[#64748b] leading-relaxed text-sm">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage({ data, lang }) {
  const [activeId, setActiveId] = useState(null);
  const faqsContent = data?.sections?.find(item => item.type === "Hero")?.content?.[0] || { title: "FAQ" };
  const items = data.faqs ?? [];

  return (
    <div>
      <PageHero tag={lang === "en" ? "FAQ" : "الأسئلة الشائعة"} title={faqsContent.title} lang={lang} />

      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-4xl mx-auto px-6 space-y-3">
          {items.map((faq) => {
            const q = faq.title;
            const a = stripHtml(faq.description);
            return (
              <FAQItem 
                key={faq.id} 
                q={q} 
                a={a} 
                isOpen={activeId === faq.id}
                onToggle={() => setActiveId(activeId === faq.id ? null : faq.id)}
              />
            );
          })}
        </div>
        <div className="text-center mt-12">
          <p className="text-[#64748b] mb-4">{lang === "en" ? "Still have questions?" : "هل لديك أسئلة أخرى؟"}</p>
          <Link
            href={`/${lang}/contact-us`}
            className="inline-flex items-center gap-2 bg-[#022d60] text-white px-7 py-3.5 rounded-2xl font-semibold hover:bg-[#0a4a9c] transition-all"
          >
            {lang === "en" ? "Contact Our Team" : "تواصل مع فريقنا"}
          </Link>
        </div>
      </section>
    </div>
  );
}

