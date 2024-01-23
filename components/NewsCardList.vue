<template>
  <div class="card-list">
    <NewsCard/>
    <NewsCard/>
    <NewsCard/>
  </div>
</template>

<style lang="less" scoped>
@import "assets/core.less";

.card-list {
  display: grid;
  grid-template-columns: 320px 320px 320px;
  gap: 12px;
  overflow-y: scroll;

  @media @min990 {
    overflow: auto;
    gap: 40px;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

</style>
