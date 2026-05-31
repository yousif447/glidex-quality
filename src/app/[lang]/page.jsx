import { apiFetch } from "@/lib/api";
import HeroSection from "@/components/sections/Hero";
import CountUpStats from "@/components/ui/CountUpStats";
import ServicesSection from "@/components/sections/ServicesSection";

import WhyUs from "@/components/sections/WhyUs";
import ClientsSection from "@/components/sections/ClientsSection";
import RegisterCTA from "@/components/sections/RegisterCTA";
import OurPartners from "@/components/sections/OurPartners";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  try {
    const data = await apiFetch("/pages/home", lang, { cache: "force-cache" });
    const seo = data?.seo_meta;
    if (seo) {
      return {
        title: seo.title,
        description: seo.description?.slice(0, 155),
        keywords: seo.keywords,
      };
    }
  } catch {}
  return {
    title: "Glidex Quality",
    description:
      "Glidex Quality provides internationally recognized ISO management system certifications. EGAC Accredited, IAF Recognized.",
  };
}

export default async function HomePage({ params }) {
  const { lang } = await params;

  // Fetch home page data from API
  const data = await apiFetch("/pages/home", lang );

  return (
    <>
      <HeroSection data={data} lang={lang} />
      <CountUpStats lang={lang} />
      <ServicesSection data={data} lang={lang} />

      <WhyUs data={data} lang={lang} />
      <OurPartners data={data} lang={lang} />
      <ClientsSection data={data} lang={lang} />
      <RegisterCTA lang={lang} />
    </>
  );
}
