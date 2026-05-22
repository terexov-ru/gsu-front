import { API } from "../../constants/index.js";
import {
  INDEXABLE_STATIC_ROUTES,
  buildSitemapXml,
  getSiteUrl,
  parseRuDate,
} from "../../utils/seo.js";

async function fetchLearningPage(start: number, amount: number) {
  return $fetch(`${API}/page/learning`, {
    method: "POST",
    body: {
      start,
      amount,
      sort: 0,
    },
  }).catch(() => undefined);
}

async function fetchNewsPage(start: number, amount: number) {
  return $fetch(`${API}/page/news`, {
    method: "POST",
    body: {
      start,
      amount,
      year: 0,
      type: 0,
    },
  }).catch(() => undefined);
}

async function getCourseRoutes() {
  const amount = 100;
  const firstResponse = await fetchLearningPage(0, amount);
  const firstCourses = firstResponse?.page?.courses || [];
  const total = Number(firstResponse?.page?.total_courses_amount || firstCourses.length);
  const courses = [...firstCourses];

  for (let start = amount; start < total; start += amount) {
    const response = await fetchLearningPage(start, amount);
    courses.push(...(response?.page?.courses || []));
  }

  return courses
    .filter((course: { id?: number | string }) => course?.id)
    .map((course: { id: number | string }) => ({ loc: `/courses/${course.id}` }));
}

async function getNewsRoutes() {
  const amount = 100;
  const firstResponse = await fetchNewsPage(0, amount);
  const firstNews = firstResponse?.page?.news || [];
  const total = Number(firstResponse?.page?.total_news_amount || firstNews.length);
  const news = [...firstNews];

  for (let start = amount; start < total; start += amount) {
    const response = await fetchNewsPage(start, amount);
    news.push(...(response?.page?.news || []));
  }

  return news
    .filter((item: { id?: number | string }) => item?.id)
    .map((item: { id: number | string; date?: string }) => ({
      loc: `/news/${item.id}`,
      lastmod: parseRuDate(item.date),
    }));
}

export default defineEventHandler(async (event) => {
  setHeader(event, "content-type", "application/xml; charset=utf-8");

  const config = useRuntimeConfig(event);
  const [courseRoutes, newsRoutes] = await Promise.all([getCourseRoutes(), getNewsRoutes()]);
  const routes = [
    ...INDEXABLE_STATIC_ROUTES.map((loc) => ({ loc })),
    ...courseRoutes,
    ...newsRoutes,
  ];

  return buildSitemapXml(routes, getSiteUrl(config));
});
