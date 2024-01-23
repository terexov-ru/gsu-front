<template>
  <div class="card-list">
    <CourseCard/>
    <CourseCard/>
    <CourseCard/>
    <CourseCard/>
    <CourseCard/>
  </div>
</template>

<!--<script>-->
<!--import CourseCard from "@/components/cards/course/CourseCard";-->
<!--export default {-->
<!--  name: "CourseCardList",-->
<!--  components: {CourseCard}-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
@import "assets/core.less";

.card-list {
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media @min760 {
    gap: 20px;
  }
}
</style>
