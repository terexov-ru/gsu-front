<script setup lang="ts">
const { checkToken } = useApi();
const { getTokenCookie, deleteTokenCookie } = useUtils();

if (getTokenCookie() !== undefined && getTokenCookie() !== null) {
  const { data } = await checkToken();

  if (!data.value.token_valid) {
    deleteTokenCookie();
  }
}
</script>

<template>
  <AppBar />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppFooter />
</template>

<style lang="less">
//.snowflakes-container {
//  position: fixed;
//  top: 0;
//  left: 0;
//  width: 100%;
//  height: 100%;
//  z-index: -1;
//}
//
//.snowflake {
//  position: absolute;
//  z-index: 100;
//  pointer-events: none;
//  animation: snow 40s linear infinite;
//
//  path {
//    //fill: black;
//  }
//}
</style>
