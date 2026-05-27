import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../pages/index.vue", import.meta.url), "utf8");

test("home page renders top_banners through a timed slider", () => {
  assert.match(source, /top_banners/);
  assert.match(source, /activeBannerIndex/);
  assert.match(source, /currentTopBanner/);
  assert.match(source, /setInterval/);
  assert.match(source, /clearInterval/);
  assert.match(source, /:banner="currentTopBanner"/);
});

test("home banner autoplay only runs on the client", () => {
  assert.match(source, /if\s*\(\s*!import\.meta\.client\s*\)\s*return/);
  assert.match(source, /if\s*\(\s*import\.meta\.client\s*\)\s*\{[^}]*onMounted\(startTopBannerAutoplay\)/s);
});

test("home banner slider exposes figma-style bullets", () => {
  assert.match(source, /class="top-banner__bullets"/);
  assert.match(source, /v-for="\(_, index\) in topBanners"/);
  assert.match(source, /top-banner__bullet_active/);
  assert.match(source, /selectTopBanner\(index\)/);
});

test("home seo image prefers the first banner from top_banners", () => {
  assert.match(source, /topBanners\.value\?\.\[0\]\?\.image/);
});
