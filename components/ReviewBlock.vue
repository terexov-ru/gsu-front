<template>
  <div class="wrapper wrapper_paddings">
    <h2 class="text text_h2 text_dark">
      <span class="text_accent">Отзывы</span> наших слушателей
    </h2>
    <ReviewCardList :reviews="reviews" class="list" />
    <SeeMore :href="'/about/reviews'" />
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "assets/core.less";

.list {
  margin-top: 32px;
  @media @min990 {
    margin-top: 54px;
  }
}
</style>
