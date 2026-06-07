"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import PageHero from "@/components/ui/PageHero";
import { Star, Quote } from "lucide-react";
import Link from "next/link";
import CountUpStats from "@/components/ui/CountUpStats";

export default function PartnersPage({ data, lang }) {

  const partnerHeader = data?.sections?.find(item => item.type === "Hero")?.content?.[0] || {
    title: lang === "ar" ? "شركاؤنا وعملاؤنا" : "Our Partners & Clients",
    description: lang === "ar" ? "نحن فخورون بالعمل مع أفضل المؤسسات في المنطقة." : "Trusted by leading organizations across the globe.",
  };
  
  const partnersList = data?.sections?.find(item => item.type === "Partners List")?.content?.items || [];
  const testimonialsData = data?.sections?.find(item => item.type === "Testimonials")?.content?.items || [];

  return (
    <div className="bg-[#f8f9fc]">
      <PageHero 
        tag={lang === "ar" ? "الشركاء" : "Partners"} 
        title={partnerHeader.title} 
        subtitle={partnerHeader.description}
        lang={lang} 
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#00844a]/10 text-[#00844a] text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
          >
            {lang === 'ar' ? "شبكة النجاح" : "Success Network"}
          </motion.div>
          <h2 className={`${lang === 'ar' ? 'font-heading' : ''} text-3xl md:text-4xl font-bold text-[#022d60] mb-6`}>
            {lang === 'ar' ? "انضم إلى شبكة من التميز العالمي" : "Join a Network of Global Excellence"}
          </h2>
          <p className="text-[#64748b] text-base max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar' 
              ? "نحن نخدم مئات الشركات في مختلف القطاعات، مما يساعدهم على تحقيق أعلى مستويات الكفاءة والامتثال." 
              : "We serve hundreds of organizations across diverse sectors, helping them achieve peak performance through internationally recognized standards."}
          </p>
        </div>

        <CountUpStats lang={lang} />

        {/* Partners Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {partnersList.map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative bg-white rounded-3xl border border-[#e2e8f0] p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-[#022d60]/20 hover:shadow-2xl hover:shadow-[#022d60]/5 hover:-translate-y-2 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {/* Decorative glow */}
                <div className="absolute" />
                
                <div className="relative z-10 w-full flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-4 flex items-center justify-center transition-all duration-500 scale-90 group-hover:scale-105">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGES}${item.image}`}

                      alt={item.name || 'Partner logo'}
                      fill
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <h3 className={`${lang === 'ar' ? 'font-heading text-sm' : ' text-xs'} font-bold text-[#022d60] group-hover:text-[#00844a] transition-colors line-clamp-1`}>
                    {item.name}
                  </h3>
                  {item.sector && (
                    <span className="mt-2 text-[9px] font-mono tracking-widest text-slate-400 uppercase opacity-0 group-hover:opacity-100 transition-all">
                      {item.sector}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#00844a] uppercase mb-3 block">Testimonials</span>
              <h2 className={`${lang === 'ar' ? 'font-heading' : ''} text-4xl font-bold text-[#022d60]`}>
                {lang === 'ar' ? "قصص من شركائنا في النجاح" : "Trusted by Industry Leaders"}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(testimonialsData.length > 0
              ? testimonialsData
              : [
                  {
                    text: "Glidex Quality made our ISO 9001 certification journey seamless. Their auditors were professional, thorough, and incredibly supportive throughout.",
                    author: "Ahmed Hassan",
                    role: "Quality Director",
                    company: "Cairo Manufacturing Co.",
                    rating: 5,
                  },
                  {
                    text: "The expertise of the Glidex team is unmatched. We achieved ISO 14001 certification faster than expected and the ongoing support has been exceptional.",
                    author: "Sara El-Masry",
                    role: "Operations Manager",
                    company: "GreenTech Egypt",
                    rating: 5,
                  },
                  {
                    text: "Highly recommend Glidex Quality. Their professionalism and attention to detail set them apart. We are now certified to ISO 9001 and ISO 45001 simultaneously.",
                    author: "Mahmoud Karim",
                    role: "CEO",
                    company: "Nile Foods Ltd",
                    rating: 5,
                  },
                ]
            ).map((t, i) => {
              const text = t.text ?? t.content ?? "";
              const author = t.author ?? "Client";
              const role = [t.role ?? t.position, t.company].filter(Boolean).join(", ");
              const rating = t.rating ?? 5;

              return (
                <motion.div
                  key={t.id ?? i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-[#f8f9fc] rounded-[2.5rem] p-10 border border-[#e2e8f0] hover:shadow-2xl hover:shadow-[#022d60]/5 transition-all group"
                >
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: rating }).map((_, s) => (
                      <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote size={32} className="text-[#022d60]/10 mb-6 group-hover:text-[#00844a]/20 transition-colors" />
                  <p className="text-sm md:text-base text-[#0f172a] leading-relaxed mb-8 h-24 overflow-hidden line-clamp-4">
                    "{text}"
                  </p>
                  <div className="flex items-center gap-4 pt-8 border-t border-[#e2e8f0]">
                    <div className="w-12 h-12 rounded-2xl bg-[#022d60] flex items-center justify-center text-white font-bold text-lg">
                      {author[0]}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#022d60]">{author}</div>
                      <div className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider">{role}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#022d60] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white">
          <h2 className={`${lang === 'ar' ? 'font-heading' : ''} text-3xl md:text-4xl font-bold mb-6`}>
            {lang === 'ar' ? "جاهز للانضمام إلى قائمة التميز؟" : "Ready to Join the Elite?"}
          </h2>
          <p className="text-blue-100 mb-10 text-lg opacity-90">
            {lang === 'ar' ? "تواصل معنا اليوم لبدء رحلة الاعتماد الخاصة بك." : "Contact us today to start your certification journey with Egypt's leading quality body."}
          </p>
          <Link
            href={`/${lang}/contact-us`}
            className="inline-flex items-center gap-2 bg-white text-[#022d60] px-10 py-4 rounded-2xl font-bold hover:bg-[#00844a] hover:text-white transition-all shadow-xl"
          >
            {lang === 'ar' ? "تواصل معنا الآن" : "Contact Us Now"}
          </Link>
        </div>
      </section>
    </div>
  );
}

