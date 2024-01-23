<template>
  <!-- Данный компонент должен отвечать за обработку поисковых запросов из компонента ProgramSearchBar
  и отображения состояние в ProgramCardList-->
  <div class="search-block wrapper wrapper_paddings">
    <h2 class="text text_h2 text_dark">Подбери <span class="text_accent">программу</span> и повысь <br> свою <span
        class="text_accent">компетентность</span></h2>
    <ProgramSearchBar/>
    <ProgramCardList/>
    <SeeMore/>
  </div>
</template>

<!--<script>-->
<!--import ProgramSearchBar from "@/components/search/ProgramSearchBar";-->
<!--import ProgramCardList from "@/components/cards/programm/ProgramCardList";-->
<!--import SeeMore from "@/components/links/SeeMore";-->

<!--export default {-->
<!--  name: "ProgramSearchBlock",-->
<!--  components: {SeeMore, ProgramCardList, ProgramSearchBar},-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
@import "assets/core.less";

.search-block {
  padding-top: 40px;

  @media @min1200 {
    padding-top: 80px;
  }
}
</style>
