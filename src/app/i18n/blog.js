export const t = (lang) => {
  const translations = {
    en: {
      blogTitle: "Blog",
      sharingLabel: "Share This",
      backToBlog: "Back to Blog",
      articleInfo: "Article Info",
      publishedOn: "Published On",
      categoryLabel: "Category",
      viewsLabel: "Views",
      reads: "Reads",
      recommendedReading: "Recommended Reading",
      moreToExplore: "More to Explore",
      resource: "Resource",
    },
    ar: {
      blogTitle: "المدونة",
      sharingLabel: "مشاركة",
      backToBlog: "العودة إلى المدونة",
      articleInfo: "عن المقال",
      publishedOn: "نُشر في",
      categoryLabel: "التصنيف",
      viewsLabel: "المشاهدات",
      reads: "قراءة",
      recommendedReading: "مقالات مقترحة",
      moreToExplore: "المزيد من المقالات",
      resource: "مصدر",
    }
  };
  return translations[lang] || translations.en;
};
