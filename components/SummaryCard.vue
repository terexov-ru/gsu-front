<template>
  <div class="summary">
    <div class="item">
      <div class="text text_h2">267</div>
      <div class="text text_normal">экспертов-практиков с обширным опытом</div>
    </div>
    <div class="item">
      <div class="text text_h2">1 663</div>
      <div class="text text_normal">программ НМО и смежных направлений</div>
    </div>
    <div class="item">
      <div class="text text_h2">6 000 +</div>
      <div class="text text_normal">учреждений пранеров
        и клиентов</div>
    </div>
    <div class="item">
      <div class="text text_h2">6 864 +</div>
      <div class="text text_normal">учащихся и выпускников программ</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SummaryCard"
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.summary {
  width: 100%;
  height: auto;

  box-sizing: border-box;
  padding: 30px;

  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  border-radius: 12px;
  background: linear-gradient(167.04deg, #F0F0FF -8.82%, #F0F7FF 44.88%, #F0FFFE 103.26%);

  @media @min580 {
    grid-template-columns: 1fr 1fr;
  }

  @media @min760 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
