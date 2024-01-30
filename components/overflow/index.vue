<template>
  <div class="overflow">
    <slot>

    </slot>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped lang="less">
@import "assets/core";

.overflow {
  position: relative;

  width: 340px;
  height: auto;

  overflow: hidden;
  box-sizing: border-box;
  padding: 40px;

  border-radius: 12px;
  border: 1px solid @MidGreyColor;
  background: @WhiteColor;

@media @min580 {
  width: 440px;
}
}
</style>
