import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const stripHtml = (html) => html?.replace(/<[^>]*>/g, '') ?? '';

function categoryName(cat) {
  if (!cat) return "";
  if (typeof cat === "string") return cat;
  return cat.name ?? "";
}

function formatDate(d, lang) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    });
  } catch {
    return d;
  }
}

export default function BlogsPage({ data, lang }) {
  const heroSection = data?.sections?.find(item => item.type.trim() === "Hero")?.content?.[0] || {};
  const blogListSection = data?.sections?.find(item => item.type.trim() === "Blog List")?.content || { items: [] };
  const blogsContent = blogListSection.items;
  
  return (
    <div className="bg-[#f8f9fc]">
      <PageHero 
        tag={lang === "ar" ? "مركز المعرفة" : "Knowledge Hub"} 
        title={heroSection.title || (lang === "ar" ? "المدونة" : "Our blog")} 
        subtitle={heroSection.description} 
        lang={lang} 
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {blogsContent && blogsContent.length > 0 ? (
            <div className="flex flex-col gap-16">
              {/* Featured First Post */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#022d60]/5 to-[#00844a]/5 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                <div className="bg-white rounded-[2.5rem] border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#022d60]/5 transition-all duration-500">
                  <div className="grid lg:grid-cols-2 gap-0 lg:gap-8 items-stretch">
                    <div className="relative h-[300px] lg:h-auto overflow-hidden">
                      {blogsContent[0].image ? (
                        <Image 
                          src={`${process.env.NEXT_PUBLIC_IMAGES}${blogsContent[0].image}`} 
                          alt={blogsContent[0].title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                          <div className=" text-7xl font-bold text-[#022d60]/10 italic leading-none">ISO</div>
                        </div>
                      )}
                      <div className="absolute top-6 left-6 flex gap-2">
                        {categoryName(blogsContent[0].category) && (
                          <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-[#022d60] shadow-sm uppercase tracking-wider">
                            {categoryName(blogsContent[0].category)}
                          </span>
                        )}
                        {lang === "en" && (
                          <span className="bg-[#00844a] px-4 py-1.5 rounded-full text-[10px] font-bold text-white shadow-sm uppercase tracking-wider">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-[#00844a]" />
                          {formatDate(blogsContent[0].published_at, lang)}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                      </div>
                      
                      <h2 className={`${lang === 'ar' ? 'font-heading' : ''} text-xl lg:text-2xl font-bold text-[#022d60] mb-6 leading-[1.2] group-hover:text-[#0a4a9c] transition-colors`}>
                        {blogsContent[0].title}
                      </h2>
                      
                      <p className="text-[#64748b] text-base lg:text-md leading-relaxed mb-8 line-clamp-3">
                        {stripHtml(blogsContent[0].content)}
                      </p>
                      
                      <div>
                        <Link 
                          href={`/${lang}/blog/${blogsContent[0].slug}`}
                          className="inline-flex items-center gap-3 bg-[#022d60] text-white px-4 py-3 rounded-2xl font-bold text-sm hover:bg-[#00844a] transition-all shadow-lg shadow-[#022d60]/10"
                        >
                          {lang === 'ar' ? "اقرأ المزيد" : "Read Full Article"}
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogsContent.slice(1).map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/${lang}/blog/${post.slug}`}
                    className="flex flex-col bg-white rounded-[2rem] border border-[#e2e8f0] overflow-hidden hover:shadow-2xl hover:shadow-[#022d60]/8 hover:border-[#022d60]/20 transition-all duration-500 group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      {post.image ? (
                        <Image 
                          src={`${process.env.NEXT_PUBLIC_IMAGES}${post.image}`} 
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                          <span className=" text-4xl font-bold text-[#022d60]/5 tracking-tighter">GLIDEX</span>
                        </div>
                      )}
                      
                      {categoryName(post.category) && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[9px] font-bold text-[#022d60] shadow-sm uppercase tracking-widest border border-slate-100">
                            {categoryName(post.category)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} className="text-[#00844a]" />
                          {formatDate(post.published_at, lang)}
                        </span>
                      </div>

                      <h3 className={`${lang === 'ar' ? 'font-heading text-lg' : ' text-xl'} font-bold text-[#022d60] mb-4 leading-tight line-clamp-2 group-hover:text-[#00844a] transition-colors`}>
                        {post.title}
                      </h3>

                      <p className="text-sm text-[#64748b] leading-relaxed mb-8 line-clamp-3">
                        {post.excerpt || post.description}
                      </p>

                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#022d60] group-hover:text-white transition-all transform group-hover:translate-x-1">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-300">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={32} className="text-slate-300" />
              </div>
              <h3 className=" text-2xl font-bold text-[#022d60] mb-3">
                {lang === 'ar' ? "لا توجد مقالات بعد" : "No Articles Available"}
              </h3>
              <p className="text-[#64748b] max-w-sm mx-auto">
                {lang === 'ar' 
                  ? "تحقق مرة أخرى قريباً للحصول على أحدث الرؤى حول شهادات ISO وإدارة الجودة." 
                  : "Check back soon for expert insights on ISO certification and quality management concepts."}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
