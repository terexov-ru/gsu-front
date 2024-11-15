<template>

  <div class="wrapper wrapper_paddings">

    <div class="news-page">

      <h2 class="text text_h2">Новости</h2>

      <div class="options">
        <DropDown
            class="options__drop-down"
            :title="'Показать все'"
            :options="newsTypes"
            v-model:selected="selectedType"

        />
        <DropDown
            class="options__drop-down"
            :title="'Год'"
            :options="newsYears"
            v-model:selected="selectedYear"
        />
      </div>

      <div
          class="news-block"
      >
        <NuxtLink class="news__banner" v-if="bigNews" :to="'news/' + bigNews.id">
          <div class="news__banner"
               @mouseenter="bigNewsActive = true"
               @mouseleave="bigNewsActive = false"
          >
            <div class="news__banner__img-container">
              <img class="news__banner__img" :src="bigNews.image" alt="news_banner">
            </div>
            <div class="text text_caption text_accent">{{ bigNews.date }} • {{ bigNews.type }}</div>
            <div class="row">
              <h2
                  class="text text_h3"
                  :class="{'text_accent': bigNewsActive}"
              >
                {{ bigNews.annotation }}
              </h2>
              <svg class="svg" width="25" height="28" viewBox="0 0 25 28" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M7.66016 21L17.6602 11M17.6602 11H7.66016M17.6602 11V21" stroke="#101828" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="text text_normal" v-hmtl="bigNews.text">
            </div>
          </div>
        </NuxtLink>
        <div v-for="item of news" :key="item.id">
          <NewsCard
              :news="item"
          />
        </div>

      </div>

      <div class="pagination">
        <PaginationBar
            v-model:page="currentPage"
            :size="amount"
            :count="count"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {toValue, watch} from "vue";

const {getNews: getNews} = useApi();
const viewport = useViewport();
const amount = 5;

const {data: data} = await getNews(0, amount);

const bigNews = ref(undefined);
const bigNewsActive = ref(false);
const news = ref([]);
const page = ref(toValue(data).page);
const selectedType = ref(undefined);
const selectedYear = ref(undefined);
// Pagination
const currentPage = ref(1);
const count = ref(toValue(page).total_news_amount);

watch(selectedType, async (newValue) => {
  const {data: data} = await getNews(toValue(currentPage) * amount - amount, amount, selectedYear.id, newValue.id);
  page.value = toValue(data).page;
  updateNews(true);
})

watch(selectedYear, async (newValue) => {
  const {data: data} = await getNews(toValue(currentPage) * amount - amount, amount, newValue.id, selectedType.id);
  page.value = toValue(data).page;
  updateNews(true);
})

const newsTypes = toValue(page).news_types;
const newsYears = toValue(page).news_years;

function updateNews(updated) {
  if (updated) {
    count.value = 1;
  }
  if (!viewport.isLessThan('mobile')) {
    bigNews.value = toValue(page).news.slice(0, 1)[0];
    news.value = toValue(page).news.slice(1);
  } else {
    news.value = toValue(page).news;
  }
}

// Pagination
watch(currentPage, async (newVal) => {
  currentPage.value = newVal;
  const {data: data} = await getNews(toValue(currentPage) * amount - amount, amount, newVal.id, selectedType);
  page.value = toValue(data).page;
  updateNews(false);
})

updateNews();
</script>

<style lang="less" scoped>
@import "assets/core.less";

.news-page {
  margin-top: 80px;
}

.options {
  display: flex;
  gap: 12px;
  flex-direction: column;

  margin-top: 40px;
  margin-bottom: 40px;

  @media @min580 {
    flex-direction: row;
  }

  @media @min1200 {
    max-width: 760px;
  }
}

.options__drop-down {
  background: @LightGreyColor;
}

.svg {
  flex-shrink: 0;
}

.news-block {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media @min580 {
    grid-template-columns: 1fr 1fr;
  }

  @media @min760 {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.news__banner {
  display: none;
  flex-direction: column;
  justify-content: space-between;

  gap: 20px;

  width: 100%;
  height: auto;

  @media @min580 {
    display: flex;
    grid-row: 1 / 3;
    grid-column: 1 / 3;
  }

  @media @min760 {
    grid-column: 1 / 4;
    grid-row: 1 / 4;
  }

  @media @min1200 {
    grid-row: 1 / 3;
    grid-column: 1 / 3;
  }
}

.news__banner__img-container {
  max-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
}

.news__banner__img {
  width: 100%;
  height: auto;
}

.pagination {
  display: flex;
  justify-content: center;

  margin-top: 60px;
  margin-bottom: 120px;
}

</style>
