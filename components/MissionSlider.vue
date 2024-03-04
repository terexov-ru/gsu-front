<template>
  <div class="wrapper">
    <div class="slider">

      <h2 class="slider__title">
        {{ banner.title }}
        <!--        <span>Наша миссия — сделать образование</span>-->
        <!--        <div class="text-rotate">доступным и удобным</div>-->
      </h2>

      <div style="flex-basis: 100%"/>

      <NuxtLink v-if="banner.button.link" :to="banner.button.link">
        <button
            class="button slider__button button_white button_size">
          {{ banner.button.text }}
        </button>
      </NuxtLink>

      <button v-else
              @click="emits('clickButton')"
              class="button slider__button button_white button_size">
        {{ banner.button.text }}
      </button>

      <div>
        <!--        <div class="circle"/>-->
        <!--        <img class="slider__image" src="~/assets/mission.png" alt="banner">-->
        <img class="slider__image" :src="banner.image" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  banner: Object,
})

const emits = defineEmits(['clickButton']);


</script>

<style lang="less" scoped>
@import "assets/core.less";


.slider__button {
  width: max-content;
  z-index: 100;
}

.slider__image {
  display: none;
  position: absolute;
  object-fit: fill;
  //transform: scale(-1, 1);

  height: 100%;
  width: auto;

  bottom: 0;
  right: 0;

  @media @min580 {
    display: block;
  }
}

.circle {
  position: absolute;
  border-radius: 700px;
  background: rgba(255, 255, 255, 0.26);

  @media @min580 {
    top: -150px;
    left: 0;
    width: 500px;
    height: 500px;
  }

  @media @min760 {
    width: 996px;
    height: 996px;
    top: -250px;
    left: 50px;
  }
}

</style>
