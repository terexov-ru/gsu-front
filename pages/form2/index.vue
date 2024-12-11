<script setup>
const container = ref();
const iframe = ref();

const show = ref(false);

onMounted(() => {
  if (!iframe.value?.contentWindow || !container.value) return;

  iframe.value.width = iframe.value.contentWindow.document.body.scrollWidth;
  iframe.value.height = iframe.value.contentWindow.document.body.scrollHeight;

  show.value = true;
});
</script>

<template>
  <div ref="container" class="container">
    <div class="stub" v-if="!show" />

    <iframe
      width="100%"
      height="100%"
      ref="iframe"
      class="iframe"
      src="/form2.html"
      frameborder="0"
    ></iframe>
  </div>
</template>

<style scoped lang="less">
.container {
  position: relative;
  min-height: 80vh;
}

.stub {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.iframe {
  width: 100%;
  min-height: 100%;
}
</style>
