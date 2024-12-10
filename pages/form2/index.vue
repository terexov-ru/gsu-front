<script setup lang="ts">
const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const formScript = document.createElement("script");

  formScript.setAttribute("data-b24-form", "inline/16/h6zyd1");
  formScript.setAttribute("data-skip-moving", "true");

  formScript.innerHTML =
    "(function(w,d,u){\n" +
    "\n" +
    "var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);\n" +
    "\n" +
    "var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);\n" +
    "\n" +
    "})(window,document,'https://cdn-ru.bitrix24.ru/b27711258/crm/form/loader_16.js');";

  container.value?.appendChild(formScript);
});
</script>

<template>
  <div ref="container" />
</template>

<style scoped lang="less"></style>
