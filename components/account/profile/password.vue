<template>
  <div class="password">
    <div class="text text_large">Смена пароля</div>

    <Form class="password__form">

      <div class="password__form__row">
        <InputBlock
            :name="'name'"
            :title="'Старый пароль'"
            :type="'text'"
            v-model:value="nameValue"
            :rule="validateName"
        />
      </div>

      <div class="password__form__row">
        <InputBlock
            :name="'sename'"
            :title="'Новый пароль'"
            :type="'text'"
            v-model:value="senameValue"
            :mask="phoneMask"
            :rule="validatePhone"
        />

        <InputBlock
            :name="'lastName'"
            :title="'Новый пароль еще раз'"
            :type="'text'"
            v-model:value="lastNameValue"
            :rule="validateEmail"
        />
      </div>

      <button class="button password__form__button button_gradient button_170">Обновить пароль</button>
    </Form>
  </div>
</template>

<script>
export default {
  name: "password"
}
</script>

<style scoped>
.password {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.password__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.password__form__row {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 1fr 1fr;
}

.password__form__button {
  margin-top: 32px;
  padding: 10px 16px 10px 16px;

}
</style>
