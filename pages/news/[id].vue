<template>
  <div class="wrapper news-page wrapper_paddings">
    <h2 class="text text_h2">Новости</h2>

    <GoBack class="back" :text="'Вернуться назад'" :link="'/news'" />

    <div class="news">
      <div class="news__img-container">
        <img
          class="news__img"
          v-if="news && news.image"
          :src="news.image"
          alt="news"
        />
        <img v-else class="news__img" src="~/assets/news_banner.png" />
      </div>

      <div class="news__content">
        <div class="text text_h4">
          {{ news.annotation }}
        </div>

        <div class="text text_caption text_accent">
          {{ news.date }} • {{ news.type }}
        </div>

        <div class="text text_normal" v-html="news.text"></div>
      </div>
    </div>

    <!--    <div class="news-block">-->

    <!--      <h4 class="text text_h4">Смотреть еще</h4>-->
    <!--      <NewsCardList-->
    <!--          class="news-list"-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import { toValue } from "vue";

const route = useRoute();

const { getNewsById: getNewsById } = useApi();
const { data: data } = await getNewsById(route.params.id);

const news = toValue(data).page;
</script>

<style lang="less" scoped>
@import "assets/core.less";

.news-page {
  margin-top: 80px;
  margin-bottom: 120px;
}

.news-block {
  margin-top: 120px;
}

.news-list {
  margin-top: 20px;
}

.back {
  margin-top: 40px;
  margin-bottom: 20px;
}

.news {
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media @min760 {
    gap: 40px;
  }

  @media @min1200 {
    flex-direction: row;
  }
}

.news__img-container {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;

  width: 100%;
  height: auto;
  flex-shrink: 0;
  max-height: 560px;
  border-radius: 8px;

  @media @min760 {
    width: 560px;
  }
}

.news__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.news__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
