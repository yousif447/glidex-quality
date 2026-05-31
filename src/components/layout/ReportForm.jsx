'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createContactSchema } from '@/lib/schemas/contactSchema';
import { t } from '@/app/i18n/contact';

export default function ReportForm({lang = "en"}) {
    const schema = createContactSchema(lang);
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({resolver: zodResolver(schema)});
    const contact = t(lang);
    const [submitted, setSubmitted] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 4000);
    };

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.fullName,
                    email: data.email,
                    phone: data.mobile,
                    certificate_number: data.certificateNumber ?? "",
                    message: data.message,
                }),
            });

            if (!res.ok) throw new Error("Server error");
            await res.json();
            setSubmitted(true);
            reset();
            showToast('success', contact.successMessage);
        } catch (err) {
            showToast('error', contact.errorMessage);
            console.error("Error:", err);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-4xl mx-auto w-full">
                <div className="bg-white rounded-[2.5rem] border border-[#e2e8f0] shadow-2xl shadow-[#022d60]/5 p-12 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00844a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    </div>
                    <h3 className={`${lang === "ar" ? "font-heading" : ""} text-2xl font-bold text-[#022d60] mb-3`}>
                        {lang === "ar" ? "تم الإرسال بنجاح!" : "Report Submitted Successfully"}
                    </h3>
                    <p className="text-[#64748b] text-base max-w-[400px] leading-relaxed mb-8">
                        {contact.successMessage}
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="flex items-center gap-2 text-sm font-bold text-[#022d60] hover:text-[#0a4a9c] transition-colors bg-[#f8f9fc] px-6 py-3 rounded-xl border border-[#e2e8f0]"
                    >
                        {lang === "ar" ? "إرسال تقرير آخر" : "Send another report"}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 ${lang === "ar" ? "left-6" : "right-6"} z-[9999] flex items-center gap-3 px-5 py-4 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border transition-all duration-300
                ${
                  toast.type === "success"
                    ? "bg-white border-green-200 text-green-800"
                    : "bg-white border-red-200 text-red-800"
                }`}
        >
          {toast.type === "success" ? (
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
          )}
          <div>
            <p className="text-sm font-bold">
              {toast.type === "success"
                ? lang === "ar" ? "تم الإرسال!" : "Sent successfully!"
                : lang === "ar" ? "حدث خطأ!" : "Something went wrong!"}
            </p>
            <p className="text-xs opacity-80 max-w-[220px] leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-[2.5rem] border border-[#e2e8f0] shadow-2xl shadow-[#022d60]/5 overflow-hidden">
          {/* Form Header */}
          <div className="bg-[#022d60] px-10 py-8 text-white">
            <h3 className={`${lang === "ar" ? "font-heading" : ""} text-2xl font-bold mb-2`}>
              {lang === "ar" ? "إبلاغ عن مشكلة أو استفسار" : "Submit a Report or Inquiry"}
            </h3>
            <p className="text-blue-100 text-sm opacity-80">
              {lang === "ar" 
                ? "يرجى ملء النموذج أدناه وسيقوم فريق الخبراء لدينا بالتواصل معك." 
                : "Please fill out the form below and our expert team will get in touch."}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-sm font-bold text-[#022d60] flex items-center gap-2">
                  {contact.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("fullName")}
                  type="text"
                  id="fullName"
                  placeholder={contact.fullNamePlaceholder}
                  className={`px-5 py-4 rounded-2xl border-[1.5px] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 ${errors.fullName ? 'border-red-300 bg-red-50' : 'border-[#e2e8f0]'}`}
                />
                {errors.fullName && (
                  <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-bold text-[#022d60] flex items-center gap-2">
                  {contact.emailAddress} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder={contact.emailAddressPlaceholder}
                  className={`px-5 py-4 rounded-2xl border-[1.5px] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 ${errors.email ? 'border-red-300 bg-red-50' : 'border-[#e2e8f0]'}`}
                />
                {errors.email && (
                  <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">{errors.email.message}</p>
                )}
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-2">
                <label htmlFor="mobile" className="text-sm font-bold text-[#022d60] flex items-center gap-2">
                  {contact.mobile} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("mobile")}
                  type="tel"
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  id="mobile"
                  placeholder={contact.phonePlaceholder}
                  className={`px-5 py-4 rounded-2xl border-[1.5px] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 ${errors.mobile ? 'border-red-300 bg-red-50' : 'border-[#e2e8f0]'}`}
                />
                {errors.mobile && (
                  <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">{errors.mobile.message}</p>
                )}
              </div>

              {/* Certificate Number */}
              <div className="flex flex-col gap-2">
                <label htmlFor="certificateNumber" className="text-sm font-bold text-[#022d60] flex items-center gap-2">
                  {lang === "ar" ? "رقم الشهادة" : "Certificate Number"}
                </label>
                <input
                  {...register("certificateNumber")}
                  type="text"
                  id="certificateNumber"
                  placeholder={lang === "ar" ? "أدخل رقم الشهادة" : "Enter certificate number"}
                  className={`px-5 py-4 rounded-2xl border-[1.5px] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5 ${errors.certificateNumber ? 'border-red-300 bg-red-50' : 'border-[#e2e8f0]'}`}
                />
                {errors.certificateNumber && (
                  <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider">{errors.certificateNumber.message}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-bold text-[#022d60]">
                {contact.message}
              </label>
              <textarea
                {...register("message")}
                id="message"
                rows={4}
                placeholder={contact.messagePlaceholder}
                className="px-5 py-4 rounded-2xl border-[1.5px] border-[#e2e8f0] bg-[#f8f9fc] text-[#0f172a] text-sm outline-none resize-none min-h-[120px] transition-all duration-300 focus:bg-white focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/5"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group flex items-center justify-center gap-3 px-12 py-4 rounded-2xl bg-gradient-to-br from-[#022d60] to-[#0a4a9c] text-white text-sm font-bold shadow-xl shadow-[#022d60]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#022d60]/30 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    {contact.sending}
                  </>
                ) : (
                  <>
                    {contact.submitMeassage}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <path d="M22 2 11 13" />
                      <path d="m22 2-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
