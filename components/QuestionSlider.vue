<template>
  <div class="wrapper">
    <div v-if="banner" class="slider question__slider">
      <ThemeSnowfall v-if="isSnowThemeOn()" />

      <h2 class="slider__title">
        <div>{{ banner.title }}</div>
        <!--        <span>Остались вопросы?</span>-->
        <!--        <div class="text-rotate">Задайте их нам</div>-->
      </h2>

      <div class="fill" />

      <span class="text slider__text text_h4">{{ banner.text }}</span>

      <div class="slider__container">
        <FormSlider
          :buttonClasses="'button button_dark'"
          :buttonText="'Получить консультацию'"
          @success="this.$emit('success')"
        />

        <img class="slider__image" :src="banner.image" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { isSnowThemeOn } from "~/theme/snow";

const props = defineProps({
  banner: Object,
});
</script>
<style lang="less" scoped>
@import "assets/core.less";

.question__slider {
  @media (max-width: 580px) {
    height: auto;
  }
}

.slider__title {
  max-width: 45%;
}

.fill {
  flex-basis: 100%;
}

.slider__image-container {
  width: 100%;
  position: relative;
}

.slider__text {
  color: @WhiteColor;
  max-width: 90%;
  margin-top: 10px;

  @media @min580 {
    max-width: 45%;
  }

  @media @min990 {
    max-width: 40%;
  }
}

.form {
  position: initial;

  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;

  top: 0;
  right: 30%;

  @media (max-width: 580px) {
    margin-top: 40px;
  }

  @media @min580 {
    position: absolute;
    width: 272px;
    right: 5%;
    top: 30px;
  }

  @media @min760 {
    width: 272px;
    right: 140px;
    top: 40px;
  }

  @media @min990 {
    width: 300px;
    right: 190px;
    top: 50px;
  }

  @media @min1200 {
    top: 75px;
  }
}

.slider__image {
  display: none;
  position: absolute;
  object-fit: fill;

  height: 100%;
  width: auto;

  bottom: 0;
  right: 0;

  @media @min760 {
    display: block;
    top: 0;
  }
}

.circle {
  position: absolute;
  border-radius: 700px;
  background: rgba(255, 255, 255, 0.26);

  width: 800px;
  height: 800px;
  top: -200px;
  left: 0;

  @media @min990 {
    width: 1000px;
    height: 1000px;
    top: -250px;
    left: 0;
  }
}
</style>
