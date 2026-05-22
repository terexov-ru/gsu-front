import { buildRobotsTxt, getSiteUrl } from "../../utils/seo.js";

export default defineEventHandler((event) => {
  setHeader(event, "content-type", "text/plain; charset=utf-8");
  const config = useRuntimeConfig(event);

  return buildRobotsTxt(getSiteUrl(config));
});
