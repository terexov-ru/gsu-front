<template>
  <div class="card-list">
    <CourseCard
      v-for="course in courses"
      :key="course.id"
      :test="course"
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
  mounted() {
    console.log(this.courses);
    console.log("HERE!!!")
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
