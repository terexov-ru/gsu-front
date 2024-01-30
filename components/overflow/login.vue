<template>
  <div class="overflow">
    <svg class="close"
         @click="this.$emit('close')"
         width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 18L6 6" stroke="#14181F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 6L6 18" stroke="#14181F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <div class="text text_h2 text_center">Вход</div>

    <div class="form">
      <InputBlock
          :name="'Введите номер телефона'"
          :type="'text'"
          :placeholder="'Номер телефона'"
      />
      <InputBlock
          :name="'Введите пароль'"
          :type="'password'"
      />
      <div class="text text_normal text_accent text_right">Забыли пароль?</div>
    </div>
    <div class="column column_gap8">
      <button class="button overflow-card__button button_gradient">Войти</button>
      <button class="button overflow-card__button button_black-bordered">Зарегистрироваться</button>
    </div>
  </div>
</template>
<style scoped lang="less">
@import "assets/core.less";

.overflow {
  position: relative;

  width: 340px;
  height: auto;

  overflow: hidden;
  box-sizing: border-box;
  padding: 40px;

  border-radius: 12px;
  border: 1px solid @MidGreyColor;
  background: @WhiteColor;

  @media @min580 {
    width: 440px;
  }
}

.form {
  margin-top: 60px;
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
