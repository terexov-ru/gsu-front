<template>
  <div class="link">
    <span class="text text_normal">Смотреть больше</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H20M20 12L14 6M20 12L14 18"  stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"/>
    </svg>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "SeeMore",-->
<!--  props: {-->
<!--    href: {-->
<!--      require: true,-->
<!--      type: String-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
@import "assets/core.less";

.link {
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
  stroke: @DarkGreyColor;

  justify-content: right;
  margin-top: 20px;

  &:hover {
    color: @BlueNewColor;
    stroke: @BlueNewColor;
    transition-duration: @dur150;
  }
}
</style>
