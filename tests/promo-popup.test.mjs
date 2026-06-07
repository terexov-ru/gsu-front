import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const managerPath = new URL("../components/PromoPopupManager.vue", import.meta.url);
const modalPath = new URL("../components/PromoPopupModal.vue", import.meta.url);
const layerPath = new URL("../components/SiteFixedLayer.vue", import.meta.url);
const appSource = readFileSync(new URL("../app.vue", import.meta.url), "utf8");
const apiSource = readFileSync(new URL("../composables/useApi.ts", import.meta.url), "utf8");

test("app mounts a shared fixed layer for promos and future cookie banner", () => {
  assert.ok(existsSync(layerPath), "SiteFixedLayer.vue should exist");

  const layerSource = readFileSync(layerPath, "utf8");

  assert.match(appSource, /<ClientOnly>\s*<SiteFixedLayer\s*\/>\s*<\/ClientOnly>/s);
  assert.match(layerSource, /class="site-fixed-layer"/);
  assert.match(layerSource, /<PromoPopupManager\s*\/>/);
  assert.match(layerSource, /position:\s*fixed/);
  assert.match(layerSource, /pointer-events:\s*none/);
  assert.match(layerSource, /:deep\(\.promo-popup-layer\)/);
});

test("promo manager fetches active promos once and shows active dated promos after about a minute", () => {
  assert.ok(existsSync(managerPath), "PromoPopupManager.vue should exist");

  const source = readFileSync(managerPath, "utf8");

  assert.match(source, /const\s+PROMO_DELAY_MS\s*=\s*60000/);
  assert.match(source, /getPromos\(\)/);
  assert.match(source, /filterActualPromos\(promos\)/);
  assert.match(source, /activePromo\.value\s*=\s*actualPromos\.value\[activePromoIndex\.value\]/);
  assert.match(source, /setTimeout\(\s*showPopup,\s*PROMO_DELAY_MS\s*\)/);
  assert.match(source, /clearTimeout/);
  assert.match(source, /class="promo-popup-layer"/);
  assert.doesNotMatch(source, /<OverflowContainer/);
});

test("promo manager only enables the fullscreen click layer while the popup is visible", () => {
  const source = readFileSync(managerPath, "utf8");

  assert.match(source, /v-if="isVisible"/);
  assert.match(source, /class="promo-popup-backdrop"/);
  assert.match(source, /@click="closePopup"/);
  assert.match(source, /\.promo-popup-backdrop\s*\{[^}]*position:\s*fixed/s);
  assert.match(source, /\.promo-popup-layer\s*\{[^}]*position:\s*relative/s);
  assert.doesNotMatch(source, /v-if="true"/);
});

test("promo manager rotates promos every 10 seconds and exposes side navigation", () => {
  const source = readFileSync(managerPath, "utf8");

  assert.match(source, /const\s+PROMO_ROTATE_DELAY_MS\s*=\s*10000/);
  assert.match(source, /let\s+promoRotateTimer/);
  assert.match(source, /setInterval\(\s*showNextPromo,\s*PROMO_ROTATE_DELAY_MS\s*\)/);
  assert.match(source, /clearInterval/);
  assert.match(source, /function\s+showNextPromo\(\)/);
  assert.match(source, /function\s+showPrevPromo\(\)/);
  assert.match(source, /@next="showNextPromo"/);
  assert.match(source, /@prev="showPrevPromo"/);
  assert.match(source, /:can-navigate="actualPromos\.length > 1"/);
});

test("promo manager stops timed rotation while the promo form is dirty", () => {
  const source = readFileSync(managerPath, "utf8");

  assert.match(source, /@dirty-change="onPromoFormDirtyChange"/);
  assert.match(source, /const\s+isPromoFormDirty\s*=\s*ref\(false\)/);
  assert.match(source, /function\s+onPromoFormDirtyChange\(isDirty:\s*boolean\)/);
  assert.match(source, /isPromoFormDirty\.value\s*=\s*isDirty/);
  assert.match(source, /if\s*\(\s*isDirty\s*\)\s*\{\s*clearPromoRotateTimer\(\)/s);
  assert.match(source, /actualPromos\.value\.length < 2 \|\| isPromoFormDirty\.value/);
});

test("promo manager stores seen state in sessionStorage and closes by Escape", () => {
  const source = readFileSync(managerPath, "utf8");

  assert.match(source, /sessionStorage\.getItem\(PROMO_SESSION_KEY\)/);
  assert.match(source, /sessionStorage\.setItem\(PROMO_SESSION_KEY,\s*"1"\)/);
  assert.match(source, /event\.key\s*===\s*"Escape"/);
  assert.match(source, /window\.addEventListener\("keydown",\s*onKeydown\)/);
  assert.match(source, /window\.removeEventListener\("keydown",\s*onKeydown\)/);
});

test("promo modal follows the Figma promo banner structure", () => {
  assert.ok(existsSync(modalPath), "PromoPopupModal.vue should exist");

  const source = readFileSync(modalPath, "utf8");

  assert.match(source, /promo\.title/);
  assert.match(source, /promo\.body/);
  assert.match(source, /class="promo-banner__arrow promo-banner__arrow_left"/);
  assert.match(source, /class="promo-banner__arrow promo-banner__arrow_right"/);
  assert.match(source, /class="promo-banner__blue-bg"/);
  assert.match(source, /class="promo-banner__blue-panel"/);
  assert.match(source, /class="promo-banner__cta-button"/);
  assert.match(source, /Оставьте заявку, мы вам перезвоним/);
  assert.match(source, /width:\s*min\(100%,\s*1200px\)/);
  assert.match(source, /min-height:\s*126px/);
  assert.match(source, /background:\s*@LightGreyColor/);
  assert.match(source, /box-shadow:\s*0 4px 32px 0 rgba\(0,\s*0,\s*0,\s*0\.16\)/);
  assert.doesNotMatch(source, /\.promo-banner__blue-panel\s*\{[^}]*position:\s*absolute/s);
  assert.match(source, /\.promo-banner__blue-bg\s*\{[^}]*position:\s*absolute/s);
});

test("promo modal uses button_text as the button label and emits navigation", () => {
  const source = readFileSync(modalPath, "utf8");

  assert.match(source, /\{\{\s*promo\.button_text\s*\|\|\s*"Оставить заявку"\s*\}\}/);
  assert.doesNotMatch(source, /promo\.button_text\s*\|\|\s*"Оставьте заявку, мы вам перезвоним"/);
  assert.match(source, /defineEmits<\{\s*close: \[\];\s*next: \[\];\s*prev: \[\];\s*"dirty-change": \[isDirty: boolean\];\s*\}>/s);
  assert.match(source, /@click="\$emit\('prev'\)"/);
  assert.match(source, /@click="\$emit\('next'\)"/);
});

test("promo modal centers side navigation vertically", () => {
  const source = readFileSync(modalPath, "utf8");

  assert.match(source, /\.promo-banner__arrow\s*\{[^}]*top:\s*50%/s);
  assert.match(source, /\.promo-banner__arrow\s*\{[^}]*transform:\s*translateY\(-50%\)/s);
});

test("promo modal opens a lead form from the Figma CTA and posts leads", () => {
  const source = readFileSync(modalPath, "utf8");

  assert.match(source, /const\s+isFormOpen\s*=\s*ref\(false\)/);
  assert.match(source, /isFormOpen\.value\s*=\s*true/);
  assert.match(source, /name="'name'"/);
  assert.match(source, /name="'phone'"/);
  assert.match(source, /promo\.button_text/);
  assert.match(source, /sendPromoLead\(props\.promo\.id,\s*values\.name,\s*values\.phone\)/);
});

test("promo modal reports dirty state and resets submitted form when promo changes", () => {
  const source = readFileSync(modalPath, "utf8");

  assert.match(source, /"dirty-change": \[isDirty: boolean\]/);
  assert.match(source, /const\s+isDirty\s*=\s*computed\(/);
  assert.match(source, /emit\("dirty-change",\s*value\)/);
  assert.match(source, /function\s+resetFormState\(\)/);
  assert.match(source, /isSuccess\.value\s*=\s*false/);
  assert.match(source, /isFormOpen\.value\s*=\s*false/);
  assert.match(source, /nameValue\.value\s*=\s*""/);
  assert.match(source, /phoneValue\.value\s*=\s*""/);
  assert.match(source, /watch\(\s*\(\)\s*=>\s*props\.promo\.id/s);
  assert.match(source, /if\s*\(\s*isSuccess\.value\s*\)\s*\{\s*resetFormState\(\)/s);
});

test("useApi exposes final promo endpoints", () => {
  assert.match(apiSource, /const\s+MODAL_PROMO_PATH\s*=\s*"\/promo"/);
  assert.match(apiSource, /const\s+MODAL_PROMO_LEAD_PATH\s*=\s*"\/promo\/lead"/);
  assert.match(apiSource, /async function getPromos\(\)/);
  assert.match(apiSource, /async function sendPromoLead\(promoId: number,\s*name: String,\s*phone: String\)/);
  assert.match(apiSource, /promo_id:\s*promoId/);
});
