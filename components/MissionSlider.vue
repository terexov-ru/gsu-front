<template>
  <div class="wrapper">
    <div class="slider">

      <h2 class="slider__title">
        <span>Наша миссия — сделать образование</span>
        <div class="text-rotate">доступным и удобным</div>
      </h2>

      <div style="flex-basis: 100%"/>
      <button
          @click="this.$emit('clickButton')"
          class="button slider__button button_white button_size">
        Подробнее
      </button>

      <div>
        <!--        <div class="circle"/>-->
        <img class="slider__image" src="~/assets/mission.png" alt="banner">
      </div>
    </div>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "MissionSlider"-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
@import "assets/core.less";


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
  transform: scale(-1, 1);
  width: 260px;
  top: -15px;
  right: -80px;

  @media @min580 {
    width: 370px;
    top: -80px;
    right: 0;
  }

  @media @min990 {
    width: 400px;
    top: -80px;
    right: 20px;
  }

  @media @min1200 {
    width: 465px;
    top: -80px;
    right: 20px;
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
