import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../components/CourseCoast.vue", import.meta.url), "utf8");

test("CourseCoast renders related course hours as a dropdown", () => {
  assert.match(source, /page\.related_courses/);
  assert.match(source, /hasRelatedCourses/);
  assert.match(source, /course-hours/);
  assert.match(source, /v-if="hasRelatedCourses"/);
  assert.match(source, /v-for="course in hourOptions"/);
});

test("CourseCoast redirects to the selected related course", () => {
  assert.match(source, /selectRelatedCourse\(course\)/);
  assert.match(source, /\$router\.push\(`\/courses\/\$\{course\.id\}`\)/);
});
