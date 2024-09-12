<template>
  <li class="questions__item pointer" @click="active = !active">
    <div class="questions__item__title">
      <div class="text text_large">{{ item.title }}</div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22V2"
          stroke="#25292D"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M2 12L22 12"
          stroke="#25292D"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <div v-if="active" class="questions__item__content">
      <div
        class="questions__item__content__step"
        v-for="(step, index) in item.steps"
      >
        <div class="text text_h4">{{ step.title }}</div>
        <div v-html="step.description"></div>

        <div v-if="step.media" class="questions__item__content__img-container">
          <img
            :src="step.media"
            class="questions__item__content__img"
            alt="step"
          />
          <!--          <img class="questions__item__content__img" src="~/assets/qa.png" alt="">-->
          <div class="text questions__item__content__img-num text_h3">
            {{ index + 1 }}
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
const active = ref(false);

defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="less" scoped>
@import "/assets/core";

.questions__item {
  display: flex;
  flex-direction: column;
  gap: 32px;

  box-sizing: border-box;
  padding: 20px;
  border-bottom: 1px solid @MidGreyColor;

  @media @min760 {
    gap: 40px;
  }
}

.questions__item:last-child {
  border-bottom: none;
}

.questions__item__title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.questions__item__content {
  overflow: hidden;
  transition: 500ms;
}

//.questions__item__content_active {
//  max-height: min-content;
//  transition: 500ms;
//}

.questions__item__content__step {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media @min760 {
    gap: 20px;
  }
}

.questions__item__content__img-container {
  position: relative;
  width: 100%;
  height: auto;
}

.questions__item__content__img {
  width: 100%;
  height: auto;
}

.questions__item__content__img-num {
  display: none;

  width: 48px;
  height: 48px;
  border-radius: 50%;

  justify-content: center;
  align-items: center;

  position: absolute;
  top: 20px;
  left: 20px;

  background: @BluButtonGradient;
  color: @WhiteColor;

  @media @min760 {
    display: flex;
  }
}
</style>
