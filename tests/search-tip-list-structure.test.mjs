import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../components/SearchTipList.vue", import.meta.url), "utf8");

test("SearchTipList renders categories as image cards", () => {
  assert.match(source, /class="tip-card"/);
  assert.match(source, /class="tip-card__image"/);
  assert.match(source, /class="tip-card__body"/);
  assert.match(source, /class="tip-card__title"/);
  assert.match(source, /grid-template-columns/);
});

test("SearchTipList uses backend image fields and falls back to placeholder", () => {
  assert.match(source, /category-placeholder\.svg/);
  assert.match(source, /getTipImage\(tip\)/);
  assert.match(source, /@error="onImageError"/);
  assert.match(source, /tip\?\.image/);
  assert.match(source, /tip\?\.photo/);
});
