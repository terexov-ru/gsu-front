<template>
  <Overflow>
    <img class="close"
         @click="this.$emit('close')"
         src="~/assets/svg/close.svg"
         alt="close"
    >

    <div class="text text_h4 text_center">Укажите e-mail или телефон</div>

    <div class="text text_normal text_center mt-20">
      Пожалуйста, укажите e-mail или телефон,
      который вы использовали для входа на сайт
    </div>

    <Form class="form">
      <InputBlock
          :title="'Введите e-mail или телефон'"
          :name="'value'"
          :type="'text'"
          v-model:value="phoneValue"
      />

      <div class="text text_normal text_accent text_center pointer">
        Я не помню эти данные или они не доступны
      </div>

      <div class="column column_gap8">
        <button class="button overflow-card__button button_gradient">
          Далее
        </button>
        <button class="button overflow-card__button button_black-bordered"
                @click="this.$emit('openLogin')"
        >
          Назад
        </button>
      </div>

    </Form>
  </Overflow>
</template>

<script>
export default {
  name: "pass"
}
</script>

<style scoped lang="less">
@import "assets/core.less";

.form {
  margin-top: 40px;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mt-20 {
  margin-top: 20px;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>
