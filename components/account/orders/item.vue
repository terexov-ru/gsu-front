<template>
  <div class="order-card" v-if="order !== undefined">

    <div class="row row_jc-sb">
      <div class="column">
        <div class="text text_semi-bold">Заказ {{ order.number }}</div>
        <div class="text text_normal text_light">от {{ order.date }}</div>
      </div>
      <div class="tip tip_accent tip_small">{{ order.status.title }}</div>
    </div>

    <div
        @click="active = !active"
        class="column column_gap12 pointer"
    >
      <div class="row row_jc-sb">
        <div class="text text_semi-bold text_light">{{ order.courses.length }} программы</div>
        <div class="row row_gap10">
          <span class="text text_h4">{{ order.sum }} ₽</span>

          <svg
              class="svg"
              :class="{'svg_rotate': active}"
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 9.19727L12 14.1973L17 9.19727" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="delimiter delimiter_mid-grey"/>
    </div>

    <div class="column column_gap16">

      <div
          :class="{'order-card__list_active': active}"
          class="order-card__list column column_gap16"
      >
        <div
            v-for="course in order.courses"
            class="row row_jc-sb"
        >
          <div class="column column_gap8">
            <div class="text text_normal">{{ course.title }}
            </div>
            <div class="text text_normal text_light">Артикул: {{ course.articul }}</div>
          </div>
          <div class="text text_semi-bold" style="flex-shrink: 0">{{ course.price }} ₽</div>
        </div>

                    <!--  СКИДКА  -->
        <!--        <div class="row row_jc-sb">-->
        <!--          <div class="text text_normal">Скидка</div>-->
        <!--          <div class="text text_semi-bold">0 ₽</div>-->
        <!--        </div>-->
      </div>

      <div class="row order__buttons row_gap10">

        <button class="button order__button button_gradient">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 12L12 17M12 17L17 12M12 17L12 4" stroke="#F7F7F8" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M6 20H18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Скачать договор</span>
        </button>

        <button class="button order__button button_gradient">Оплатить</button>

        <button class="button order__button button_black-bordered">Подписать договор</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  order: {
    type: Object,
    required: true
  },
})

const active = ref(false);
</script>

<style lang="less" scoped>
@import "assets/core";

.order-card {
  box-sizing: border-box;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 32px;

  background: @LightGreyColor;
  border-radius: 8px;
}

.order__buttons {
  display: flex;
  flex-direction: column;

  @media @min580 {
    flex-direction: row;
    align-self: flex-end;
  }

}

.order__button {
  width: 100%;
  min-width: 170px;
  padding: 10px 16px 10px 12px;

  @media @min580 {
    width: auto;
  }
}

.order-status {
  margin-top: 20px;
}

.order-card__list {
  max-height: 2px;
  transition: opacity 0.5s, max-height 0.5s cubic-bezier(0, 1, 0, 1) ;
  overflow: hidden;
  opacity: 0;
}

.order-card__list_active {
  max-height: 1200px;
  transition: 0.5s;
  opacity: 1;
}

.svg {
  transition: @dur150;
}

.svg_rotate {
  transform: rotate(-180deg);
  transition: @dur150;
}
</style>
