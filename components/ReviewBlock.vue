<template>
  <div class="wrapper wrapper_paddings">
    <h2 class="text text_h2 text_dark"><span class="text_accent">Честные отзывы</span> от наших учеников</h2>
    <ReviewCardList class="list"/>
    <SeeMore
      :href="'/about/reviews'"
    />
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "ReviewBlock",-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
@import "assets/core.less";

.list {
  margin-top: 32px;
  @media @min990 {
    margin-top: 54px;
  }
}
</style>
