"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Container from '../layout/Container';
import CountUpStats from '../layout/CountUpStats';

export default function OurPartners({data, lang = "en"}) {
  const partnerSection = data.sections.find((item) => item.type === "Partners");
  return (
    <section className="relative overflow-hidden" id="partners">
      {/* Background orbs */}
      <div className="absolute top-[-80px] right-[-60px] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(55,118,189,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-40px] w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,rgba(223,6,34,0.04)_0%,transparent_70%)] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className={`${lang === "ar" ? "font-heading" : "" }inline-block text-[0.8rem] font-bold tracking-[0.08em] uppercase text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-4 py-[0.35rem] rounded-full mb-4`}>
            {lang === "ar" ? "شركاؤنا" : "Our Partners"}
          </span>
          <h2 className={`${lang === "ar" ? "font-heading" : "" } mt-10 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-[#0f172a] leading-[1.2] mb-4`}>
            <span className="text-[var(--primary-color)]">{partnerSection.header_title}</span>
          </h2>
          <p className="text-[#64748b] text-[1.05rem] leading-[1.7] max-w-[620px] mx-auto">
            {partnerSection.header_description}
          </p>
        </motion.div>

        <CountUpStats lang={lang} />
        {/* Partners Grid */}
        {/* Partners Marquee */}
        <div className="partners-marquee-wrapper">
          <div className="partners-marquee-track">
            {[...partnerSection.content.items].map((partner, index) => (
              <a href={partner.url} target="_blank" key={index} className="partners-marquee-item">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGES}${partner.image}`}
                    alt={partner.name}
                    width={64}
                    height={64}
                    style={{ objectFit: 'cover' }}
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href={`/${lang}/our-partners`}
            className="inline-flex items-center gap-2 px-8 py-[0.85rem] rounded-[var(--radius-xl)] bg-transparent text-[var(--primary-color)] border-2 border-[var(--primary-color)] text-[0.95rem] font-semibold no-underline transition-all duration-300 hover:bg-[var(--primary-color)] hover:text-white hover:shadow-[0_6px_24px_rgba(55,118,189,0.3)] hover:-translate-y-0.5"
          >
            {lang === "ar" ? "عرض جميع العملاء" : "View All Clients"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}