<template>
  <div class="go-back">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 12L5 12M5 12L11 18M5 12L11 6" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round"/>
    </svg>
    <router-link :to="link" class="text link text_normal">{{ text }}</router-link>
  </div>
</template>

<script>
export default {
  name: "GoBack",
  props: {
    text: String,
    link: String,
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.go-back {
  display: flex;
  gap: 8px;
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: @DarkGreyColor;
}
</style>
