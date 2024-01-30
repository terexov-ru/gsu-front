<template>
  <div class="input-block">
    <div class="text text_normal text_light">{{ name }}</div>
    <input class="input" :placeholder="placeholder" :type="type">
  </div>
</template>

<script>
export default {
  name: "InputBlock",
  props: {
    name: String,
    placeholder: String,
    type: String,
  },
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.input-block {
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  gap: 4px;
}


</style>
