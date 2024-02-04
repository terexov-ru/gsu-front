<template>
  <div class="card-list">
    <ProgramCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
    />
  </div>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      require: true,
      default: [],
    }
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.card-list {
  margin-top: 40px;
  gap: 12px;
  box-sizing: border-box;
  width: 100%;
  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;

  @media @min580 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-auto-rows: 0;
  }

  @media @min990 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }

}
</style>
