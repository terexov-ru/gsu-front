<template>
  <!--  TODO вынести input как отедльный компонент и добваить slot под icon-->
  <div class="search-container">
    <div
        class="input-container"
        v-click-outside="closeDropDown"
    >

      <input
          @focus="active = true"
          v-model="searchValue"
          class="input" :placeholder="!$viewport.isLessThan('desktop') ? 'Поиск по ключевым словам...' : 'Поиск'"
          type="text">

      <svg class="input-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M21 21L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z"
            stroke="#B9BFC6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <div class="search-drop"
           v-if="active"
      >

        <div
            v-if="pending"
            class="text text_h3 text_accent"
        >
          Загрузка...
        </div>

        <div v-else>
          <div
              v-for="course in courses"
              :key="course.id"
              class="search-drop__block"
          >
            <div class="text search-drop__title text_caption text_accent">
            <span
                v-for="spec in course.specs"
                :key="spec"
            >
              {{ spec }};
            </span>
            </div>

            <NuxtLink :to="`/courses/${course.id}`">
              <div class="text search-drop__item text_normal">
                {{ course.title }}
              </div>
            </NuxtLink>

          </div>
        </div>

        <!--        <div class="search-drop__block">-->
        <!--          <div class="text search-drop__title text_caption text_accent">лабораторная диагностика</div>-->
        <!--          <div class="text search-drop__item text_normal">Медицинская реабилитация как вид помощи при коронавирусной-->
        <!--            инфекции Covid-19-->
        <!--          </div>-->
        <!--          <div class="text search-drop__item text_normal">Медицинская реабилитация как вид помощи при коронавирусной-->
        <!--            инфекции Covid-19-->
        <!--          </div>-->
        <!--        </div>-->

      </div>

    </div>


    <button class="button button_size button_gradient"
            @click="this.$emit('search')"
    >Найти
    </button>
  </div>

</template>

<script setup>
import {toValue, watch} from "vue";
import {API} from "../constants/index.js";

const active = ref(false);

const pending = ref(null);
const courses = ref(null);

const searchValue = defineModel('searchValue');

watch(searchValue, async (newValue) => {
  const {pending: pendingData, data: coursesData} = await getCourseInfo(newValue);
  pending.value = pendingData.value;
  courses.value = coursesData.value.page.courses;
  // console.log(coursesData.value.page.courses)
})

// watch(courses, (newCourses) => {
//   console.log(toValue(newCourses).length);
// })
//
// watch(pending, (newValue) => {
//   console.log(toValue(newValue));
// })

function closeDropDown() {
  active.value = false;
}

async function getCourseInfo(value) {
  return useLazyFetch(API + '/page/learning', {
    method: 'POST',
    body:
        {
          start: 0,
          amount: 5,
          sort: 0,
          search_value: value
        }
  });
}


</script>

<style lang="less" scoped>
@import "assets/core.less";

.input {
  box-sizing: border-box;
  display: flex;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  height: 46px;

  border: none;

  border-radius: 6px;
  background: @LightGreyColor;

  color: @DarkGreyColor;

  /* Text Large */
  //font-family: Nunito Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 140% */

  &::placeholder {
    color: @MidGreyColor;
  }

  &:focus {
    outline: none;
  }

  @media @min760 {
    height: 52px;
  }
}

.input-icon {
  position: absolute;
  right: 14px;
  top: 10px;

  @media @min760 {
    top: 14px;
  }
}

.search-container {
  gap: 12px;
  margin-top: 32px;
  margin-bottom: 16px;
  flex-direction: column;
  display: flex;

  @media @min580 {
    flex-direction: row;
    gap: 24px;
  }

  @media @min760 {
    margin-bottom: 24px;
  }

  @media @min990 {
    margin-top: 40px;
  }
}

.input-container {
  position: relative;
  width: 100%;
  display: flex;
}

.search-drop {
  position: absolute;
  left: 0;
  top: calc(12px + 52px);
  z-index: 100;

  width: 100%;
  height: auto;
  max-height: 300px;

  box-sizing: border-box;
  padding: 12px 34px 0 16px;

  overflow-y: auto;

  background: @WhiteColor;
  border-radius: 4px;
  box-shadow: @BoxShadowEffect;
}

.search-drop__title {
  margin-bottom: 12px;
}

.search-drop__item {
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    color: @BlueNewColor;
  }
}

.search-drop__block {
  margin-bottom: 16px;
}
</style>
