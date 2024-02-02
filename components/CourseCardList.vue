<template>
  <div class="card-list">
    <CourseCard
      v-for="course in courses"
      :key="course.id"
    />
  </div>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      default: [],
    }
  },
  watch: {
    courses(newVal) {
      console.log(newVal);
    }
  }
}
</script>

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
