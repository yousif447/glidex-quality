export const t = (lang) => {
    const translations = {
        en: {
        // Hero
        validation: "Validation",
        portalTitle: "Certificate Verification Portal",
    
        // Steps
        step1Title: "Select Certificate Type",
        step1Desc:
            "Choose between company or individual training certificates.",
    
        step2Title: "Enter Certificate Number",
        step2Desc:
            "Find the registration number printed on your document.",
    
        step3Title: "Instant Results",
        step3Desc:
            "Receive real-time confirmation from our official database.",
    
        // Options
        companyTitle: "Company Certifications",
        companyDesc:
            "ISO 9001, 14001, 45001, 22000, HACCP, and more issued to organizations.",
        companySubtitle:
            "Enter your organization's ISO certificate number to check its status.",
        companyPlaceholder: "e.g. GQ-9001-2025-00123",
    
        individualTitle: "Individual Certifications",
        individualDesc:
            "Verify certificates issued for individual training, lead auditor courses, and workshops.",
        individualSubtitle:
            "Enter your training certificate number to verify your qualification.",
        individualPlaceholder: "e.g. TRN-2025-00456",
    
        // Form
        back: "Back to selection",
        certificateNumber: "Certificate Number",
        verify: "Verify Certificate",
        verifying: "Verifying...",
    
        // Result
        success: "Certificate Verified Successfully",
        officialRecord: "Official Certificate Record",
    
        notFound: "Certificate Not Found",
        notFoundDesc:
            "No matching certificate was found. Please check the number and try again, or contact us for assistance.",
    
        // Footer note
        cantFind: "Can't find a certificate?",
        cantFindDesc:
            "Contact us at info@glidexquality.com with the certificate details and we'll investigate within one business day.",
        },
    
        ar: {
        // Hero
        validation: "التحقق",
        portalTitle: "بوابة التحقق من الشهادات",
    
        // Steps
        step1Title: "اختر نوع الشهادة",
        step1Desc:
            "اختر بين شهادات الشركات أو شهادات التدريب الفردية.",
    
        step2Title: "أدخل رقم الشهادة",
        step2Desc:
            "ابحث عن رقم التسجيل المطبوع على الشهادة الخاصة بك.",
    
        step3Title: "نتائج فورية",
        step3Desc:
            "احصل على تأكيد فوري من قاعدة البيانات الرسمية الخاصة بنا.",
    
        // Options
        companyTitle: "شهادات الشركات",
        companyDesc:
            "شهادات ISO 9001 و14001 و45001 و22000 وHACCP وغيرها الصادرة للمؤسسات.",
        companySubtitle:
            "أدخل رقم شهادة الأيزو الخاصة بمؤسستك للتحقق من حالتها.",
        companyPlaceholder: "مثال: GQ-9001-2025-00123",
    
        individualTitle: "الشهادات الفردية",
        individualDesc:
            "تحقق من الشهادات الصادرة للتدريب الفردي ودورات المراجع الرئيسي وورش العمل.",
        individualSubtitle:
            "أدخل رقم شهادة التدريب الخاصة بك للتحقق من مؤهلاتك.",
        individualPlaceholder: "مثال: TRN-2025-00456",
    
        // Form
        back: "العودة للاختيار",
        certificateNumber: "رقم الشهادة",
        verify: "التحقق من الشهادة",
        verifying: "جارٍ التحقق...",
    
        // Result
        success: "تم التحقق من الشهادة بنجاح",
        officialRecord: "السجل الرسمي للشهادة",
    
        notFound: "الشهادة غير موجودة",
        notFoundDesc:
            "لم يتم العثور على شهادة مطابقة. يرجى التحقق من الرقم والمحاولة مرة أخرى أو التواصل معنا للمساعدة.",
    
        // Footer note
        cantFind: "لا تستطيع العثور على شهادة؟",
        cantFindDesc:
            "تواصل معنا عبر info@glidexquality.com مع تفاصيل الشهادة وسنقوم بالتحقق خلال يوم عمل واحد.",
        },
    };
    return translations[lang] || translations.en;
}