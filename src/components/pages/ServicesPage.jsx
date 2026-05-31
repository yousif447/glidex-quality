import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import {
  ArrowRight,
  CheckSquare,
  Leaf,
  Heart,
  Wheat,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import CertificationProcess from "@/components/sections/CertificationProcess";
import CertificationLifecycle from "@/components/sections/CertificationLifecycle";
import CertificationBenefits from "@/components/sections/CertificationBenefits";
import { t } from "@/app/i18n/services";

const stripHtml = (html) => html?.replace(/<[^>]*>/g, '') ?? '';

const fallbackIcons = [CheckSquare, Leaf, Heart, Wheat, ShieldCheck];
const fallbackColors = ["#022d60", "#00844a", "#0a4a9c", "#006038", "#022d60"];

export default function ServicesPage({ data, lang }) {
  const headerContent = data.sections.find(item => item.type === "Hero").content[0];
  const itemsContent  = data.sections.find(item => item.type === "ISO Items").content.items;
  const service       = t(lang);

  const cerCards = data.faqs
    ?.filter(item => item.order === 0)
    ?.map(item => ({
        title: item.title,
        description: "", 
        substeps: item.description
          .replace(/<\/?p>/g, "")
          .split(/\d\s/)
          .filter(Boolean)
      }));

  const lifeCycle = data.faqs
    ?.filter(item => item.order === 1)
    ?.map((item, index) => ({
      title: item.title,
      fullTitle: item.title,
      accent: ["#10b981", "#ef4444", "#3776bd", "#8b5cf6", "#f59e0b", "#06b6d4", "#dc2626"][index % 7],
      substeps: item.description
        .replace(/<p>/g, "")
        .replace(/<\/p>/g, "\n")
        .split("\n")
        .map(s => s.trim())
        .filter(Boolean)
    }));

  const benefits = data.faqs
    ?.filter(item => item.order === 2)
    ?.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description
        .replace(/<[^>]*>/g, "")
        .trim(),
    }));

  const d = data || null;
  const pageTitle = d?.title ?? "IMS Standards & Certifications";
  const pageDesc =
    d?.description ??
    "Comprehensive ISO certification services across all major management system standards.";
  const items = d?.isos ?? d?.services ?? d?.items ?? [];

  return (
    <div>
      <PageHero
        tag={lang === "en" ? "IMS Standards" : "معايير IMS"}
        title={headerContent.title}
        lang={lang}
      />

      <section className="py-24 bg-[#f8f9fc] mesh-bg">
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itemsContent.length > 0
              ? itemsContent.map((service, i) => {
                  const color = fallbackColors[i % fallbackColors.length];
                  return (
                    <div key={service.id} className="group relative pt-12">
                      {/* Floating Icon Frame */}
                      <div 
                        className="absolute top-0 left-8 z-20 w-20 h-20 bg-white rounded-2xl shadow-lg border border-slate-100/50 p-4 transform group-hover:-translate-y-3 transition-all duration-500 ease-out flex items-center justify-center animate-fade-up"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className="relative w-full h-full">
                          <Image 
                            src={`${process.env.NEXT_PUBLIC_IMAGES}${service.image}`} 
                            alt={service.title} 
                            fill 
                            className="object-contain" 
                          />
                        </div>
                      </div>
                      
                      {/* Main Card Body */}
                      <div className="relative bg-white rounded-[3.5rem_1rem_3.5rem_1rem] p-8 pt-16 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(2,45,96,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(2,45,96,0.12)] transition-all duration-300 overflow-hidden h-full flex flex-col">
                        
                        {/* Interactive Background Accent */}
                        <div 
                          className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-[100%] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-700" 
                          style={{ backgroundColor: color }}
                        />
                        
                        {/* Number / Mark Watermark */}
                        <div className="absolute bottom-0 right-4 text-[120px] font-black text-slate-50/80 -mb-8 select-none pointer-events-none group-hover:text-slate-100/90 transition-colors leading-none">
                          {i + 1 < 10 ? `0${i + 1}` : i + 1}
                        </div>

                        {/* Content Area */}
                        <div className="relative z-10 flex-1">
                          <h3 className=" text-xl lg:text-2xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary-dark transition-colors duration-300">
                            {service.title}
                          </h3>
                          {service.description && (
                            <p className="text-text-muted text-sm lg:text-base leading-relaxed line-clamp-3 mb-6">
                              {stripHtml(service.description)}
                            </p>
                          )}
                        </div>

                        {/* Action Link */}
                        <div className="relative z-10 mt-auto pt-4">
                          <Link
                            href={`/${lang}/our-service/${service.slug}`}
                            className="inline-flex items-center gap-3 font-bold text-sm uppercase tracking-widest text-primary group/link"
                          >
                            <span className="relative">
                              {lang === "en" ? "Explore Service" : "استكشف الخدمة"}
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover/link:w-full"></span>
                            </span>
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover/link:scale-110 group-hover/link:translate-x-2"
                              style={{ backgroundColor: color }}
                            >
                              <ArrowRight size={18} />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              : /* Fallback static list when API returns no items */
                [
                  {
                    slug: "iso-9001",
                    title: "ISO 9001:2015",
                    desc: "Quality Management System standard for organizations to demonstrate their ability to consistently provide products and services.",
                    color: "#022d60",
                    Icon: CheckSquare,
                  },
                  {
                    slug: "iso-14001",
                    title: "ISO 14001:2015",
                    desc: "Environmental Management System standard that helps organizations improve their environmental performance.",
                    color: "#00844a",
                    Icon: Leaf,
                  },
                  {
                    slug: "iso-45001",
                    title: "ISO 45001:2018",
                    desc: "Occupational Health & Safety management system standard, aimed at reducing workplace injuries and illnesses.",
                    color: "#0a4a9c",
                    Icon: Heart,
                  },
                  {
                    slug: "iso-22000",
                    title: "ISO 22000:2018",
                    desc: "Food Safety Management system standard, ensuring food safety across the entire global food chain.",
                    color: "#006038",
                    Icon: Wheat,
                  },
                ].map(({ slug, title, desc, color, Icon }, i) => (
                  <div key={slug} className="group relative pt-12">
                    {/* Floating Icon Frame */}
                    <div 
                      className="absolute top-0 left-8 z-20 w-20 h-20 bg-white rounded-2xl shadow-lg border border-slate-100/50 p-4 transform group-hover:-translate-y-3 transition-all duration-500 ease-out flex items-center justify-center"
                    >
                      <Icon size={32} style={{ color }} className="group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    {/* Main Card Body */}
                    <div className="relative bg-white rounded-[3.5rem_1rem_3.5rem_1rem] p-8 pt-16 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(2,45,96,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(2,45,96,0.12)] transition-all duration-500 overflow-hidden h-full flex flex-col">
                      
                      {/* Interactive Background Accent */}
                      <div 
                        className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-[100%] translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-700" 
                        style={{ backgroundColor: color }}
                      />
                      
                      {/* Number / Mark Watermark */}
                      <div className="absolute bottom-0 right-4 text-[120px] font-black text-slate-50/80 -mb-8 select-none pointer-events-none group-hover:text-slate-100/90 transition-colors leading-none">
                        {`0${i + 1}`}
                      </div>

                      {/* Content Area */}
                      <div className="relative z-10 flex-1">
                        <h3 className=" text-xl lg:text-2xl font-bold text-primary mb-3 leading-tight group-hover:text-secondary-dark transition-colors duration-300">
                          {title}
                        </h3>
                        <p className="text-text-muted text-sm lg:text-base leading-relaxed line-clamp-3 mb-6">
                          {desc}
                        </p>
                      </div>

                      {/* Action Link */}
                      <div className="relative z-10 mt-auto pt-4">
                        <Link
                          href={`/${lang}/our-service/${slug}`}
                          className="inline-flex items-center gap-3 font-bold text-sm uppercase tracking-widest text-primary group/link"
                        >
                          <span className="relative">
                            Learn More
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover/link:w-full"></span>
                          </span>
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 group-hover/link:scale-110 group-hover/link:translate-x-2"
                            style={{ backgroundColor: color }}
                          >
                            <ArrowRight size={18} />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Certification Sections */}
        <CertificationProcess items={cerCards} t={service} lang={lang} />
        <CertificationLifecycle items={lifeCycle} t={service} lang={lang} />
        <CertificationBenefits items={benefits} t={service} lang={lang} />


        {/* CTA */}
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="bg-gradient-to-br from-[#022d60] to-[#011a3a] rounded-3xl p-10 text-center text-white">
            <h3 className=" text-3xl font-bold mb-3">
              {lang === "en" ? "Ready to Get Certified?" : "هل أنت مستعد للحصول على الشهادة؟"}
            </h3>
            <p className="text-blue-200 mb-6 max-w-lg mx-auto">
              {lang === "en" ? "Our experts will guide you through the entire certification process. Contact us today for a free consultation and custom quote." : "سيُرشدك خبراؤنا خلال عملية الاعتماد بأكملها. تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مُخصّص."}
            </p>
            <Link
              href={`/${lang}/contact-us`}
              className="inline-flex items-center gap-2 bg-[#00844a] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#00a85e] transition-all"
            >
              {lang === "en" ? "Request Certification" : "اطلب شهادة"} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
