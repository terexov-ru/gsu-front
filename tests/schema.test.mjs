import test from "node:test";
import assert from "node:assert/strict";

import {
  buildBreadcrumbSchema,
  buildCourseSchema,
  buildEducationalOrganizationSchema,
  buildNewsArticleSchema,
} from "../utils/schema.js";

test("buildCourseSchema uses known backend course fields", () => {
  const schema = buildCourseSchema(
    {
      id: 12,
      title: "Охрана труда",
      description: "<p>Обучение специалистов</p>",
      banner_image: "https://cdn.example.com/course.jpg",
      duration: "72 часа",
      price: "12000",
      specs: [{ title: "Безопасность" }],
    },
    "https://gsu.terexov.ru/courses/12",
  );

  assert.equal(schema["@type"], "Course");
  assert.equal(schema.name, "Охрана труда");
  assert.equal(schema.url, "https://gsu.terexov.ru/courses/12");
  assert.equal(schema.provider["@type"], "EducationalOrganization");
  assert.equal(schema.offers.price, "12000");
  assert.equal(schema.about[0].name, "Безопасность");
});

test("buildNewsArticleSchema uses known backend news fields", () => {
  const schema = buildNewsArticleSchema(
    {
      annotation: "Новая программа обучения",
      text: "<p>Подробности новости</p>",
      image: "https://cdn.example.com/news.jpg",
      date: "22.05.2026",
      type: "Новости",
    },
    "https://gsu.terexov.ru/news/4",
  );

  assert.equal(schema["@type"], "NewsArticle");
  assert.equal(schema.headline, "Новая программа обучения");
  assert.equal(schema.description, "Подробности новости");
  assert.deepEqual(schema.image, ["https://cdn.example.com/news.jpg"]);
});

test("buildEducationalOrganizationSchema includes contact data when available", () => {
  const schema = buildEducationalOrganizationSchema({
    url: "https://gsu.terexov.ru",
    phone: "+7 900 000-00-00",
    email: "info@example.com",
    address: "Москва",
  });

  assert.equal(schema["@type"], "EducationalOrganization");
  assert.equal(schema.telephone, "+7 900 000-00-00");
  assert.equal(schema.email, "info@example.com");
  assert.equal(schema.address.streetAddress, "Москва");
});

test("buildBreadcrumbSchema renders list items with absolute URLs", () => {
  const schema = buildBreadcrumbSchema([
    { name: "Главная", url: "https://gsu.terexov.ru/" },
    { name: "Обучение", url: "https://gsu.terexov.ru/courses" },
  ]);

  assert.equal(schema["@type"], "BreadcrumbList");
  assert.equal(schema.itemListElement[1].position, 2);
  assert.equal(schema.itemListElement[1].item, "https://gsu.terexov.ru/courses");
});
