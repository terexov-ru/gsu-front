<template>
  <div class="wrapper wrapper_paddings">
    <h2 class="text text_h2">Новости</h2>
    <NewsCardList class="list"/>
    <SeeMore
        class="link"
        :href="'/news'"
    />
  </div>
</template>

<!--<script>-->
<!--import NewsCardList from "@/components/news/NewsCardList";-->
<!--import SeeMore from "@/components/links/SeeMore";-->
<!--export default {-->
<!--  name: "NewsBlock",-->
<!--  components: {SeeMore, NewsCardList}-->
<!--}-->
<!--</script>-->

<style scoped>
.list {
  margin-top: 40px;
}

.link {

}
</style>
