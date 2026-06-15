<template>
  <!-- Данный компонент должен отвечать за обработку поисковых запросов из компонента ProgramSearchBar
  и отображения состояние в ProgramCardList-->
  <div class="search-block wrapper wrapper_paddings">
    <h2 class="text text_h2 text_dark">
      Подбери <span class="text_accent">программу</span> — повышай <br />
      свою <span class="text_accent">квалификацию</span> с нами
    </h2>

    <ProgramSearchBar @search="search()" v-model:value="searchValue" />

    <Loader v-if="pending" />

    <div v-if="status === 'success'">
      <SearchTipList
        :tips="specialtyAreas"
        :redirect="true"
        query-key="specialty_area_id"
        v-model:selected="specialtyAreaId"
      />

      <!-- <ProgramCardList
          v-model:courses="courses"
      /> -->
    </div>

    <!-- <SeeMore
        :href="'/courses'"
    /> -->
  </div>
</template>

<script setup>
import { toValue, watch } from "vue";
import { API } from "~/constants/index.js";

const specialtyAreaId = ref(undefined);
const courses = ref([]);
const searchValue = ref("");
const specialtyAreas = ref([]);

const firstRequestBody = {
  start: 0,
  amount: 3,
  sort: 0,
};

function buildLearningRequest(body) {
  return Object.fromEntries(
    Object.entries(body).filter(([, value]) => {
      if (value === undefined || value === null || value === "") return false;
      if (typeof value === "number" && Number.isNaN(value)) return false;

      return true;
    }),
  );
}

async function search() {
  const req = buildLearningRequest({
    start: 0,
    amount: 3,
    sort: 0,
    specialty_area_id: toValue(specialtyAreaId),
    search_value: toValue(searchValue),
  });

  const { data: page } = await useFetch(API + "/page/learning", {
    method: "POST",
    body: req,
  });
  courses.value = toValue(page).page.courses;
}

watch(specialtyAreaId, async (newVal) => {
  specialtyAreaId.value = newVal;
  await search();
});

const {
  pending,
  status,
  data: page,
} = await useFetch(API + "/page/learning", {
  lazy: true,
  server: false,
  method: "POST",
  body: firstRequestBody,
});

watch(page, (newVal) => {
  specialtyAreas.value = toValue(newVal).page.specialty_areas;
  courses.value = toValue(newVal).page.courses;
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
</style>
