<script setup lang="ts">
import { getSiteUrl, isNoindexEnvironment } from "~/utils/seo.js";

const { checkToken } = useApi();
const { getTokenCookie, deleteTokenCookie } = useUtils();
const config = useRuntimeConfig();
const siteUrl = getSiteUrl(config);

if (isNoindexEnvironment(siteUrl, config.public.noindex)) {
  useSeoMeta({
    robots: "noindex, nofollow",
  });
}

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
  <ClientOnly>
    <SiteFixedLayer />
  </ClientOnly>
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
