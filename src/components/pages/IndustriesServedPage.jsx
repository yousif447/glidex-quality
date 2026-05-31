import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight } from "lucide-react";

const stripHtml = (html) => html?.replace(/<[^>]*>/g, '') ?? '';

export default function IndustriesServedPage({ data, lang }) {
  const industriesContent = data.sections.find(item => item.type === "Hero").content[0];
  const items = data.faqs ?? [];

  return (
    <div>
      <PageHero tag={lang === "en" ? "Industries" : "الصناعات"} title={industriesContent.title} lang={lang} />

      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((ind, i) => (
            <div
              key={ind.id}
              className="bg-white rounded-3xl border border-[#e2e8f0] p-7 hover:border-[#022d60]/20 hover:shadow-xl hover:shadow-[#022d60]/8 hover:-translate-y-1 transition-all group"
            >
              {ind.image && (
                <div className="h-40 rounded-2xl overflow-hidden mb-5 bg-[#f1f5f9]">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h3 className=" text-xl font-bold text-[#022d60] mb-2">
                {ind.title}
              </h3>
              <p className="text-[#64748b] text-sm leading-relaxed mb-4">
                {stripHtml(ind.description)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="bg-gradient-to-br from-[#022d60] to-[#011a3a] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            <div>
              <h3 className=" text-2xl font-bold mb-2">
                {lang === "en" ? "Don't See Your Industry?" : "ألا تجد مجال عملك؟"}
              </h3>
              <p className="text-blue-200">
                {lang === "en" ? "We certify organizations in all sectors. Contact us to discuss your specific needs." : "نُصدِر شهادات اعتماد للمؤسسات في جميع القطاعات. تواصلوا معنا لمناقشة احتياجاتكم الخاصة."}
              </p>
            </div>
            <Link
              href={`/${lang}/contact-us`}
              className="flex items-center gap-2 bg-[#00844a] text-white px-7 py-3.5 rounded-2xl font-semibold hover:bg-[#00a85e] transition-all flex-shrink-0"
            >
              {lang === "en" ? "Contact Us" : "تواصل معنا"} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
