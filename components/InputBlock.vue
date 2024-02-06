<template>
  <div class="input-block">
    <div class="text text_normal">{{ name }}</div>

    <input class="input"
           v-model="value"
           :placeholder="placeholder"
           :type="type"
           :class="{'input text text_normal input_white' : white}"
    />

  </div>
</template>

<script setup>
const value = defineModel('value');

defineProps({
  name: String,
  placeholder: String,
  type: String,
  white: {
    type: Boolean,
    default: false,
  },
})

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
