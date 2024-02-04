<template>
  <div class="module pointer"
       @click="active = !active"
  >
    <div class="module__header">
      <h4 class="text module__name text_h4">
        {{ module.module_title }}
      </h4>
      <svg :class="{'module__icon_active': active}"
           class="module__icon pointer"
           width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 9.19727L12 14.1973L17 9.19727" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="text module__description text_semi-bold">
      <span v-if="module.module_subtitle">{{ module.module_subtitle }}</span>
      <span v-else>Не указан</span>
    </div>
    <div class="text module__text text_normal"
         :class="{'module__text_active' : active}">
      {{ module.module_description }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    }
  },
  props: {
    module: {
      type: Object,
      require: true,
    },
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.module {
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  padding: 20px;

  background: none;
  border-radius: 8px;

  border: 1px solid @BlueNewColor;
}

.module__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.module__name {
  color: @BlueNewColor;
}

.module__description {
  margin-top: 12px;
}

.module__text {
  max-height: 0;
  overflow: hidden;
  transition: 0.4s;

  &_active {
    max-height: 150px;
  }
}

.module__icon {
  transition: 0.2s;

  &_active {
    transform: rotate(180deg);
  }
}

</style>
