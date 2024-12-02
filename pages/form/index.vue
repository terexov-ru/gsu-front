<template>
  <div class="wrapper form-block wrapper_paddings">
    <section class="form-wrapper">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScfcCo9vp5whLz_WD87C277xifVE6zZ8yth4pz_cvRDrxphCQ/viewform?embedded=true"
        width="100%"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        scrolling="no"
        ref="iframe"
        >Загрузка…</iframe
      >
    </section>
  </div>
</template>

<script setup>
const iframe = ref(null);

onMounted(() => {
  const adjustIframeHeight = () => {
    console.log("heigt");
    console.log(iframe.value.contentWindow.document.body.scrollHeight);

    if (iframe.value) {
      iframe.value.style.height = `${iframe.value.contentWindow.document.body.scrollHeight}px`;
    }
  };

  // Подключение к событию загрузки iframe, чтобы установить высоту
  iframe.value.onload = adjustIframeHeight;
});
</script>

<style lang="less" scoped>
@import "assets/core.less";

.form-block {
  margin-top: 80px;
  margin-bottom: 120px;
}

.form-wrapper {
  //   margin-top: 32px;

  width: 100%;

  iframe {
    height: 1700px;

    @media @min580 {
      height: 1400px;
    }
  }
}
</style>
