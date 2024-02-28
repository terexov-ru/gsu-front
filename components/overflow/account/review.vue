<template>
  <OverflowSuccess @close="emits('close')" v-if="success"/>
  <Overflow v-else>

    <img class="close"
         @click="emits('close')"
         src="~/assets/svg/close.svg"
         alt="close"
    >

    <div class="text text_h3">Отзыв на обучение</div>

    <Form class="form" @submit="onSubmit">

      <div class="column column_gap8">
        <div class="text text_normal text_light">Обучающийся</div>
        <div>Господин О.К.</div>
      </div>

      <div class="column column_gap8">
        <div class="text text_normal text_light">Специализации</div>
        <CardTipList
            class="course__info__card-list"
            :tips="['Первый', 'Второй']"
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
          class="button overflow-card__button button_gradient"
      >
        Отправить
      </button>

    </Form>

  </Overflow>
</template>

<script setup>
import {ref} from "vue";

// const {sendForm} = useApi();

const emits = defineEmits(['close']);

const commentValue = ref('');
const success = ref(false);
const disabled = ref(false);

async function onSubmit(values) {
  disabled.value = true;

  console.log(values);
  success.value = true;

  // const {data, status} = await sendForm(values.name, '', values.phone, 'Узнать больше', '');
  // if (status.value === 'success' && data.value.status === 'ok') {
  //   success.value = true;
  // }

  disabled.value = false;
}

</script>

<style scoped lang="less">
@import "assets/core.less";

.form {
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  gap: 20px;
}

.close {
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
