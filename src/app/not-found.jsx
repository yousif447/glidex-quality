import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function NotFound( {lang} ) {
  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="relative w-40 h-40 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Image src="/logo.png" alt="Glidex Quality Logo" fill/>
        </div>
        <div className="font-mono text-6xl font-bold text-[#022d60]/20 mb-4">
          404
        </div>
        <h1 className=" text-3xl font-bold text-[#022d60] mb-3">
          {lang === "en" ? "Page Not Found" : "الصفخة غير موجودة"}
        </h1>
        <p className="text-[#64748b] mb-8">
          {lang === "en" ? "The page you're looking for doesn't exist or has been moved. Let's get you back on track." : "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نساعدك في العودة إلى المسار الصحيح."}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/en"
            className="flex items-center gap-2 bg-[#022d60] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0a4a9c] transition-all"
          >
            {lang === "en" ? "Go Home" : "الصفحة الرئيسية"} <ArrowRight size={16} />
          </Link>
          <Link
            href="/en/contact-us"
            className="flex items-center gap-2 border border-[#022d60]/20 text-[#022d60] px-6 py-3 rounded-xl font-semibold hover:border-[#022d60] transition-all"
          >
            {lang == "en" ? "Contact Us" : "تواصل معنا"}
          </Link>
        </div>
      </div>
    </div>
  );
}
