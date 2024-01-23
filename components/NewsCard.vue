<template>
  <div class="news">
    <div class="image-container">
      <img class="image" src="~/assets/news.png" alt="news">
    </div>

    <div class="text news__date text_caption">17 января 2023 • Событие</div>
    <div class="description">
      <div class="text text_semi-bold">Для внесения сведений о прохождении аккредитации не требуется свидетельство об аккредитации</div>
      <div class="arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#101828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "NewsCard"-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
@import "assets/core.less";

.news {
  width: 100%;
  height: auto;
  max-height: 370px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.image {
  width: 100%;
  height: auto;
  align-self: stretch;

  //@media @min580 {
  //  height: 192px;
  //  align-self: stretch;
  //}
  //
  //@media @min990 {
  //  height: 240px;
  //}
}

.image-container {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.description {
  display: flex;
  gap: 12px;
}

.news__date {
  color: @BlueNewColor;
  margin: 16px 0 8px 0;

  @media @min760 {
    margin: 25px 0 12px 0;
  }
}

</style>
