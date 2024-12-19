<template>
  <div class="wrapper team-block wrapper_paddings">
    <h2 class="text text_h2">Наша команда</h2>

    <div class="radio-button radio-button_margins">
      <div
        class="radio-button__hover"
        :class="[
          { 'radio-button__hover_1': active === 0 },
          // { 'radio-button__hover_2': active === 1 },
          { 'radio-button__hover_3': active === 2 },
        ]"
      />

      <div
        @click="active = 0"
        class="text radio-button__text text_normal radio-button__text_left"
        :class="{ 'radio-button__text_active': active === 0 }"
      >
        Администрация
      </div>

      <!--      <div-->
      <!--        @click="active = 1"-->
      <!--        class="text radio-button__text text_normal radio-button__text_center"-->
      <!--        :class="{ 'radio-button__text_active': active === 1 }"-->
      <!--      >-->
      <!--        Преподаватели-->
      <!--      </div>-->

      <div
        @click="active = 2"
        class="text radio-button__text text_normal radio-button__text_center"
        :class="{ 'radio-button__text_active': active === 2 }"
      >
        Сотрудники
      </div>
    </div>

    <div class="team">
      <div v-for="item in empl" :key="JSON.stringify(item)" class="team__card">
        <div class="team__card__img-container">
          <img class="team__card__img" :src="item.image" alt="team" />
        </div>
        <div class="team__card__description">
          <div class="text text_large">
            {{ item.name }}
          </div>
          <div class="text text_normal text_light">{{ item.job_title }}</div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <PaginationBar
        :size="itemsPerPage"
        :count="amount"
        v-model:page="pageNum"
      />
    </div>
  </div>
</template>

<script setup>
import { toValue, watch } from "vue";

const { getTeam: getTeam } = useApi();

const active = ref(0);

const { data: data } = await getTeam(0, 10);
const empl = ref(toValue(data).page.employees);
const pageNum = ref(1);
const itemsPerPage = 9;
const amount = ref(data.value.page.total_employee_amount);

watch(active, async (newValue) => {
  const { data: data } = await getTeam(
    pageNum.value * amount.value - amount.value,
    itemsPerPage,
    newValue,
  );
  empl.value = toValue(data).page.employees;
});
</script>

<style lang="less" scoped>
@import "assets/core.less";

.team-block {
  margin-top: 80px;
  margin-bottom: 120px;
}

.team {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media @min580 {
    grid-template-columns: 1fr 1fr;
  }

  @media @min990 {
    gap: 22px;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.team__card {
  overflow: hidden;
  width: 100%;
  height: auto;

  border-radius: 8px;
  background: @LightGreyColor;
}

.team__card__img-container {
  width: 100%;
  height: 250px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.team__card__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.team__card__description {
  box-sizing: border-box;
  padding: 8px;
}

.radio-button {
  position: relative;
  overflow: hidden;

  height: 44px;
  width: fit-content;

  box-sizing: border-box;
  padding: 10px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 42px;
  background: @LightGreyColor;
}

.radio-button_margins {
  margin-top: 40px;
  margin-bottom: 20px;
}

.radio-button__text {
  z-index: 10;
  color: @DarkGreyColor;
  transition: 150ms;
  width: 140px;
  cursor: pointer;

  &_left {
    text-align: left;
  }

  &_center {
    text-align: center;
  }

  &_right {
    text-align: right;
  }
}

.radio-button__text_active {
  color: @WhiteColor;
  transition: 150ms;
}

.radio-button__hover {
  position: absolute;
  left: 0;

  width: 50%;
  height: 100%;

  border-radius: inherit;
  background: @BluButtonGradient;

  transition: 150ms;
}

.radio-button__hover_1 {
  left: 0;
  transition: 150ms;
}

//.radio-button__hover_2 {
//  left: 33%;
//  transition: 150ms;
//}

.radio-button__hover_3 {
  left: 50%;
  transition: 150ms;
}

.radio-button__hover_active {
  left: 50%;
  transition: 150ms;
}
</style>
