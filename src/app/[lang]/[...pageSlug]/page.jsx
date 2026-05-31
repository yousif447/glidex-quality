import { apiFetch, resolveEndpoint, resolveCacheOption } from "@/lib/api";

// Page components
import AboutUsPage from "@/components/pages/AboutUsPage";
import ServicesPage from "@/components/pages/ServicesPage";
import ServicePage from "@/components/pages/ServicePage";
import PartnersPage from "@/components/pages/PartnersPage";
import IndustriesServedPage from "@/components/pages/IndustriesServedPage";
import ResourcesPage from "@/components/pages/ResourcesPage";
import ContactUsPage from "@/components/pages/ContactUsPage";
import BlogsPage from "@/components/pages/BlogsPage";
import BlogPage from "@/components/pages/BlogPage";
import FaqPage from "@/components/pages/FaqPage";
import ValidationPage from "@/components/pages/ValidationPage";
import ReportsPage from "@/components/pages/ReportsPage";
import NotFound from "@/app/not-found";

// ─── SEO metadata ────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { lang, pageSlug } = await params;
  const endpoint = resolveEndpoint(pageSlug);

  // Only fetch SEO for top-level listing pages (not individual items)
  if (
    endpoint &&
    !endpoint.includes("/iso/") &&
    !endpoint.includes("/posts/")
  ) {
    try {
      const data = await apiFetch(
        endpoint,
        lang,
        resolveCacheOption(pageSlug[0]),
      );
      const seo = data?.seo_meta;
      if (seo) {
        return {
          title: seo.title,
          description: seo.description?.slice(0, 155),
          keywords: seo.keywords,
        };
      }
    } catch (err) {
      console.error(`SEO fetch failed for /${pageSlug.join("/")}:`, err);
    }
  }

  // Fallback
  const fallback = pageSlug[pageSlug.length - 1]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${fallback} | Glidex Quality`,
    description: "Glidex Quality — ISO Certification Services",
  };
}

// ─── Page map ────────────────────────────────────────────────────────────────
const pagesMap = {
  "about-us": AboutUsPage,
  "our-service": ServicesPage,
  "our-partners": PartnersPage,
  "industries-served": IndustriesServedPage,
  resources: ResourcesPage,
  blog: BlogsPage,
  faqs: FaqPage,
};

// Pages rendered without backend data
const noDataPages = new Set(["contact-us", "validation", "reports"]);

// ─── Page component ───────────────────────────────────────────────────────────
export default async function DynamicPage({ params }) {
  const { lang, pageSlug } = await params;

  // ── Individual service page: /[lang]/our-service/[slug] ──
  if (pageSlug[0] === "our-service" && pageSlug[1]) {
    const data = await apiFetch(`/iso/${pageSlug[1]}`, lang, {
      cache: "no-store",
    });
    if (!data) return <NotFound lang = {lang} />;
    return <ServicePage data={data} lang={lang} slug={pageSlug[1]} />;
  }

  // ── Individual blog post: /[lang]/blog/[slug] ──
  if (pageSlug[0] === "blog" && pageSlug[1]) {
    const data = await apiFetch(`/posts/${pageSlug[1]}`, lang, {
      cache: "no-store",
    });
    if (!data) return <NotFound lang={lang} />;
    return <BlogPage data={data} lang={lang} slug={pageSlug[1]} />;
  }

  // ── Static pages (no API data needed) ──
  if (noDataPages.has(pageSlug[0])) {
    if (pageSlug[0] === "contact-us") return <ContactUsPage lang={lang} />;
    if (pageSlug[0] === "validation") return <ValidationPage lang={lang} />;
    if (pageSlug[0] === "reports") return <ReportsPage lang={lang} />;
  }

  // ── Mapped listing pages ──
  const Component = pagesMap[pageSlug[0]];
  if (!Component) return <NotFound lang = {lang} />;

  const data = await apiFetch(
    `/pages/${pageSlug[0]}`,
    lang,
    resolveCacheOption(pageSlug[0]),
  );
  if (!data) return <NotFound lang = {lang} />;

  return <Component data={data} lang={lang} />;
}
