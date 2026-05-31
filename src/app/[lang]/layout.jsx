import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { SettingsProvider } from "@/context/SettingsContext";
import { Nunito, Rubik } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

const rubik = Rubik({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-rubik",
});

const SUPPORTED_LANGS = ["en", "ar"];

async function fetchSettings(lang) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "https://admin.absglobals.com/api/v1"}/pages/home`,
      { headers: { lang }, next: { revalidate: false } },
    );
    if (!res.ok) return {};
    const json = await res.json();
    return json.data?.settings ?? {};
  } catch {
    return {};
  }
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  if (!SUPPORTED_LANGS.includes(lang)) notFound();

  const settings = await fetchSettings(lang);

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${nunito.variable} ${rubik.variable}`}
    >
      <body className="antialiased">
        <Navbar lang={lang} settings={settings} />
        <Breadcrumb lang={lang} />
        <SettingsProvider settings={settings}>
          <main>{children}</main>
        </SettingsProvider>
        <Footer lang={lang} settings={settings} />
      </body>
    </html>
  );
}
