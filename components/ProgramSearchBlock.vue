<template>
  <!-- Данный компонент должен отвечать за обработку поисковых запросов из компонента ProgramSearchBar
  и отображения состояние в ProgramCardList-->
  <div class="search-block wrapper wrapper_paddings">
    <h2 class="text text_h2 text_dark">Подбери <span class="text_accent">программу</span> и повысь <br> свою <span
        class="text_accent">компетентность</span>
    </h2>

    <ProgramSearchBar
      @search="search()"
      v-model:value="searchValue"
    />

    <SearchTipList
        :tips="categories"
        v-model:selected="category"
    />

    <ProgramCardList
        v-model:courses="courses"
    />

    <SeeMore
        :href="'/courses'"
    />
  </div>
</template>

<script setup>
import {toValue} from "vue";
import {API} from '~/constants/index.js';

const category = ref(NaN);
const courses = ref([]);
const searchValue = ref('');

const firstRequestBody = {
  "start": 0,
  "amount": 3,
  "sort": 0,
}

async function search() {
  const req = {
    "start": 0,
    "amount": 3,
    "sort": 0,
    "category": toValue(category),
    "search_value": toValue(searchValue),
  }

  const {data: page} = await useFetch(API + '/page/learning', {
    method: 'POST',
    body: req
  });

  courses.value = toValue(page).page.courses;
}

const {data: page} = await useFetch(API + '/page/learning', {
  method: 'POST',
  body: firstRequestBody
});

const categories = toValue(page).page.categories;
courses.value = toValue(page).page.courses;
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
