"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import RequestCertForm from "../layout/RequestCertForm";
import { t } from "@/app/i18n/contact";

export function MenaFlags({ lang }) {
  const MENA_COUNTRIES = [
    { code: "sa", name: lang === "en" ? "Saudi Arabia" : "المملكة العربية السعودية" },
    { code: "ae", name: lang === "en" ? "UAE" : "الإمارات العربية المتحدة" },
    { code: "eg", name: lang === "en" ? "Egypt" : "مصر" },
    { code: "qa", name: lang === "en" ? "Qatar" : "قطر" },
    { code: "kw", name: lang === "en" ? "Kuwait" : "الكويت" },
    { code: "bh", name: lang === "en" ? "Bahrain" : "البحرين" },
    { code: "om", name: lang === "en" ? "Oman" : "عُمان" },
    { code: "jo", name: lang === "en" ? "Jordan" : "الأردن" },
    { code: "lb", name: lang === "en" ? "Lebanon" : "لبنان" },
    { code: "iq", name: lang === "en" ? "Iraq" : "العراق" },
    { code: "ye", name: lang === "en" ? "Yemen" : "اليمن" },
    { code: "sy", name: lang === "en" ? "Syria" : "سوريا" },
    { code: "ps", name: lang === "en" ? "Palestine" : "فلسطين" },
    { code: "ly", name: lang === "en" ? "Libya" : "ليبيا" },
    { code: "tn", name: lang === "en" ? "Tunisia" : "تونس" },
    { code: "dz", name: lang === "en" ? "Algeria" : "الجزائر" },
    { code: "ma", name: lang === "en" ? "Morocco" : "المغرب" },
    { code: "sd", name: lang === "en" ? "Sudan" : "السودان" },
    { code: "mr", name: lang === "en" ? "Mauritania" : "موريتانيا" },
    { code: "so", name: lang === "en" ? "Somalia" : "الصومال" },
    { code: "dj", name: lang === "en" ? "Djibouti" : "جيبوتي" },
    { code: "km", name: lang === "en" ? "Comoros" : "جزر القمر" },
  ];

  const standards = [
    lang === "en" ? "ISO 9001:2015 — Quality Management" : "ISO 9001:2015 — إدارة الجودة",
    lang === "en" ? "ISO 14001:2015 — Environmental Management" : "ISO 14001:2015 — الإدارة البيئية",
    lang === "en" ? "ISO 45001:2018 — Health & Safety" : "ISO 45001:2018 — الصحة والسلامة المهنية",
    lang === "en" ? "ISO 22000:2018 — Food Safety" : "ISO 22000:2018 — سلامة الغذاء",
    lang === "en" ? "HACCP — Food Safety" : "HACCP — سلامة الغذاء",
    lang === "en" ? "Other / Not Sure" : "أخرى / غير متأكد",
  ];

  const doubled = [...MENA_COUNTRIES, ...MENA_COUNTRIES];

  return (
    <div className="w-full overflow-hidden border-y border-slate-100 py-5 mb-12">
      <h2
        className={`${lang === "ar" ? "font-heading" : ""} text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-[#0f172a] leading-[1.2] text-center mb-10 text-[var(--primary-color)] bg-[rgba(55,118,189,0.08)] px-8 py-[0.5rem] rounded-full w-fit mx-auto`}
      >
        {lang === "ar" ? "الدول التي نخدمها" : "Countries we serve"}
      </h2>
      <div
        className="flex w-max"
        style={{ animation: "mena-scroll 36s linear infinite" }}
      >
        {doubled.map((country, i) => (
          <div key={i} className="flex items-stretch">
            {i > 0 && (
              <div className="w-px bg-slate-100 self-stretch my-2 mx-1" />
            )}
            <div className="group flex flex-col items-center gap-2 px-6 cursor-default">
              <img
                src={`https://flagcdn.com/w80/${country.code}.png`}
                alt={country.name}
                width={48}
                height={32}
                className="rounded-sm object-cover transition-transform duration-200 group-hover:scale-110"
                style={{ width: 48, height: 32 }}
              />
              <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap tracking-wide">
                {country.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContactUsPage({ lang }) {
  const translation = t(lang);
  const settings = useSettings();
  const phone = settings?.phone ?? "+20 102 629 4642";
  const email = settings?.email ?? "info@glidexquality.com";
  const address = settings?.address ?? translation.branchAddress2;
  const hotline = settings?.hotline ?? "+20 102 229 7588";

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", mobile: "",
    standard: "", employees: "", message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In production: POST to API endpoint
    setSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: lang === "en" ? "Phone / Hotline" : "الهاتف / الخط الساخن",
      lines: [phone, hotline].filter(Boolean),
    },
    {
      icon: Mail,
      label: lang === "en" ? "Email" : "البريد الإلكتروني",
      lines: [email],
    },
    {
      icon: MapPin,
      label: lang === "en" ? "Office" : "المكتب",
      lines: [address],
    },
    {
      icon: Clock,
      label: lang === "en" ? "Working Hours" : "ساعات العمل",
      lines:
        lang === "en"
          ? ["Saturday – Thursday", "8:00 AM – 6:00 PM"]
          : ["السبت – الخميس", "8:00 صباحًا – 6:00 مساءً"],
    },
  ];

  const fields = [
    {
      label: lang === "en" ? "Full Name *" : "الاسم الكامل *",
      key: "name",
      type: "text",
      placeholder: lang === "en" ? "Your name" : "اسمك",
      required: true,
    },
    {
      label: lang === "en" ? "Company Name *" : "اسم الشركة *",
      key: "company",
      type: "text",
      placeholder: lang === "en" ? "Your company" : "اسم شركتك",
      required: true,
    },
    {
      label: lang === "en" ? "Email Address *" : "البريد الإلكتروني *",
      key: "email",
      type: "email",
      placeholder: "your@company.com",
      required: true,
    },
    {
      label: lang === "en" ? "Mobile Number" : "رقم الهاتف",
      key: "mobile",
      type: "tel",
      placeholder: "+20 xxx xxx xxxx",
      required: false,
    },
  ];

  return (
    <div>
      <PageHero
        tag={lang === "en" ? "Get In Touch" : "تواصل معنا"}
        title={lang === "en" ? "Contact Glidex Quality" : "تواصل مع Glidex Quality"}
        subtitle={lang === "en" ? "Have questions about certification? Our team is ready to help. We respond within one business day." : "هل لديك أسئلة حول الشهادات؟ فريقنا جاهز للمساعدة. نرد خلال يوم عمل واحد."}
        lang={lang}
      />

      <section className="py-20 bg-[#f8f9fc]">
        <MenaFlags lang={lang}/>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-5">
            {contactInfo.map(({ icon: Icon, label, lines }) => (
              <div key={label} className="bg-white rounded-2xl border border-[#e2e8f0] p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#022d60] flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-[#00844a] uppercase tracking-widest mb-1">{label}</div>
                  {lines.map((l) => <div key={l} className="text-sm text-[#0f172a]">{l}</div>)}
                </div>
              </div>
            ))}

            {/* CTA card */}
            <div className="bg-gradient-to-br from-[#022d60] to-[#011a3a] rounded-2xl p-6 text-white">
              <h3 className="font-semibold mb-2">{lang === "en" ? "Need Immediate Help?" : "هل تحتاج إلى مساعدة فورية؟"}</h3>
              <p className="text-blue-200 text-sm mb-4">{lang === "en" ? "Our team is available Saturday to Thursday, 8am to 6pm." : "فريقنا متاح من السبت إلى الخميس، من الساعة 8 صباحاً حتى 6 مساءً."}</p>
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-[#00844a] font-mono font-bold text-sm hover:text-white transition-colors">
                {phone}
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <RequestCertForm lang={lang} />
          </div>
        </div>
      </section>
    </div>
  );
}