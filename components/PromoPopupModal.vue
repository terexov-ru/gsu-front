<template>
  <section
    class="promo-banner"
    :class="{
      'promo-banner_form': isFormOpen,
      'promo-banner_success': isSuccess,
    }"
    aria-modal="true"
    role="dialog"
    @click.stop
  >
    <div class="promo-banner__blue-bg" aria-hidden="true" />

    <button
      type="button"
      class="promo-banner__close"
      aria-label="Закрыть"
      @click="$emit('close')"
    >
      <span />
      <span />
    </button>

    <button
      type="button"
      class="promo-banner__arrow promo-banner__arrow_left"
      aria-label="Предыдущая акция"
      :disabled="!canNavigate"
      @click="$emit('prev')"
    >
      <span />
    </button>

    <div class="promo-banner__text">
      <p class="promo-banner__title">{{ promo.title }}</p>
      <p class="promo-banner__body">{{ promo.body }}</p>
    </div>

    <div class="promo-banner__blue-panel">
      <div v-if="isSuccess" class="promo-banner__success">
        <div class="promo-banner__success-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M26.667 8.667L12 23.333L5.333 16.667"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <p class="promo-banner__cta-title">Заявка отправлена</p>
      </div>

      <template v-else>
        <p class="promo-banner__cta-title">
          Оставьте заявку, мы вам перезвоним
        </p>

        <button
          v-if="!isFormOpen"
          type="button"
          class="promo-banner__cta-button"
          @click="openForm"
        >
          {{ promo.button_text || "Оставить заявку" }}
        </button>

        <Form v-else class="promo-banner__form" @submit="onSubmit">
          <div class="promo-banner__fields">
            <InputBlock
              :name="'name'"
              :title="'Имя'"
              :type="'text'"
              v-model:value="nameValue"
              :placeholder="'Иван'"
              :rule="validateName"
              :white="true"
            />

            <InputBlock
              :name="'phone'"
              :title="'Телефон'"
              :type="'text'"
              v-model:value="phoneValue"
              :placeholder="'+7 (___) ___-__-__'"
              :mask="phoneMask"
              :rule="validatePhone"
              :white="true"
            />
          </div>

          <p v-if="errorMessage" class="promo-banner__error">
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            :disabled="isSending"
            class="promo-banner__submit"
          >
            Отправить
          </button>
        </Form>
      </template>
    </div>

    <button
      type="button"
      class="promo-banner__arrow promo-banner__arrow_right"
      aria-label="Следующая акция"
      :disabled="!canNavigate"
      @click="$emit('next')"
    >
      <span />
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

type Promo = {
  id: number;
  title: string;
  body: string;
  button_text: string;
};

const props = defineProps<{
  promo: Promo;
  canNavigate: boolean;
}>();

const emit = defineEmits<{
  close: [];
  next: [];
  prev: [];
  "dirty-change": [isDirty: boolean];
}>();

const { validateName, validatePhone, phoneMask } = useValidate();
const { sendPromoLead } = useApi();

const nameValue = ref("");
const phoneValue = ref("");
const isFormOpen = ref(false);
const isSending = ref(false);
const isSuccess = ref(false);
const errorMessage = ref("");
const isDirty = computed(() => {
  return nameValue.value.trim().length > 0 || phoneValue.value.trim().length > 0;
});

function openForm() {
  isFormOpen.value = true;
}

function resetFormState() {
  nameValue.value = "";
  phoneValue.value = "";
  isFormOpen.value = false;
  isSending.value = false;
  isSuccess.value = false;
  errorMessage.value = "";
}

watch(isDirty, (value) => {
  emit("dirty-change", value);
});

watch(
  () => props.promo.id,
  () => {
    if (isSuccess.value) {
      resetFormState();
    }
  },
);

async function onSubmit(values: { name: string; phone: string }) {
  errorMessage.value = "";
  isSending.value = true;

  try {
    const response = await sendPromoLead(props.promo.id, values.name, values.phone);

    if (response?.status === "ok") {
      isSuccess.value = true;
      return;
    }

    errorMessage.value = response?.message || "Не удалось отправить заявку";
  } catch (error) {
    errorMessage.value = "Не удалось отправить заявку";
  } finally {
    isSending.value = false;
  }
}
</script>

<style scoped lang="less">
@import "assets/core.less";

.promo-banner {
  position: relative;
  width: min(100%, 1200px);
  min-height: 126px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 38px 36px 30px 51px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 292px;
  column-gap: 24px;
  align-items: center;
  border-radius: 12px;
  background: @LightGreyColor;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.16);

  @media @max760 {
    min-height: 0;
    padding: 46px 20px 20px;
    grid-template-columns: 1fr;
    row-gap: 20px;
  }
}

.promo-banner_form {
  min-height: 178px;

  @media @max760 {
    min-height: 0;
  }
}

.promo-banner_success {
  min-height: 126px;
}

.promo-banner__text {
  position: relative;
  z-index: 2;
  min-width: 0;
  padding-right: 24px;

  @media @max760 {
    padding-right: 0;
  }
}

.promo-banner__title {
  margin-bottom: 5px;
  color: @DarkGreyColor;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
}

.promo-banner__body {
  color: @DarkGreyColor;
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
}

.promo-banner__blue-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 462px;
  background: linear-gradient(90deg, #40b9f5 0%, #0c90ed 100%);
  pointer-events: none;

  &::before {
    content: "";
    position: absolute;
    top: -166px;
    left: -180px;
    width: 459px;
    height: 459px;
    border-radius: 50%;
    background: #40b9f5;
  }

  @media @max760 {
    width: auto;
    top: auto;
    left: 0;
    height: 124px;
  }
}

.promo-banner__blue-panel {
  position: relative;
  z-index: 2;
  width: 292px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 9px;

  @media @max760 {
    width: auto;
    min-height: 124px;
    margin: 0 -20px -20px;
    padding: 28px 20px 24px;
  }
}

.promo-banner__cta-title,
.promo-banner__cta-button,
.promo-banner__form,
.promo-banner__success {
  position: relative;
  z-index: 2;
}

.promo-banner__cta-title {
  color: @WhiteColor;
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
}

.promo-banner__cta-button {
  width: 292px;
  min-height: 31px;
  box-sizing: border-box;
  padding: 7px 17px;
  border: none;
  border-radius: 6px;
  background: @WhiteColor;
  color: @DarkGreyColor;
  font-size: 16px;
  font-weight: 400;
  line-height: 17px;
  cursor: pointer;

  @media @max760 {
    width: 100%;
  }
}

.promo-banner__form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.promo-banner__fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  @media @max760 {
    grid-template-columns: 1fr;
  }
}

.promo-banner__form :deep(.input-block) {
  gap: 3px;
}

.promo-banner__form :deep(.text_normal) {
  color: @WhiteColor;
  font-size: 12px;
  line-height: 14px;
}

.promo-banner__form :deep(.input) {
  color: @BlackColor;
  height: 34px;
  padding: 7px 10px;
  font-size: 14px;
  line-height: 18px;
}

.promo-banner__form :deep(.text_error) {
  margin-top: 2px;
  color: @WhiteColor;
  font-size: 12px;
  line-height: 14px;
}

.promo-banner__submit {
  min-height: 31px;
  padding: 7px 17px;
  border: none;
  border-radius: 6px;
  background: @WhiteColor;
  color: @DarkGreyColor;
  font-size: 16px;
  line-height: 17px;
  cursor: pointer;

  &:disabled {
    opacity: 0.72;
    cursor: default;
  }
}

.promo-banner__error {
  color: @WhiteColor;
  font-size: 12px;
  line-height: 14px;
}

.promo-banner__success {
  display: flex;
  align-items: center;
  gap: 12px;
}

.promo-banner__success-icon {
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  box-sizing: border-box;
  padding: 8px;
  border-radius: 50%;
  color: @WhiteColor;
  background: rgba(255, 255, 255, 0.24);
}

.promo-banner__close,
.promo-banner__arrow {
  position: absolute;
  z-index: 3;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.promo-banner__close {
  top: 11px;
  right: 12px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: @WhiteColor;

  span {
    position: absolute;
    top: 7px;
    left: 4px;
    width: 8px;
    height: 2px;
    border-radius: 2px;
    background: @BlueNewColor;
  }

  span:first-child {
    transform: rotate(45deg);
  }

  span:last-child {
    transform: rotate(-45deg);
  }
}

.promo-banner__arrow {
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 22px;

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }

  span {
    position: absolute;
    top: 5px;
    width: 9px;
    height: 9px;
    border-top: 1.5px solid @DarkGreyColor;
    border-left: 1.5px solid @DarkGreyColor;
  }
}

.promo-banner__arrow_left {
  left: 15px;

  span {
    left: 3px;
    transform: rotate(-45deg);
  }
}

.promo-banner__arrow_right {
  right: 15px;

  span {
    right: 3px;
    border-color: @WhiteColor;
    transform: rotate(135deg);
  }
}
</style>
