<template>
  <div class="basket-card">
    <div class="basket-card__main">
      <div class="basket-card__img-container">
        <img
          v-if="course.banner_image"
          class="basket-card__img"
          :src="course.banner_image"
          alt="basket"
        />
        <img
          v-else
          class="basket-card__img"
          src="~/assets/basket.png"
          alt="basket"
        />
      </div>

      <div class="basket-card__content">
        <div class="basket-card__content__info">
          <div>
            <div class="text text_semi-bold">
              {{ course.title }}
            </div>
            <div class="text text_normal text_light">
              Артикул: {{ course.id }}
            </div>
          </div>

          <svg
            @click="emits('deleteCourse')"
            class="pointer"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 18L6 6"
              stroke="#25292D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 6L6 18"
              stroke="#25292D"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div class="basket-card__content__price">
          <SeeMore class="basket__link" :href="'/courses/' + course.id" />
          <div v-if="course.price_sale">
            <span class="text text_h4">{{ course.price_sale }} ₽</span>
            <span
              class="text text_semi-bold text_light text_margin text_through"
              >{{ course.price }} ₽</span
            >
          </div>

          <div v-else>
            <span class="text text_h4">{{ course.price }} ₽</span>
          </div>
        </div>
      </div>
    </div>

    <div class="delimiter delimiter_mid-grey" />

    <div class="basket-card__promo">
      <DropDown
        class="basket__drop-down"
        :title="'Месяц обучения'"
        :options="MONTHS"
        @update:selected="onMonthSelect"
        ref="dropdownElement"
      />

      <input
        class="input text text_normal input_white input_disabled"
        placeholder="Промокод"
        type="text"
        readonly
        v-model="promocode"
      />

      <button
        class="button button_black-bordered text_normal"
        :class="{ button_disabled: promocode == '' || course.promo != null }"
        @click="activatePromo"
      >
        Активировать
      </button>
    </div>
  </div>
</template>

<script setup>
import { toValue } from "vue";

const props = defineProps({
  course: {
    type: Object,
    require: true,
  },
});

const { checkPromocode } = useApi();

const emits = defineEmits(["deleteCourse", "setPromo", "activatePromo"]);

const basket = useState("basket");

const promocode = ref("");

const promoObject = ref({});

const dropdownElement = ref(null);

const MONTHS = [
  { id: "0", title: "Январь" },
  { id: "1", title: "Февраль" },
  { id: "2", title: "Март" },
  { id: "3", title: "Апрель" },
  { id: "4", title: "Май" },
  { id: "5", title: "Июнь" },
  { id: "6", title: "Июль" },
  { id: "7", title: "Август" },
  { id: "8", title: "Сентябрь" },
  { id: "9", title: "Октябрь" },
  { id: "10", title: "Ноябрь" },
  { id: "11", title: "Декабрь" },
];

onMounted(() => {
  if (props.course) {
    console.log(props.course.promo);

    if (props.course.promo != null) {
      promoObject.value = props.course.promoObject;

      console.log(promoObject.value);

      let month = MONTHS.find(
        (month) => month.title === promoObject.value.month
      );

      console.log(month);

      console.log(dropdownElement);

      dropdownElement.value.setOption(month);
      promocode.value = promoObject.value.code;
    }
  }
});

async function onMonthSelect(month) {
  if (month.id === undefined) {
    promocode.value = "";
  } else {
    const { data, status } = await checkPromocode(month.id);
    if (data.value.promo != null) {
      promoObject.value = data.value.promo;
      promocode.value = promoObject.value.code;
    } else {
      promocode.value = "";
    }
  }

  emits("setPromo", null, 0);
}

function activatePromo() {
  emits("activatePromo", promoObject.value);
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.text_margin {
  margin-left: 10px;
}

.basket__link {
  color: @BlueNewColor;
  stroke: @BlueNewColor;
  margin: 0;
}

.basket__drop-down {
  background: @WhiteColor;
}

.drop-down__box {
  background: none;
}

.basket-card {
  box-sizing: border-box;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  background: @LightGreyColor;
  border-radius: 8px;
}

.basket-card__main {
  display: flex;
  gap: 12px;
}

.basket-card__promo {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;

  @media @min580 {
    display: grid;
    grid-template-columns: 1fr 1fr 140px;
  }
}

.basket-card__img {
  height: 100%;
  width: auto;
  flex-shrink: 0;
}

.basket-card__img-container {
  display: none;
  width: 120px;
  height: 120px;
  overflow: hidden;

  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  border-radius: 4px;

  @media @min580 {
    display: flex;
  }
}

.basket-card__content {
  display: flex;
  flex-direction: column;
  flex: 1;

  justify-content: space-between;
}

.basket-card__content__info {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.basket-card__content__price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;

  @media @min580 {
    align-items: flex-end;
    flex-direction: row;
  }
}
</style>
