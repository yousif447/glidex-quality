"use client";
import { useState } from "react";
import { ShieldCheck, Target, RefreshCw, XCircle } from "lucide-react";

export default function CertificationLifecycle({ items, t, lang = "en" }) {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const isRtl = lang === "ar";

  if (!items || items.length === 0) return null;
  const current = items[active];

  const getIcon = (title) => {
    const tStr = title?.toLowerCase() || "";
    if (tStr.includes('granting') || tStr.includes('منح')) return <ShieldCheck size={24} />;
    if (tStr.includes('refusing') || tStr.includes('رفض')) return <XCircle size={24} />;
    if (tStr.includes('maintaining') || tStr.includes('حفاظ')) return <RefreshCw size={24} />;
    return <Target size={24} />;
  };

  return (
    <section className="py-24 bg-[#f8f9fc] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none stripe-pattern" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                <ShieldCheck size={18} />
              </div>
              <span className="text-secondary font-bold uppercase tracking-[0.2em] text-[10px]">
                {t?.lifecycleHeader || "Certification Lifecycle"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl  font-bold text-primary leading-tight">
              {t?.lifecycleTitle || "Certification Processes for Every Stage"}
            </h2>
          </div>
          <p className="text-text-muted text-base md:text-lg max-w-sm md:text-right">
             {t?.lifecycleDescription || "From granting to withdrawing — understand every phase of the certification lifecycle."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Interactive Sidebar Layout (Desktop) / Horizontal Rail (Mobile) */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible scrollbar-hide pb-4 lg:pb-0 snap-x snap-mandatory">
            {items.map((item, i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setActive(i);
                    setShowAll(false);
                  }}
                  className={`
                    relative p-4 md:p-6 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] md:rounded-[2rem_0.5rem_2rem_0.5rem] border text-left transition-all duration-500 overflow-hidden flex items-center gap-4 md:gap-6 group shrink-0 w-[70%] sm:w-[50%] lg:w-full snap-center
                    ${isRtl ? "text-right flex-row-reverse" : ""}
                    ${isActive 
                      ? "bg-white border-white shadow-xl scale-100 lg:scale-105 z-10" 
                      : "bg-transparent border-slate-200/50 hover:bg-white/50 hover:border-slate-300"}
                  `}
                >
                  <div 
                    className={`absolute inset-y-0 ${isRtl ? "right-0" : "left-0"} w-1 transition-all duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                    style={{ backgroundColor: item.accent }}
                  />

                  <div 
                    className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                    style={{ 
                       backgroundColor: isActive ? item.accent : `${item.accent}15`,
                       color: isActive ? "#fff" : item.accent,
                       transform: isActive ? "rotate(-10deg)" : "rotate(0)"
                    }}
                  >
                    {getIcon(item.title)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold transition-all truncate ${isActive ? "text-primary text-xl" : "text-slate-500 text-lg"}`}>
                      {item.title}
                    </h4>
                    <p className={`text-xs font-medium uppercase tracking-widest mt-1 ${isActive ? "opacity-60" : "opacity-30"}`}>
                    {lang === "en" ? "PHASE" : "مرحلة"} 0{i + 1}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <div 
              className="relative bg-white rounded-[4rem_1rem_4rem_1rem] p-8 md:p-14 shadow-xl border border-white/50 overflow-hidden h-full group/pane"
              key={active}
            >
              <div 
                className="absolute top-0 right-0 w-64 h-64 opacity-[0.07] rounded-bl-full translate-x-12 -translate-y-12 transition-all duration-700 pointer-events-none group-hover/pane:scale-125"
                style={{ backgroundColor: current.accent }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                   <div 
                     className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm"
                     style={{ backgroundColor: current.accent }}
                   >
                     {active + 1}
                   </div>
                   <h3 className="text-2xl md:text-3xl  font-bold text-primary">
                     {current.title}
                   </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 transition-all duration-500">
                  {(showAll ? current.substeps : current.substeps?.slice(0, 3))?.map((sub, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-4 pb-6 border-b border-slate-50 last:border-0 animate-fade-up"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                       <div 
                         className="shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 scale-75 md:scale-100"
                         style={{ borderColor: `${current.accent}40`, color: current.accent }}
                       >
                         <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: current.accent }} />
                       </div>
                       <p className="text-text-muted text-sm md:text-base leading-relaxed">
                         {sub}
                       </p>
                    </div>
                  ))}
                </div>

                {current.substeps?.length > 3 && (
                  <div className="mt-8 flex justify-center md:hidden">
                    <button 
                      onClick={() => setShowAll(!showAll)}
                      className="font-bold text-sm uppercase tracking-widest border-b-2 transition-all pb-1 translate-y-0 active:translate-y-px"
                      style={{ color: current.accent, borderColor: `${current.accent}25` }}
                    >
                      {showAll ? (lang === "ar" ? "عرض أقل" : "Show Less") : (lang === "ar" ? "عرض المزيد" : "Show All Details")}
                    </button>
                  </div>
                )}


                <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-center">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                     {lang === "en" ? "Certification Lifecycle Management" : "دورة إدارة الشهادات"}
                   </span>
                   <div className="flex gap-1">
                      {items.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8" : "w-2 bg-slate-200"}`}
                          style={{ backgroundColor: i === active ? current.accent : undefined }}
                        />
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
