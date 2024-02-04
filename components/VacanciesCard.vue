<template>
  <div class="vacancies__card">
    <div class="text text_large">
      {{ vacancy.title }}
    </div>

    <div class="row row_al-c row_gap60">

      <div class="column">
        <div class="text text_normal">Опыт</div>
        <div class="text text_normal text_light">{{ vacancy.experience }} года</div>
      </div>
      <div class="column">
        <div class="text text_normal">Зарплата</div>
        <div class="text text_normal text_light">{{ vacancy.payment }}</div>
      </div>
    </div>

    <div class="button button_dark">
      Подробнее
    </div>
  </div>

</template>

<script>
export default {
  props: {
    vacancy: {
      type: Object,
      require: true
    }
  },
}
</script>

<style scoped>

</style>
