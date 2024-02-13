<template>
  <OverflowSuccess v-if="success"/>
  <Overflow v-else>
    <img class="close"
         @click="this.$emit('close')"
         src="~/assets/svg/close.svg"
         alt="close"
    >

    <Form class="form" @submit="onSubmit">
      <InputBlock
          :name="'name'"
          :title="'ФИО'"
          :type="'text'"
          v-model:value="nameValue"
          :placeholder="'Иванов Иван Иванович'"
          :rule="validateName"
      />

      <InputBlock
          :name="'phone'"
          :title="'Телефон'"
          :type="'text'"
          v-model:value="phoneValue"
          :placeholder="'Номер телефона'"
          :mask="phoneMask"
          :rule="validatePhone"
      />

      <div class="column column_gap8">

        <div class="text text_normal text_center">
          <p>Оставляя данные в этой форме, Вы даете</p>
          <p class="text_accent">Согласие на обработку персональных данных</p>
        </div>

        <button
            :disabled="disabled"
            class="button overflow-card__button button_dark"
        >
          Узнать больше
        </button>
      </div>
    </Form>

  </Overflow>
</template>

<script setup>
import {ref} from "vue";

const {validateName, validatePhone, phoneMask} = useValidate();
const {sendForm} = useApi();

const nameValue = ref('');
const phoneValue = ref('');
const success = ref(false);
const disabled = ref(false);

async function onSubmit(values) {
  disabled.value = true;
  const {data, status} = await sendForm(values.name, '', values.phone, 'Узнать больше', '');
  if (status.value === 'success' && data.value.status === 'ok') {
    success.value = true;
  }

  disabled.value = false;
}

</script>

<style scoped lang="less">
@import "assets/core.less";

.form {
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
