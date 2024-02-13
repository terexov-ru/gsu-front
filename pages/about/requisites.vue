<template>
  <div class="wrapper wrapper_paddings">
    <div class="requisites-block">
      <h1 class="text text_h2">{{ page.title }}</h1>

      <NuxtLink :to="page.file" target="_blank" external>
        <div class="download">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 12L12 17M12 17L17 12M12 17L12 4" stroke="#129DF4" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M6 20H18" stroke="#129DF4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text text_accent">Реквизиты</span>
        </div>
      </NuxtLink>

      <h2 class="text text_normal">
        {{ page.text }}
      </h2>

      <ul class="list">
        <li class="list__item"
            v-for="item in page.requisites"
            :key="item.title"
        >
          <span class="text text_semi-bold">{{ item.title }}</span>
          <span class="text text_normal">{{ item.value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const {getReq} = useApi();

const {data} = await getReq();

const page = data.value?.page;
console.log(page);

</script>

<style lang="less" scoped>
@import "assets/core.less";

.requisites-block {
  margin-top: 60px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list {

}

.download {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 12px;

  @media @min760 {
    margin-top: 20px;
  }
}

.list__item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;

  word-break: break-word;

  padding: 12px 0;

  @media @min580 {
    grid-template-columns: 240px 1fr;
    padding: 20px 0;
    gap: 50px;
  }

  border-top: 1px solid @MidGreyColor;
  list-style: none;
}
</style>
