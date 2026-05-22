import test from "node:test";
import assert from "node:assert/strict";

import {
  absoluteUrl,
  buildCanonical,
  buildRobotsTxt,
  buildSitemapXml,
  isNoindexEnvironment,
  stripHtml,
  truncateDescription,
} from "../utils/seo.js";

test("absoluteUrl joins site URL and path without duplicate slashes", () => {
  assert.equal(
    absoluteUrl("/courses/10", "https://gsu.terexov.ru/"),
    "https://gsu.terexov.ru/courses/10",
  );
});

test("buildCanonical removes query and hash from route path", () => {
  assert.equal(
    buildCanonical("/courses?id=2#top", "https://gsu.terexov.ru"),
    "https://gsu.terexov.ru/courses",
  );
});

test("stripHtml collapses markup entities and whitespace", () => {
  assert.equal(stripHtml("<p>Курс&nbsp;<b>повышения</b></p>\n<p>квалификации</p>"), "Курс повышения квалификации");
});

test("truncateDescription keeps descriptions compact without cutting mid-word", () => {
  assert.equal(
    truncateDescription("Повышение квалификации для специалистов образовательных организаций", 45),
    "Повышение квалификации для специалистов...",
  );
});

test("buildRobotsTxt exposes sitemap and blocks private routes", () => {
  const robots = buildRobotsTxt("https://gsu.terexov.ru");

  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Disallow: \/account/);
  assert.match(robots, /Disallow: \/basket/);
  assert.match(robots, /Sitemap: https:\/\/gsu\.terexov\.ru\/sitemap\.xml/);
});

test("isNoindexEnvironment detects development site URLs and explicit noindex flag", () => {
  assert.equal(isNoindexEnvironment("https://dev.gsu.terexov.ru"), true);
  assert.equal(isNoindexEnvironment("https://gsu-nuxt-dev.example.com"), true);
  assert.equal(isNoindexEnvironment("https://gsu.terexov.ru", "true"), true);
  assert.equal(isNoindexEnvironment("https://gsu.terexov.ru"), false);
});

test("buildRobotsTxt blocks all crawling for noindex environments", () => {
  const robots = buildRobotsTxt("https://dev.gsu.terexov.ru", true);

  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Disallow: \//);
  assert.doesNotMatch(robots, /Allow: \//);
  assert.doesNotMatch(robots, /Sitemap:/);
});

test("buildSitemapXml renders absolute URLs and skips noindex routes", () => {
  const xml = buildSitemapXml(
    [
      { loc: "/" },
      { loc: "/courses/1", lastmod: "2026-05-20" },
      { loc: "/account" },
    ],
    "https://gsu.terexov.ru",
  );

  assert.match(xml, /<loc>https:\/\/gsu\.terexov\.ru\/<\/loc>/);
  assert.match(xml, /<loc>https:\/\/gsu\.terexov\.ru\/courses\/1<\/loc>/);
  assert.match(xml, /<lastmod>2026-05-20<\/lastmod>/);
  assert.doesNotMatch(xml, /account/);
});
