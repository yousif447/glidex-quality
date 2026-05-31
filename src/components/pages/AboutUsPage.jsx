import PageHero from "@/components/ui/PageHero";

export default function AboutUsPage({ data, lang }) {
  const aboutContent = data.sections.find(item => item.type === "About content").content[0];
  const textCards    = data.sections.find(item => item.type === "Text Cards Content").content;
  const whyUs        = data.sections.find(item => item.type === "Why Chose Us").content;

  return (
    <div>
      <PageHero
        tag={lang === "en" ? "About Us" : "نبذه عنا"}
        title={aboutContent.title}
        subtitle={aboutContent.description}
        lang={lang}
      />

      {/* Overview */}
      <section className="py-20 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8 items-start">
          {(() => {
            const overviewItem = textCards.find(item => 
              item.title?.toLowerCase().includes("overview") || 
              item.title?.toLowerCase().includes("نظرة عامة")
            );
            const otherItems = textCards.filter(item => item !== overviewItem);
            const firstOther = otherItems[0];
            const remainingOthers = otherItems.slice(1);

            return (
              <>
                {/* Left Side: Overview - spans 2 columns */}
                {overviewItem && (
                  <div className="lg:col-span-2">
                    <h2 className=" text-4xl font-bold text-[#022d60] mb-8 leading-tight">
                      {overviewItem.title}
                    </h2>
                    <div className="text-[#64748b] leading-relaxed space-y-6 text-md whitespace-pre-line">
                      {overviewItem.description}
                    </div>
                  </div>
                )}

                {/* Top Right: One card next to overview */}
                {firstOther && (
                  <div className="lg:col-span-1 h-full">
                    <div className="bg-white rounded-[2rem] border border-[#e2e8f0]/60 p-10 shadow-sm hover:shadow-md transition-shadow group h-full">
                      <div className="text-xs font-mono font-bold tracking-[0.2em] text-[#00844a] uppercase mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                        {firstOther.title}
                      </div>
                      <p className="text-[#0f172a] text-sm leading-relaxed font-medium">
                        {firstOther.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Row 2: Remaining cards side by side */}
                {remainingOthers.map((item) => (
                  <div key={item.title} className="lg:col-span-1 h-full">
                    <div className="bg-white rounded-[2rem] border border-[#e2e8f0]/60 p-10 shadow-sm hover:shadow-md transition-shadow group h-full">
                      <div className="text-xs font-mono font-bold tracking-[0.2em] text-[#00844a] uppercase mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.title}
                      </div>
                      <p className="text-[#0f172a] text-sm leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            );
          })()}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#022d60] mb-12 text-center">
            {lang === "en" ? "Our Core Values" : "قيمنا الأساسية"}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((v, i) => {
              return (
                <div
                  key={v.title}
                  className="bg-[#f8f9fc] rounded-3xl p-8 border border-[#e2e8f0] hover:border-[#022d60]/20 hover:shadow-xl hover:shadow-[#022d60]/8 transition-all group"
                >
                  <div className="text-5xl font-black text-[#022d60]/10 mb-6 group-hover:text-[#00844a]/20 transition-colors">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                  <h3 className="font-bold text-xl text-[#022d60] mb-3">
                    {v.title}
                  </h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20 bg-gradient-to-br from-[#022d60] to-[#011a3a]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-xs font-mono font-bold tracking-[0.3em] text-[#00844a] uppercase mb-4">
            {lang === "en" ? "Accreditations & Registrations" : "الاعتمادات والتسجيلات"}
          </div>
          <h2 className=" text-4xl font-bold text-white mb-12">
            {lang === "en" ? "Internationally Recognized" : "معترف به دولياً"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                abbr: "EGAC",
                name: lang === "en" ? "Egyptian National Accreditation Council" : "المجلس القومي للاعتماد المصري",
                role: lang === "en" ? "Primary Accreditation Body" : "هيئة الاعتماد الأساسية",
              },
              {
                abbr: "IAF",
                name: lang === "en" ? "International Accreditation Forum" : "المنتدى الدولي للاعتماد",
                role: lang === "en" ? "International Recognition" : "الاعتراف الدولي",
              },
            ].map((acc) => (
              <div
                key={acc.abbr}
                className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/10 hover:bg-white/15 transition-all"
              >
                <div className=" text-4xl font-bold text-[#00844a] mb-2">
                  {acc.abbr}
                </div>
                <div className="font-semibold text-white text-sm mb-1">
                  {acc.name}
                </div>
                <div className="text-blue-300 text-xs font-mono">
                  {acc.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
