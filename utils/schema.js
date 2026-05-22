import { absoluteUrl, SITE_NAME, stripHtml, truncateDescription } from "./seo.js";

const DEFAULT_ORGANIZATION_NAME = "ГСУ";

export function buildEducationalOrganizationSchema(data = {}) {
  const url = data.url || "https://gsu.terexov.ru";
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: data.name || DEFAULT_ORGANIZATION_NAME,
    url,
  };

  if (data.logo) schema.logo = absoluteUrl(data.logo, url);
  if (data.phone) schema.telephone = data.phone;
  if (data.email) schema.email = data.email;
  if (data.address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: stripHtml(data.address),
    };
  }

  return schema;
}

export function buildCourseSchema(course = {}, url = "") {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: stripHtml(course.title || ""),
    description: truncateDescription(course.description || course.title || "", 500),
    url,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      sameAs: "https://gsu.terexov.ru",
    },
  };

  if (course.banner_image) schema.image = absoluteUrl(course.banner_image, "https://gsu.terexov.ru");
  if (course.duration) schema.timeRequired = stripHtml(course.duration);
  if (Array.isArray(course.specs) && course.specs.length > 0) {
    schema.about = course.specs
      .map((spec) => ({ "@type": "Thing", name: stripHtml(spec.title || spec.name || spec) }))
      .filter((item) => item.name);
  }
  if (course.price || course.price_sale) {
    schema.offers = {
      "@type": "Offer",
      category: "Paid",
      price: String(course.price_sale || course.price).replace(/[^\d.,]/g, "").replace(",", "."),
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url,
    };
  }

  return schema;
}

export function buildCourseItemListSchema(courses = [], siteUrl = "https://gsu.terexov.ru") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses
      .filter((course) => course?.id && course?.title)
      .map((course, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/courses/${course.id}`, siteUrl),
        name: stripHtml(course.title),
      })),
  };
}

export function buildNewsArticleSchema(news = {}, url = "") {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: stripHtml(news.annotation || news.title || ""),
    description: truncateDescription(news.text || news.annotation || "", 300),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  if (news.image) schema.image = [absoluteUrl(news.image, "https://gsu.terexov.ru")];
  if (news.date) schema.datePublished = news.date;
  if (news.date) schema.dateModified = news.date;
  if (news.type) schema.articleSection = stripHtml(news.type);

  return schema;
}

export function buildBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: stripHtml(item.name),
      item: item.url,
    })),
  };
}
