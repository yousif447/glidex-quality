import Link from "next/link";
import { Shield, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";

import { t as getCommon } from "@/app/i18n/common";
import Image from "next/image";
import { t } from "@/app/i18n/contact";

export default function Footer({ lang, settings={} }) {
  const socialLinks = [
    {
      href: settings.Facebook || "https://www.facebook.com/ABSGlobals",
      icon: <FaFacebookF size={16} />,
      label: "Facebook",
      hoverClass: "social-facebook",
    },
    {
      href: settings.instagram || "https://www.instagram.com/abs_global_certificate/",
      icon: <FaInstagram size={16} />,
      label: "Instagram",
      hoverClass: "social-instagram",
    },
    {
      href: settings.linkedin || "https://www.linkedin.com/company/absglobal-iso-service",
      icon: <FaLinkedinIn size={16} />,
      label: "LinkedIn",
      hoverClass: "social-linkedin",
    },
    {
      href: settings.whatsapp || "https://wa.me/+201026294642",
      icon: <FaWhatsapp size={16} />,
      label: "WhatsApp",
      hoverClass: "social-whatsapp",
    },
    {
      href: settings.youtube || "https://www.youtube.com/@ABSGLOBALS",
      icon: <FaYoutube size={16} />,
      label: "YouTube",
      hoverClass: "social-youtube",
    },
  ];

  const contact = t(lang)
  const dict = getCommon(lang);
  const p = (slug) => `/${lang}/${slug}`;
  const phone = settings?.phone ?? "+20 102 629 4642";
  const email = settings?.email ?? "info@glidexquality.com";
  const address =
    settings?.address ??
    "3B El Mohandseen Towers, Corniche El Maadi, 18th Floor, Cairo";

  const footerLinks = {
    [dict.about]: [
      { label: dict.companyOverview, href: p("about-us") },
      { label: dict.industriesServed, href: p("industries-served") },
      { label: dict.resources, href: p("resources") },
    ],
    [dict.services]: [
      { label: "IMS Standards", href: p("our-service") },
      { label: dict.getCertified, href: p("contact-us") },
      { label: dict.validation, href: p("validation") },
      { label: dict.reports, href: p("reports") },
      { label: dict.blog, href: p("blog") },
    ],
    Legal: [ // Consider localizing this key if possible
      { label: dict.privacyPolicy, href: "#" },
      { label: dict.termsOfService, href: "#" },
      { label: dict.faq, href: p("faqs") },
      { label: dict.partners, href: p("our-partners") },
      { label: dict.contact, href: p("contact-us") },
    ],
  };

  return (
    <footer className="bg-[#022d60] text-white">
      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-sm font-mono text-[#00844a] mb-2 tracking-widest uppercase">
              {dict.readyToStart}
            </div>
            <h2 className=" text-3xl md:text-4xl font-bold text-white">
              {dict.getOrganizationCertified.split(' ').slice(0, 3).join(' ')} <br />
              <span className="text-[#00844a]">{dict.getOrganizationCertified.split(' ').slice(3).join(' ')}</span>
            </h2>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link
              href={p("validation")}
              className="px-6 py-3 rounded-xl border border-white/30 text-white hover:border-white/60 hover:bg-white/10 transition-all text-sm font-medium"
            >
              {dict.verifyCertificate}
            </Link>
            <Link
              href={p("contact-us")}
              className="px-6 py-3 rounded-xl bg-[#00844a] text-white hover:bg-[#00a85e] transition-all text-sm font-semibold flex items-center gap-2 group"
            >
              {dict.getCertified}
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <Link href={`/${lang}`} className="flex items-center gap-3 mb-6">
            <div className="relative w-15 h-15 rounded-xl bg-white flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Glidex Quality Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className=" font-bold text-xl text-white">
                Glidex Quality
              </div>
            </div>
          </Link>
          <p className="text-blue-200 text-sm leading-relaxed mb-8 max-w-xs">
            {dict.footerDescription}
          </p>
          <div className="space-y-3">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 text-sm text-blue-200 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Phone size={14} />
              </div>
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-sm text-blue-200 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Mail size={14} />
              </div>
              {email}
            </a>
            <div className="flex items-center gap-3 text-sm text-blue-200">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={14} />
              </div>
              <span>{contact.branchAddress2}</span>
            </div>
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <div className="font-semibold text-white mb-4 text-sm tracking-wide">
              {section}
            </div>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-[#00844a] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-blue-300 text-xs">
            © 2025 Glidex Quality. {dict.copyright}
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`footer-social-icon ${link.hoverClass}`}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
