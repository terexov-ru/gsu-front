<template>
  <Overflow>
    <img class="close"
         @click="this.$emit('close')"
         src="~/assets/svg/close.svg"
         alt="close"
    >

    <div class="form">
      <InputBlock
          :name="'ФИО'"
          :type="'text'"
          :placeholder="'Ваше имя'"
      />

      <InputBlock
          :name="'Номер телефона'"
          :type="'text'"
          :placeholder="'Номер телефона'"
      />
    </div>

    <div class="column column_gap8">

      <div class="text text_normal text_center">
        <p>Оставляя данные в этой форме, Вы даете</p>
        <p class="text_accent">Согласие на обработку персональных данных</p>
      </div>

      <button class="button overflow-card__button button_dark">Узнать больше</button>
    </div>
  </Overflow>
</template>

<script>
export default {
  name: "moreInfo"
}
</script>

<style scoped lang="less">
@import "assets/core.less";

.form {
  margin-bottom: 40px;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>
