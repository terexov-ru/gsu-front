<template>
  <Form class="bill-form" @submit="onSubmit">
    <div
      v-show="getTokenCookie() === undefined || getTokenCookie() === null"
      class="basket__bill"
    >
      <div class="text text_large">Данные получателя</div>

      <InputBlock
        :name="'lastName'"
        :title="'Фамилия'"
        :type="'text'"
        :white="true"
        v-model:value="lastNameValue"
        :rule="validateName"
      />

      <InputBlock
        :name="'name'"
        :title="'Имя'"
        :type="'text'"
        :white="true"
        v-model:value="nameValue"
        :rule="validateName"
      />

      <InputBlock
        :name="'sename'"
        :title="'Отчество'"
        :type="'text'"
        :white="true"
        v-model:value="senameValue"
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
        class="button bill__button button_gradient button_size button_fill"
      >
        Записаться на курс
      </button>
      <div class="text text_normal text_error text_center">
        {{ basketError }}
      </div>
    </div>
  </Form>
</template>

<script setup>
import { ref } from "vue";

const { validateEmail, validateName, validatePhone, phoneMask } = useValidate();
const { createOrder, getUserLazy, createOrderAuth } = useApi();
const basket = useState("basket");
const url = useRequestURL();

const emit = defineEmits(["success"]);

const nameValue = ref("");
const senameValue = ref("");
const lastNameValue = ref("");

const phoneValue = ref("");
const mailValue = ref("");
const basketError = ref("");
const disabled = ref(false);
const { cleanBasket, getTokenCookie, getBasket } = useUtils();

if (getTokenCookie() !== undefined && getTokenCookie() !== null) {
  const { data } = await getUserLazy();

  watch(data, () => {
    const profile = data.value.profile;
    mailValue.value = profile.email;
    phoneValue.value = profile.phone;

    nameValue.value = profile.name;
    senameValue.value = profile.surname;
    lastNameValue.value = profile.last_name;
  });
}

async function onSubmit(values, actions) {
  if (basket.value.length > 0) {
    basketError.value = "";
    disabled.value = true;

    useState("orderMail", () => shallowRef(mailValue.value));

    if (getTokenCookie() !== undefined && getTokenCookie() !== null) {
      await getOrderAuth(values, actions);
    } else {
      await getOrderBase(values, actions);
    }

    disabled.value = false;
  } else {
    basketError.value = "Вы не можете отправить заявку, пока корзина пуста";
  }
}

async function getOrderBase(values, actions) {
  const orderBasket = basket.value.map((item) => ({
    id: item.id,
    promo: item.promo !== undefined ? item.promo : null,
  }));

  const { data, status, error } = await createOrder(
    values.name,
    values.lastName,
    values.sename,
    values.email,
    values.phone,
    orderBasket
  );

  if (status.value === "success" && shallowRef(data.value.status === "ok")) {
    useState("orderLink", () => data.value.payment_link);
    emit("success");
    await nextTick();
    actions.resetForm();
    cleanBasket();
  } else {
    if (
      error.value.data.message.includes("phone") &&
      error.value.data.message.includes("mail")
    ) {
      basketError.value = "Телефон и email уже используются";
    } else if (error.value.data.message.includes("phone")) {
      basketError.value = "Телефон уже используется";
    } else if (error.value.data.message.includes("mail")) {
      basketError.value = "Почта уже используется";
    } else {
      basketError.value = "Произошла ошибка";
    }
  }
}

async function getOrderAuth(values, actions) {
  const orderBasket = basket.value.map((item) => ({
    id: item.id,
    promo: item.promo !== undefined ? item.promo : null,
  }));

  const { data, status } = await createOrderAuth(orderBasket);

  if (status.value === "success" && data.value.status === "ok") {
    useState("orderLink").value = data.value.payment_link;
    await nextTick();
    emit("success");
    await nextTick();
    actions.resetForm();
    cleanBasket();
  } else {
    basketError.value = "Произошла ошибка";
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
    width: 360px;
  }

  @media @min760 {
    width: 440px;
  }

  @media @min1200 {
    width: 100%;
  }
}
</style>
