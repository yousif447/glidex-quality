export const t = (lang) => {
  const translations = {
    en: {
      heroHeader: "ISO Standards & Certifications",
      heroSubtitle: "Comprehensive range of management system standards",
      certificateProcessHeader: "Certification Process",
      certificateProcessTitle: "Path to Certification",
      certificateProcessDescription: "Our comprehensive process ensures your management system meets international standards through expert guidance.",
      lifecycleHeader: "Certification Lifecycle",
      lifecycleTitle: "Certification Processes for Every Stage",
      lifecycleDescription: "From granting to withdrawing — understand every phase of the certification lifecycle.",
      benefitsHeader: "Why Choose Us",
      benefitsTitle: "The Benefits of Certification",
      benefitsDescription: "Enhance your organization’s reputation, operational efficiency, and market competitiveness with our globally recognized ISO certifications.",
    },
    ar: {
      heroHeader: "معايير وشهادات الأيزو",
      heroSubtitle: "مجموعة شاملة من معايير نظام الإدارة",
      certificateProcessHeader: "عملية منح الشهادة",
      certificateProcessTitle: "الطريق نحو الاعتماد",
      certificateProcessDescription: "تضمن عمليتنا الشاملة تلبية نظام الإدارة لديك للمعايير الدولية من خلال إرشادات الخبراء.",
      lifecycleHeader: "دورة حياة الاعتماد",
      lifecycleTitle: "عمليات الاعتماد لكل مرحلة",
      lifecycleDescription: "من المنح إلى السحب - فهم كل مرحلة من مراحل دورة حياة الاعتماد.",
      benefitsHeader: "لماذا تختارنا",
      benefitsTitle: "فوائد الحصول على الشهادة",
      benefitsDescription: "عزز سمعة مؤسستك، الكفاءة التشغيلية، والقدرة التنافسية في السوق من خلال شهادات الأيزو المعترف بها عالمياً.",
    }
  };
  return translations[lang] || translations.en;
};
