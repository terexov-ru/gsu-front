<template>
  <NuxtLink :to="'/news/' + news.id">
    <div class="news" @mouseenter="active = true" @mouseleave="active = false">
      <div class="image-container">
        <img
          v-if="news.image !== undefined"
          class="image"
          :src="news.image"
          alt="news"
        />
      </div>

      <div class="text news__date text_caption">
        {{ news.date }} • {{ news.type }}
      </div>

      <div class="description">
        <div class="text text_semi-bold" :class="{ text_accent: active }">
          {{ news.annotation }}
        </div>
        <div class="arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="#101828"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      active: false,
    };
  },
};
</script>

<style lang="less" scoped>
@import "assets/core.less";

.news {
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  cursor: pointer;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  align-self: stretch;
  object-position: left center;

  border-radius: 8px;

  @media @min580 {
    object-fit: cover;
  }
}

.image-container {
  display: flex;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;

  position: relative;

  height: auto;

  max-height: 350px;

  @media @min580 {
    max-height: none;
    height: 240px;
    align-self: stretch;
  }

  @media @min990 {
    height: 260px;
  }
}

.description {
  display: flex;
  gap: 12px;
}

.news__date {
  color: @BlueNewColor;
  margin: 16px 0 8px 0;

  @media @min760 {
    margin: 25px 0 12px 0;
  }
}
</style>
