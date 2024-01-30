<template>
  <div class="drop-down">

    <div @click="active = !active" class="text drop-down__box text_normal">
      <span>{{ selected.text }}</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 9.19727L12 14.1973L17 9.19727" stroke="#B9BFC6" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    </div>

    <ul v-if="active"
        class="drop-down__list"
    >
      <li class="text drop-down__list__item text_normal"
          v-for="option in options"
          :key="option.text"
          @click="selected = option; active = false">

        {{ option.text }}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    options: Array,
  },
  data() {
    return {
      active: false,
      selected: {text: 'Заголовок', value: ''},
    }
  },
  mounted() {
    this.selected.text = this.title;
  },
  methods: {
    onClickOutside() {
      this.active = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.drop-down {
  position: relative;

  width: 100%;
  height: 44px;
}

.drop-down__box {
  cursor: pointer;

  box-sizing: border-box;
  padding: 10px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: inherit;
  border-radius: 4px;
}

.drop-down__list {
  position: absolute;
  top: 56px;
  left: 0;
  z-index: 100;

  width: inherit;
  height: auto;
  max-height: 300px;
  overflow-y: scroll;

  box-sizing: border-box;
  padding: 12px 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  list-style: none;
  border-radius: 4px;
  background: @WhiteColor;
  box-shadow: @BoxShadowEffect;
}

.drop-down__list__item {
  cursor: pointer;

  &:hover {
    color: @BlueNewColor;
    transition-duration: @dur150;
  }
}
</style>
