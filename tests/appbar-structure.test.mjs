import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../components/AppBar.vue", import.meta.url), "utf8");

test("desktop header has socials, action buttons, divider, and nav in Figma order", () => {
  const socialsIndex = source.indexOf('class="header-socials"');
  const actionsIndex = source.indexOf('class="header-actions"');
  const dividerIndex = source.indexOf('class="delimiter delimiter_gradient header__nav-divider"');
  const navIndex = source.indexOf('class="nav__list header__nav-list"');

  assert.notEqual(socialsIndex, -1, "header socials row is missing");
  assert.notEqual(actionsIndex, -1, "header action buttons group is missing");
  assert.notEqual(dividerIndex, -1, "header horizontal divider is missing");
  assert.notEqual(navIndex, -1, "header navigation row is missing");

  assert.ok(socialsIndex < dividerIndex, "social links should be above the divider");
  assert.ok(actionsIndex < dividerIndex, "action buttons should be above the divider");
  assert.ok(dividerIndex < navIndex, "navigation should be below the divider");

  assert.match(source, /assets\/svg\/phone\.svg/);
  assert.match(source, /assets\/svg\/whatsapp\.svg/);
  assert.match(source, /assets\/svg\/telegram\.svg/);
});

test("desktop header separates the logo with a vertical divider", () => {
  assert.match(source, /class="[^"]*header__logo-divider[^"]*"/);
  assert.match(source, /delimiter_column/);
});

test("desktop education nav item links to courses page", () => {
  assert.match(
    source,
    /<HeaderEducationMenu\s+:specialty-areas="specialtyAreas"\s+@navigate="menuActive = false"/,
  );
  assert.doesNotMatch(source, /v-for="category in categories"/);
});
