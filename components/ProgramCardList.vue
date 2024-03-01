<template>
  <div v-if="courses && courses.length > 0" class="card-list">
      <ProgramCard
          v-for="course in courses"
          :key="course.id"
          :course="course"
      />
  </div>
  <div v-else class="empty-list">
    <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_3133_38921)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M54 94C76.0914 94 94 76.0914 94 54C94 31.9086 76.0914 14 54 14C31.9086 14 14 31.9086 14 54C14 76.0914 31.9086 94 54 94ZM54 89.8333C73.7902 89.8333 89.8333 73.7902 89.8333 54C89.8333 34.2098 73.7902 18.1667 54 18.1667C34.2098 18.1667 18.1667 34.2098 18.1667 54C18.1667 73.7902 34.2098 89.8333 54 89.8333Z" fill="#129DF4"/>
      </g>
      <circle cx="41" cy="45" r="4" fill="#129DF4"/>
      <circle cx="67" cy="45" r="4" fill="#129DF4"/>
      <path d="M68.2843 67.8579C64.5335 64.1071 59.4465 62 54.1421 62C48.8378 62 43.7507 64.1071 40 67.8579" stroke="#129DF4" stroke-width="4" stroke-linecap="round"/>
      <defs>
        <filter id="filter0_d_3133_38921" x="0.25" y="0.25" width="107.5" height="107.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="6.875"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.223529 0 0 0 0 0.701961 0 0 0 0 0.956863 0 0 0 0.96 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3133_38921"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3133_38921" result="shape"/>
        </filter>
      </defs>
    </svg>
    <div class="text text_normal text_light">
      Подходящих программ не найдено
    </div>
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
  },
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

.empty-list {
  width: 100%;
  height: 35vh;

  gap: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
