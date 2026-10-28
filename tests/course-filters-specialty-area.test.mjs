import { findCategoryById, normalizeQueryId } from "../utils/courseFilters.js";
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
  assert.match(coursesSearchSource, /title="'Вид образования'"/);
  assert.match(coursesSearchSource, /v-model:selected="selectedCategory"/);
});

test("category query values select the corresponding option", () => {
  const options = [{ id: 12, title: "Training" }, { id: "27", title: "Retraining" }];
  for (const value of [12, "12", ["12", "27"]]) {
    assert.equal(findCategoryById(options, normalizeQueryId(value)), options[0]);
  }
  assert.equal(findCategoryById(options, normalizeQueryId("27")), options[1]);
});

test("absent, invalid and unknown category queries leave the filter unselected", () => {
  const options = [{ id: 12, title: "Training" }];
  for (const value of [undefined, null, "", [], "invalid", "999"]) {
    assert.deepEqual(findCategoryById(options, normalizeQueryId(value)), {});
  }
});

test("selection uses refreshed options and clears a removed category", () => {
  const original = [{ id: 12, title: "Old title" }];
  const selectedId = findCategoryById(original, 12).id;
  const refreshed = [{ id: "12", title: "New title" }];
  assert.equal(findCategoryById(refreshed, selectedId), refreshed[0]);
  assert.deepEqual(findCategoryById([], selectedId), {});
  assert.deepEqual(original, [{ id: 12, title: "Old title" }]);
});

test("query normalization preserves the current numeric conversion contract", () => {
  for (const [value, expected] of [[undefined, undefined], [null, undefined], ["", undefined], [[], undefined], ["0", 0], [" 12 ", 12], [["27", "12"], 27], ["bad", undefined]]) {
    assert.equal(normalizeQueryId(value), expected);
  }
});
