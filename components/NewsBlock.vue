<template>
  <div class="wrapper wrapper_paddings">

    <h2 class="text text_h2">Новости</h2>

    <div class="list card-list">
      <NewsCard
          v-for="item in news"
          :key="item.id"
          :news="item"
      />
    </div>

    <SeeMore
        class="link"
        :href="'/news'"
    />
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Array,
      require: true
    }
  },
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.list {
  margin-top: 40px;
}

.link {

}

.card-list {
  display: grid;
  grid-template-columns: 320px 320px 320px;
  gap: 12px;
  overflow-y: scroll;
  padding-bottom: 10px;

  @media @min990 {
    overflow: auto;
    gap: 40px;
    grid-template-columns: 1fr 1fr 1fr;
    padding-bottom: 0;
  }
}

</style>
