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
