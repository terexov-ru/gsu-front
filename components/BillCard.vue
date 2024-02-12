<template>
  <Form class="bill-form" @submit="onSubmit">

    <div class="basket__bill">
      <div class="text text_large">Данные получателя</div>

      <InputBlock
          :name="'name'"
          :title="'ФИО'"
          :type="'text'"
          v-model:value="nameValue"
          :placeholder="'Иванов Иван Иванович'"
          :rule="validateName"
          :white="true"
      />

      <InputBlock
          :name="'phone'"
          :title="'Телефон'"
          :type="'text'"
          v-model:value="phoneValue"
          :placeholder="'Номер телефона'"
          :mask="phoneMask"
          :rule="validatePhone"
          :white="true"
      />

      <InputBlock
          :name="'email'"
          :title="'E-mail'"
          :type="'text'"
          v-model:value="mailValue"
          :placeholder="'Почта'"
          :rule="validateEmail"
          :white="true"
      />
    </div>


    <div class="bill__button column column_gap8">
      <button
          :disabled="disabled"
          class="button bill__button button_gradient button_size button_fill">Записаться на курс
      </button>
      <div class="text text_normal text_error text_center">{{ basketError }}</div>
    </div>

  </Form>

</template>

<script setup>
import {ref} from "vue";

const {validateEmail, validateName, validatePhone, phoneMask} = useValidate();
const {sendForm} = useApi();
const basket = useState('basket');

const emit = defineEmits(['success'])
const nameValue = ref('');
const phoneValue = ref('');
const mailValue = ref('');
const commentValue = ref('');
const basketError = ref('');
const disabled = ref(false);

async function onSubmit(values) {
  if (basket.value.length > 0) {
    basketError.value = ''
    disabled.value = true;
    const {data, status} = await sendForm(values.name, values.email, values.phone, 'Тестовый запрос', commentValue);

    if (status.value === 'success' && data.value.status === 'ok') {
      emit('success');
      nameValue.value = '';
      phoneValue.value = '';
      mailValue.value = '';
      basket.value = [];
    }

    disabled.value = false;
  } else {
    basketError.value = 'Вы не можете отправить заявку, пока корзина пуста'
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.bill-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.text_shrink {
  flex-shrink: 0;
}

.basket__list {
  display: flex;
  flex-direction: column;
  gap: inherit;
}

.basket__bill {
  display: flex;
  flex-direction: column;
  gap: 16px;

  box-sizing: border-box;
  padding: 20px;
  border-radius: 8px;

  background: @LightGreyColor;
}

.basket__bill__item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.bill__button {
  width: 100%;
  align-self: self-end;

  @media @min580 {
    width: 360px
  }

  @media @min760 {
    width: 440px
  }

  @media @min1200 {
    width: 100%;
  }
}

</style>
