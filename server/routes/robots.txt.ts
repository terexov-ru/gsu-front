import { buildRobotsTxt, getSiteUrl, isNoindexEnvironment } from "../../utils/seo.js";

export default defineEventHandler((event) => {
  setHeader(event, "content-type", "text/plain; charset=utf-8");
  const config = useRuntimeConfig(event);
  const siteUrl = getSiteUrl(config);

  return buildRobotsTxt(siteUrl, isNoindexEnvironment(siteUrl, config.public.noindex));
});
