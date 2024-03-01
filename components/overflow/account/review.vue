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
        <div>{{ name }}</div>
      </div>

      <div class="column column_gap8">
        <div class="text text_normal text_light">Специализации</div>
        <CardTipList
            class="course__info__card-list"
            :tips="specs"
        />
      </div>

      <InputBlock
          :name="'title'"
          :title="'Заголовок'"
          :type="'text'"
          :placeholder="'Заголовок'"
          :rule="emptyRule"
      />

      <div class="column column_gap8">
        <div class="text text_normal">Комментарий</div>
        <Field
            as="textarea"
            class="text text-area"
            name="text"
            type="text"
            placeholder="Ваш комментарий"
            :rules="emptyRule"
        />
        <ErrorMessage class="text text_normal text_error" name="text"/>
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

const {createReview} = useApi();

const emits = defineEmits(['close']);
const props = defineProps({
  specs: Array,
  name: String,
  id: Number
})

const commentValue = ref('');
const success = ref(false);
const disabled = ref(false);

function emptyRule(value) {
  if (!value) {
    return 'Это поле обязательное';
  } else {
    return true;
  }
}

async function onSubmit(values) {
  disabled.value = true;

  // console.log(values);

  const data = await createReview(props.id, values.text, values.title);

  if (data.status === 'ok') {
    success.value = true;
  }

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
