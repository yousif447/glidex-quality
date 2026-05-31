'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { t } from '@/app/i18n/contact';
import { createContactSchema2 } from '@/lib/schemas/contactSchema2';
import { zodResolver } from '@hookform/resolvers/zod';

const ISO_STANDARDS = [
  'ISO 9001:2015',
  'ISO 14001:2015',
  'ISO 45001:2018',
  'ISO 22000:2018',
  'GMP',
  'HACCP',
  'ISO 27001:2022',
  'ISO 13485:2016',
  'ISO 21001:2025',
  'ISO 20000-1: 2018',
  'ISO 37000:2021',
  'ISO 37001:2025',
  'ISO 39001:2012',
  'ISO 41001:2018',
  'ISO 50001:2018',
  'ISO 22301:2019',
];

const CERTIFICATION_TYPES_EN = [
  'Initial Certification',
  '1st Surveillance',
  '2nd Surveillance',
  'Recertification',
];

const CERTIFICATION_TYPES_AR = [
  'الشهادة الأولية',
  'المراقبة الأولى',
  'المراقبة الثانية',
  'إعادة التصديق',
];

const COUNTRIES_EN = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
  'Bahrain', 'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China',
  'Colombia', 'Czech Republic', 'Denmark', 'Egypt', 'Ethiopia', 'Finland',
  'France', 'Germany', 'Ghana', 'Greece', 'Hungary', 'India', 'Indonesia',
  'Iraq', 'Ireland', 'Italy', 'Japan', 'Jordan', 'Kenya', 'Kuwait',
  'Lebanon', 'Libya', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands',
  'New Zealand', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine',
  'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea',
  'Spain', 'Sudan', 'Sweden', 'Switzerland', 'Syria', 'Thailand',
  'Tunisia', 'Turkey', 'UAE', 'Uganda', 'Ukraine', 'United Kingdom',
  'United States', 'Vietnam', 'Yemen',
];

const COUNTRIES_AR = [
  "أفغانستان", "ألبانيا", "الجزائر", "الأرجنتين", "أستراليا", "النمسا",
  "البحرين", "بنغلاديش", "بلجيكا", "البرازيل", "كندا", "تشيلي", "الصين",
  "كولومبيا", "جمهورية التشيك", "الدنمارك", "مصر", "إثيوبيا", "فنلندا",
  "فرنسا", "ألمانيا", "غانا", "اليونان", "المجر", "الهند", "إندونيسيا",
  "العراق", "أيرلندا", "إيطاليا", "اليابان", "الأردن", "كينيا", "الكويت",
  "لبنان", "ليبيا", "ماليزيا", "المكسيك", "المغرب", "هولندا", "نيوزيلندا",
  "نيجيريا", "النرويج", "سلطنة عُمان", "باكستان", "فلسطين", "بيرو",
  "الفلبين", "بولندا", "البرتغال", "دولة قطر", "رومانيا", "روسيا",
  "المملكة العربية السعودية", "سنغافورة", "جنوب أفريقيا", "كوريا الجنوبية",
  "إسبانيا", "السودان", "السويد", "سويسرا", "سوريا", "تايلاند", "تونس",
  "تركيا", "الإمارات العربية المتحدة", "أوغندا", "أوكرانيا", "المملكة المتحدة",
  "الولايات المتحدة", "فيتنام", "اليمن",
];

export default function RequestCertForm({ lang = "en" }) {
  const [submitted, setSubmitted] = useState(false);

  const contact = t(lang);
  const schema = createContactSchema2(lang);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      isoStandard: ['ISO 9001:2015'],
      certificationType: '1st Surveillance',
      country: 'Egypt',
    },
  });

  const onSubmit = async (data) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/certification-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        organization_name: data.organizationName,
        address: data.address,
        state_region: data.state,
        city: data.city,
        postal_code: data.postalCode,
        country: data.country,
        contact_name: data.contactName,
        contact_phone: data.contactPhone,
        contact_email: data.contactMail,
        iso_standard: data.isoStandard,
        scope_of_certification: data.scopeOfCertification,
        certification_type: data.certificationType,
        comments: data.comments,
      }),
    });

    if (!res.ok) throw new Error("Server error");
    const result = await res.json();
    console.log("Success:", result);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
        console.error("Error:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-[2.5rem] border border-[#e2e8f0] shadow-2xl shadow-[#022d60]/5 overflow-hidden">
        {/* Form Header */}
        <div className="bg-[#022d60] px-10 py-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className={`${lang === "ar" ? "font-heading" : ""} text-3xl font-bold mb-3`}>
              {contact.subtitle || (lang === "ar" ? "طلب عرض سعر أو اعتماد" : "Request Certification Quote")}
            </h3>
            <p className="text-blue-100 text-sm opacity-90 max-w-2xl">
              {contact.description1 || (lang === "ar" 
                ? "ابدأ رحلتك نحو التميز العالمي. املأ البيانات وسيقوم خبراؤنا بدراسة طلبك." 
                : "Begin your journey to global excellence. Fill in your details and our experts will review your request.")}
            </p>
          </div>
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-10" noValidate>
          {/* Success message */}
          {submitted && (
            <div className="flex items-center gap-4 p-6 bg-green-50 border border-green-100 rounded-2xl animate-scale-in">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-green-800">{lang === "ar" ? "تم الإرسال!" : "Request Received!"}</h4>
                <p className="text-sm text-green-700">{contact.successMessage}</p>
              </div>
            </div>
          )}

          {/* ── Section A: Organization Details ── */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#022d60]/5 text-[#022d60] flex items-center justify-center text-sm font-bold">01</div>
              <h4 className="text-lg font-bold text-[#022d60] uppercase tracking-wider">{lang === "ar" ? "بيانات المؤسسة" : "Organization Details"}</h4>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#022d60]">{contact.organizationName}</label>
                <input
                  type="text"
                  placeholder={contact.organizationPlaceholder}
                  className={`px-5 py-4 rounded-2xl border-[1.5px] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 ${errors.organizationName ? 'border-red-300 bg-red-50' : 'border-[#e2e8f0]'}`}
                  {...register('organizationName')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#022d60]">{contact.address}</label>
                <input
                  type="text"
                  placeholder={contact.addressPlaceholder}
                  className={`px-5 py-4 rounded-2xl border-[1.5px] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 ${errors.address ? 'border-red-300 bg-red-50' : 'border-[#e2e8f0]'}`}
                  {...register('address')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#022d60]">{contact.city}</label>
                <input
                  type="text"
                  placeholder={contact.cityPlaceholder}
                  className={`px-5 py-4 rounded-2xl border-[1.5px] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 ${errors.city ? 'border-red-300 bg-red-50' : 'border-[#e2e8f0]'}`}
                  {...register('city')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#022d60]">{contact.country}</label>
                <select
                  className="px-5 py-4 rounded-2xl border-[1.5px] border-[#e2e8f0] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 appearance-none cursor-pointer"
                  {...register('country')}
                >
                  {lang === 'en' ? (
                    COUNTRIES_EN.map((c) => <option key={c} value={c}>{c}</option>)
                  ) : (
                    COUNTRIES_AR.map((c) => <option key={c} value={c}>{c}</option>)
                  )}
                </select>
              </div>
            </div>
          </div>

          <hr className="border-[#e2e8f0]" />

          {/* ── Section B: Contact Information ── */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#022d60]/5 text-[#022d60] flex items-center justify-center text-sm font-bold">02</div>
              <h4 className="text-lg font-bold text-[#022d60] uppercase tracking-wider">{lang === "ar" ? "بيانات التواصل" : "Contact Information"}</h4>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#022d60]">{contact.contactName} <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder={contact.contactNamePlaceholder}
                  className={`px-5 py-4 rounded-2xl border-[1.5px] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 ${errors.contactName ? 'border-red-300 bg-red-50' : 'border-[#e2e8f0]'}`}
                  {...register('contactName')}
                />
                {errors.contactName && <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">{errors.contactName.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#022d60]">{contact.contactPhone} <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  placeholder={contact.contactPhonePlaceholder}
                  className={`px-5 py-4 rounded-2xl border-[1.5px] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 ${errors.contactPhone ? 'border-red-300 bg-red-50' : 'border-[#e2e8f0]'}`}
                  {...register('contactPhone')}
                />
                {errors.contactPhone && <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">{errors.contactPhone.message}</p>}
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-sm font-bold text-[#022d60]">{contact.contactMail} <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  placeholder={contact.contactMailPlaceholder}
                  className={`px-5 py-4 rounded-2xl border-[1.5px] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 ${errors.contactMail ? 'border-red-300 bg-red-50' : 'border-[#e2e8f0]'}`}
                  {...register('contactMail')}
                />
                {errors.contactMail && <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">{errors.contactMail.message}</p>}
              </div>
            </div>
          </div>

          <hr className="border-[#e2e8f0]" />

          {/* ── Section C: Certification Requirements ── */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#022d60]/5 text-[#022d60] flex items-center justify-center text-sm font-bold">03</div>
              <h4 className="text-lg font-bold text-[#022d60] uppercase tracking-wider">{lang === "ar" ? "متطلبات الاعتماد" : "Certification Requirements"}</h4>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <label className="text-sm font-bold text-[#022d60] flex items-center justify-between">
                  <span>{contact.isoStandard} <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">{lang === 'ar' ? "يمكنك اختيار أكثر من معيار" : "Select all that apply"}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ISO_STANDARDS.map((standard) => (
                    <label key={standard} className="group relative flex items-center gap-3 p-4 rounded-2xl border-[1.5px] border-[#e2e8f0] bg-[#f8f9fc] hover:border-[#022d60]/30 hover:bg-white transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        value={standard}
                        className="w-5 h-5 rounded-md border-2 border-[#022d60]/20 checked:bg-[#022d60] checked:border-[#022d60] transition-all cursor-pointer accent-[#022d60]"
                        {...register('isoStandard')}
                      />
                      <span className="text-xs font-bold text-[#022d60] group-hover:text-[#022d60] whitespace-nowrap">{standard}</span>
                    </label>
                  ))}
                </div>
                {errors.isoStandard && <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">{errors.isoStandard.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#022d60]">{contact.scope}</label>
                  <input
                    type="text"
                    placeholder={contact.scopePlaceholder}
                    className="px-5 py-4 rounded-2xl border-[1.5px] border-[#e2e8f0] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5"
                    {...register('scopeOfCertification')}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#022d60]">{contact.certificationType}</label>
                  <select
                    className="px-5 py-4 rounded-2xl border-[1.5px] border-[#e2e8f0] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 appearance-none cursor-pointer"
                    {...register('certificationType')}
                  >
                    <option value="">{contact.certificationType}</option>
                    {lang === "en" ? CERTIFICATION_TYPES_EN.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    )) : CERTIFICATION_TYPES_AR.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#022d60]">{contact.comments}</label>
                <textarea
                  placeholder={contact.commentsPlaceholder}
                  rows={4}
                  className="px-5 py-4 rounded-2xl border-[1.5px] border-[#e2e8f0] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none resize-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5"
                  {...register('comments')}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group flex items-center justify-center gap-3 px-16 py-5 rounded-2xl bg-gradient-to-br from-[#022d60] to-[#0a4a9c] text-white text-base font-bold shadow-xl shadow-[#022d60]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#022d60]/30 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  {contact.sending}
                </>
              ) : (
                <>
                  {contact.submit}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
