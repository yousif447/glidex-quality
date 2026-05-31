"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { MdOutlineLocationOn, MdOutlinePhone, MdAccessTime } from 'react-icons/md';

import { t as getCommon } from "@/app/i18n/common";
import { t } from "@/app/i18n/contact";

export default function RegisterCTA({ lang }) {
  const contact = t(lang)
  const dict = getCommon(lang);
  const isAr = lang === "ar";
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-[#f8f9fc] stripe-pattern" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className={isAr ? "text-right" : ""}>
            <div className='text-center py-2'>
              <p className={`${lang === "ar" ? "font-heading" : ""} font-semibold text-white bg-gradient-to-r from-[#022d60] to-[#0a4a9c] py-[0.35rem] rounded-xl mb-2`}>{lang === "ar" ? "فرع حدائق الأهرام" : "Hadayk Al-Ahram Branch"}</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.9238130541275!2d31.108233599999995!3d29.9667697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584f00713ce79f%3A0x8380fb2bffc1cdc3!2zQ2FsbWEgc3BhINmF2YbYqtis2Lkg2LXYrdmKINmE2YTYs9mK2K_Yp9iq!5e1!3m2!1sen!2seg!4v1778439781826!5m2!1sen!2seg"
                width="100%"
                height="260"
                style={{ border: 0, borderRadius: "var(--radius-lg)" }}
                allowFullScreen=""
                loading="lazy"
                suppressHydrationWarning
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>

            <div className="flex flex-col gap-4">

              {/* contact-info-card */}
              <div className="flex items-start gap-4 p-5 bg-[#f8fafc] rounded-[var(--radius-md)] border border-[#e2e8f0] transition-all duration-300 hover:border-[var(--primary-color)] hover:bg-[rgba(55,118,189,0.03)]">
                {/* contact-info-icon */}
                <div className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-md)] bg-[rgba(55,118,189,0.1)] text-[var(--primary-color)] shrink-0">
                  <MdAccessTime size={22} />
                </div>
                <div>
                  <h4 className={`${lang === "ar" ? "font-heading" : ""} font-bold text-[#0f172a] text-[0.95rem] mb-1`}>
                    {contact.workingHoursTitle}
                  </h4>
                  <p className="text-[#64748b] text-[0.875rem] leading-[1.65]">
                    {contact.workingHoursDays}<br />{contact.workingHoursTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#f8fafc] rounded-[var(--radius-md)] border border-[#e2e8f0] transition-all duration-300 hover:border-[var(--primary-color)] hover:bg-[rgba(55,118,189,0.03)]">
                <div className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-md)] bg-[rgba(55,118,189,0.1)] text-[var(--primary-color)] shrink-0">
                  <MdOutlineLocationOn size={22} />
                </div>
                <div className='flex flex-col gap-2'>
                  <div>
                    <h4 className={`${lang === "ar" ? "font-heading" : ""} font-bold text-[#0f172a] text-[0.95rem] mb-1`}>
                      {contact.branchTitle2}
                    </h4>
                    <p className="text-[#64748b] text-[0.875rem] leading-[1.65]">
                      {contact.branchAddress2}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#f8fafc] rounded-[var(--radius-md)] border border-[#e2e8f0] transition-all duration-300 hover:border-[var(--primary-color)] hover:bg-[rgba(55,118,189,0.03)]">
                <div className="flex items-center justify-center w-11 h-11 rounded-[var(--radius-md)] bg-[rgba(55,118,189,0.1)] text-[var(--primary-color)] shrink-0">
                  <MdOutlinePhone size={22} />
                </div>
                <div>
                  <h4 className={`${lang === "ar" ? "font-heading" : ""} font-bold text-[#0f172a] text-[0.95rem] mb-1`}>
                    {contact.landline}
                  </h4>
                  <p className="text-[#64748b] text-[0.875rem] leading-[1.65]">
                    <a href={`tel:${contact.branchPhone}`}
                      className="text-[var(--primary-color)] no-underline font-semibold transition-colors duration-200 hover:text-[#1e5a9e]">
                      {contact.branchPhone}
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-xl shadow-[#022d60]/8 p-10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#00844a]/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-[#00844a]" />
                </div>
                <h3 className=" text-2xl font-bold text-[#022d60] mb-2">
                  {dict.requestReceived}
                </h3>
                <p className="text-[#64748b]">
                  {dict.requestSuccessMsg}
                </p>
              </div>
            ) : (
              <>
                <h3 className={` text-2xl font-bold text-[#022d60] mb-8 ${isAr ? "text-right" : ""}`}>
                  {dict.imsRequest}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className={isAr ? "text-right" : ""}>
                    <label className="block text-sm font-medium text-[#0f172a] mb-2">
                      {dict.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/10 outline-none transition-all text-sm"
                      placeholder={dict.formPlaceholderName}
                    />
                  </div>
                  <div className={isAr ? "text-right" : ""}>
                    <label className="block text-sm font-medium text-[#0f172a] mb-2">
                      {dict.emailAddress} *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/10 outline-none transition-all text-sm"
                      placeholder={dict.formPlaceholderEmail}
                    />
                  </div>
                  <div className={isAr ? "text-right" : ""}>
                    <label className="block text-sm font-medium text-[#0f172a] mb-2">
                      {dict.mobileNumber}
                    </label>
                    <input
                      type="tel"
                      value={form.mobile}
                      onChange={(e) =>
                        setForm({ ...form, mobile: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/10 outline-none transition-all text-sm"
                      placeholder={dict.formPlaceholderMobile}
                    />
                  </div>
                  <div className={isAr ? "text-right" : ""}>
                    <label className="block text-sm font-medium text-[#0f172a] mb-2">
                      {dict.message}
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/10 outline-none transition-all text-sm resize-none"
                      placeholder={dict.formPlaceholderMsg}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#022d60] to-[#0a4a9c] text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-[#022d60]/25 hover:-translate-y-0.5 transition-all"
                  >
                    {dict.submitRequest} <Send size={16} className={isAr ? "rotate-180" : ""} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
