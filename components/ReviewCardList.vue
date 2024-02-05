<template>
  <!--  TODO сделать адаптив под телефоны-->
  <div class="review-list">
    <ReviewCard class="box_1 text-clamp text-clamp_7"
                :class="{'text-clamp_14' : $viewport.isLessThan('desktop')}"
                v-if="reviews[0]"
                :item="reviews[0]"
    />
    <ReviewCard class="box_2 text-clamp text-clamp_7"
                v-if="reviews[1]"
                :item="reviews[1]"
    />
    <ReviewCard class="box_3 text-clamp text-clamp_7"
                v-if="reviews[2]"
                :item="reviews[2]"
    />
    <ReviewCard class="box_4 text-clamp text-clamp_7"
                :class="{'text-clamp_4' : !$viewport.isLessThan('desktop')}"
                v-if="reviews[3]"
                :item="reviews[3]"
    />
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.review-list {
  width: 100%;
  display: grid;
  gap: 12px;
  grid-template-columns: 320px 320px 320px 320px;
  grid-template-rows: 272px;
  overflow-y: scroll;

  @media @min990 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 256px;
    overflow: auto;
  }
}

.box_1 {
  @media @min990 {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
}

.box_4 {
  @media @min990 {
    grid-column: 2 / 4;
  }
}

.text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2; // количество строк
  -webkit-box-orient: vertical;
  overflow: hidden;

  &_7 {
    -webkit-line-clamp: 7;
  }

  &_4 {
    -webkit-line-clamp: 4;
  }

  &_14 {
    -webkit-line-clamp: 14;
  }
}
</style>
