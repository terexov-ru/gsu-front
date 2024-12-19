<template>
  <Form class="bill-form" @submit="onSubmit">
    <div v-show="fieldsToFill.length > 0" class="basket__bill">
      <div class="text text_large">Данные получателя</div>

      <InputBlock
        v-if="fieldsToFill.includes('lastName')"
        :name="'lastName'"
        :title="'Фамилия'"
        :type="'text'"
        :white="true"
        v-model:value="lastNameValue"
        :rule="validateName"
      />

      <InputBlock
        v-if="fieldsToFill.includes('name')"
        :name="'name'"
        :title="'Имя'"
        :type="'text'"
        :white="true"
        v-model:value="nameValue"
        :rule="validateName"
      />

      <InputBlock
        v-if="fieldsToFill.includes('sename')"
        :name="'sename'"
        :title="'Отчество'"
        :type="'text'"
        :white="true"
        v-model:value="senameValue"
        :rule="validateName"
      />

      <InputBlock
        v-if="fieldsToFill.includes('phone')"
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
        v-if="fieldsToFill.includes('email')"
        :name="'email'"
        :title="'E-mail'"
        :type="'text'"
        v-model:value="mailValue"
        :placeholder="'Почта'"
        :rule="validateEmail"
        :white="true"
      />

      <InputBlock
        v-if="fieldsToFill.includes('postalAddress')"
        :name="'postalAddress'"
        :title="'Почтовый адрес'"
        :type="'text'"
        v-model:value="postalAddressValue"
        :placeholder="'Адрес'"
        :rule="validateAddress"
        :white="true"
      />
    </div>

    <div class="bill__button column column_gap8">
      <button
        :disabled="disabled"
        class="button bill__button button_gradient button_size button_fill"
        :class="{ disabled: disabled }"
      >
        {{ disabled ? "Записываем..." : "Записаться на курс" }}
      </button>
      <div class="text text_normal text_error text_center">
        {{ basketError }}
      </div>
    </div>
  </Form>
</template>

<script setup>
import { ref } from "vue";

const {
  validateEmail,
  validateName,
  validatePhone,
  phoneMask,
  validateAddress,
} = useValidate();
const { createOrder, getUserLazy, createOrderAuth, setInfo } = useApi();
const { setTokenCookie } = useUtils();
const basket = useState("basket");
const url = useRequestURL();

const emit = defineEmits(["success"]);

const nameValue = ref("");
const senameValue = ref("");
const lastNameValue = ref("");
const postalAddressValue = ref("");

const phoneValue = ref("");
const mailValue = ref("");
const basketError = ref("");
const disabled = ref(false);
const { cleanBasket, getTokenCookie } = useUtils();

const isAuthed = getTokenCookie() !== undefined && getTokenCookie() !== null;

const fieldsToFill = ref(
  isAuthed
    ? []
    : ["name", "sename", "lastName", "phone", "email", "postalAddress"],
);

watch(() => {
  console.log(fieldsToFill.value);
});

if (isAuthed) {
  const { data } = await getUserLazy();

  watch(data, () => {
    const profile = data.value.profile;

    mailValue.value = profile.email;
    phoneValue.value = profile.phone;
    nameValue.value = profile.name;
    senameValue.value = profile.surname;
    lastNameValue.value = profile.last_name;
    postalAddressValue.value = profile.postal_address;

    resetFieldsToFill();
  });
}

async function onSubmit(values, actions) {
  if (basket.value.length > 0) {
    basketError.value = "";
    disabled.value = true;

    useState("orderMail", () => shallowRef(mailValue.value));

    if (isAuthed) {
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
    values.postalAddress,
    orderBasket,
  );

  if (status.value === "success" && shallowRef(data.value.status === "ok")) {
    setTokenCookie(data.value.token);
    useState("orderLink").value = data.value.payment_link;
    useState("orderNumber").value = data.value.iorder_id;
    await nextTick();
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

  if (fieldsToFill.value.length > 0)
    await setInfo({
      name: nameValue.value,
      last_name: senameValue.value,
      surname: lastNameValue.value,
      phone: phoneValue.value,
      email: mailValue.value,
      postal_address: postalAddressValue.value,
    });

  const { data, status } = await createOrderAuth(orderBasket);

  if (status.value === "success" && data.value.status === "ok") {
    setTokenCookie(data.value.token);
    useState("orderLink").value = data.value.payment_link;
    useState("orderNumber").value = data.value.iorder_id;
    await nextTick();
    emit("success");
    await nextTick();
    actions.resetForm();
    cleanBasket();
  } else {
    basketError.value = "Произошла ошибка";
  }
}

function resetFieldsToFill() {
  if (!nameValue.value) fieldsToFill.value.push("name");
  if (!senameValue.value) fieldsToFill.value.push("sename");
  if (!lastNameValue.value) fieldsToFill.value.push("lastName");
  if (!phoneValue.value) fieldsToFill.value.push("phone");
  if (!mailValue.value) fieldsToFill.value.push("mail");
  if (!postalAddressValue.value) fieldsToFill.value.push("postalAddress");

  fieldsToFill.value = [...new Set(fieldsToFill.value)];
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
