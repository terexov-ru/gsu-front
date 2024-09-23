<template>
  <Overflow>
    <img
      class="close"
      @click="emits('close')"
      src="~/assets/svg/close.svg"
      alt="close"
    />

    <div class="text text_h4 text_center">Укажите e-mail</div>

    <div class="text text_normal text_center mt-20">
      Пожалуйста, укажите e-mail, который вы использовали для входа на сайт
    </div>

    <Form class="form" @submit="resetLogin">
      <InputBlock :title="'Введите e-mail'" :name="'email'" :type="'text'" />

      <div
        @click.prevent="emits('openReg')"
        class="text text_normal text_accent text_center pointer"
      >
        Я не помню эти данные или они не доступны
      </div>

      <div class="column column_gap8">
        <div v-if="errorMessage.length > 0" class="text text_error text_center">
          {{ errorMessage }}
        </div>
        <button
          type="submit"
          class="button overflow-card__button button_gradient"
        >
          Далее
        </button>
        <button
          class="button overflow-card__button button_black-bordered"
          @click.prevent="emits('openLogin')"
        >
          Назад
        </button>
      </div>
    </Form>
  </Overflow>
</template>

<script setup>
const { resetPassword } = useApi();

import { ref } from "vue";
const emits = defineEmits(["close", "openLogin", "openReg", "openReset"]);
const errorMessage = ref("");

async function resetLogin(value) {
  errorMessage.value = "";

  let answer = await resetPassword(value.email);

  console.log(answer);

  if (answer == true) {
    emits("openReset");
  } else {
    errorMessage.value = answer;
  }
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
