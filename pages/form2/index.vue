<script setup>
const container = ref();
const iframe = ref();

onMounted(() => {
  if (!iframe.value?.contentWindow || !container.value) return;

  iframe.value.width = iframe.value.contentWindow.document.body.scrollWidth;
  iframe.value.height = iframe.value.contentWindow.document.body.scrollHeight;
});
</script>

<template>
  <div ref="container">
    <iframe
      ref="iframe"
      src="http://localhost:4173/"
      frameborder="0"
      width="100%"
    ></iframe>
  </div>
</template>

<style scoped lang="less"></style>
