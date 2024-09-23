<template>
  <Overflow>
    <img
      class="close"
      @click="emits('close')"
      src="~/assets/svg/close.svg"
      alt="close"
    />

    <div class="text text_h2 text_center">Вход</div>

    <Form class="form" @submit="onSubmit">
      <InputBlock :title="'Введите e-mail'" :name="'phone'" :type="'text'" />
      <InputBlock :title="'Введите пароль'" :name="'pass'" :type="'password'" />
      <div
        class="text text_normal text_accent text_right pointer"
        @click="emits('openPass')"
      >
        Забыли пароль?
      </div>

      <div class="column column_gap8">
        <div class="text text_error text_center">{{ errorMessage }}</div>
        <button class="button overflow-card__button button_gradient">
          Войти
        </button>
        <button
          class="button overflow-card__button button_black-bordered"
          @click="emits('openReg')"
        >
          Зарегистрироваться
        </button>
      </div>
    </Form>
  </Overflow>
</template>
<script setup>
const { login } = useApi();
const errorMessage = ref("");

const emits = defineEmits(["close", "openReg", "openPass"]);

async function onSubmit(value) {
  if (await login(value.phone, value.pass)) {
    navigateTo("/account");
    emits("close");
  } else {
    errorMessage.value = "Неверный логин или пароль";
  }
}
</script>

<style scoped lang="less">
@import "assets/core.less";

.form {
  margin-top: 60px;

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
