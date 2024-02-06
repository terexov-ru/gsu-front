<template>
  <main>
    <div class="wrapper basket-page wrapper_paddings">

      <h2 class="text text_h2">Корзина</h2>

      <div class="basket block_margin-bottom">

        <div class="basket__container">

          <div class="column column_gap20">
            <div class="basket__info">
              <div class="text basket__info__count text_normal text_light">В корзине {{ basket.length }} товара</div>
              <div
                  class="text basket__info__clean text_normal pointer"
                  @click="cleanBasket()"
              >
                Очистить корзину
              </div>
            </div>

            <BasketCard
                v-for="item in basket"
                :key="item.id"
                :course="item"
            />

            <div
                class="bill"
                :class="{'bill_active': basket.length > 0}"
            >
              <div class="row row_jc-sb">
                <div class="text text_normal">Скидка</div>
                <div class="text text_semi-bold">0 ₽</div>
              </div>

              <div class="row row_jc-sb">
                <div class="text text_large text_accent">Итого</div>
                <div class="text text_h3 text_accent">{{ getPrice() }} ₽</div>
              </div>
            </div>

            <NuxtLink to="/courses">
              <button class="button basket__button button_black-bordered">Добавить курсы</button>
            </NuxtLink>

          </div>


          <BillCard

          />

        </div>

      </div>

    </div>

  </main>
</template>

<script setup>
import {toValue} from "vue";

const basket = useState('basket');

function cleanBasket() {
  basket.value = [];
}

function getPrice() {
  let counter = 0;
  toValue(basket).forEach((i) => counter += parseInt(i.price));
  return counter;
}

</script>

<style lang="less" scoped>
@import "assets/core.less";

.basket-page {
  margin-top: 80px;
}

.basket {
  margin-top: 40px;
}

.basket__info {
  display: flex;
  justify-content: space-between;
}

.basket__info__clean {
  color: @DangerColor;
}

.basket__container {
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media @min1200 {
    display: grid;
    grid-template-columns: 1fr 440px;
  }
}

//bill
.bill {
  box-sizing: border-box;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background: @LightGreyColor;
  border-radius: 8px;


  @media @min580 {
    padding: 20px;
    gap: 10px;
  }

  @media @min990 {
    gap: 16px;
  }
}

.bill_active {
  background: @LightBlueColor;
}

.basket__button {
  width: 100%;
  align-self: self-end;

  @media @min580 {
    width: 170px
  }

  @media @min1200 {
    align-self: self-start;
  }

}

</style>
