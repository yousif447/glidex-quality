"use client";
import { useEffect, useRef } from "react";
import { Target, Globe2, UserCheck, Lock, Zap, BarChart3 } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Precision Expertise",
    desc: "Our auditors bring deep domain knowledge across industries, ensuring accurate, reliable certification assessments every time.",
  },
  {
    icon: Globe2,
    title: "Global Recognition",
    desc: "Certificates issued by Glidex Quality are recognized internationally through IAF and EGAC accreditation networks.",
  },
  {
    icon: UserCheck,
    title: "Client-First Approach",
    desc: "We tailor every engagement to your organization's unique needs, size, and sector — no one-size-fits-all here.",
  },
  {
    icon: Lock,
    title: "Uncompromising Integrity",
    desc: "Strict impartiality and ethical conduct govern every audit, protecting the value of your certification.",
  },
  {
    icon: Zap,
    title: "Fast-Track Process",
    desc: "Our streamlined certification pathway gets you certified quickly without cutting corners on quality.",
  },
  {
    icon: BarChart3,
    title: "Continuous Improvement",
    desc: "Beyond certification, our experts help you build a culture of ongoing excellence and measurable growth.",
  },
];

export default function WhyUs({ data, lang }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".why-reveal").forEach((el, i) => {
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: large heading with accent */}
          <div>
            <div
              className="why-reveal text-xs font-mono font-bold tracking-[0.3em] text-[#00844a] uppercase mb-4"
              style={{
                opacity: 0,
                transform: "translateY(15px)",
                transition: "all 0.5s ease",
              }}
            >
              — Why Glidex
            </div>
            <h2
              className="why-reveal  text-5xl md:text-6xl font-bold text-[#022d60] leading-tight mb-8"
              style={{
                opacity: 0,
                transform: "translateY(25px)",
                transition: "all 0.6s ease",
              }}
            >
              The Standard
              <br />
              <span className="text-[#00844a]">for Standards</span>
            </h2>
            <p
              className="why-reveal text-[#64748b] text-lg leading-relaxed mb-10"
              style={{
                opacity: 0,
                transform: "translateY(15px)",
                transition: "all 0.5s ease",
              }}
            >
              When you choose Glidex Quality, you're choosing a partner
              committed to your long-term success — not just a stamp on a
              document.
            </p>

            {/* Visual accent: rotating border card */}
            <div
              className="why-reveal relative rounded-3xl overflow-hidden p-px bg-gradient-to-br from-[#022d60] via-[#00844a] to-[#022d60]"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "all 0.6s ease",
              }}
            >
              <div className="bg-white rounded-3xl p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div>
                    <div className=" text-4xl font-bold text-[#022d60]">
                      100%
                    </div>
                    <div className="text-sm text-[#64748b]">
                      Accredited Certification Rate
                    </div>
                  </div>
                  <div className="w-px h-12 bg-[#e2e8f0]" />
                  <div>
                    <div className=" text-4xl font-bold text-[#00844a]">
                      25+
                    </div>
                    <div className="text-sm text-[#64748b]">
                      Expert Auditors
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-[#022d60] to-[#00844a] rounded-full" />
                </div>
                <div className="mt-2 text-xs text-[#64748b] font-mono">
                  Client satisfaction rate: 98.4%
                </div>
              </div>
            </div>
          </div>

          {/* Right: grid of reason cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="why-reveal bg-[#f8f9fc] rounded-2xl p-6 hover:bg-[#022d60] group transition-all duration-300 card-hover border border-transparent hover:border-[#022d60]"
                  style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition:
                      "opacity 0.5s ease, transform 0.5s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#022d60]/10 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors">
                    <Icon
                      size={20}
                      className="text-[#022d60] group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="font-semibold text-[#0f172a] group-hover:text-white mb-2 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-[#64748b] group-hover:text-blue-200 leading-relaxed transition-colors">
                    {r.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
