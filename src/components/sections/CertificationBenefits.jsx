"use client";
import { CheckCircle2 } from "lucide-react";

export default function CertificationBenefits({ items, t, lang = "en" }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="inline-block text-secondary font-bold tracking-widest uppercase text-xs mb-4 px-4 py-2 bg-secondary/5 rounded-full">
             {t?.benefitsHeader || "Why Choose Us"}
          </span>
          <h2 className="text-4xl md:text-5xl  font-bold text-primary mb-6 leading-tight">
            {t?.benefitsTitle || "The Benefits of Certification"}
          </h2>
          <p className="text-text-muted text-lg leading-relaxed">
            {t?.benefitsDescription || "Enhance your organization’s reputation, operational efficiency, and market competitiveness with our globally recognized ISO certifications."}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((benefit, i) => (
            <div 
              key={benefit.id || i}
              className="group relative bg-[#f8f9fc] rounded-[3rem_1rem_3rem_1rem] p-10 border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:border-primary/10 overflow-hidden h-full flex flex-col"
            >
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100%] translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
              
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 size={24} />
              </div>

              <h3 className="text-xl  font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
                {benefit.title}
              </h3>
              
              <p className="text-text-muted text-sm md:text-base leading-relaxed flex-1">
                {benefit.description}
              </p>

              {/* Numbering */}
              <div className="absolute bottom-6 right-8 text-4xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">
                 0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
