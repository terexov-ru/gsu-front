<template>
  <OverflowSuccess
      v-if="success"
      @close="emits('close'); success = false;"
  />

  <div v-else class="overflow">
    <img class="close"
         @click="emits('close')"
         src="~/assets/svg/close.svg"
         alt="close"
    >

    <div class="text text_h3">
      {{ vacancy.title }}
    </div>

    <div class="overflow__content">
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

        <div>
          <div class="text text_normal text_center text_light">Оставляя данные в этой форме Вы даете</div>
          <div class="text text_normal text_center text_accent">Согласие на обработку персональных данных</div>
        </div>

        <button
            :disabled="disabled"
            class="button button_gradient button_fill"
        >
          Отправить
        </button>
      </Form>
    </div>

  </div>
</template>

<script setup>
import {ref} from "vue";

const {validateName, validatePhone, phoneMask} = useValidate();
const {sendForm} = useApi();
const emits = defineEmits(['close']);

const props = defineProps({
  vacancy: Object
})

const nameValue = ref('');
const phoneValue = ref('');

const success = ref(false);
const disabled = ref(false);
const url = useRequestURL();

async function onSubmit(values) {
  disabled.value = true;

  const {data, status} = await sendForm(values.name, '', values.phone, props?.vacancy.title, '', url.href);
  if (status.value === 'success' && data.value.status === 'ok') {
    success.value = true;
  }

  disabled.value = false;
}
</script>

<style lang="less" scoped>
@import "/assets/core.less";

.overflow {
  width: 100%;
  height: auto;

  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  border-radius: 12px;
  border: 1px solid @MidGreyColor;
  background: @WhiteColor;

  min-width: 60vw;

  @media @min760 {
    padding: 40px 22px 40px 40px;
  }
}

.wrapper {
  width: 100%;
}

.overflow__content {
  display: flex;
  flex-direction: column;
  gap: 32px;

  max-width: 1200px;
  max-height: 70vh;
  overflow: auto;

  @media @min760 {
    gap: 40px;
  }
}

.overflow__content__h4 {
  margin-bottom: 12px;

  @media @min760 {
    margin-bottom: 20px;
  }
}

.overflow__button {
  width: 100%;
  margin-top: 20px;
  align-self: flex-end;

  @media @min580 {
    width: initial;
  }
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.form {
  align-self: center;
  margin: 20px 0 200px 0;
  width: 100%;


  display: flex;
  flex-direction: column;
  gap: 12px;

  @media @min580 {
    margin: 100px 0;
    width: 360px;
  }
}
</style>
