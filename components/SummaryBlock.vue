<template>
  <div class="summary-block wrapper wrapper_paddings">
    <h1 class="text text_h2">
      {{ info.title }}
    </h1>
    <div class="text summary-block__text text_normal">
      {{ info.text }}
    </div>
    <SummaryCard
        class="summary"
        :list="info.items"
    />
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped>
.summary {
  margin-top: 40px;
}

.summary-block__text {
  margin-top: 12px;
}
</style>
