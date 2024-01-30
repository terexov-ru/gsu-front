<template>
  <div class="wrapper questions-block wrapper_paddings">
    <h2 class="text text_h2">Помощь</h2>

    <ul class="questions">
      <!--  TODO transitions    -->

      <li v-for="i in 6" :key="i" class="questions__item">
        <div class="questions__item__title">
          <div class="text text_large">Личный кабинет</div>
          <svg @click="active = !active" width="24" height="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22V2" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M2 12L22 12" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <div
            v-if="active"
            class="questions__item__content">
          <div class="questions__item__content__step">
            <div class="text text_h4">Как восстановить пароль?</div>
            <div>
              Ясность нашей позиции очевидна: понимание сути ресурсосберегающих технологий требует анализа инновационных
              методов управления процессами. Высокий уровень вовлечения представителей целевой аудитории является четким
              доказательством простого факта: высокотехнологичная концепция общественного уклада однозначно фиксирует
              необходимос соответствующих условий активизации.
            </div>

            <div class="questions__item__content__img-container">
              <img class="questions__item__content__img" src="~/assets/qa.png" alt="">
              <div class="text questions__item__content__img-num text_h3">
                1
              </div>
            </div>
          </div>

        </div>
      </li>

    </ul>

    <QuestionSlider
        class="questions-slider"/>

  </div>
</template>

<script setup>
const active = false;
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
