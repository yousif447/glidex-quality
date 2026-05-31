'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createContactSchema } from '@/lib/schemas/contactSchema';
import { t } from '@/app/i18n/contact';

export default function ContactForm({lang = "en"}) {
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-us`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.fullName,
                    email: data.email,
                    phone: data.mobile,
                    subject: "",
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
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                </div>
                <h3 className={`${lang === "ar" ? "font-heading" : ""} text-xl font-bold text-[#0f172a]`}>
                    {lang === "ar" ? "تم الإرسال بنجاح!" : "Message Sent!"}
                </h3>
                <p className="text-[#64748b] text-sm max-w-[300px] leading-relaxed">
                    {contact.successMessage}
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm text-[#5090ce] underline underline-offset-2 hover:text-[#3a75b0] transition-colors"
                >
                    {lang === "ar" ? "إرسال رسالة أخرى" : "Send another message"}
                </button>
            </div>
        );
    }

  return (
    <>
        {/* Toast */}
        {toast && (
            <div className={`fixed bottom-6 ${lang === "ar" ? "left-6" : "right-6"} z-[9999] flex items-center gap-3 px-5 py-4 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border transition-all duration-300
                ${toast.type === 'success'
                    ? 'bg-white border-green-200'
                    : 'bg-white border-red-200'
                }`}
            >
                {toast.type === 'success' ? (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    </div>
                ) : (
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                    </div>
                )}
                <div>
                    <p className={`text-sm font-semibold ${toast.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                        {toast.type === 'success'
                            ? (lang === "ar" ? "تم الإرسال!" : "Sent successfully!")
                            : (lang === "ar" ? "حدث خطأ!" : "Something went wrong!")
                        }
                    </p>
                    <p className="text-xs text-[#64748b] max-w-[220px] leading-relaxed">{toast.message}</p>
                </div>
                <button
                    onClick={() => setToast(null)}
                    className="ml-2 text-[#94a3b8] hover:text-[#64748b] transition-colors flex-shrink-0"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6.5 py-1.5">

            <div className="flex flex-col gap-[0.5rem]">
                <label htmlFor="fullName" className="text-[0.85rem] font-semibold text-[#334155]">
                {contact.fullName}*
                </label>
                {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                    {errors.fullName.message}
                </p>
                )}
                <input
                {...register("fullName")}
                type="text"
                id="fullName"
                placeholder={contact.fullNamePlaceholder}
                className="px-4 py-3 rounded-md border-[1.5px] border-[#e2e8f0] bg-white text-[#0f172a] text-[0.9rem] font-primary outline-none placeholder:text-[#94a3b8] transition-all duration-300 focus:border-[#5090ce] focus:shadow-[0_0_0_3px_rgba(55,118,189,0.1)]"
                />
            </div>

            <div className="flex flex-col gap-[0.4rem]">
                <label htmlFor="email" className="text-[0.85rem] font-semibold text-[#334155]">
                {contact.emailAddress}*
                </label>
                {errors.email && (
                <p className="mt-1 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                    {errors.email.message}
                </p>
                )}
                <input
                {...register("email")}
                type="email"
                id="email"
                placeholder={contact.emailAddressPlaceholder}
                className="px-4 py-3 rounded-md border-[1.5px] border-[#e2e8f0] bg-white text-[#0f172a] text-[0.9rem] font-primary outline-none placeholder:text-[#94a3b8] transition-all duration-300 focus:border-[#5090ce] focus:shadow-[0_0_0_3px_rgba(55,118,189,0.1)]"
                />
            </div>

            <div className="flex flex-col gap-[0.4rem]">
                <label htmlFor="mobile" className="text-[0.85rem] font-semibold text-[#334155]">
                {contact.mobile}
                </label>
                {errors.mobile && (
                <p className="mt-1 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                    {errors.mobile.message}
                </p>
                )}
                <input
                {...register("mobile")}
                type="tel"
                dir={lang === "ar" ? "rtl" : "ltr"}
                id="mobile"
                placeholder={contact.phonePlaceholder}
                className="px-4 py-3 rounded-md border-[1.5px] border-[#e2e8f0] bg-white text-[#0f172a] text-[0.9rem] font-primary outline-none placeholder:text-[#94a3b8] transition-all duration-300 focus:border-[#5090ce] focus:shadow-[0_0_0_3px_rgba(55,118,189,0.1)]"
                />
            </div>

            <div className="flex flex-col gap-[0.4rem]">
                <label htmlFor="message" className="text-[0.85rem] font-semibold text-[#334155]">
                {contact.message}
                </label>
                <textarea
                {...register("message")}
                id="message"
                rows={5}
                placeholder={contact.messagePlaceholder}
                className="px-4 py-3 rounded-md border-[1.5px] border-[#e2e8f0] bg-white text-[#0f172a] text-[0.9rem] font-primary outline-none resize-y min-h-[120px] placeholder:text-[#94a3b8] transition-all duration-300 focus:border-[#5090ce] focus:shadow-[0_0_0_3px_rgba(55,118,189,0.1)]"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`${lang === "ar" ? "font-heading" : ""} mt-2 inline-flex items-center justify-center gap-2 px-8 py-[0.9rem] border-none rounded-xl bg-linear-to-br from-[#5090ce] to-[#5b9bd5] text-white text-[0.95rem] font-semibold cursor-pointer shadow-[0_2px_12px_rgba(55,118,189,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(55,118,189,0.35)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        {contact.sending}
                    </>
                ) : (
                    <>
                        {contact.submitMeassage}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/>
                        </svg>
                    </>
                )}
            </button>

        </form>
    </>
  )
}