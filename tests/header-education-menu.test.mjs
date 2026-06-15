import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const componentPath = new URL("../components/header/HeaderEducationMenu.vue", import.meta.url);
const source = existsSync(componentPath) ? readFileSync(componentPath, "utf8") : "";

test("header education menu lives in a dedicated component", () => {
  assert.ok(existsSync(componentPath), "HeaderEducationMenu.vue is missing");
});

test("desktop education menu renders specialty areas and nested category panel", () => {
  assert.match(source, /specialtyAreas:\s*\{/);
  assert.match(source, /v-for="specialtyArea in specialtyAreas"/);
  assert.match(source, /@mouseenter="setActiveDesktopArea\(specialtyArea\.id\)"/);
  assert.match(source, /v-if="activeDesktopAreaCategories\.length"/);
  assert.match(source, /v-for="category in activeDesktopAreaCategories"/);
  assert.match(source, /specialty_area_id: specialtyAreaId/);
  assert.match(source, /category: categoryId/);
});

test("mobile education menu renders nested specialty area sections", () => {
  assert.match(source, /activeMobileAreaId/);
  assert.match(source, /header-education-menu__mobile-group/);
  assert.match(source, /toggleMobileArea\(specialtyArea\.id\)/);
});
