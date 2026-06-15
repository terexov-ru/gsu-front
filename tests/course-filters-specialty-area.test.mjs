import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const homeSearchSource = readFileSync(
  new URL("../components/ProgramSearchBlock.vue", import.meta.url),
  "utf8",
);
const coursesSearchSource = readFileSync(
  new URL("../components/ProgrammAdvancedSearch.vue", import.meta.url),
  "utf8",
);

test("home search block uses specialty areas for cards and request filter", () => {
  assert.match(homeSearchSource, /specialtyAreas/);
  assert.match(homeSearchSource, /page\.specialty_areas/);
  assert.match(homeSearchSource, /specialty_area_id/);
  assert.doesNotMatch(homeSearchSource, /:tips="categories"/);
});

test("courses page uses specialty areas as cards and moves category into dropdown", () => {
  assert.match(coursesSearchSource, /:tips="specialtyAreas"/);
  assert.match(coursesSearchSource, /specialty_area_id/);
  assert.match(coursesSearchSource, /title="'Вид обучения'"/);
  assert.match(coursesSearchSource, /v-model:selected="selectedCategory"/);
});

test("courses page reads specialty area from route query", () => {
  assert.match(coursesSearchSource, /route\.query\.specialty_area_id/);
});
