export default function PageHero({ tag, title, subtitle }) {
  return (
    <div className="bg-gradient-to-br from-[#022d60] to-[#011a3a] text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {tag && (
          <div className="text-xs font-mono font-bold tracking-[0.3em] text-[#00844a] uppercase mb-4">
            — {tag}
          </div>
        )}
        <h1 className=" text-5xl md:text-5xl font-bold mb-4 max-w-3xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-blue-200 text-xl max-w-2xl leading-relaxed mt-4">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
