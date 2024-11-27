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
        :tips="categories"
        :redirect="true"
        v-model:selected="category"
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
import { onMounted, toValue, watch } from "vue";
import { API } from "~/constants/index.js";

const category = ref(NaN);
const courses = ref([]);
const searchValue = ref("");
const categories = ref([]);

const firstRequestBody = {
  start: 0,
  amount: 3,
  sort: 0,
};

async function search() {
  const req = {
    start: 0,
    amount: 3,
    sort: 0,
    category: toValue(category),
    search_value: toValue(searchValue),
  };

  const { data: page } = await useFetch(API + "/page/learning", {
    method: "POST",
    body: req,
  });
  courses.value = toValue(page).page.courses;
}

watch(category, async (newVal) => {
  category.value = newVal;
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
  categories.value = toValue(newVal).page.categories;
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
