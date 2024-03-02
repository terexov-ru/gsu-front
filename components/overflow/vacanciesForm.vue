<template>
  <OverflowSuccess
      v-if="success"
      @close="emits('close'); success = false;"
  />

  <Overflow v-else>
    <img class="close"
         @click="emits('close')"
         src="~/assets/svg/close.svg"
         alt="close"
    >

    <div class="text title text_h3">
      {{ vacancy.title }}
    </div>

    <div class="overflow__content">
      <Form class="form" @submit="onSubmit">

        <InputBlock
            :name="'name'"
            :title="'ФИО'"
            :type="'text'"
            v-model:value="nameValue"
            :placeholder="'Иванов Иван Иванович'"
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
        />

        <div class="button document__add button_dark" @click="uploadFile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21 10.9696L12.9628 18.5497C11.9782 19.4783 10.6427 20 9.25028 20C7.85782 20 6.52239 19.4783 5.53777 18.5497C4.55315 17.6211 4 16.3616 4 15.0483C4 13.7351 4.55315 12.4756 5.53777 11.547L13.575 3.96687C14.2314 3.34779 15.1217 3 16.05 3C16.9783 3 17.8686 3.34779 18.525 3.96687C19.1814 4.58595 19.5502 5.4256 19.5502 6.30111C19.5502 7.17662 19.1814 8.01628 18.525 8.63535L10.479 16.2154C10.1508 16.525 9.70569 16.6989 9.24154 16.6989C8.77738 16.6989 8.33224 16.525 8.00403 16.2154C7.67583 15.9059 7.49144 15.4861 7.49144 15.0483C7.49144 14.6106 7.67583 14.1907 8.00403 13.8812L15.429 6.88674"
                stroke="#F7F7F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="text text_normal">
            <span v-if="fileName">{{ fileName }}</span>
            <span v-else>Прикрепить резюме</span>
          </div>
          <input
              ref="inputFile"
              id="file" type="file"
              style="display: none;"
              accept="image/jpeg,image/png,application/pdf"
              @change="previewFiles"
          >
        </div>

        <div class="text text_normal text_error text_center">{{ fileError }}</div>


        <div>
          <div class="text text_normal text_center text_light">Оставляя данные в этой форме Вы даете</div>
          <NuxtLink to="/policy.pdf" target="_blank">
            <p class="text_accent">Согласие на обработку персональных данных</p>
          </NuxtLink>
        </div>

        <button
            :disabled="disabled"
            class="button button_gradient button_fill"
        >
          Отправить
        </button>
      </Form>
    </div>
  </Overflow>
</template>

<script setup>
import {ref} from "vue";

const {validateName, validatePhone, phoneMask} = useValidate();
const {sendFormVacancies} = useApi();
const emits = defineEmits(['close']);

const props = defineProps({
  vacancy: Object
})

const nameValue = ref('');
const phoneValue = ref('');
const fileError = ref('');

const success = ref(false);
const disabled = ref(false);
const url = useRequestURL();

async function onSubmit(values) {
  disabled.value = true;

  if (file.value !== null) {
    fileError.value = '';
    const {data, status} = await sendFormVacancies(values.name, values.phone, props?.vacancy.title, url.href, file.value);
    if (status.value === 'success' && data.value.status === 'ok') {
      success.value = true;
    }
  } else {
    fileError.value = 'Загрузите резюме'
  }

  disabled.value = false;
}

// Load file
const fileName = ref('');
const inputFile = ref(null);
const load = ref(false);
const file = ref(null);

function uploadFile() {
  inputFile.value.click();
}

async function previewFiles(event) {
  load.value = true;
  fileName.value = event.target.files[0].name;

  let fileData = event.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(fileData);

  reader.onload = async function () {
    let start = reader.result.toString().indexOf("base64,");
    file.value = {name: fileName.value, data: reader.result.slice(start + 7)};
    load.value = false;
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
    load.value = false;
  };
}
</script>

<style lang="less" scoped>
@import "/assets/core.less";

//.overflow {
//  width: 100%;
//  height: auto;
//
//  box-sizing: border-box;
//  padding: 20px;
//  position: relative;
//  overflow: hidden;
//
//  display: flex;
//  flex-direction: column;
//
//  border-radius: 12px;
//  border: 1px solid @MidGreyColor;
//  background: @WhiteColor;
//
//  min-width: 60vw;
//
//  @media @min760 {
//    padding: 40px 22px 40px 40px;
//  }
//}

.wrapper {
  width: 100%;
}

.title {
  margin-bottom: 40px;
}

//.overflow__content {
//  display: flex;
//  flex-direction: column;
//  gap: 32px;
//
//  max-width: 1200px;
//  max-height: 70vh;
//  overflow: auto;
//
//  @media @min760 {
//    gap: 40px;
//  }
//}

.overflow__content__h4 {
  margin-bottom: 12px;

  @media @min760 {
    margin-bottom: 20px;
  }
}

.overflow__button {
  width: 100%;
  margin-top: 20px;
  align-self: flex-end;

  @media @min580 {
    width: initial;
  }
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: @BluButtonGradient;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #FFFFFF;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
