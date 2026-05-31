"use client";
import PageHero from "@/components/ui/PageHero";
import {
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import ReportForm from "../layout/ReportForm";

const publicDocuments = [
  {
    title: "Glidex Quality Accreditation Certificate — EGAC",
    type: "PDF",
    desc: "Our current EGAC accreditation certificate, confirming scope and validity.",
  },
  {
    title: "Impartiality Policy",
    type: "PDF",
    desc: "Our policy ensuring independence and impartiality in all certification decisions.",
  },
  {
    title: "Certification Scheme Document",
    type: "PDF",
    desc: "Detailed description of our certification scheme, including audit process and requirements.",
  },
  {
    title: "Appeals & Complaints Procedure",
    type: "PDF",
    desc: "Formal procedure for submitting and resolving appeals or complaints about certification decisions.",
  },
  {
    title: "Certificate Suspension & Withdrawal Policy",
    type: "PDF",
    desc: "Policy governing the conditions under which certificates may be suspended or withdrawn.",
  },
  {
    title: "Scope of Accreditation",
    type: "PDF",
    desc: "Full list of standards and sectors covered under our EGAC accreditation.",
  },
];

const annualReports = [
  {
    year: "2024",
    title: "Annual Performance Report 2024",
    desc: "Overview of certification activities, client statistics, and quality performance for 2024.",
  },
  {
    year: "2023",
    title: "Annual Performance Report 2023",
    desc: "Overview of certification activities, client statistics, and quality performance for 2023.",
  },
  {
    year: "2022",
    title: "Annual Performance Report 2022",
    desc: "Overview of certification activities, client statistics, and quality performance for 2022.",
  },
];

export default function ReportsPage({ lang }) {
  const accreditations = [
    {
      id: "egac",
      abbr: "EGAC",
      name: lang === "en" ? "Egyptian National Accreditation Council" : "المجلس القومي المصري للاعتماد",
      description:
        lang === "en" ? "Our primary accreditation body. EGAC accreditation ensures that our certification services meet international requirements for competence, impartiality, and consistent operation." : "هيئة الاعتماد الرئيسية لدينا، EGAC، تضمن أن خدماتنا في مجال إصدار الشهادات تفي بالمعايير الدولية للكفاءة والحيادية والاتساق في الأداء.",
      link: "https://www.egac.gov.eg",
      icon: "/egac-logo.png",
      color: "#022d60",
    },
    {
      id: "iaf",
      abbr: "IAF",
      name: lang === "en" ? "International Accreditation Forum" : "المنتدى الدولي للاعتماد",
      description:
        lang === "en" ? "Through our EGAC accreditation, Glidex Quality certificates are recognized in all IAF member economies — giving our clients global market recognition." : "بفضل اعتمادنا لدى الهيئة الأوروبية لاعتماد الشهادات (EGAC)، تحظى شهادات جودة Glidex بالاعتراف في جميع الدول الأعضاء في المنتدى الدولي للاعتماد (IAF)، مما يمنح عملاءنا اعترافًا عالميًا في السوق.",
      link: "https://www.iaf.nu",
      icon: "/iaf-logo.png",
      color: "#00844a",
    },
  ];
  return (
    <div>
      <PageHero
        tag={lang === "en" ? "Reports" : "التقارير"}
        title={lang === "en" ? "Reports & Accreditation" : "التقارير والاعتماد"}
        lang={lang}
      />

      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-8">
              <div className="text-center mb-12">
                <div className="text-xs font-mono font-bold tracking-[0.3em] text-[#00844a] uppercase mb-3">
                  {lang === "en" ? "Our Accreditations" : "اعتماداتنا"}
                </div>
                <h2 className=" text-3xl font-bold text-[#022d60]">
                  {lang === "en" ? "Internationally Recognized Authority" : "هيئة معترف بها دوليًا"}
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                {accreditations.map(
                  ({
                    id,
                    abbr,
                    name,
                    description,
                    icon,
                  }) => (
                    <div
                      key={id}
                      className="bg-white rounded-3xl border border-[#e2e8f0] px-8 py-5 hover:shadow-xl hover:shadow-[#022d60]/8 hover:-translate-y-1 transition-all group"
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className="relative w-25 h-20 rounded-2xl flex items-center justify-center mb-3"
                        >
                          <Image src={icon} alt={abbr} fill className="object-contain"/>
                        </div>
                        <h3 className="font-semibold text-[#0f172a] mb-3 text-sm">
                          {name}
                        </h3>
                      </div>
                      <p className="text-[#64748b] text-sm leading-relaxed mb-5">
                        {description}
                      </p>
                    </div>
                  ),
                )}
              </div>
              
              <ReportForm lang={lang}/>

              {/* Accreditation status banner */}
              <div className="bg-gradient-to-br from-[#022d60] to-[#011a3a] rounded-3xl p-10 text-white">
                <div className="grid sm:grid-cols-3 gap-8 text-center">
                  {[
                    {
                      label: lang === "en" ? "Accreditation Status" : "حالة الاعتماد",
                      value: lang === "en" ? "Active" : "نشطة",
                      sub: lang === "en" ? "Current and valid" : "سارية ومفعلة",
                    },
                    {
                      label: lang === "en" ? "International Recognition" : "الاعتراف الدولي",
                      value: lang === "en" ? "Globally Accepted" : "معترف بها دولياً",
                      sub: lang === "en" ? "Aligned with international standards" : "متوافقة مع المعايير الدولية",
                    },
                    {
                      label: lang === "en" ? "Scope Coverage" : "نطاق التغطية",
                      value: lang === "en" ? "27 Standards" : "27 شهادة",
                      sub: "ISO 9001, 14001, 45001, 22000, HACCP, etc...",
                    },
                  ].map(({ label, value, sub }) => (
                    <div key={label}>
                      <div className="text-xs font-mono text-blue-300 uppercase tracking-widest mb-2">
                        {label}
                      </div>
                      <div className=" text-2xl font-bold text-white">
                        {value}
                      </div>
                      <div className="text-xs text-blue-300 mt-1">{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}
