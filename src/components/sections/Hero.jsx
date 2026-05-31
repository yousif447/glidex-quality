"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Award, Globe2, Users } from "lucide-react";

export default function HeroSection({ data, lang }) {
  const heroSection = data.sections.find(section => section.type === "Hero").content[0];
  
  const sectionRef = useRef(null);

  const certBadges = [
    { label: "ISO 9001", color: "#022d60" },
    { label: "ISO 14001", color: "#00844a" },
    { label: "ISO 45001", color: "#0a4a9c" },
    { label: "ISO 22000", color: "#006038" },
    { label: "ISO 27001", color: "#022d60" },
    { label: "ISO 13485", color: "#00844a" },
    { label: "HACCP", color: "#022d60" },
    { label: "GMP", color: "#0a4a9c" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "none";
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[85.5vh] flex flex-col justify-center overflow-hidden mesh-bg"
    >
      {/* Background geometry */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-[#022d60]/10" />
        <div className="absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full border border-[#022d60]/8" />
        <div className="absolute top-1/4 right-1/4 grid grid-cols-6 gap-6 opacity-20">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[#022d60]" />
          ))}
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-[#022d60]/5 to-transparent"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <div
            className="reveal inline-flex items-center gap-2 bg-[#022d60]/8 text-[#022d60] px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-widest uppercase mb-8"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#00844a] animate-pulse" />
            {heroSection.sub_items[1].value}
          </div>
          <h1
            className="reveal  text-5xl md:text-6xl lg:text-7xl font-bold text-[#022d60] leading-[1.05] mb-6"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "all 0.7s ease",
            }}
          >
            {heroSection.title}
          </h1>
          <p
            className="reveal text-[#64748b] text-lg leading-relaxed mb-10 max-w-lg"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {heroSection.description}
          </p>
          <div
            className="reveal flex flex-wrap gap-4"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <Link
              href={`/${lang}/our-service`}
              className="group flex items-center gap-2 bg-gradient-to-r from-[#022d60] to-[#0a4a9c] text-white px-7 py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-[#022d60]/25 hover:-translate-y-1 transition-all"
            >
              {heroSection.button_text}
            </Link>
            <Link
              href={`/${lang}/contact-us`}
              className="flex items-center gap-2 border-2 border-[#022d60]/20 text-[#022d60] px-7 py-4 rounded-2xl font-semibold hover:border-[#022d60] hover:bg-[#022d60]/5 transition-all"
            >
              {heroSection.sub_items[0].value}
            </Link>
          </div>
        </div>

        {/* Right card */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div
            className="reveal animate-float bg-white rounded-3xl shadow-2xl shadow-[#022d60]/15 p-8 w-full max-w-md border border-[#e2e8f0]"
            style={{
              opacity: 0,
              transform: "scale(0.9)",
              transition: "all 0.7s ease",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#022d60] to-[#00844a] flex items-center justify-center">
                <Award className="text-white" size={22} />
              </div>
              <div>
                <div className=" font-bold text-[#022d60] text-lg">
                  { lang == "en" ? "Quality Certified" : "جودة معتمدة" }
                </div>
                <div className="text-xs text-[#00844a] font-mono">
                  Glidex Quality International
                </div>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              {[
                { label: lang === "en" ? "ISO 9001 — Quality" :"ISO 9001 — جودة", pct: 98 },
                { label: lang === "en" ? "ISO 14001 — Environment" : "ISO 14001 — بيئة", pct: 94 },
                { label: lang === "en" ? "ISO 45001 — Safety" : "ISO 45001 — أمان", pct: 96 },
              ].map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#64748b]">{label}</span>
                    <span className="font-mono font-bold text-[#022d60]">
                      {pct}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#022d60] to-[#00844a]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {certBadges.map(({ label, color }) => (
                <span
                  key={label}
                  className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg text-white"
                  style={{ backgroundColor: color }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -left-5 bg-white rounded-2xl shadow-xl shadow-[#022d60]/10 p-4 border border-[#e2e8f0]">
            <div className=" font-bold text-2xl text-[#022d60]">
              1548+
            </div>
            <div className="text-xs text-[#64748b]">{lang === "en" ? "Happy Clients" : "عملاء سعداء"}</div>
          </div>
          <div className={`absolute -top-6 ${lang === "en" ? "-right-0" : "-right-4"} bg-[#00844a] rounded-2xl shadow-xl p-4`}>
            <div className=" font-bold text-2xl text-white">9+</div>
            <div className="text-xs text-green-100">{lang === "en" ? "Years Active" : "سنوات من التميز"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
