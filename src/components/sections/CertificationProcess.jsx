"use client";
import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function CertificationProcess({ items, t, lang = "en" }) {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const isRtl = lang === "ar";
  
  if (!items || items.length === 0) return null;
  const current = items[active];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header content */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-block text-secondary font-bold tracking-widest uppercase text-xs mb-4 px-4 py-2 bg-secondary/5 rounded-full">
             {t?.certificateProcessHeader || "Certification Process"}
          </span>
          <h2 className="text-4xl md:text-5xl  font-bold text-primary mb-6 leading-tight">
            {t?.certificateProcessTitle || "Path to Certification"}
          </h2>
          <p className="text-text-muted text-lg leading-relaxed">
            {t?.certificateProcessDescription || "Our comprehensive process ensures your management system meets international standards through expert guidance."}
          </p>
        </div>

        {/* The Geometric Rail */}
        <div className="relative mb-20">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 hidden md:block" />
          <div 
            className="absolute top-1/2 left-0 h-[3px] bg-primary -translate-y-1/2 transition-all duration-700 ease-in-out hidden md:block"
            style={{ 
              width: `${(active / (items.length - 1)) * 100}%`,
              boxShadow: '0 0 15px rgba(2, 45, 96, 0.3)'
            }}
          />

          <div className="flex overflow-x-auto scrollbar-hide md:flex-nowrap justify-between gap-8 md:gap-0 relative z-10 pb-4 md:pb-0 snap-x snap-mandatory">
            {items.map((item, i) => {
              const isActive = active === i;
              const isPast = i < active;
              
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center group cursor-pointer shrink-0 w-[40%] md:w-auto snap-center"
                >
                  <div className={`
                    w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center  font-black text-xl transition-all duration-500
                    ${isActive 
                      ? "bg-primary text-white shadow-2xl scale-125 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] rotate-3" 
                      : isPast 
                        ? "bg-secondary text-white shadow-lg" 
                        : "bg-white text-slate-300 border-2 border-slate-100 group-hover:border-primary/30 group-hover:text-primary/40"}
                  `}>
                    {i + 1}
                  </div>
                  <span className={`
                    mt-4 font-bold text-xs md:text-sm uppercase tracking-wider transition-colors duration-300 max-w-[120px] text-center
                    ${isActive ? "text-primary" : "text-slate-400 group-hover:text-primary/60"}
                  `}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Stage Panel */}
        <div 
          className="relative bg-slate-50/50 backdrop-blur-sm rounded-[3rem_1rem_3rem_1rem] md:rounded-[5rem_1.5rem_5rem_1.5rem] p-8 md:p-16 border border-slate-100/50 shadow-2xl overflow-hidden min-h-[400px]"
          key={active}
        >
          <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[15rem] md:text-[25rem] font-black text-primary/[0.03] select-none pointer-events-none leading-none ">
            {active + 1}
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 gap-1 flex">
                   <div className="w-full h-full bg-primary" />
                   <div className="w-1/2 h-full bg-secondary" />
                </div>
                <span className="font-mono text-sm text-primary font-bold opacity-60">{lang === "en" ? "PHASE" : "مرحلة"} {active + 1}</span>
              </div>
              <h3 className="text-3xl md:text-4xl  font-bold text-primary mb-6 leading-tight">
                {current.title}
              </h3>
              
              <div className="flex items-center gap-4 pt-8 border-t border-slate-200/50">
                <button 
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                >
                  {isRtl ? <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /> : <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />}
                </button>
                <div className="flex-1 h-px bg-slate-200" />
                <button 
                  onClick={() => setActive(Math.min(items.length - 1, active + 1))}
                  disabled={active === items.length - 1}
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
                >
                  {isRtl ? <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-500">
                {(showAll ? current.substeps : current.substeps?.slice(0, 3))?.map((sub, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group/item flex items-start gap-4 animate-fade-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-primary font-bold text-xs group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                       {idx + 1}
                    </div>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed pt-1">
                      {sub}
                    </p>
                  </div>
                ))}
              </div>
              
              {current.substeps?.length > 3 && (
                <div className="mt-8 flex justify-center md:hidden">
                  <button 
                    onClick={() => setShowAll(!showAll)}
                    className="text-primary font-bold text-sm uppercase tracking-widest border-b-2 border-primary/20 hover:border-primary transition-all pb-1"
                  >
                    {showAll ? (lang === "ar" ? "عرض أقل" : "Show Less") : (lang === "ar" ? "عرض المزيد" : "Show All Steps")}
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
