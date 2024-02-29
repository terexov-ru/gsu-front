<template>
  <h3 class="text text_h3">Мои заказы</h3>

  <div class="order-status">

    <div
        @click="active = !active"
        class="row row_al-c row_gap4 pointer"
    >
      <div class="text text_normal text_light">Описание статусов</div>
      <svg
          :class="{'svg_rotate': active}"
          class="svg"
          width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 9.19727L12 14.1973L17 9.19727" stroke="#89939F" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    </div>

    <div
        :class="{'order-status__list_active' : active}"
        class="order-status__list"
    >
      <div class="column column_gap12">
        <div class="tip tip_active tip_small">Обработка</div>
        <div class="text text_normal">Ожидает обработки заказа менеджером</div>
      </div>

      <div class="column column_gap12">
        <div class="tip tip_danger tip_small">Отменен</div>
        <div class="text text_normal">Заказ отменен по каким-либо причинам</div>
      </div>

      <div class="column column_gap12">
        <div class="tip tip_active tip_small">Ожидает оплаты</div>
        <div class="text text_normal">В ожидании поступления средств на расчетный счет организации</div>
      </div>

      <div class="column column_gap12">
        <div class="tip tip_dark-fill tip_small">Оплачено</div>
        <div class="text text_normal">Заказ оплачен, доступ к материалам будет открыт в течении суток</div>
      </div>

      <div class="column column_gap12">
        <div class="tip tip_accent tip_small">Проверка документов</div>
        <div class="text text_normal">Проверяются загруженные докмуенты</div>
      </div>

      <div class="column column_gap12">
        <div class="tip tip_dark-fill tip_small">Обучение</div>
        <div class="text text_normal">Открытый доступ к учебному материалу</div>
      </div>
    </div>
  </div>

  <Loader
      v-if="pending"
  />

  <div v-else class="order-list">
    <div v-if="data.orders.length > 0">
      <AccountOrdersItem
          v-for="ord in data.orders"
          :key="ord.id"
          :order="ord"
      />
    </div>

    <div v-else
         class="text text_normal text_accent empty-list"
    >
      У вас пока нет активных заказов
    </div>

  </div>

</template>

<script setup>
import {ref} from "vue";
import Loader from "../../loader.vue";

const active = ref(false);
const {getOrders} = useApi();

const {pending, data} = await getOrders();

console.log(data);
// const orders = data.value.orders;

</script>

<style lang="less" scoped>
@import "assets/core";

.order-list {
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-status {
  margin-top: 20px;
}

.order-status__list {
  max-height: 0;
  transition: @dur250;
  overflow: hidden;
  opacity: 0;

  display: flex;
  flex-direction: column;
  gap: 32px;

  box-sizing: border-box;
  padding: 0 20px;

  margin-top: 12px;

  background: @LightGreyColor;
  border-radius: 8px;

  @media @min760 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px 20px;
  }

}

.order-status__list_active {
  max-height: 750px;
  transition: @dur250;
  padding: 20px;
  opacity: 1;

  @media @min760 {
    max-height: 400px;
  }
}

.svg {
  transition: @dur150;
}

.svg_rotate {
  transform: rotate(-180deg);
  transition: @dur150;
}

</style>
