# SEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve indexability, search snippets, structured data, and performance of the Nuxt 3 education website.

**Architecture:** Keep the current Nuxt 3 SSR architecture, add a small SEO layer with reusable helpers, route-level metadata, sitemap/robots endpoints, canonical URLs, and schema.org JSON-LD for public content. Do not expose private/account/cart pages to indexing.

**Tech Stack:** Nuxt 3.10, Vue 3, Nitro server routes, Unhead (`useSeoMeta`, `useHead`), public API at `https://admin-gsu.terexov.ru/api`.

---

## Audit Summary

High-priority gaps found in the current project:

- `nuxt.config.ts` has no global `app.head`, `site.url`, default title template, Open Graph defaults, canonical handling, `robots.txt`, or sitemap setup.
- No usage of `useHead` or `useSeoMeta` exists in project files, so public routes rely on generic browser titles and weak snippets.
- `public/` contains `favicon.ico`, `policy.pdf`, and `form2-script.html`, but no `robots.txt` or `sitemap.xml`.
- Dynamic course pages at `pages/courses/[id].vue` fetch course content but do not set `<title>`, description, canonical, Open Graph, or course structured data.
- Dynamic news pages at `pages/news/[id].vue` use a generic section heading and render article HTML, but do not expose article-specific metadata or `Article` JSON-LD.
- Course and news listing pages use client-side filters and pagination state without crawlable query/canonical strategy.
- Several indexable pages use `<h2>` as the top heading instead of one clear `<h1>`, including `pages/news/index.vue`, `pages/news/[id].vue`, `pages/courses/index.vue` via `ProgrammAdvancedSearch`, `pages/about/team.vue`, `pages/about/reviews.vue`, `pages/loyalty/index.vue`, and `pages/vacancies/index.vue`.
- `app.vue` calls `checkToken()` during app setup when a token cookie exists. Keep auth checks from delaying public SSR content and crawler responses.
- Production build succeeds, but large image assets are present: `news_banner` about 2.97 MB, `reviews` about 1.58 MB, `map` about 650 KB. These are Core Web Vitals risks.
- `pages/posts/index.vue` fetches placeholder JSONPlaceholder content and should be removed or marked `noindex` if still deployed.

Current external guidance checked:

- Google Search Central recommends server-side rendering/static rendering/hydration for JavaScript sites instead of dynamic rendering workarounds.
- Google Search Central recommends unique, descriptive titles and descriptions, crawlable internal links, canonical URLs, sitemaps, and structured data where it matches the visible page content.
- Google supports `Course` / course list structured data for educational course pages and lists when the content is a real course from a provider.

## Target Route Policy

Index:

- `/`
- `/courses`
- `/courses/:id`
- `/news`
- `/news/:id`
- `/about`
- `/about/contacts`
- `/about/license`
- `/about/details`
- `/about/requisites`
- `/about/register`
- `/about/reviews`
- `/about/team`
- `/help/questions`
- `/help/tech`
- `/loyalty`
- `/vacancies`

Noindex:

- `/account`
- `/basket`
- `/form`
- `/form2`
- `/posts`
- modal-only/auth/order flows

## Task 1: Add Global SEO Defaults

**Files:**

- Modify: `nuxt.config.ts`
- Create: `utils/seo.ts`

- [ ] Add `runtimeConfig.public.siteUrl` with the production domain.
- [ ] Add default `htmlAttrs.lang = "ru"`.
- [ ] Add default title template: `%s | ГСУ`.
- [ ] Add default `og:site_name`, `og:type`, `twitter:card`, theme color, and favicon links.
- [ ] Create `utils/seo.ts` with helpers:
  - `getSiteUrl()`
  - `absoluteUrl(path)`
  - `stripHtml(value)`
  - `truncateDescription(value, max = 160)`
  - `buildCanonical(path)`

Verification:

- [ ] Run `npm.cmd run build`.
- [ ] Inspect SSR HTML for `/` and confirm `<html lang="ru">`, default title metadata, and no duplicate canonical tags.

## Task 2: Add Robots And Sitemap

**Files:**

- Create: `server/routes/robots.txt.ts`
- Create: `server/routes/sitemap.xml.ts`
- Modify: `composables/useApi.ts` if API helpers are needed for sitemap data.

- [ ] Serve `robots.txt` with `Allow: /`, disallow private and checkout routes, and include sitemap URL.
- [ ] Generate `sitemap.xml` from static public routes plus dynamic courses and news.
- [ ] If the backend has no list endpoint with all course/news IDs, request backend support or use `/page/learning` and `/page/news` pagination to collect IDs.
- [ ] Exclude `/account`, `/basket`, `/form`, `/form2`, and `/posts`.
- [ ] Set `lastmod` for news and courses when API data contains a date; otherwise omit `lastmod` instead of inventing dates.

Verification:

- [ ] Run `npm.cmd run build`.
- [ ] Run preview and request `/robots.txt` and `/sitemap.xml`.
- [ ] Validate the sitemap XML syntax and confirm all URLs are absolute canonical URLs.

## Task 3: Add Page-Level Metadata

**Files:**

- Modify: `pages/index.vue`
- Modify: `pages/courses/index.vue`
- Modify: `pages/courses/[id].vue`
- Modify: `pages/news/index.vue`
- Modify: `pages/news/[id].vue`
- Modify public content pages under `pages/about`, `pages/help`, `pages/loyalty`, `pages/vacancies`

- [ ] Add `useSeoMeta` to every public page.
- [ ] Generate course titles from `page.title`.
- [ ] Generate course descriptions from `page.description`.
- [ ] Generate news titles from `news.annotation`.
- [ ] Generate news descriptions from stripped `news.text`.
- [ ] Add canonical URLs for every public route.
- [ ] Add `robots: "noindex, nofollow"` to private or utility routes.
- [ ] Add Open Graph image from page image fields when available, otherwise use a small optimized default share image.

Verification:

- [ ] Render `/courses/:id` and confirm title, description, canonical, `og:title`, `og:description`, and `og:image`.
- [ ] Render `/news/:id` and confirm article-specific metadata.
- [ ] Confirm private routes output `noindex`.

## Task 4: Add Structured Data

**Files:**

- Create: `utils/schema.ts`
- Modify: `pages/index.vue`
- Modify: `pages/courses/index.vue`
- Modify: `pages/courses/[id].vue`
- Modify: `pages/news/[id].vue`
- Modify: `pages/about/contacts.vue`
- Modify: `components\AppBar.vue` or layout-level breadcrumb source if breadcrumbs become reusable.

- [ ] Add `Organization` / `EducationalOrganization` schema for the site and contact page.
- [ ] Add `Course` schema to `pages/courses/[id].vue` using visible page data only.
- [ ] Add `ItemList` of courses to `/courses` if backend data is available in SSR.
- [ ] Add `Article` or `NewsArticle` schema to `pages/news/[id].vue`.
- [ ] Add `BreadcrumbList` schema for course, news, about, help, loyalty, and vacancies routes.
- [ ] Keep JSON-LD stable, escaped via `useHead({ script: [{ type: "application/ld+json", children: JSON.stringify(schema) }] })`.

Verification:

- [ ] Validate rendered HTML contains one JSON-LD block per intended schema type.
- [ ] Validate with Google Rich Results Test or Schema Markup Validator after deployment.

## Task 5: Make Content Hierarchy Crawl-Friendly

**Files:**

- Modify: `components\MissionSlider.vue`
- Modify: `components\ProgrammAdvancedSearch.vue`
- Modify: `pages/news/index.vue`
- Modify: `pages/news/[id].vue`
- Modify: `pages/about/team.vue`
- Modify: `pages/about/reviews.vue`
- Modify: `pages/loyalty/index.vue`
- Modify: `pages/vacancies/index.vue`

- [ ] Ensure every indexable route has exactly one primary `<h1>`.
- [ ] Use `<h2>` and lower levels for sections after the primary page heading.
- [ ] On course detail pages, make `page.title` the primary `<h1>` inside `BannerBlock` or pass a heading level prop.
- [ ] On news detail pages, make `news.annotation` the primary `<h1>` instead of a generic "Новости" title.
- [ ] Replace generic image alts like `banner`, `news`, `course`, `License` with content-specific alt text when the image is meaningful.
- [ ] Use empty alt only for decorative images.

Verification:

- [ ] Crawl rendered pages with a heading checker.
- [ ] Confirm one `<h1>` per indexable route and meaningful text alternatives for content images.

## Task 6: Improve Crawlable Filtering And Pagination

**Files:**

- Modify: `components\ProgrammAdvancedSearch.vue`
- Modify: `components\ProgramSearchBlock.vue`
- Modify: `components\ProgramSearchBar.vue`
- Modify: `pages\courses\index.vue`
- Modify: `pages\news\index.vue`

- [ ] Decide which filters should be indexable landing pages.
- [ ] For indexable course categories, expose stable query URLs or static routes, such as `/courses?category=...`.
- [ ] Add canonical rules for non-indexable filter combinations back to `/courses`.
- [ ] Preserve pagination in URL for crawlable listing pages when useful.
- [ ] Avoid indexing internal search result pages for arbitrary text input.

Verification:

- [ ] Load filtered pages directly by URL and confirm SSR content matches.
- [ ] Confirm canonical tags prevent duplicate indexation for thin filter combinations.

## Task 7: Performance And Core Web Vitals

**Files:**

- Modify image usage in `components` and `pages`
- Add optimized assets under `public/images` or convert source assets under `assets`
- Modify: `nuxt.config.ts`

- [ ] Compress or replace large static images: `assets/news_banner.png`, `assets/reviews.png`, `assets/map.png`.
- [ ] Use modern formats (`webp` or `avif`) for large raster assets.
- [ ] Add explicit `width` and `height` or stable aspect-ratio containers for images above the fold.
- [ ] Lazy-load below-the-fold images.
- [ ] Preload only the actual LCP image for the home page.
- [ ] Review Google Fonts strategy; keep local/self-hosted output and avoid unnecessary weights.
- [ ] Reduce duplicate CSS if bundle analysis shows repeated scoped styles from shared components.

Verification:

- [ ] Run `npm.cmd run build`.
- [ ] Run Lighthouse for mobile and desktop on `/`, `/courses`, `/courses/:id`, `/news/:id`.
- [ ] Target: LCP under 2.5s, CLS under 0.1, INP under 200ms on production-like hosting.

## Task 8: Clean Up Indexing Risks

**Files:**

- Modify or delete: `pages/posts/index.vue`
- Modify: `pages/account/index.vue`
- Modify: `pages/basket/index.vue`
- Modify: `pages/form/index.vue`
- Modify: `pages/form2/index.vue`
- Modify: `error.vue`

- [ ] Remove `pages/posts/index.vue` if it is a test page.
- [ ] Add `noindex` metadata to account, basket, form, and form2 pages.
- [ ] Make `error.vue` return helpful text and avoid indexing error states.
- [ ] Confirm route redirects do not hide public content from crawlers.

Verification:

- [ ] Confirm `/posts` is gone or noindexed.
- [ ] Confirm private routes contain `robots=noindex,nofollow`.

## Task 9: Monitoring After Release

**Files:**

- No code files required unless analytics tags are missing.

- [ ] Submit sitemap in Google Search Console and Yandex Webmaster.
- [ ] Check indexing coverage for `/courses/:id` and `/news/:id`.
- [ ] Check duplicate title/description report after rollout.
- [ ] Track organic landing pages, impressions, CTR, and Core Web Vitals by template.
- [ ] Re-run crawl after each backend content model change.

## Priority Order

1. Global SEO defaults, robots, sitemap, noindex rules.
2. Dynamic metadata for courses and news.
3. Heading hierarchy and content-specific image alts.
4. Structured data for organization, courses, news, breadcrumbs.
5. Filter/canonical strategy.
6. Image and bundle performance.
7. Monitoring and iteration from Search Console data.
