"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import {
  Search,
  CheckCircle2,
  XCircle,
  Shield,
  GraduationCap,
  AlertCircle,
} from "lucide-react";

import CertificateCard from "@/components/ui/CertificateCard";
import { t } from "@/app/i18n/validation";

// ================= API =================
async function validateCertificate(certNum, type) {
  try {
    const base = `${process.env.NEXT_PUBLIC_API_URL}`;
    const path = "/validate-certificate";

    const res = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        certificate_code: certNum.trim(),
      }),
    });

    if (!res.ok) return { found: false };

    const json = await res.json();

    return json.data
      ? { found: true, ...json.data }
      : { found: false };
  } catch {
    return { found: false };
  }
}

// ================= RESULT CARD =================
function ResultCard({ result, translation }) {
  if (!result.found) {
    return (
      <div className="mt-8 p-6 bg-red-50 rounded-2xl border border-red-100 italic">
        <div className="flex items-start gap-3">
          <XCircle
            size={24}
            className="text-red-500 flex-shrink-0 mt-0.5"
          />

          <div>
            <div className="font-semibold text-red-600 mb-1">
              {translation.notFound}
            </div>

            <div className="text-sm text-red-400">
              {translation.notFoundDesc}{" "}
              <a
                href="mailto:info@glidexquality.com"
                className="underline hover:text-red-600"
              >
                info@glidexquality.com
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6 p-4 bg-[#00844a]/10 rounded-xl border border-[#00844a]/20">
        <CheckCircle2 size={24} className="text-[#00844a]" />

        <div className="font-semibold text-[#00844a] text-lg">
          {translation.success}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
        <div className="bg-[#022d60] px-6 py-3 text-white text-xs font-mono uppercase tracking-widest">
          {translation.officialRecord}
        </div>

        <div className="p-2">
          <CertificateCard data={result} />
        </div>
      </div>
    </div>
  );
}

// ================= FORM =================
function ValidationForm({
  type,
  icon: Icon,
  title,
  subtitle,
  placeholder,
  onBack,
  translation,
}) {
  const [certNum, setCertNum] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!certNum.trim()) return;

    setLoading(true);
    setResult(null);

    const res = await validateCertificate(certNum.trim(), type);

    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="mb-8 text-[#022d60] font-medium flex items-center gap-2 hover:underline"
      >
        ← {translation.back}
      </button>

      <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-xl shadow-[#022d60]/8 p-8 md:p-12">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#022d60] to-[#00844a] flex items-center justify-center mx-auto mb-6">
          <Icon size={30} className="text-white" />
        </div>

        <h2 className="text-2xl font-bold text-[#022d60] text-center mb-2">
          {title}
        </h2>

        <p className="text-[#64748b] text-center text-sm mb-8">
          {subtitle}
        </p>

        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0f172a] mb-2">
              {translation.certificateNumber}
            </label>

            <input
              type="text"
              value={certNum}
              onChange={(e) => setCertNum(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] focus:border-[#022d60] focus:ring-4 focus:ring-[#022d60]/10 outline-none transition-all text-sm font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !certNum.trim()}
            className="w-full flex items-center justify-center gap-2 bg-[#022d60] text-white py-4 rounded-xl font-semibold hover:bg-[#0a4a9c] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {translation.verifying}
              </>
            ) : (
              <>
                <Search size={18} />
                {translation.verify}
              </>
            )}
          </button>
        </form>

        {result && (
          <ResultCard
            result={result}
            translation={translation}
          />
        )}
      </div>
    </div>
  );
}

// ================= PAGE =================
export default function ValidationPage({ lang }) {
  const translation = t(lang);

  const [selectedType, setSelectedType] = useState(null);

  const options = [
    {
      id: "management",
      icon: Shield,
      title: translation.companyTitle,
      desc: translation.companyDesc,
      subtitle: translation.companySubtitle,
      placeholder: translation.companyPlaceholder,
    },

    {
      id: "training",
      icon: GraduationCap,
      title: translation.individualTitle,
      desc: translation.individualDesc,
      subtitle: translation.individualSubtitle,
      placeholder: translation.individualPlaceholder,
    },
  ];

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <PageHero
        tag={translation.validation}
        title={translation.portalTitle}
        lang={lang}
      />

      {/* Steps */}
      <section className="py-12 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              {
                num: "01",
                title: translation.step1Title,
                desc: translation.step1Desc,
              },

              {
                num: "02",
                title: translation.step2Title,
                desc: translation.step2Desc,
              },

              {
                num: "03",
                title: translation.step3Title,
                desc: translation.step3Desc,
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#022d60] text-white font-mono font-bold text-sm flex items-center justify-center mb-3">
                  {num}
                </div>

                <h3 className="font-semibold text-[#0f172a] mb-2">
                  {title}
                </h3>

                <p className="text-sm text-[#64748b] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-6">
          {!selectedType ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedType(opt.id)}
                  className="bg-white rounded-3xl border border-[#e2e8f0] p-10 text-center hover:border-[#022d60]/30 hover:shadow-2xl hover:shadow-[#022d60]/5 transition-all group"
                >
                  <div className="w-20 h-20 rounded-2xl bg-[#022d60]/5 text-[#022d60] flex items-center justify-center mx-auto mb-6 group-hover:bg-[#022d60] group-hover:text-white transition-all">
                    <opt.icon size={40} />
                  </div>

                  <h3 className="text-2xl font-bold text-[#022d60] mb-3">
                    {opt.title}
                  </h3>

                  <p className="text-[#64748b] leading-relaxed text-sm">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <ValidationForm
              {...options.find((o) => o.id === selectedType)}
              type={selectedType}
              onBack={() => setSelectedType(null)}
              translation={translation}
            />
          )}

          {/* Footer */}
          <div className="max-w-2xl mx-auto mt-16">
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 flex items-start gap-4">
              <AlertCircle
                size={20}
                className="text-[#022d60] flex-shrink-0 mt-0.5"
              />

              <p className="text-sm text-[#64748b]">
                <strong className="text-[#0f172a]">
                  {translation.cantFind}
                </strong><br />
                {translation.cantFindDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}