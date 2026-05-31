import { notFound } from "next/navigation";
import BlogPage from "@/components/pages/BlogPage";

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "https://admin.absglobals.com/api/v1"}/posts/${slug}`,
      { headers: { lang } }
    );
    const json = await res.json();
    const data = json.data;
    if (data) {
      return {
        title: `${data.title} | Glidex Quality`,
        description: data.content.replace(/<[^>]*>/g, '').substring(0, 160),
        alternates: {
          canonical: `/${lang}/blog/${slug}`,
        }
      };
    }
  } catch {}
  return { title: "Blog | Glidex Quality" };
}

export default async function Page({ params }) {
  const { lang, slug } = await params;
  let data = null;
  let related_posts = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "https://admin.absglobals.com/api/v1"}/posts/${slug}`,
      {
        headers: {
          lang,
          "view": "+1",
        },
        next: { revalidate: 3600 },
      }
    );
    
    if (!res.ok) {
      if (res.status === 404) return notFound();
      throw new Error(`API returned ${res.status}`);
    }
    
    const json = await res.json();
    data = json.data;
    related_posts = json.related_posts ?? [];
  } catch (err) {
    console.error("Failed to fetch blog post:", err.message);
    return notFound();
  }

  if (!data) return notFound();

  return <BlogPage data={data} related_posts={related_posts} lang={lang} />;
}
