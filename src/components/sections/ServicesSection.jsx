"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGES ?? "";
const FALLBACK_COLORS = ["#022d60", "#00844a", "#0a4a9c", "#006038", "#022d60", "#00844a"];

const stripHtml = (html) => html?.replace(/<[^>]*>/g, "").trim() ?? "";

const extractListItems = (html) => {
  if (!html) return [];
  const matches = html.match(/<li[^>]*>[\s\S]*?<\/li>/gi);
  if (!matches?.length) return [];
  return matches.map((li) => stripHtml(li)).filter(Boolean);
};

const getLeadingDescription = (html) => {
  if (!html) return "";
  const firstPara = html.match(/<p[^>]*>[\s\S]*?<\/p>/i);
  if (firstPara) return stripHtml(firstPara[0]);
  const text = stripHtml(html);
  return text.length > 320 ? `${text.slice(0, 320)}…` : text;
};

export default function ServicesSection({ data, lang }) {
  const serviceSection = data?.sections?.find((section) => section.type === "Services");
  const sectionItems = serviceSection?.content?.items?.slice(0, 6) ?? [];
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);

  const safeActive = Math.min(active, Math.max(0, sectionItems.length - 1));
  const current = sectionItems[safeActive];
  const bullets = extractListItems(current?.description);
  const accentColor = FALLBACK_COLORS[safeActive % FALLBACK_COLORS.length];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".srv-reveal").forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "none";
              }, i * 80);
            });
          }
        });
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (!serviceSection || sectionItems.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-10 md:mb-16">
          <div
            className="srv-reveal text-xs font-mono font-bold tracking-[0.3em] text-[#00844a] uppercase mb-4"
            style={{ opacity: 0, transform: "translateY(15px)", transition: "all 0.5s ease" }}
          >
            — {serviceSection.header_title ?? "Our Services"}
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2
                className="srv-reveal text-3xl md:text-5xl font-bold text-[#022d60]"
                style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}
              >
                {serviceSection.header_title ?? "Certification Standards We Offer"}
              </h2>
              {serviceSection.header_description && (
                <p
                  className="srv-reveal mt-4 text-[#64748b] text-sm leading-relaxed"
                  style={{ opacity: 0, transform: "translateY(15px)", transition: "all 0.5s ease" }}
                >
                  {stripHtml(serviceSection.header_description)}
                </p>
              )}
            </div>
            <Link
              href={`/${lang}/our-service`}
              className="srv-reveal flex items-center gap-2 text-[#022d60] font-semibold text-sm hover:gap-3 transition-all group shrink-0"
              style={{ opacity: 0, transform: "translateY(15px)", transition: "all 0.5s ease" }}
            >
              {lang === "en" ? "View all services" : "عرض جميع الخدمات"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
          {/* ─── Detail Card ─── */}
          <div
            className="srv-reveal lg:col-span-3 bg-white rounded-3xl border border-[#e2e8f0] shadow-lg p-6 md:p-10 flex flex-col transition-all duration-300 min-w-0"
            style={{ opacity: 1, transform: "none" }}
          >
            {current.image && (
              <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-6 overflow-hidden flex-shrink-0">
                <Image
                  src={`${IMAGE_BASE}${current.image}`}
                  alt={current.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {current.certificate_category && (
              <div className="font-mono text-xs font-bold tracking-widest text-[#00844a] mb-2">
                {current.certificate_category.trim()}
              </div>
            )}

            <h3 className="text-xl md:text-3xl font-bold text-[#022d60] mb-4 leading-snug">
              {current.name}
            </h3>

            <p className="text-[#64748b] text-sm md:text-base leading-relaxed mb-6 md:mb-8">
              {getLeadingDescription(current.description)}
            </p>

            {bullets.length > 0 && (
              <div className="space-y-3 mb-8 md:mb-10">
                {bullets.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#00844a]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-[#00844a]" />
                    </div>
                    <span className="text-sm font-medium text-[#0f172a]">{point}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto flex flex-wrap gap-3">
              <Link
                href={`/${lang}/contact-us`}
                className="flex items-center gap-2 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all"
                style={{ backgroundColor: accentColor }}
              >
                {lang === "en" ? "Request Certificate" : "اطلب شهادة"} <ArrowRight size={16} />
              </Link>
              <Link
                href={`/${lang}/our-service/${current.slug}`}
                className="text-sm font-medium text-[#64748b] hover:text-[#022d60] px-5 py-3 rounded-xl hover:bg-[#022d60]/5 transition-all"
              >
                {lang === "en" ? "Learn more" : "تعرف على المزيد"}
              </Link>
            </div>
          </div>

          {/* ─── Sidebar List ─── */}
          <div className="lg:col-span-2 space-y-2 min-w-0">
            {sectionItems.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                className={`srv-reveal w-full flex items-center gap-3 p-4 md:p-5 rounded-2xl text-left transition-all min-w-0 ${
                  safeActive === i
                    ? "bg-[#022d60] text-white shadow-xl shadow-[#022d60]/20"
                    : "bg-white text-[#0f172a] hover:bg-[#022d60]/5 border border-[#e2e8f0]"
                }`}
                style={{
                  opacity: 0,
                  transform: "translateX(-20px)",
                  transition:
                    "opacity 0.5s ease, transform 0.5s ease, background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                {item.image && (
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <Image
                      src={`${IMAGE_BASE}${item.image}`}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                )}
                {/* ✅ min-w-0 + overflow-hidden fixes text overflow */}
                <div className="min-w-0 flex-1 overflow-hidden">
                  <div className="font-semibold text-sm truncate">
                    {item.certificate_category?.trim()}
                  </div>
                  <div
                    className={`text-xs mt-0.5 truncate ${
                      safeActive === i ? "text-white/70" : "text-[#64748b]"
                    }`}
                  >
                    {item.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}