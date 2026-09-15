import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const readSource = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

const billCardSource = readSource("../components/BillCard.vue");
const courseCoastSource = readSource("../components/CourseCoast.vue");
const loginSource = readSource("../components/overflow/login.vue");
const successOrderSource = readSource("../components/overflow/successOrder.vue");
const orderItemSource = readSource("../components/account/orders/item.vue");
const apiSource = readSource("../composables/useApi.ts");

test("an order is successful only when the backend returns a valid payment URL", () => {
  assert.match(billCardSource, /data\?\.status === "ok"/);
  assert.match(billCardSource, /isValidHttpUrl\(data\?\.payment_link\)/);
  assert.doesNotMatch(billCardSource, /shallowRef\(data\.value\.status === "ok"\)/);
});

test("payment actions are disabled when an order has no valid link", () => {
  assert.match(successOrderSource, /v-if="hasPayLink"/);
  assert.match(successOrderSource, /Ссылка на оплату недоступна/);
  assert.match(orderItemSource, /!isOrderPaid && hasPaymentLink/);
  assert.match(orderItemSource, /Ссылка на оплату недоступна/);
});

test("the course page uses the persistent basket implementation", () => {
  assert.match(courseCoastSource, /const \{ addToBasket \} = useUtils\(\)/);
  assert.doesNotMatch(courseCoastSource, /basket\.push\(course\)/);
});

test("login distinguishes invalid credentials from service failures", () => {
  assert.match(apiSource, /reason: statusCode === 401/);
  assert.match(loginSource, /Сервис авторизации временно недоступен/);
  assert.match(loginSource, /await navigateTo\("\/account"\)/);
});
