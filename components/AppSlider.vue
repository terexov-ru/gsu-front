<template>
  <div class="wrapper">
    <div class="slider">

      <h2 class="slider__title">
        <slot name="title">
        </slot>
        <slot name="under-title">
        </slot>
      </h2>

      <slot name="left-bottom">
        <button class="slider__button button button_white button_size">
          Подробнее
        </button>
      </slot>

      <slot name="right">
        <div class="slider__image-container">

        </div>
      </slot>
    </div>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "AppSlider",-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
@import "assets/core.less";

</style>
