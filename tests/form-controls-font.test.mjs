import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../assets/core.less", import.meta.url), "utf8");

test("native form controls inherit the project font", () => {
  assert.match(source, /button,\s*input,\s*textarea,\s*select\s*\{[^}]*font-family:\s*["']?Nunito Sans["']?/s);
});
