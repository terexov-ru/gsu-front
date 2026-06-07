import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const bannerPath = new URL("../components/CookieBanner.vue", import.meta.url);
const layerPath = new URL("../components/SiteFixedLayer.vue", import.meta.url);

test("site fixed layer mounts the cookie banner above page content", () => {
  assert.ok(existsSync(layerPath), "SiteFixedLayer.vue should exist");

  const source = readFileSync(layerPath, "utf8");

  assert.match(source, /class="site-fixed-layer__stack"/);
  assert.match(source, /<div class="site-fixed-layer__stack">\s*<CookieBanner\s*\/>\s*<PromoPopupManager\s*\/>\s*<\/div>/s);
  assert.match(source, /:deep\(\.cookie-banner-layer\)/);
  assert.match(source, /pointer-events:\s*auto/);
  assert.match(source, /flex-direction:\s*column/);
  assert.match(source, /gap:\s*16px/);
});

test("cookie banner follows the Figma layout and actions", () => {
  assert.ok(existsSync(bannerPath), "CookieBanner.vue should exist");

  const source = readFileSync(bannerPath, "utf8");

  assert.match(source, /Мы используем файлы Cookie/);
  assert.match(source, /Принять/);
  assert.match(source, /Отклонить/);
  assert.match(source, /class="cookie-banner__arrow"/);
  assert.match(source, /class="cookie-banner__button cookie-banner__button_accept"/);
  assert.match(source, /class="cookie-banner__button cookie-banner__button_decline"/);
  assert.match(source, /linear-gradient\(77\.045deg,\s*#40b9f5 5\.226%,\s*#0c90ed 96\.913%\)/);
  assert.match(source, /box-shadow:\s*0 4px 16px 0 rgba\(0,\s*0,\s*0,\s*0\.16\)/);
  assert.match(source, /border-radius:\s*12px/);
  assert.match(source, /width:\s*min\(330px,\s*calc\(100vw - 32px\)\)/);
  assert.doesNotMatch(source, /\.cookie-banner-layer\s*\{[^}]*position:\s*absolute/s);
  assert.doesNotMatch(source, /\.cookie-banner-layer\s*\{[^}]*bottom:/s);
});

test("cookie banner persists accepted and declined choices in localStorage", () => {
  const source = readFileSync(bannerPath, "utf8");

  assert.match(source, /const\s+COOKIE_BANNER_STORAGE_KEY\s*=\s*"gsu:cookie-banner-choice"/);
  assert.match(source, /localStorage\.getItem\(COOKIE_BANNER_STORAGE_KEY\)/);
  assert.match(source, /localStorage\.setItem\(COOKIE_BANNER_STORAGE_KEY,\s*choice\)/);
  assert.match(source, /setCookieChoice\(['"]accepted['"]\)/);
  assert.match(source, /setCookieChoice\(['"]declined['"]\)/);
  assert.match(source, /const\s+isVisible\s*=\s*ref\(false\)/);
  assert.match(source, /isVisible\.value\s*=\s*!localStorage\.getItem\(COOKIE_BANNER_STORAGE_KEY\)/);
});
