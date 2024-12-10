<template>
  <Overflow class="order-overflow">
    <img
      class="close"
      @click="emits('close')"
      src="~/assets/svg/close.svg"
      alt="close"
    />

    <div class="overflow__content">
      <template v-if="!dataForm">
        <svg
          width="108"
          height="108"
          viewBox="0 0 108 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_3167_35844)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M54 94C76.0914 94 94 76.0914 94 54C94 31.9086 76.0914 14 54 14C31.9086 14 14 31.9086 14 54C14 76.0914 31.9086 94 54 94ZM54 89.8333C73.7902 89.8333 89.8333 73.7902 89.8333 54C89.8333 34.2098 73.7902 18.1667 54 18.1667C34.2098 18.1667 18.1667 34.2098 18.1667 54C18.1667 73.7902 34.2098 89.8333 54 89.8333Z"
              fill="#129DF4"
            />
          </g>
          <path
            d="M38.166 53.1667L49.8327 64.8333L70.666 44"
            stroke="#129DF4"
            stroke-width="5"
            stroke-linecap="round"
          />
          <defs>
            <filter
              id="filter0_d_3167_35844"
              x="0.25"
              y="0.25"
              width="107.5"
              height="107.5"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="6.875" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.223529 0 0 0 0 0.701961 0 0 0 0 0.956863 0 0 0 0.96 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_3167_35844"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_3167_35844"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <div class="column column_gap16">
          <div class="text text_h3 text_center">Ваш заказ успешно создан!</div>
          <div class="text text_normal text_center">
            Информация о заказе выслана вам на почту <b>{{ mail }}</b
            >. Наш менеджер свяжется с вами в ближайшее время для уточнения
            данных.
          </div>
        </div>

        <div class="order-overflow__buttons">
          <button
            @click="checkAgreement"
            class="button button_black-bordered"
            :class="{ disabled: isLoading }"
          >
            {{ isLoading ? "Подписание..." : "Подписать договор" }}
          </button>
          <NuxtLink :to="payLink" target="_blank" style="width: 100%">
            <button class="button button_dark">
              Оплатить заказ ({{ sum }} ₽)
            </button>
          </NuxtLink>
        </div>
      </template>
      <template v-else>
        <Form>
          <div class="column column_gap16">
            <div class="text text_h3 text_center">
              Для подписания договора заполните данные!
            </div>
            <InputBlock
              :name="'lastName'"
              :title="'Фамилия'"
              :placeholder="''"
              :type="'text'"
              v-model:value="lastNameValue"
              :rule="validateName"
            />

            <InputBlock
              :name="'name'"
              :title="'Имя'"
              :type="'text'"
              :placeholder="''"
              v-model:value="nameValue"
              :rule="validateName"
            />

            <InputBlock
              :name="'sename'"
              :title="'Отчество'"
              :type="'text'"
              :placeholder="''"
              v-model:value="senameValue"
              :rule="validateName"
            />

            <InputBlock
              :name="'phone'"
              :title="'Телефон'"
              :type="'text'"
              v-model:value="phoneValue"
              :placeholder="'+7 (___)___-__-__'"
              :mask="phoneMask"
              :rule="validatePhone"
            />

            <InputBlock
              :name="'email'"
              :title="'E-mail'"
              :type="'text'"
              v-model:value="mailValue"
              :placeholder="'Почта'"
              :rule="validateEmail"
            />

            <InputBlock
              :name="'pasport'"
              :title="'Серия и номер паспорта'"
              :type="'text'"
              v-model:value="pasportValue"
              :placeholder="'00 00 000000'"
              :mask="passportMask"
              :rule="validatePassport"
            />

            <InputBlock
              class="long"
              :name="'postal_address'"
              :title="'Почтовый адрес'"
              :type="'text'"
              v-model:value="postalAddressValue"
              :rule="validateAddress"
            />

            <div class="text text_error">{{ textError }}</div>

            <div class="order-overflow__buttons">
              <button
                :disabled="disabled"
                type="button"
                @click="onProfileSubmit"
                class="button button_dark"
                :class="{ disabled: disabled }"
              >
                {{ disabled ? "Подписание..." : "Подписать договор" }}
              </button>
              <button
                type="button"
                @click="dataForm = false"
                class="button button_black-bordered"
              >
                Назад
              </button>
            </div>
          </div>
        </Form>
      </template>
    </div>
  </Overflow>
</template>

<script setup>
const { setInfo, getUser, createAgreement } = useApi();
const {
  validateEmail,
  validateName,
  validatePhone,
  phoneMask,
  passportMask,
  validatePassport,
  validateAddress,
} = useValidate();

const emits = defineEmits(["close", "toAuth"]);

const sum = useState("orderSum");
// const mail = useState("orderMail");
const mail = ref("");

const nameValue = ref("");
const senameValue = ref("");
const lastNameValue = ref("");
const phoneValue = ref("");
const mailValue = ref("");
const pasportValue = ref("");
const postalAddressValue = ref("");

const textError = ref("");
const success = ref(false);

const isLoading = ref(false);
const dataForm = ref(false);
const disabled = ref(false);

const payLink = computed(() => useState("orderLink").value);
const orderNumber = computed(() => useState("orderNumber").value);

var profileData;

async function getUserInfo() {
  profileData = await getUser();
  console.log(profileData.profile);

  nameValue.value = profileData.profile.name;
  senameValue.value = profileData.profile.last_name;
  lastNameValue.value = profileData.profile.surname;
  phoneValue.value = profileData.profile.phone;
  mailValue.value = profileData.profile.email;
  pasportValue.value = profileData.profile.passport_number;
  postalAddressValue.value = profileData.profile.postal_address;

  mail.value = profileData.profile.email;
}

getUserInfo();

async function onProfileSubmit() {
  disabled.value = true;

  const profile = {
    name: nameValue.value,
    last_name: senameValue.value,
    surname: lastNameValue.value,
    phone: phoneValue.value,
    email: mailValue.value,
    passport_series: pasportValue.value,
    passport_number: pasportValue.value,
    postal_address: postalAddressValue.value,
  };

  const data = await setInfo(profile);

  if (data) {
    signAgreement();
    success.value = true;
    textError.value = "";
  } else {
    textError.value = data;
  }

  disabled.value = false;
}

function checkAgreementData() {
  if (!profileData?.profile) return false;

  const requiredFields = [
    "name",
    "last_name",
    "surname",
    "email",
    "passport_number",
    "phone",
    "postal_address",
  ];

  const isAnyFieldEmpty = requiredFields.some(
    (field) => !profileData.profile[field],
  );

  return !isAnyFieldEmpty;
}

function checkAgreement() {
  if (checkAgreementData()) {
    signAgreement();
  } else {
    dataForm.value = true;
  }
}

async function signAgreement() {
  console.log("ordr " + orderNumber.value);

  if (!orderNumber.value) return;
  if (isLoading.value == true) return;

  isLoading.value = true;

  const { data, status } = await createAgreement(orderNumber.value);

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

  dataForm.value = false;
}
</script>

<style scoped lang="less">
@import "assets/core.less";

.order-overflow {
  width: 100%;

  @media @min1200 {
    width: 1000px;
  }
}

.order-overflow__buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  @media @min760 {
    flex-direction: row;
    max-width: 620px;
  }
}

.overflow__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>
