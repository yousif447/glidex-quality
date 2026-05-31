import Link from "next/link";
import Image from "next/image";
import Container from "../layout/Container";
import { Calendar, Tag, Eye, ArrowLeft, ArrowRight } from "lucide-react";
import SocialShare from "../ui/SocialShare";

function formatDate(iso, lang) {
  if (!iso) return "";
  const date = new Date(iso);
  return date.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

function preprocessContent(html = "") {
  if (!html) return "";
  return html.replace(/<p>(.*?)<\/p>/g, (match, inner) => {
    const text = inner.trim();
    if (text.endsWith("؟") || text.endsWith("?")) {
      return `<h2 class="blog-h2">${text}</h2>`;
    }
    return match;
  });
}

function SidebarCard({ title, children, isAr }) {
  return (
    <div className="bg-white rounded-[2rem_0.5rem_2rem_0.5rem] border border-slate-100 shadow-sm overflow-hidden mb-6">
      <div className="h-1.5 bg-gradient-to-r from-primary to-secondary" />
      <div className="p-6">
        <h3 className={`text-xs font-black uppercase tracking-[0.2em] text-primary/40 mb-6 flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
          <span className="w-6 h-px bg-primary/20" />
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

import { t as getBlogDict } from "@/app/i18n/blog";

export default function BlogPage({ data, related_posts = [], lang }) {
  const isAr = lang === "ar";
  const { title, content, published_at, view_count, category, image } = data;
  const processedContent = preprocessContent(content);
  const dict = getBlogDict(lang);

  return (
    <div className="bg-[#f8f9fc] min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="relative h-[65vh] min-h-[450px] max-h-[650px] w-full overflow-hidden">
        <Image 
          src={`${process.env.NEXT_PUBLIC_IMAGES}${image}`} 
          alt={title} 
          fill 
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#022d60] via-[#022d60]/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end pb-20">
          <Container>
            <div className={`max-w-4xl ${isAr ? "ml-auto text-right" : "mr-auto"}`}>
              {/* Breadcrumbs */}
              <nav className={`flex items-center gap-3 text-white text-xs mb-8 flex-wrap font-medium ${isAr ? "flex-row-reverse" : ""}`}>
                <Link href={`/${lang}`} className="hover:text-secondary transition-colors">Home</Link>
                <div className="w-1 h-1 rounded-full bg-white" />
                <Link href={`/${lang}/blog`} className="hover:text-secondary transition-colors">{dict.blogTitle}</Link>
                <div className="w-1 h-1 rounded-full bg-white" />
                <span className="text-white truncate">{title}</span>
              </nav>

              {category && (
                <span className="inline-block px-4 py-1.5 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-6 shadow-xl shadow-secondary/20">
                  {category.name}
                </span>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-white leading-tight mb-8 drop-shadow-2xl">
                {title}
              </h1>

              <div className={`flex flex-wrap items-center gap-6 ${isAr ? "flex-row-reverse" : ""}`}>
                <div className="flex items-center gap-2.5 text-white/80">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Calendar size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-medium">{formatDate(published_at, lang)}</span>
                </div>
                
                {view_count > 0 && (
                  <div className="flex items-center gap-2.5 text-white/80">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <Eye size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-medium">{view_count.toLocaleString()} {dict.viewsLabel}</span>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <Container className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* ARTICLE CONTENT */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="bg-white rounded-[3rem_1rem_3rem_1rem] p-8 md:p-16 md:pt-0 shadow-xl shadow-slate-200/50 border border-white">
              <article
                dir={isAr ? "rtl" : "ltr"}
                className={`prose prose-slate max-w-none blog-content ${isAr ? "font-body" : "font-body"}`}
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
              
              {/* Share section */}
              <div className={`mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 ${isAr ? "md:flex-row-reverse" : ""}`}>
                 <SocialShare title={title} isAr={isAr} lang={lang} />
                 
                 <Link 
                   href={`/${lang}/blog`}
                   className={`flex items-center gap-3 text-sm font-bold text-primary group ${isAr ? "flex-row-reverse" : ""}`}
                 >
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                       {isAr ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
                    </div>
                    {dict.backToBlog}
                 </Link>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <SidebarCard title={dict.articleInfo} isAr={isAr}>
               <div className="space-y-6">
                  <div className={`flex items-start gap-4 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                    <Calendar className="text-secondary mt-1 shrink-0" size={18} />
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{dict.publishedOn}</p>
                      <p className="text-sm font-bold text-primary">{formatDate(published_at, lang)}</p>
                    </div>
                  </div>
                  
                  {category && (
                    <div className={`flex items-start gap-4 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                      <Tag className="text-secondary mt-1 shrink-0" size={18} />
                      <div>
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{dict.categoryLabel}</p>
                        <p className="text-sm font-bold text-primary">{category.name}</p>
                      </div>
                    </div>
                  )}

                  <div className={`flex items-start gap-4 ${isAr ? "flex-row-reverse text-right" : ""}`}>
                    <Eye className="text-secondary mt-1 shrink-0" size={18} />
                    <div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{dict.viewsLabel}</p>
                      <p className="text-sm font-bold text-primary">{view_count.toLocaleString()} {dict.reads}</p>
                    </div>
                  </div>
               </div>
            </SidebarCard>

            {related_posts.length > 0 && (
              <SidebarCard title={dict.recommendedReading} isAr={isAr}>
                <div className="space-y-4">
                  {related_posts.slice(0, 3).map((post) => (
                    <Link 
                      key={post.id} 
                      href={`/${lang}/blog/${post.slug}`}
                      className={`group flex items-center gap-4 transition-all ${isAr ? "flex-row-reverse text-right" : ""}`}
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-lg">
                        <Image 
                          src={`${process.env.NEXT_PUBLIC_IMAGES}${post.image}`} 
                          alt={post.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-primary line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-[10px] font-medium text-slate-400 mt-1">{formatDate(post.published_at, lang)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </SidebarCard>
            )}
          </aside>
        </div>
      </Container>

      {/* ── RECOMMENDED GRID AT BOTTOM ── */}
      {related_posts.length > 3 && (
        <section className="pb-32">
          <Container>
            <div className={`flex items-center gap-4 mb-12 ${isAr ? "flex-row-reverse" : ""}`}>
               <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
               <h2 className="text-2xl md:text-3xl  font-bold text-primary">
                 {dict.moreToExplore}
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {related_posts.slice(0, 4).map((item) => (
                 <Link 
                   key={item.id} 
                   href={`/${lang}/blog/${item.slug}`}
                   className="group relative bg-white rounded-[2.5rem_0.8rem_2.5rem_0.8rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                 >
                    <div className="relative h-48 overflow-hidden">
                       <Image 
                         src={`${process.env.NEXT_PUBLIC_IMAGES}${item.image}`} 
                         alt={item.title} 
                         fill 
                         className="object-cover group-hover:scale-110 transition-all duration-700" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className={`p-6 flex flex-col flex-1 ${isAr ? "text-right" : ""}`}>
                       <span className="text-[9px] font-black uppercase text-secondary tracking-widest mb-3">
                         {item.category?.name || dict.resource}
                       </span>
                       <h3 className="text-base font-bold text-primary mb-6 line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
                         {item.title}
                       </h3>
                       <div className={`mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400 ${isAr ? "flex-row-reverse" : ""}`}>
                          {formatDate(item.published_at, lang)}
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                             {isAr ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                          </div>
                       </div>
                    </div>
                 </Link>
               ))}
            </div>
          </Container>
        </section>
      )}

      {/* Styled JSX for the blog content typography */}
      <style>{`
        .blog-content {
          line-height: 1.8;
          font-size: 1.1rem;
          color: #334155;
        }
        .blog-content p {
          margin-bottom: 2rem;
        }
        .blog-content .blog-h2 {
           font-family: var(--);
           font-size: 1.75rem;
           font-weight: 800;
           color: #022d60;
           margin-top: 3rem;
           margin-bottom: 1.5rem;
           padding-bottom: 0.5rem;
           border-bottom: 2px solid rgba(0, 132, 74, 0.1);
        }
        .blog-content h3 {
           font-size: 1.4rem;
           font-weight: 700;
           color: #022d60;
           margin-top: 2rem;
           margin-bottom: 1rem;
        }
        .blog-content img {
           border-radius: 1.5rem;
           margin: 3rem 0;
           box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }
        .blog-content ul {
           margin-bottom: 2rem;
           padding-left: 1.5rem;
        }
        [dir="rtl"] .blog-content ul {
           padding-left: 0;
           padding-right: 1.5rem;
        }
        .blog-content li {
           position: relative;
           margin-bottom: 0.75rem;
           padding-left: 1.5rem;
        }
        [dir="rtl"] .blog-content li {
           padding-left: 0;
           padding-right: 1.5rem;
        }
        .blog-content li::before {
           content: '';
           position: absolute;
           left: 0; top: 0.6rem;
           width: 8px; height: 8px;
           background: #00844a;
           border-radius: 2px;
           transform: rotate(45deg);
        }
        [dir="rtl"] .blog-content li::before {
           left: auto;
           right: 0;
        }
      `}</style>
    </div>
  );
}


