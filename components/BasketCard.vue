<template>
  <div class="basket-card">

    <div class="basket-card__main">

      <div class="basket-card__img-container">
        <img
            v-if="course.banner_image"
            class="basket-card__img"
            :src="course.banner_image"
            alt="basket"
        >
        <img
            v-else
            class="basket-card__img"
            src="~/assets/basket.png"
            alt="basket"
        >
      </div>

      <div class="basket-card__content">

        <div class="basket-card__content__info">

          <div>
            <div class="text text_semi-bold">
              {{ course.title }}
            </div>
            <div class="text text_normal text_light">Артикул: {{ course.id }}</div>
          </div>

          <svg
              @click="emits('deleteCourse')"
              class="pointer"
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 18L6 6" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M18 6L6 18" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>

        </div>

        <div class="basket-card__content__price">
          <SeeMore
              class="basket__link"
              :href="'/courses/' + course.id"
          />
          <div v-if="course.price_sale">
            <span class="text text_h4">{{ course.price_sale }} ₽</span>
            <span class="text text_semi-bold text_light text_margin text_through">{{ course.price }} ₽</span>
          </div>

          <div v-else>
            <span class="text text_h4">{{ course.price }} ₽</span>
          </div>

        </div>

      </div>

    </div>

    <div class="delimiter delimiter_mid-grey"/>

    <div class="basket-card__promo">
      <DropDown
          class="basket__drop-down"
          :title="'Месяц обучения'"
          :options="[{id: '1', title: 'Январь'}, {id: '2', title: 'Февраль'}]"
      />

      <input class="input text text_normal input_white" placeholder="Промокод" type="text">

      <button class="button button_black-bordered text_normal">Активировать</button>
    </div>

  </div>
</template>

<script setup>
import {toValue} from "vue";

defineProps({
  course: {
    type: Object,
    require: true
  }
})

const emits = defineEmits(['deleteCourse']);

const basket = useState('basket');

function deleteFromBasket(id) {
  basket.value = toValue(basket).filter((i) => i.id !== id);
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.text_margin {
  margin-left: 10px;
}

.basket__link {
  color: @BlueNewColor;
  stroke: @BlueNewColor;
  margin: 0;
}

.basket__drop-down {
  background: @WhiteColor;
}

.drop-down__box {
  background: none;
}

.basket-card {
  box-sizing: border-box;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  background: @LightGreyColor;
  border-radius: 8px;
}

.basket-card__main {
  display: flex;
  gap: 12px;
}

.basket-card__promo {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;

  @media @min580 {
    display: grid;
    grid-template-columns: 1fr 1fr 140px;
  }
}

.basket-card__img {
  height: 100%;
  width: auto;
  flex-shrink: 0;
}

.basket-card__img-container {
  display: none;
  width: 120px;
  height: 120px;
  overflow: hidden;


  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  border-radius: 4px;

  @media @min580 {
    display: flex;
  }
}

.basket-card__content {
  display: flex;
  flex-direction: column;
  flex: 1;

  justify-content: space-between;
}

.basket-card__content__info {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.basket-card__content__price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;


  @media @min580 {
    align-items: flex-end;
    flex-direction: row;
  }
}

</style>
