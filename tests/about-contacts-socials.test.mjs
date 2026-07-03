import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../pages/about/contacts.vue", import.meta.url), "utf8");

test("about contacts page includes VK and MAX social links", () => {
  assert.match(source, /page\.whatsapp/);
  assert.match(source, /page\.telegram/);
  assert.match(source, /assets\/svg\/vk_dark\.svg/);
  assert.match(source, /assets\/svg\/max_dark\.svg/);
});
