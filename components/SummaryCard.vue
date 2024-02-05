<template>
  <div class="summary">
    <div
        v-for="item in list"
        :key="item.title"
        class="item"
    >
      <div class="text text_h2">{{item.title}}</div>
      <div class="text text_normal">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.summary {
  width: 100%;
  height: auto;

  box-sizing: border-box;
  padding: 30px;

  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  border-radius: 12px;
  background: linear-gradient(167.04deg, #F0F0FF -8.82%, #F0F7FF 44.88%, #F0FFFE 103.26%);

  @media @min580 {
    grid-template-columns: 1fr 1fr;
  }

  @media @min760 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
