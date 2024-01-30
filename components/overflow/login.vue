<template>
  <Overflow>
    <img class="close"
         @click="this.$emit('close')"
         src="~/assets/svg/close.svg"
         alt="close"
    >

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
  </Overflow>
</template>
<style scoped lang="less">
@import "assets/core.less";


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
