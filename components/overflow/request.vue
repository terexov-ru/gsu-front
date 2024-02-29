<template>
  <div v-if="!success" class="overflow-card">

    <svg
        class="overflow-card__close"
        @click="$emit('close')"
        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 18L6 6" stroke="#14181F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 6L6 18" stroke="#14181F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>


    <div class="text text_h3 text_center">
      Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19
    </div>

    <Form class="form" @submit="onSubmit">
      <InputBlock
          :name="'name'"
          :title="'ФИО'"
          :type="'text'"
          v-model:value="nameValue"
          :placeholder="'Иванов Иван Иванович'"
          :rule="validateName"
      />

      <div class="overflow-card__row row_gap24">

        <InputBlock
            :name="'phone'"
            :title="'Телефон'"
            :type="'text'"
            v-model:value="phoneValue"
            :placeholder="'Номер телефона'"
            :mask="phoneMask"
            :rule="validatePhone"
        />

        <InputBlock
            :name="'email'"
            :title="'E-mail'"
            :type="'text'"
            v-model:value="mailValue"
            :placeholder="'Почта'"
            :rule="validateEmail"
        />

      </div>

      <div class="column column_gap8">
        <div class="text text_normal">Комментарий</div>
        <textarea
            class="text text-area"
            :name="'text'"
            v-model="commentValue"
            :type="'text'"
            :placeholder="'Ваш комментарий'"
        />
      </div>

      <button
          :disabled="disabled"
          class="button overflow-card__button button_gradient button_paddings"
      >
        Получить консультацию
      </button>

    </Form>

  </div>

  <OverflowSuccess
    v-else
  />
</template>

<script setup>
import {ref} from "vue";

const {validateEmail, validateName, validatePhone, phoneMask} = useValidate();
const {sendForm} = useApi();

const nameValue = ref('');
const phoneValue = ref('');
const mailValue = ref('');
const commentValue = ref('');
const success = ref(false);
const disabled = ref(false);
const url = useRequestURL();

async function onSubmit(values) {
  disabled.value = true;
  const {data, status} = await sendForm(values.name, values.email, values.phone, 'Оформление заказа', commentValue, url.href);
  if (status.value === 'success' && data.value.status === 'ok') {
    success.value = true;
  }

  disabled.value = false;
}

</script>

<style scoped lang="less">
@import "assets/core";

/* OVERFLOW */
.overflow-card {
  position: relative;

  width: 1043px;
  height: auto;

  overflow: hidden;
  box-sizing: border-box;
  padding: 32px 20px 20px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 28px;

  border-radius: 12px;
  border: 1px solid @MidGreyColor;
  background: @WhiteColor;

  @media @min580 {
    padding: 40px;
  }

  @media @min760 {
    padding: 40px 165px;
    gap: 32px;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.overflow-card__button {
  align-self: center;
}

.overflow-card__row {
  display: flex;
  flex-direction: column;

  @media @min760 {
    flex-direction: row;
  }
}

.overflow-card__close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.text-area {
  min-height: 100px;

  box-sizing: border-box;
  padding: 10px 16px;
  resize: none;
  outline: none;
  border: none;

  background: @LightGreyColor;
}
</style>
