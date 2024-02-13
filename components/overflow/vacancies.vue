<template>
  <div class="wrapper wrapper_paddings">
    <div class="overflow">
      <img class="close"
           @click="this.$emit('close')"
           src="~/assets/svg/close.svg"
           alt="close"
      >

      <div class="text text_h3">
        {{ vacancy.title }}
      </div>

      <div class="overflow__content">
        <div class="row row_al-c row_gap60">
          <div class="column">
            <div class="text text_normal text_light">Опыт</div>
            <div class="text text_normal">{{ vacancy.experience }} года</div>
          </div>
          <div class="column">
            <div class="text text_normal text_light">Зарплата</div>
            <div class="text text_normal">{{ vacancy.payment }}</div>
          </div>
        </div>

        <div>
          <div class="text overflow__content__h4 text_h4">Обязанности</div>
          <div>{{ vacancy.obligations }}</div>
        </div>

        <div>
          <div class="text overflow__content__h4 text_h4">Требования</div>
          <div>{{ vacancy.requirements }}</div>
        </div>

        <div>
          <div class="text overflow__content__h4 text_h4">Условия</div>
          <div>{{ vacancy.conditions }}</div>
        </div>
      </div>

      <button
          @click="this.$emit('clickButton')"
          class="button overflow__button button_gradient button_size"
      >
        Откликнуться
      </button>
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
  }
}
</script>

<style lang="less" scoped>
@import "/assets/core.less";

.overflow {
  width: 100%;
  height: auto;

  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  border-radius: 12px;
  border: 1px solid @MidGreyColor;
  background: @WhiteColor;

  @media @min760 {
    padding: 40px 22px 40px 40px;
  }
}

.wrapper {
  width: 100%;
}

.overflow__content {
  display: flex;
  flex-direction: column;
  gap: 32px;

  max-width: 1200px;
  max-height: 70vh;
  overflow: auto;

  @media @min760 {
    gap: 40px;
  }
}

.overflow__content__h4 {
  margin-bottom: 12px;

  @media @min760 {
    margin-bottom: 20px;
  }
}

.overflow__button {
  width: 100%;
  margin-top: 20px;
  align-self: flex-end;

  @media @min580 {
    width: initial;
  }
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>
