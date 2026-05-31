import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { FileText, Download } from "lucide-react";

const stripHtml = (html) => html?.replace(/<[^>]*>/g, '') ?? '';

export default function ResourcesPage({ data, lang }) {
  const resourcesContent = data.sections.find(item => item.type === "Hero").content[0];
  const items = data.faqs ?? [];

  return (
    <div>
      <PageHero tag={lang === "en" ? "Resources" : "المصادر"} title={resourcesContent.title} lang={lang} />

      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          {items.map((r, i) => {
            const fileType = r.type ?? r.file_type ?? "Document";
            const fileSize = r.file_size ?? r.size;
            const downloadUrl = r.url ?? r.file ?? "#";
            return (
              <div
                key={r.id ?? i}
                className="bg-white rounded-2xl border border-[#e2e8f0] p-6 flex items-center gap-6 hover:shadow-lg hover:shadow-[#022d60]/8 hover:border-[#022d60]/15 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#022d60]/8 flex items-center justify-center flex-shrink-0">
                  <FileText size={20} className="text-[#022d60]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0f172a] mb-1">
                    {r.title}
                  </h3>
                  {r.description && (
                    <p className="text-sm text-[#64748b]">{stripHtml(r.description)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
