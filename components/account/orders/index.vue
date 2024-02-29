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
        <path d="M17 14.1973L12 9.19727L7 14.1973" stroke="#89939F" stroke-width="1.5" stroke-linecap="round"
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


  <div class="order-list">

    <div class="order-card">

      <div class="row row_jc-sb">
        <div class="column">
          <div class="text text_semi-bold">Заказ 24000201-3945</div>
          <div class="text text_normal text_light">от 12.05.2023</div>
        </div>
        <ProgramCardTip
            :text="'ожидает оплаты'"
        />
      </div>

      <div class="column">
        <div class="row row_jc-sb">
          <div class="text text_semi-bold text_light">2 программы</div>
          <div class="row row_gap10">
            <span class="text text_h4">40 000 ₽</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 9.19727L12 14.1973L17 9.19727" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <div class="delimiter delimiter_mid-grey"/>
      </div>

      <div class="column column_gap16">
        <div class="row row_jc-sb">
          <div class="column">
            <div class="text text_normal">Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19
            </div>
            <div class="text text_normal text_light">Артикул: 54896</div>
          </div>
          <div class="text text_semi-bold">20 000 ₽</div>
        </div>

        <div class="row row_jc-sb">
          <div class="column">
            <div class="text text_normal">Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19
            </div>
            <div class="text text_normal text_light">Артикул: 54896</div>
          </div>
          <div class="text text_semi-bold">20 000 ₽</div>
        </div>

        <div class="row row_jc-sb">
          <div class="text text_normal">Скидка</div>
          <div class="text text_semi-bold">0 ₽</div>
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

  </div>

</template>

<script setup>
import {ref} from "vue";

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
  align-self: flex-end;
}

.order-list {
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  gap: 20px;
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
