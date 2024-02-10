<template>
  <div class="input-block">
    <div class="text text_normal">{{ name }}</div>

    <Field class="input"
           v-model="value"
           :name="name"
           :placeholder="placeholder"
           :type="'text'"
           :rules="validateEmail"
           v-maska data-maska="+7 (###) ###-##-##"
           :class="[{'input text text_normal input_white' : white}, {'input_error' : validateEmail(value) !== true}]"
    />

<!--    data-maska="A-A" data-maska-tokens="A:[A-Z]" data-maska-eager-->
<!--    v-maska data-maska="+7 (###) ###-##-##"-->

    <ErrorMessage class="text text_error"
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
  placeholder: String,
  type: String,
  white: {
    type: Boolean,
    default: false,
  },
})

function validateEmail(value) {
  // if the field is empty
  if (!value) {
    return 'This field is required';
  }
  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return 'This field must be a valid email';
  }
  // All is good
  return true;
}

</script>

<style lang="less" scoped>
@import "assets/core.less";

.text_error {
  color: red;
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
