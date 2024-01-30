<script setup lang="ts">
const props = defineProps({
  error: Object
})
</script>

<template>
  <AppBar/>
  <div class="wrapper wrapper_paddings">
    <div class="column error-container">

      <img src="/assets/svg/sad_smile.svg" alt="error">

      <div class="text text_semi-bold">Ошибка {{ error.statusCode }}</div>

      <div class="text_center">
        <div class="text text_normal">
          <span class="text_light">Воспользуйтесь поиском по сайту или вернитесь на</span>
          <span class="text_accent">
            <NuxtLink to="/">
              Главную страницу
            </NuxtLink>
          </span>
        </div>
      </div>

    </div>
  </div>
  <AppFooter/>
</template>

<style scoped>
@import "~/assets/core.less";

a {
  text-decoration: none;
  color: inherit;
}

.error-container {
  width: 100%;
  height: 80vh;

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

