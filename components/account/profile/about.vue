<template>
  <div class="about">
    <div class="text text_large">О себе</div>

    <div class="about__image">
      <div class="text text_normal">Фотография профиля</div>

      <input
        ref="inputFile"
        id="file"
        type="file"
        style="display: none"
        accept="image/jpeg,image/png,application/pdf"
        @change="previewFiles"
      />

      <div v-if="profile.avatar === undefined || profile.avatar === null">
        <div
          ref="onDropZone"
          v-if="!$viewport.isLessThan('desktop')"
          @click="uploadFile"
          class="about__image__drop pointer"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 19.3782C21.6714 19.3782 23.2743 18.7142 24.4561 17.5324C25.6379 16.3506 26.3019 14.7477 26.3019 13.0763C26.3019 11.4049 25.6379 9.80202 24.4561 8.62019C23.2743 7.43836 21.6714 6.77441 20 6.77441C18.3286 6.77441 16.7257 7.43836 15.5439 8.62019C14.3621 9.80202 13.6981 11.4049 13.6981 13.0763C13.6981 14.7477 14.3621 16.3506 15.5439 17.5324C16.7257 18.7142 18.3286 19.3782 20 19.3782ZM20 22.1469C11.6213 22.1469 6.25 26.7707 6.25 29.0219V33.2257H33.75V29.0219C33.75 26.2994 28.665 22.1469 20 22.1469Z"
              fill="#B9BFC6"
            />
          </svg>
          <div class="text text_normalt">
            <span>Перетащите файл сюда или </span>
            <span class="text_accent pointer">загрузите с компьютера</span>
          </div>
        </div>

        <div v-else class="about__image__button pointer" @click="uploadFile">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 19.3782C21.6714 19.3782 23.2743 18.7142 24.4561 17.5324C25.6379 16.3506 26.3019 14.7477 26.3019 13.0763C26.3019 11.4049 25.6379 9.80202 24.4561 8.62019C23.2743 7.43836 21.6714 6.77441 20 6.77441C18.3286 6.77441 16.7257 7.43836 15.5439 8.62019C14.3621 9.80202 13.6981 11.4049 13.6981 13.0763C13.6981 14.7477 14.3621 16.3506 15.5439 17.5324C16.7257 18.7142 18.3286 19.3782 20 19.3782ZM20 22.1469C11.6213 22.1469 6.25 26.7707 6.25 29.0219V33.2257H33.75V29.0219C33.75 26.2994 28.665 22.1469 20 22.1469Z"
              fill="#B9BFC6"
            />
          </svg>
          <div class="text text_normal text_accent">Загрузить</div>
        </div>
      </div>

      <div
        v-else
        class="about__image__photo-wrap"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
      >
        <div v-if="hover" class="about__image__background pointer">
          <span
            @click="uploadFile"
            class="text about__image__background__text text_semi-bold"
            >Изменить</span
          >
        </div>
        <svg
          @click="deleteAva()"
          class="about__image__cross"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 18L6 6"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18 6L6 18"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <div class="about__image__photo">
          <img
            class="about__image__photo__img"
            :src="profile.avatar"
            alt="avatar"
          />
        </div>
      </div>
    </div>

    <Form class="about__edit-profile" @submit="onSubmit">
      <div class="about__edit-profile__row">
        <InputBlock
          :name="'lastName'"
          :title="'Фамилия'"
          :type="'text'"
          v-model:value="lastNameValue"
          :rule="validateName"
        />

        <InputBlock
          :name="'name'"
          :title="'Имя'"
          :type="'text'"
          v-model:value="nameValue"
          :rule="validateName"
        />

        <InputBlock
          :name="'sename'"
          :title="'Отчество'"
          :type="'text'"
          v-model:value="senameValue"
          :rule="validateName"
        />
      </div>

      <div class="about__edit-profile__row">
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
      </div>

      <div class="about__edit-profile__row">
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
          :name="'snils'"
          :title="'Снилс'"
          :type="'text'"
          v-model:value="snilsValue"
          :mask="snilsMask"
        />
      </div>

      <div class="about__edit-profile__row">
        <InputBlock
          class="long"
          :name="'postal_address'"
          :title="'Почтовый адрес'"
          :type="'text'"
          v-model:value="postalAddressValue"
          :rule="validateAddress"
        />
      </div>

      <div class="text text_error">{{ textError }}</div>
      <div v-if="success" class="text text_accent">
        Данные успешно отправлены
      </div>
      <button :disabled="disabled" class="button button_gradient button_170">
        Сохранить
      </button>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  profile: Object,
});

const emits = defineEmits(["updateProfile"]);

const { setInfo, deleteAvatar, setAvatar } = useApi();

const {
  validateEmail,
  validateName,
  validatePhone,
  phoneMask,
  snilsMask,
  passportMask,
  validateSnils,
  validatePassport,
  validateAddress,
} = useValidate();

const nameValue = ref(props?.profile.name);
const senameValue = ref(props?.profile.last_name);
const lastNameValue = ref(props?.profile.surname);
const phoneValue = ref(props?.profile.phone);
const mailValue = ref(props?.profile.email);
const snilsValue = ref(props?.profile.snils);
const pasportValue = ref(props?.profile.passport_number);
const postalAddressValue = ref(props?.profile.postal_address);
const textError = ref("");
const success = ref(false);
const disabled = ref(false);
const hover = ref(false);

async function onSubmit() {
  disabled.value = true;

  const profile = {
    name: nameValue.value,
    last_name: senameValue.value,
    surname: lastNameValue.value,
    phone: phoneValue.value,
    email: mailValue.value,
    passport_series: pasportValue.value,
    passport_number: pasportValue.value,
    snils: snilsValue.value,
    postal_address: postalAddressValue.value,
  };

  const data = await setInfo(profile);

  if (data === true) {
    success.value = true;
    textError.value = "";
  } else {
    textError.value = data;
  }

  disabled.value = false;
}

// Load and delete avatar
const inputFile = ref(null);
const load = ref(false);

async function deleteAva() {
  const data = await deleteAvatar();
  if (data) {
    emits("updateProfile");
  }
}

function uploadFile() {
  inputFile.value.click();
}

async function previewFiles(event) {
  load.value = true;

  let file = event.target.files[0];
  let reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async function () {
    let start = reader.result.toString().indexOf("base64,");
    const dataF = reader.result.slice(start + 7);
    const avatar = { avatar: { name: file.name, data: dataF } };
    const data = await setAvatar(avatar);

    if (data) {
      emits("updateProfile");
    }
    load.value = false;
  };
  reader.onerror = async function (error) {
    // console.log('Error: ', error);
    load.value = false;
  };
}
</script>

<style lang="less" scoped>
@import "assets/core";

.about {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.about__image__photo__img {
  width: 100%;
  height: 100%;
}

.about__image__cross {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
  cursor: pointer;
  stroke: @WhiteColor;

  &:hover {
    stroke: @BlueNewColor;
  }
}

.about__image__drop {
  width: 496px;
  height: 120px;

  margin-top: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border: 1px dashed @MidGreyColor;
}

.about__image__background {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  background: rgba(0, 0, 0, 0.5);
}

.about__image__background__text {
  color: @WhiteColor;

  &:hover {
    color: @BlueNewColor;
  }
}

.about__image__photo-wrap {
  position: relative;
  width: 120px;
  height: 120px;

  margin-top: 4px;

  box-sizing: border-box;
  padding: 5px;

  border: 1px dashed @MidGreyColor;
}

.about__image__photo {
  width: 100%;
  height: 100%;

  overflow: hidden;
  align-items: center;
  justify-content: center;
}

.about__image__button {
  box-sizing: border-box;
  width: 116px;
  height: 116px;

  margin-top: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: @LightGreyColor;
}

.about__edit-profile {
  display: flex;
  flex-direction: column;

  row-gap: 16px;
  column-gap: 24px;
}

.about__edit-profile__row {
  display: grid;
  column-gap: inherit;
  gap: inherit;

  grid-template-columns: 1fr;

  > .long {
    grid-column: span 1;
  }

  @media @min580 {
    > .long {
      grid-column: span 2;
    }

    grid-template-columns: 1fr 1fr;
  }

  @media @min760 {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
