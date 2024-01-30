<script setup lang="ts">
const props = defineProps({
  error: Object
})
</script>

<template>
  <div class="wrapper wrapper_paddings">

    <div class="column error-container column_gap20">
      <div class="text error">{{ error.statusCode }}</div>

      <div class="text_center">
        <div class="text text_h4 text_light">Вот ты и попал,</div>
        <div class="text text_h4 text_light">но не туда...</div>
      </div>

      <NuxtLink
          class="button button_paddings button_gradient"
          to="/"
      >
        Вернуться на главную
      </NuxtLink>
    </div>

  </div>
</template>

<style scoped>
@import "~/assets/core.less";

.error-container {
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error {
  font-size: 120px;
  font-weight: bold;
}
</style>

