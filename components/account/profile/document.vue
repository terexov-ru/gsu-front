<template>
  <div class="document">
    <div class="text text_large">Документы об образовании</div>

    <div class="document__info">
      <div class="row row_al-c row_gap10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              stroke="#129DF4" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
              stroke-linejoin="round"/>
          <path
              d="M13.5 17.0996C13.5 17.928 12.8284 18.5996 12 18.5996C11.1716 18.5996 10.5 17.928 10.5 17.0996C10.5 16.2712 11.1716 15.5996 12 15.5996C12.8284 15.5996 13.5 16.2712 13.5 17.0996Z"
              fill="#129DF4"/>
          <path d="M12 13.1992L12 6.59922" stroke="#129DF4" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
        <div class="text text_caption text_accent">Внимание</div>
      </div>

      <div class="text document__info__text text_normal">
        Все данные необходимо заполнить в соответствии с документом об образовании. Данные об образовании необходимы для
        ФИС “ФРДО”
      </div>

    </div>

    <div>
      <div class="text text_normal">
        Необходимо загрузить следующие документы: диплом об профессиональном образовании, при проходжении переподготовки
        сертификаты по специальности
      </div>

      <div class="document__load row row_gap10 mt-20">

        <button class="button document__add button_dark" @click="uploadFile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21 10.9696L12.9628 18.5497C11.9782 19.4783 10.6427 20 9.25028 20C7.85782 20 6.52239 19.4783 5.53777 18.5497C4.55315 17.6211 4 16.3616 4 15.0483C4 13.7351 4.55315 12.4756 5.53777 11.547L13.575 3.96687C14.2314 3.34779 15.1217 3 16.05 3C16.9783 3 17.8686 3.34779 18.525 3.96687C19.1814 4.58595 19.5502 5.4256 19.5502 6.30111C19.5502 7.17662 19.1814 8.01628 18.525 8.63535L10.479 16.2154C10.1508 16.525 9.70569 16.6989 9.24154 16.6989C8.77738 16.6989 8.33224 16.525 8.00403 16.2154C7.67583 15.9059 7.49144 15.4861 7.49144 15.0483C7.49144 14.6106 7.67583 14.1907 8.00403 13.8812L15.429 6.88674"
                stroke="#F7F7F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="text text_normal">
            <span v-if="load">{{ fileName }}</span>
            <span v-else>Прикрепить документ об образовании</span>
          </div>
          <input
              ref="inputFile"
              id="file" type="file"
              style="display: none;"
              accept="image/jpeg,image/png,application/pdf"
              @change="previewFiles"
          >
        </button>
        <div class="column row_jc-sb row_al-c">
          <div class="text text_normal text_light">{{ documents.length }} / 10</div>
          <div class="text text_normal text_light">PNG, JPEG, PDF</div>
        </div>
      </div>

      <div class="document__list mt-20">

        <div
            v-for="doc in documents"
            :key="doc.id"
            class="document__list__item"
        >

          <NuxtLink :to="doc.file.link" target="_blank">
            <div class="row row_gap10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7 21C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21H7Z"
                    stroke="#14181F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13 3V9H19" stroke="#14181F" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
              <div class="text text_normal">{{ doc.file.name }}</div>
            </div>
          </NuxtLink>

          <svg
              @click="delFile(doc.id)"
              class="pointer"
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 18L6 6" stroke="#14181F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18 6L6 18" stroke="#14181F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

      </div>

      <button
          @click="save()"
          class="button document__save button_gradient button_170"
      >Сохранить
      </button>
    </div>

  </div>
</template>

<script setup>
import {ref} from "vue";

const {sendFile, deleteFile, saveFiles} = useApi();

const fileName = ref('');
const inputFile = ref(null);
const load = ref(false);

const delFiles = [];
const addedFiles = [];

const props = defineProps({
  documents: {
    type: Array,
    required: true
  }
})

const emits = defineEmits(['updateDocs']);

function uploadFile() {
  inputFile.value.click();
}

async function previewFiles(event) {
  load.value = true;

  fileName.value = event.target.files[0].name;

  let file = event.target.files[0];
  let reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = async function () {
    let start = reader.result.toString().indexOf("base64,");
    const dataF = reader.result.slice(start + 7);

    addedFiles.push({name: fileName.value, data: dataF})
    const data = await sendFile(fileName.value, dataF);

    if (data.status === 'ok') {
      emits('updateDocs');
    }
    load.value = false;
  };
  reader.onerror = function (error) {
    // console.log('Error: ', error);
    load.value = false;
  };
}

async function delFile(id) {
  delFiles.push({id: id});
  const data = await deleteFile(id);
  emits('updateDocs');
  // console.log(data);
}

// async function save() {
//   console.log(addedFiles);
//   console.log(delFiles);
//
//   const data = await saveFiles(addedFiles, delFiles);
//   console.log(data);
// }

</script>

<style lang="less" scoped>
@import "assets/core";


.document {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.document__info {
  width: auto;
  max-width: 600px;

  box-sizing: border-box;
  padding: 12px;
  border-radius: 8px;

  background: @LightGreyColor;
}

.document__info__text {
  margin-top: 16px;
}

.document__add {
  width: 100%;
  gap: 8px;
  padding: 10px 16px 10px 12px;

  @media @min580 {
    max-width: 363px;
  }
}

.document__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.document__list__item {
  width: auto;
  max-width: 600px;

  display: flex;
  justify-content: space-between;

  box-sizing: border-box;
  padding: 8px;
  border-radius: 4px;

  background: @LightGreyColor;
}

.document__load {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;

  @media @min580 {
    flex-direction: row;
  }
}

.document__save {
  margin-top: 32px;
}

.mt-20 {
  margin-top: 20px;
}
</style>
