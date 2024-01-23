<template>
  <div class="bill">

    <div class="basket__bill">

      <div class="text basket__bill__item text_normal">
        <span class="text_light">Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19</span>
        <span class="text_semi-bold text_shrink">20 000 ₽</span>
      </div>

      <div class="text basket__bill__item text_normal">
        <span class="text_light">Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19</span>
        <span class="text_semi-bold text_shrink">20 000 ₽</span>
      </div>

      <div class="text basket__bill__item text_normal">
        <span class="text_light">Скидка</span>
        <span class="text_semi-bold text_shrink">0 ₽</span>
      </div>

      <div class="delimiter delimiter_mid-grey"/>

      <div class="text basket__bill__item">
        <span class="text_light text_large">Итого</span>
        <span class="text_large text_semi-bold text_shrink ">40 000 ₽</span>
      </div>
    </div>

    <div class="column column_gap20">
      <div class="basket__bill">
        <div class="text basket__bill__item text_normal">
          <span class="text_light">Накоплено баллов</span>
          <span class="text_semi-bold text_shrink">83</span>
        </div>

        <div class="basket__bill__item">
          <input class="input text text_normal input_white" placeholder="Кол-во баллов" type="text">
          <button class="button text_normal button_dark button_small">Списать</button>
        </div>
      </div>

      <button class="button button_gradient">Оформить</button>
    </div>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "BillCard"-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
@import "assets/core.less";


.bill {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media @min760 {
    display: grid;
    grid-template-columns: 3fr 2fr;
  }

  @media @min1200 {
    display: flex;
    flex-direction: column;
  }
}

.text_shrink {
  flex-shrink: 0;
}

.basket__list {
  display: flex;
  flex-direction: column;
  gap: inherit;
}

.basket__bill {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;

  box-sizing: border-box;
  padding: 20px;
  border-radius: 8px;

  background: @LightGreyColor;
}

.basket__bill__item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

</style>
