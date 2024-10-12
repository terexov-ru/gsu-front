<template>
  <div
    class="drop-down"
    :class="{ 'drop-down_disabled': disabled }"
    v-click-outside="onClickOutside"
  >
    <div @click="active = !active" class="text drop-down__box text_normal">
      <span>{{ selectedItem.title }}</span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 9.19727L12 14.1973L17 9.19727"
          stroke="#B9BFC6"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <ul v-if="active" class="drop-down__list">
      <li
        class="text drop-down__list__item text_light"
        @click="selectOption({ title: title, id: undefined })"
      >
        Не выбрано
      </li>

      <li
        class="text drop-down__list__item text_normal"
        v-for="option in options"
        :key="option.text"
        @click="selectOption(option)"
      >
        <span :class="{ text_accent: option.id === selectedItem.id }">
          {{ option.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  selected: {
    type: Object,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  options: Array,
});

const emit = defineEmits(["update:selected"]);
const active = ref(false);
const selectedItem = ref({ title: "Заголовок", value: "" });

const selectOption = (option) => {
  selectedItem.value = option;
  active.value = false;
  emit("update:selected", option);
};

const setOption = (option) => {
  selectedItem.value = option;
  active.value = false;
};

const onClickOutside = () => {
  active.value = false;
};

watch(
  () => props.title,
  (newTitle) => {
    selectedItem.value.title = newTitle;
  }
);

onMounted(() => {
  selectedItem.value.title = props.title;
});

defineExpose({
  setOption,
});
</script>

<style lang="less" scoped>
@import "assets/core.less";

.drop-down {
  position: relative;

  width: 100%;
  height: 44px;

  &_disabled {
    pointer-events: none;
    opacity: 0.5;
  }
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
