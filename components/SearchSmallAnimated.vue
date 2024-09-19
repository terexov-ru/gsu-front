<template>
  <div
    :class="{ container_active: active }"
    class="container"
    v-click-outside="closeDrop"
  >
    <input
      :class="{ input_active: active }"
      placeholder="Поиск..."
      class="input"
      type="text"
      v-model="searchValue"
      @focus="dropActive = true"
    />

    <img
      @click="active = !active"
      class="pointer"
      src="~/assets/svg/search.svg"
      alt="search"
    />

    <ul
      v-if="dropActive && active && courses && courses.length > 0"
      class="drop-down__list"
    >
      <li
        v-for="course in courses"
        class="text drop-down__list__item text_normal"
      >
        <NuxtLink :to="`/courses/${course.id}`">
          <ul
            @click="
              active = false;
              searchValue = '';
            "
          >
            {{
              course.title
            }}
          </ul>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { API } from "../constants/index.js";

const searchValue = defineModel("value");
const active = ref(false);
const dropActive = ref(false);
const pending = ref(null);
const courses = ref(null);

let debounceTimer: ReturnType<typeof setTimeout>;

function closeDrop() {
  dropActive.value = false;
}

watch(searchValue, async (newValue) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(async () => {
    const { pending: pendingData, data: coursesData } = await getCourseInfo(
      newValue
    );
    pending.value = pendingData.value;
    courses.value = coursesData.value?.page.courses;
  }, 500);
});

async function getCourseInfo(value) {
  return useLazyFetch(API + "/page/learning", {
    method: "POST",
    body: {
      start: 0,
      amount: 5,
      sort: 0,
      search_value: value,
    },
  });
}
</script>

<style scoped lang="less">
@import "assets/core";

.container {
  width: 100%;
  height: auto;
  position: relative;

  display: flex;

  transition: 0.4s;

  background: @WhiteColor;
  border-radius: 6px;

  padding-right: 5px;
  padding-left: 10px;

  &_active {
    background: @LightGreyColor;
  }
}

.input {
  width: 230px;
  height: 30px;
  overflow: hidden;
  max-width: 0;

  padding: 0;

  font-size: 12px;
  background: white;
  transition: 0.4s;

  &_active {
    max-width: 140px;
    background: @LightGreyColor;

    @media @min760 {
      max-width: 230px;
    }

    @media @min990 {
      max-width: 130px;
    }

    @media @min1200 {
      max-width: 230px;
    }
  }
}

.drop-down__list {
  position: absolute;
  top: 38px;
  left: 0;
  z-index: 1000;

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
  margin-bottom: 8px;
  font-size: 12px;
  line-height: 18px;

  @media @min760 {
    font-size: 14px;
    line-height: 20px;
  }

  &:hover {
    color: @BlueNewColor;
    transition-duration: @dur150;
  }
}
</style>
