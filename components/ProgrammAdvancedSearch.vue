<template>
  <div class="search-block wrapper wrapper_paddings">
    <h2 class="text text_h2 text_dark">Обучение</h2>

    <ProgramSearchBar @search="search()" v-model:value="searchValue" />

    <SearchTipList
      :tips="specialtyAreas"
      query-key="specialty_area_id"
      v-model:selected="selectedSpecialtyAreaId"
    />

    <div class="search-block__filters">
      <DropDown
        :title="'Уровень образования'"
        :options="educationLevels"
        v-model:selected="selectedEducationLevel"
        class="search-block__drop-down"
      />

      <DropDown
        :title="'Вид образования'"
        :options="categories"
        v-model:selected="selectedCategory"
        class="search-block__drop-down"
      />

      <DropDown
        v-if="specs && specs.length > 0"
        :title="'Специальность'"
        :options="specs"
        v-model:selected="selectedSpec"
        class="search-block__drop-down"
      />

      <DropDown
        :title="'Количество часов'"
        :options="durations"
        v-model:selected="selectedDuration"
        class="search-block__drop-down"
      />
    </div>

    <CourseCardList v-model:courses="courses" class="search-block__card-list" />

    <div class="pagination">
      <PaginationBar :size="amount" :count="count" v-model:page="currentPage" />
    </div>
  </div>
</template>

<script setup>
import { API } from "~/constants/index.js";
import { toValue, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const selectedCategory = ref({});
const selectedSpec = ref({});
const selectedDuration = ref({});
const selectedEducationLevel = ref({});
const selectedSpecialtyAreaId = ref(undefined);
const courses = ref([]);
const currentPage = ref(1);
const amount = 5;
const searchValue = ref("");
const route = useRoute();
const router = useRouter();

function normalizeQueryId(value) {
  if (Array.isArray(value)) value = value[0];
  if (value === undefined || value === null || value === "") return undefined;

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function buildLearningRequest(body) {
  return Object.fromEntries(
    Object.entries(body).filter(([, value]) => {
      if (value === undefined || value === null || value === "") return false;
      if (typeof value === "number" && Number.isNaN(value)) return false;

      return true;
    }),
  );
}

function getNormalizedQueryValue(value) {
  return value === undefined || value === null || value === ""
    ? undefined
    : String(value);
}

async function syncQuery(queryPatch) {
  const nextQuery = { ...route.query };
  let changed = false;

  Object.entries(queryPatch).forEach(([key, value]) => {
    const normalizedValue = getNormalizedQueryValue(value);
    const currentValue = getNormalizedQueryValue(route.query[key]);

    if (normalizedValue === currentValue) return;

    changed = true;

    if (normalizedValue === undefined) {
      delete nextQuery[key];
    } else {
      nextQuery[key] = normalizedValue;
    }
  });

  if (!changed) return;

  await router.replace({
    query: nextQuery,
  });
}

function findCategoryById(categoryId) {
  return (
    categories.value.find((item) => Number(item.id) === Number(categoryId)) ||
    {}
  );
}

/* search request */
async function search(noUpdated = undefined) {
  if (!noUpdated) currentPage.value = 1;

  const req = buildLearningRequest({
    start: toValue(currentPage) * amount - amount,
    amount: amount,
    sort: 0,
    category: toValue(selectedCategory)?.id,
    specialty_area_id: toValue(selectedSpecialtyAreaId),
    search_value: toValue(searchValue),
    search_education_level: toValue(selectedEducationLevel).id,
    search_spec: toValue(selectedSpec).id,
    search_duration: toValue(selectedDuration).id,
  });

  const { data: page } = await useFetch(API + "/page/learning", {
    method: "POST",
    body: req,
  });

  courses.value = toValue(page).page.courses;
  categories.value = toValue(page).page.categories;
  durations.value = toValue(page).page.durations;
  specs.value = toValue(page).page.specs;
  educationLevels.value = toValue(page).page.education_levels;
  selectedCategory.value = findCategoryById(toValue(selectedCategory)?.id);
  count.value = toValue(page).page.total_courses_amount;
}

/* search request to get options info */
const initialSpecialtyAreaId =
  normalizeQueryId(route.query.specialty_area_id) ??
  normalizeQueryId(route.query.id);
const initialCategoryId = normalizeQueryId(route.query.category);

selectedSpecialtyAreaId.value = initialSpecialtyAreaId;

const firstRequestBody = buildLearningRequest({
  start: 0,
  amount: amount,
  sort: 0,
  category: initialCategoryId,
  specialty_area_id: initialSpecialtyAreaId,
});

const { data: page } = await useFetch(API + "/page/learning", {
  method: "POST",
  body: firstRequestBody,
});

const durations = ref(toValue(page).page.durations);
const specs = ref(toValue(page).page.specs);
const educationLevels = ref(toValue(page).page.education_levels);
const categories = ref(toValue(page).page.categories);
const specialtyAreas = ref(toValue(page).page.specialty_areas);
selectedCategory.value = findCategoryById(initialCategoryId);
courses.value = toValue(page).page.courses;
const count = ref(toValue(page).page.total_courses_amount);

/* Watchers */
watch(
  () => route.query.specialty_area_id,
  (newId) => {
    selectedSpecialtyAreaId.value = normalizeQueryId(newId);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
);

watch(
  () => route.query.category,
  (newId) => {
    const normalizedCategoryId = normalizeQueryId(newId);
    selectedCategory.value = findCategoryById(normalizedCategoryId);
  },
);

watch(currentPage, async (newVal) => {
  currentPage.value = newVal;
  await search(true);
});

watch(selectedSpecialtyAreaId, async (newVal) => {
  selectedSpecialtyAreaId.value = newVal;
  await syncQuery({
    specialty_area_id: newVal,
  });
  await search(false);
});

watch(
  () => toValue(selectedCategory)?.id,
  async (newId) => {
    await syncQuery({
      category: newId,
    });
    await search(false);
  },
);

/* Filters */
watch(selectedSpec, async () => {
  await search(false);
});
watch(selectedDuration, async () => {
  await search(false);
});
watch(selectedEducationLevel, async () => {
  await search(false);
});
</script>

<style lang="less" scoped>
@import "assets/core.less";

.search-block {
  padding-top: 40px;

  @media @min1200 {
    padding-top: 80px;
  }
}

.search-block__drop-down {
  background: @LightGreyColor;
}

.search-block__card-list {
  margin-top: 32px;

  @media @min760 {
    margin-top: 40px;
  }
}

.search-block__filters {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;

  margin-top: 24px;

  @media @min580 {
    flex-direction: row;
  }
}
</style>
