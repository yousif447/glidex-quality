const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://admin.absglobals.com/api/v1";

export async function apiFetch(
  path,
  lang,
  cacheOption = { next: { revalidate: false } },
) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { lang },
      ...cacheOption,
    });
    if (!res.ok) {
      console.error(`API ${path} → ${res.status} ${res.statusText}`);
      return null;
    }
    const json = await res.json();
    return json.data ?? json;
  } catch (err) {
    console.error(`apiFetch(${path}):`, err);
    return null;
  }
}

/** Resolve the right cache strategy per page slug */
export function resolveCacheOption(slug) {
  if (slug === "our-service") return { cache: "no-store" };
  if (slug === "blog") return { next: { revalidate: 3600 } };
  return { next: { revalidate: false } };
}

/** Resolve the API endpoint for a pageSlug array */
export function resolveEndpoint(pageSlug) {
  if (pageSlug[0] === "our-service" && pageSlug[1])
    return `/iso/${pageSlug[1]}`;
  if (pageSlug[0] === "blog" && pageSlug[1]) return `/posts/${pageSlug[1]}`;
  const noData = new Set(["contact-us", "validation", "reports"]);
  if (noData.has(pageSlug[0])) return null;
  return `/pages/${pageSlug[0]}`;
}
