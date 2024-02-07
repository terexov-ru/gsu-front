<template>
  <div class="wrapper">
    <div class="slider vacancies__slider">

      <h2 class="slider__title">
        <div class="row row_gap10 row_al-c">
          <div>Станьте</div>
          <div class="text-rotate">частью команды</div>
        </div>
        <div>
          Университета "Гарант-Сервис"
        </div>
      </h2>

      <div style="flex-basis: 100%"/>

      <button
          @click="this.$emit('clickButton')"
          class="button slider__button button_dark button_size">
        Подать заявку
      </button>


      <img class="slider__image" src="~/assets/vacancies_sldier.png" alt="banner">

    </div>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "VacanciesSlider"-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
@import "assets/core.less";

.vacancies__slider {
  background: radial-gradient(142.4% 127.35% at 111.75% 91.51%, #FCFF59 0%, rgba(255, 194, 138, 0.10) 100%), linear-gradient(125deg, #007AEA 9.39%, #24FFD8 77.39%);
}

.slider__button {
  width: 170px;

  @media @min760 {
    width: 220px;
  }

  @media @min990 {
    width: 260px;
  }
}

.slider__image {
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 270px;
  width: auto;
  height: inherit;

  @media @min580 {
    right: 0;
    left: initial;
  }
}
</style>
