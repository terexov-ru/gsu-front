<template>
  <Overflow>
    <img class="close"
         @click="this.$emit('close')"
         src="~/assets/svg/close.svg"
         alt="close"
    >

    <div class="text text_h2 text_center">Регистрация</div>

    <Form class="form" @submit="onSubmit">
      <InputBlock
          :name="'email'"
          :title="'E-mail'"
          :type="'text'"
          :placeholder="'mail@mail.com'"
          v-model:value="mailValue"
          :rule="validateEmail"
      />

      <InputBlock
          :name="'phone'"
          :title="'Номер телефона'"
          :type="'text'"
          v-model:value="phoneValue"
          :placeholder="'Номер телефона'"
          :mask="phoneMask"
          :rule="validatePhone"
      />

      <div class="text text_normal  text_center">
        <div>Оставляя данные в этой форме, Вы даете</div>
        <div class="text_accent">Согласие на обработку персональных данных</div>
      </div>

      <div class="column column_gap8">
        <div class="text text_error text_center">{{ errorMessage }}</div>

        <button class="button overflow-card__button button_gradient"
                :disabled="disabled"
        >Зарегистрироваться
        </button>
        <button class="button overflow-card__button button_black-bordered"
                @click="this.$emit('openLogin')"
        >Войти
        </button>
      </div>
    </Form>
  </Overflow>
</template>

<script setup>
import {ref} from "vue";

const {validateEmail, validateName, validatePhone, phoneMask} = useValidate();
const {reg} = useApi();

const phoneValue = ref('');
const mailValue = ref('');
const errorMessage = ref('');

const success = ref(false);
const disabled = ref(false);

const emits = defineEmits(['openLogin']);

async function onSubmit(values) {
  disabled.value = true;

  const data = await reg(values.phone, values.email);
  console.log(data);
  if (data === true) {
    emits('openLogin');
  } else {
    errorMessage.value = data;
  }

  disabled.value = false;
  console.log(values);
}

</script>

<style scoped>
.form {
  margin-top: 40px;

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
