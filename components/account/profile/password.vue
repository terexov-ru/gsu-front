<template>
  <div class="password">
    <div class="text text_large">Смена пароля</div>

    <Form class="password__form" @submit="onSubmit">

      <div class="password__form__row">
        <InputBlock
            :name="'oldValue'"
            :title="'Старый пароль'"
            :type="'password'"
            v-model:value="oldValue"
        />
      </div>

      <div class="password__form__row">
        <InputBlock
            :name="'newFirValue'"
            :title="'Новый пароль'"
            :type="'password'"
            v-model:value="newFirValue"
            :rule="passRule"
        />

        <InputBlock
            :name="'newSecValue'"
            :title="'Новый пароль еще раз'"
            :type="'password'"
            v-model:value="newSecValue"
        />
      </div>

      <div>
        <div class="text text_error">{{ textError }}</div>
        <div v-if="success" class="text text_accent">Данные успешно изменены</div>
        <button
            :disabled="disabled"
            @click="onSubmit"
            class="button password__form__button button_gradient button_170">Обновить пароль
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
const {setPass} = useApi();

const oldValue = ref('');
const newFirValue = ref('');
const newSecValue = ref('');

const textError = ref('');
const disabled = ref(false);
const success = ref(false);

function passRule() {
  if (newFirValue.value !== newSecValue.value) {
    return 'Пароли не совпадают'
  } else {
    return ''
  }
}

async function onSubmit() {
  console.log('ТУТ')
  disabled.value = true;

  const password = {password: newFirValue.value};

  const data = await setPass(password);

  console.log(data);

  if (data === true) {
    success.value = true;
    textError.value = '';
  } else {
    textError.value = data;
  }

  disabled.value = false;
}

</script>

<style lang="less" scoped>
@import "assets/core";

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

  grid-template-columns: 1fr;

  @media @min580 {
    grid-template-columns: 1fr 1fr;
  }

  @media @min760 {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.password__form__button {
  margin-top: 32px;
  padding: 10px 16px 10px 16px;

}
</style>
