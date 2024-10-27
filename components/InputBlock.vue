<template>
  <div class="input-block">
    <div class="text text_normal">{{ title }}</div>

    <Field
      :name="name"
      :placeholder="placeholder"
      :type="type"
      :rules="rule"
      v-slot="{ field, meta }"
      v-model="value"
    >
      <input
        v-bind="field"
        v-maska
        :data-maska="mask"
        :class="[
          'input text text_normal',
          { input_white: white },
          { input_error: meta.errors.length > 0 },
        ]"
        autocomplete="on"
      />
    </Field>

    <ErrorMessage class="text text_error" :name="name" />
  </div>
</template>

<script setup>
const value = defineModel("value");

watch(value, () => {
  console.log(value.value);
});

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
});
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
