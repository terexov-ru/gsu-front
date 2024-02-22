<template>
  <div class="wrapper license-page wrapper_paddings">

    <h2 class="text text_h2">{{ page.title }}</h2>

    <div class="license-block">

      <div class="license-block__img-container">
        <NuxtLink v-if="page && page.image" :to="page.image" target="_blank">
          <img class="license-block__img" :src="page.image" alt="License">
        </NuxtLink>
        <img v-else class="license-block__img" src="~/assets/license.png" alt="License">
      </div>

      <div class="license-block__description">
        <div>
          <h3 class="text text_h3">{{ page.subtitle }}</h3>
          <p class="text text_normal">
            {{ page.text }}
          </p>
        </div>
        <NuxtLink :to="page.file.link" target="_blank">
          <p class="text text_normal text_accent">{{ page.file.name }}</p>
        </NuxtLink>
      </div>
    </div>

    <div class="delimiter license-page__delimiter delimiter_mid-grey"/>

    <div class="certificate">
      <div class="certificate__card"

           v-for="item in page.certificates"
           :key="item.title"
      >

        <NuxtLink v-if="item && item.image" :to="item.image" target="_blank">
          <img :src="item.image" class="certificate__card__img" alt="Certificate">
        </NuxtLink>
        <img v-else class="certificate__card__img" src="~/assets/certificate.png" alt="Certificate">

        <div>
          <h4 class="text text_h4">{{ item.title }}</h4>
          <p class="text text_normal">{{ item.text }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const {getLicense} = useApi();

const {data} = await getLicense();

const page = data.value?.page;

</script>

<style lang="less" scoped>
@import "assets/core.less";

.license-page {
  margin-top: 80px;
  margin-bottom: 120px;
}

.license-page__delimiter {
  margin-top: 20px;
  margin-bottom: 20px;
}

.license-block {
  margin-top: 40px;

  display: flex;
  gap: 20px;
  flex-direction: column;

  @media @min580 {
    flex-direction: row;
    gap: 20px;
  }

  @media @min760 {
    gap: 40px;
  }

  @media @min1200 {
    gap: 80px;
  }
}

.license-block__description {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
}

.license-block__img {
  width: 180px;
  height: 250px;

  border-radius: 5px;
  border: 1px solid @DarkGreyColor;
}

.certificate {
  display: grid;
  flex-wrap: wrap;
  gap: 12px;

  grid-template-columns: 1fr;

  @media @min580 {
    grid-template-columns: 1fr 1fr;
  }

  @media @min990 {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.certificate__card {
  box-sizing: border-box;
  padding: 12px;

  width: 100%;
  height: auto;

  display: flex;
  gap: 16px;

  border-radius: 8px;
  background: @LightGreyColor;

  @media @min760 {
    padding: 20px;
  }
}

.certificate__card__img {
  width: 130px;
  height: auto;

  @media @min760 {
    width: 162px;
  }
}
</style>
