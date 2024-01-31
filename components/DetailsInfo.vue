<template>
  <div class="info">
    <div class="info__container"
         @click="active = !active"
    >
      <label class="text info__headline text_normal text_light">Описание курса</label>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 9.19727L12 14.1973L17 9.19727" stroke="#89939F" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    </div>

    <div class="info__body"
         :class="{'info__body_active' : active}"
    >
      <div class="text info__body__text text_normal">
        {{ text }}
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref} from "vue";

let active = ref(false);

defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style lang="less" scoped>
@import "assets/core.less";

.info__container {
  display: flex;
  gap: 5px;
  align-items: center;

  margin-bottom: 10px;
}

.info__headline {
  display: block;
  position: relative;
  user-select: none;
  cursor: pointer;
}

.info__body {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: 0.4s;

  &_active {
    opacity: 1;
    max-height: 150px;
  }
}

.info__body__text {
  max-height: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 20px;
}

.info__body__see-more {
  margin-top: 5px;
  justify-content: flex-start;
  color: @BlueNewColor;
  stroke: @BlueNewColor;
}

</style>
