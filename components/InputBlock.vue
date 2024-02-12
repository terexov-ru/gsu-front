<template>
  <div class="input-block">
    <div class="text text_normal">{{ title }}</div>

    <Field class="input"
           v-model="value"
           :name="name"
           :placeholder="placeholder"
           :type="'text'"
           :rules="rule"
           v-maska
           :data-maska="mask"
           :class="[
               {'input text text_normal input_white' : white},

           ]"
    />

    <ErrorMessage
        class="text text_error"
        :name="name"
    />


  </div>
</template>

<script setup>
import {watch} from "vue";

const value = defineModel('value');

watch(value, async (newVal) => {
  console.log(newVal);
})

defineProps({
  name: String,
  title: String,
  placeholder: String,
  type: String,
  rule: Function,
  mask: String,
  white: {
    type: Boolean,
    default: false,
  },
})

</script>

<style lang="less" scoped>
@import "assets/core.less";

.text_error {
  color: @RedOneColor;
  margin-top: 8px;
  font-size: 14px;
}

.input-block {
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input_error {
  border: 1px solid @RedOneColor;
}


</style>
