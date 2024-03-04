<template>
  <div class="wrapper questions-block wrapper_paddings">
    <h2 class="text text_h2">Ответы на вопросы</h2>

    <ul class="questions">
      <!--  TODO transitions    -->

      <QuestionItem
          v-for="item in page.faqs"
          :key="item.title"
          :item="item"
      />

    </ul>

    <QuestionSlider
        :banner="page.banner"
        class="questions-slider"
        @success="sucActive = true"
    />

  </div>

  <OverflowContainer
      :active="sucActive"
      @closeOverflow="sucActive = false"
  >
    <OverflowSuccess
        @close="sucActive = false"
    />
  </OverflowContainer>

</template>

<script setup>
const {getFAQS} = useApi();
const sucActive = ref(false);

const {data} = await getFAQS();

const page = data.value?.page;

</script>

<style lang="less" scoped>
@import "assets/core.less";

.questions-block {
  margin-top: 80px;
  margin-bottom: 120px;
}

.questions-slider {
  margin-bottom: 120px;
  margin-top: 120px;
}

.questions {
  width: 100%;
  height: auto;

  margin-top: 40px;

  box-sizing: border-box;
  overflow: hidden;

  border-radius: 10px;
  background: @LightGreyColor;
}

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
