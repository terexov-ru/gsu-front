<template>
  <div class="order-card" v-if="order !== undefined">
    <div class="row order-card__head row_jc-sb">
      <div class="column">
        <div class="text text_semi-bold">Заказ {{ order.number }}</div>
        <div class="text text_normal text_light">от {{ order.date }}</div>
      </div>
      <div class="tip tip_small" :class="getTipClass(order.status.id)">
        {{ order.status.title }}
      </div>
    </div>

    <div @click="active = !active" class="column column_gap12 pointer">
      <div class="row row_jc-sb">
        <div class="text text_semi-bold text_light">
          {{ order.courses.length }} программы
        </div>
        <div class="row row_gap10">
          <span class="text text_h4">{{ order.sum }} ₽</span>

          <svg
            class="svg"
            :class="{ svg_rotate: active }"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 9.19727L12 14.1973L17 9.19727"
              stroke="#25292D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <div class="delimiter delimiter_mid-grey" />
    </div>

    <div class="column column_gap16">
      <div
        :class="{ 'order-card__list_active': active }"
        class="order-card__list column column_gap16"
      >
        <div v-for="course in order.courses" class="row row_jc-sb">
          <div class="column column_gap8">
            <div class="text text_normal">{{ course.title }}</div>
            <div class="text text_normal text_light">
              Артикул: {{ course.articul }}
            </div>
          </div>
          <div class="text text_semi-bold" style="flex-shrink: 0">
            {{ course.price }} ₽
          </div>
        </div>

        <div class="row row_jc-sb">
          <div class="text text_normal">Скидка</div>
          <div class="text text_semi-bold">{{ order.sale_sum }} ₽</div>
        </div>
      </div>

      <div class="row order__buttons row_gap10">
        <NuxtLink v-if="order.agreement" :to="order.agreement" target="_blank">
          <button class="button order__button button_gradient">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 12L12 17M12 17L17 12M12 17L12 4"
                stroke="#F7F7F8"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 20H18"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>Скачать договор</span>
          </button>
        </NuxtLink>

        <div v-else class="row order__buttons row_gap10">
          <NuxtLink
            v-if="!isOrderPaid"
            :to="order.payment_link"
            target="_blank"
            :class="{ disabled: isLoading }"
          >
            <button class="button order__button button_gradient">
              Оплатить
            </button>
          </NuxtLink>
          <!--          <NuxtLink-->
          <!--            :class="{ disabled: isLoading }"-->
          <!--            :to="{ path: '/account', query: { tab: 'AccountPrograms' } }"-->
          <!--          >-->
          <!--            <button class="button order__button button_gradient">-->
          <!--              Перейти к курсу-->
          <!--            </button>-->
          <!--          </NuxtLink>-->
          <button
            @click="checkAgreement"
            class="button order__button button_black-bordered"
            :class="{ disabled: isLoading }"
          >
            {{ isLoading ? "Подписание..." : "Подписать договор" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
  profile: Object,
  showDetails: Boolean,
});

const emits = defineEmits(["openProfilePopup"]);

const { createAgreement } = useApi();

const active = ref(props.showDetails);
const isLoading = ref(false);

const isOrderPaid = computed(() => {
  if (props.order.status.id === 5) return true;
  else return false;
});

function getTipClass(id) {
  if (id < 2) return "tip_active";
  else if (id === 3) return "tip_accent";
  else if (id === 4) return "tip_danger";
  else return "tip_dark-fill";
}

function checkAgreement() {
  const requiredFields = [
    "name",
    "last_name",
    "surname",
    "email",
    "passport_number",
    "phone",
    "postal_address",
  ];

  const isAnyFieldEmpty = requiredFields.some((field) => !props.profile[field]);

  if (isAnyFieldEmpty) {
    emits("openProfilePopup");
  } else signAgreement();
}

async function signAgreement() {
  if (isLoading.value == true) return;

  isLoading.value = true;

  const { data, status } = await createAgreement(props.order.number);

  console.log(data);

  if (data.value.link) {
    await navigateTo(data.value.link, {
      open: {
        target: "_blank",
      },
      external: true,
    });
    isLoading.value = false;
  } else {
    isLoading.value = false;
  }
}
</script>

<style lang="less" scoped>
@import "assets/core";

.disabled {
  pointer-events: none;

  opacity: 0.8;
}

.order-card {
  box-sizing: border-box;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 32px;

  background: @LightGreyColor;
  border-radius: 8px;
}

.order-card__head {
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;

  @media @min580 {
    flex-direction: row;
  }
}

.order__buttons {
  display: flex;
  flex-direction: column;

  @media @min580 {
    flex-direction: row;
    align-self: flex-end;
  }
}

.order__button {
  width: 100%;
  min-width: 170px;
  padding: 10px 16px 10px 12px;

  @media @min580 {
    width: auto;
  }
}

.order-status {
  margin-top: 20px;
}

.order-card__list {
  max-height: 2px;
  transition:
    opacity 0.5s,
    max-height 0.5s cubic-bezier(0, 1, 0, 1);
  overflow: hidden;
  opacity: 0;
}

.order-card__list_active {
  max-height: 1200px;
  transition: 0.5s;
  opacity: 1;
}

.svg {
  transition: @dur150;
}

.svg_rotate {
  transform: rotate(-180deg);
  transition: @dur150;
}
</style>
