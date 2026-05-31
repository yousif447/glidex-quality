export const t = (lang) => {
  const translations = {
    en: {
      label1: "Certified Organizations",
      label2: "Years of Excellence",
      label3: "Global Partners",
    },
    ar: {
      label1: "مؤسسة معتمدة",
      label2: "سنوات من التميز",
      label3: "شركاء عالميون",
    },
  };
  return translations[lang] || translations.en;
};
