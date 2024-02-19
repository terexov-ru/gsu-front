<template>
  <div class="wrapper wrapper_paddings">
    <div class="register-block">

      <h1 class="text text_h2">{{ page.title }}</h1>

      <h2 class="text text_h4 text_mt40">
        <div
            v-html="page.subtitle"
        />
      </h2>

      <div class="text text_normal text_mt40" >
        <div v-html="page.text"/>
      </div>

    </div>
  </div>
</template>

<script setup>
const {getRegistry} = useApi();

const {data} = await getRegistry();

const page = data.value?.page;

</script>

<style lang="less" scoped>
@import "assets/core.less";

.register-block {
  margin-top: 45px;
  margin-bottom: 60px;

  @media @min760 {
    margin-top: 90px;
    margin-bottom: 120px;
  }
}

.text_mt40 {
  margin-top: 40px;
}

.text_mt60 {
  margin-top: 60px;
}

.text_dark-blue {
  color: @DarkBlueColor;
}
</style>
