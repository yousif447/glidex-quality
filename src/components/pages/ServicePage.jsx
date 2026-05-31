import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
  Building2,
} from "lucide-react";
import QASection from "../sections/QASection";

export default function ServicePage({ data, lang, slug }) {
  const d = data ?? null;
  const { iso_item_qa } = data;

  const title = d?.title ?? "Certification Standard";
  const standard = d?.standard ?? d?.iso_number ?? (slug || "").toUpperCase();
  const tagline = d?.tagline ?? d?.short_description ?? "";
  const description = d?.description ?? d?.content ?? "";
  const benefits = d?.benefits ?? d?.advantages ?? [];
  const requirements = d?.requirements ?? d?.clauses ?? [];
  const duration = d?.duration ?? lang === "en" ? "3–6 months" : "3-6 أشهر";
  const validity = d?.validity ?? lang === "en" ? "3 years" : "3 سنوات";

  const relatedServices = d?.related ?? [];

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      {/* Hero — uses primary color */}
      <div className="bg-gradient-to-br from-[#022d60] to-[#011a3a] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-[#00844a]/20 text-[#00844a] mb-5">
                {standard}
              </div>
              <h1 className=" text-5xl font-bold mb-4 leading-tight">
                {d.name}
              </h1>
              {tagline && (
                <p className="text-blue-200 text-xl mb-8">{tagline}</p>
              )}
              <div className="flex gap-4 flex-wrap">
                <Link
                  href={`/${lang}/contact-us`}
                  className="flex items-center gap-2 bg-[#00844a] text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-[#00a85e] hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  {lang === "en" ? "Request Certification" : "اطلب شهادة"} <ArrowRight size={16} />
                </Link>
                <Link
                  href={`/${lang}/contact-us`}
                  className="flex items-center gap-2 border border-white/30 text-white text-sm font-medium px-6 py-3 rounded-xl hover:border-white/60 hover:bg-white/10 transition-all"
                >
                  {lang === "en" ? "Ask a Question" : "اسأل سؤال"}
                </Link>
              </div>
            </div>

            {/* Meta cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Clock, label: lang === "en" ? "Typical Duration" : "مدة الحصول على الشهادة", value: duration },
                { icon: Award, label: lang === "en" ? "Certificate Validity" : "صلاحية الشهادة", value: validity },
                { icon: Building2, label: "Applicable To", value: "All Sizes" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur rounded-2xl p-5 text-center border border-white/20"
                >
                  <Icon size={22} className="mx-auto mb-2 text-white/70" />
                  <div className="font-bold text-white text-sm">{value}</div>
                  <div className="text-xs text-white/60 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {description && (
              <div className="bg-white rounded-3xl border border-[#e2e8f0] p-10">
                <h2 className=" text-2xl font-bold text-[#022d60] mb-5">
                  About {standard}
                </h2>
                <div
                  className="text-[#64748b] leading-relaxed text-lg"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#e2e8f0] p-10">
                <h2 className=" text-2xl font-bold text-[#022d60] mb-6">
                  Key Benefits of Certification
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-[#f8f9fc] hover:bg-[#022d60]/5 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#00844a]/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={18} className="text-[#00844a]" />
                      </div>
                      <span className="text-[#0f172a] leading-relaxed">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#e2e8f0] p-10">
                <h2 className=" text-2xl font-bold text-[#022d60] mb-6">
                  Standard Requirements Covered
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {requirements.map((req, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl border border-[#e2e8f0]"
                    >
                      <span className="w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 text-white bg-[#022d60]">
                        {i + 1}
                      </span>
                      <span className="text-sm text-[#0f172a]">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {iso_item_qa?.length > 0 && (
              <section className="relative bg-gradient-to-br from-[#022d60] to-[#011a3a] rounded-[3rem_1rem_3rem_1rem] p-8 md:p-16 overflow-hidden">
                {/* Decorative Mesh */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-light/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
                
                <QASection qa={iso_item_qa} lang={lang} />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA card */}
            <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-xl shadow-[#022d60]/8 p-8">
              <h3 className=" text-xl font-bold text-[#022d60] mb-3">
                {lang === "en" ? "Ready to Get" : "مستعد للحصول على"} {standard} {lang === "en" ? "Certified?" : "شهادة؟"}
              </h3>
              <p className="text-[#64748b] text-sm mb-6">
                {lang === "en" ? "Submit a request and our team will be in touch within 24 hours with a custom quote." : "أرسل طلبك وسيتواصل معك فريقنا خلال 24 ساعة لتقديم عرض سعر مخصص."}
              </p>
              <Link
                href={`/${lang}/contact-us`}
                className="block text-center text-white text-sm font-bold py-3.5 rounded-xl hover:opacity-90 transition-all mb-3 bg-[#022d60]"
              >
                {lang === "en" ? "Request Certification" : "اطلب شهادة"}
              </Link>
              <Link
                href={`/${lang}/contact-us`}
                className="block text-center text-sm font-medium text-[#022d60] border border-[#e2e8f0] py-3.5 rounded-xl hover:border-[#022d60]/30 transition-all"
              >
                {lang === "en" ? "Ask a Question" : "اسأل سؤال"}
              </Link>
            </div>

            {/* Cert details */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h3 className="font-semibold text-[#022d60] mb-4 text-sm">
                {lang === "en" ? "Certification Details" : "تفاصيل الشهادة"}
              </h3>
              <div className="space-y-3">
                {[
                  { label: lang === "en" ? "Standard" : "الشهادة", value: standard },
                  { label: lang === "en" ? "Duration" : "مدة الحصول على الشهادة", value: duration },
                  { label: lang === "en" ? "Valid For" : "الصلاحية", value: validity },
                  // { label: "Surveillance", value: "Annual" },
                  { label: lang === "en" ? "Accreditation" : "الاعتماد", value: "EGAC / IAF" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-2 border-b border-[#f1f5f9] last:border-0"
                  >
                    <span className="text-xs text-[#64748b]">{label}</span>
                    <span className="text-xs font-semibold text-[#0f172a]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related services */}
            {relatedServices.length > 0 && (
              <div>
                <div className="text-xs font-mono font-bold text-[#64748b] uppercase tracking-widest mb-3">
                  Related Standards
                </div>
                <div className="space-y-2">
                  {relatedServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/${lang}/our-service/${s.slug}`}
                      className="flex items-center gap-3 bg-white rounded-xl border border-[#e2e8f0] p-4 hover:border-[#022d60]/20 hover:shadow-md transition-all group"
                    >
                      <span className="text-sm text-[#0f172a] group-hover:text-[#022d60] transition-colors">
                        {s.title}
                      </span>
                      <ArrowRight
                        size={14}
                        className="ml-auto text-[#64748b] group-hover:text-[#022d60] transition-colors"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back */}
            <Link
              href={`/${lang}/our-service`}
              className="flex items-center gap-2 text-sm text-[#022d60] font-medium hover:underline"
            >
              ← {lang === "en" ? "All Standards" : "جميع الشهادات"}
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
