const DEFAULT_SITE_URL = "https://gsu.terexov.ru";

export const SITE_NAME = "ГСУ";
export const DEFAULT_SITE_URL_VALUE = DEFAULT_SITE_URL;

export const INDEXABLE_STATIC_ROUTES = [
  "/",
  "/courses",
  "/news",
  "/about",
  "/about/contacts",
  "/about/license",
  "/about/details",
  "/about/requisites",
  "/about/register",
  "/about/reviews",
  "/about/team",
  "/help/questions",
  "/help/tech",
  "/loyalty",
  "/vacancies",
];

export const NOINDEX_ROUTES = ["/account", "/basket", "/form", "/form2", "/posts"];

export function getSiteUrl(config) {
  const value = config?.public?.siteUrl || process.env.NUXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return String(value).replace(/\/+$/, "");
}

export function absoluteUrl(path = "/", siteUrl = DEFAULT_SITE_URL) {
  if (!path) return siteUrl.replace(/\/+$/, "");
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedSite = siteUrl.replace(/\/+$/, "");
  const normalizedPath = String(path).startsWith("/") ? String(path) : `/${path}`;
  return `${normalizedSite}${normalizedPath}`;
}

export function buildCanonical(path = "/", siteUrl = DEFAULT_SITE_URL) {
  const cleanPath = String(path || "/").split("#")[0].split("?")[0] || "/";
  return absoluteUrl(cleanPath, siteUrl);
}

export function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateDescription(value = "", max = 160) {
  const text = stripHtml(value);
  if (text.length <= max) return text;

  const limit = Math.max(0, max - 3);
  const truncated = text.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(" ");

  return `${(lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated).trim()}...`;
}

export function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function isNoindexRoute(path = "") {
  const cleanPath = String(path || "/").split("?")[0].replace(/\/+$/, "") || "/";
  return NOINDEX_ROUTES.some((route) => cleanPath === route || cleanPath.startsWith(`${route}/`));
}

export function isNoindexEnvironment(siteUrl = DEFAULT_SITE_URL, noindexFlag = process.env.NUXT_PUBLIC_NOINDEX) {
  if (String(noindexFlag || "").toLowerCase() === "true") return true;

  const hostname = String(siteUrl || "").toLowerCase();
  return hostname.includes("://dev.") || hostname.includes("gsu-nuxt-dev");
}

export function buildRobotsTxt(siteUrl = DEFAULT_SITE_URL, noindexEnvironment = isNoindexEnvironment(siteUrl)) {
  if (noindexEnvironment) {
    return ["User-agent: *", "Disallow: /", ""].join("\n");
  }

  const baseUrl = siteUrl.replace(/\/+$/, "");
  const disallowRules = NOINDEX_ROUTES.map((route) => `Disallow: ${route}`).join("\n");

  return [
    "User-agent: *",
    "Allow: /",
    disallowRules,
    "",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    "",
  ].join("\n");
}

export function buildSitemapXml(routes = [], siteUrl = DEFAULT_SITE_URL) {
  const seen = new Set();
  const urlEntries = routes
    .filter((route) => route?.loc && !isNoindexRoute(route.loc))
    .map((route) => ({
      loc: buildCanonical(route.loc, siteUrl),
      lastmod: route.lastmod,
    }))
    .filter((route) => {
      if (seen.has(route.loc)) return false;
      seen.add(route.loc);
      return true;
    })
    .map((route) => {
      const lastmod = route.lastmod ? `\n    <lastmod>${escapeXml(route.lastmod)}</lastmod>` : "";
      return `  <url>\n    <loc>${escapeXml(route.loc)}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;
}

export function parseRuDate(value) {
  if (!value) return undefined;
  const raw = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);

  const match = raw.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (!match) return undefined;

  const [, day, month, year] = match;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
