"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Quote, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

function StarRating({ count = 0 }) {
  return (
    <div className="flex mt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < count ? '#f59e0b' : '#e5e7eb'}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ClientsSection({ data, lang }) {
  const reviewSection = data?.sections?.find(
    (section) => section.type.trim().toLowerCase() === "reviews"
  );
  if (!reviewSection) return null;
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".cli-reveal").forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "none";
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="cli-reveal text-xs font-mono font-bold tracking-[0.3em] text-[#00844a] uppercase mb-4"
            style={{
              opacity: 0,
              transform: "translateY(15px)",
              transition: "all 0.5s ease",
            }}
          >
            {reviewSection.header_title}
          </div>
          <h2
            className="cli-reveal  text-4xl md:text-5xl font-bold text-[#022d60]"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {reviewSection.header_description}
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {reviewSection.content.items.map((t) => (
            <div
              key={t.id}
              className="cli-reveal bg-[#f8f9fc] rounded-3xl p-8 border border-[#e2e8f0] hover:border-[#022d60]/20 hover:shadow-xl hover:shadow-[#022d60]/8 transition-all card-hover"
              style={{
                opacity: 0,
                transform: "translateY(25px)",
                transition:
                  "opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star
                    key={s}
                    size={14}
                    className="text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <Quote size={24} className="text-[#022d60]/20 mb-4" />
              <p className="text-[#0f172a] text-sm leading-relaxed mb-6 italic">
                {t.review}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#e2e8f0]">
                <div className="relative w-10 h-10 rounded-full border border-black flex items-center justify-center text-white font-bold text-sm">
                  <Image src={`${process.env.NEXT_PUBLIC_IMAGES}${t.image}`} alt="User Image" fill className="object-cover"/>
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#0f172a]">
                    {t.name}
                  </div>
                  <div className="text-xs text-[#64748b]">{t.job_title} • {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industries grid */}
        {/* <div
          className="cli-reveal bg-gradient-to-br from-[#022d60] to-[#011a3a] rounded-3xl p-10 md:p-14"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
            <div>
              <div className="text-xs font-mono font-bold tracking-[0.3em] text-[#00844a] uppercase mb-3">
                Industries Served
              </div>
              <h3 className=" text-3xl font-bold text-white">
                We Certify Every Sector
              </h3>
            </div>
            <Link
              href={`/${lang}/industries-served`}
              className="flex items-center gap-2 text-white border border-white/20 px-5 py-2.5 rounded-xl hover:border-white/50 hover:bg-white/10 transition-all text-sm font-medium"
            >
              View All Industries <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {industries.map((ind) => (
              <span
                key={ind}
                className="px-4 py-2 rounded-xl bg-white/10 text-blue-100 text-sm font-medium hover:bg-[#00844a] hover:text-white transition-all cursor-default"
              >
                {ind}
              </span>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
