<template>
  <div class="vacancies-block">
    <div class="wrapper wrapper_paddings">
      <div class="text text_h2 text_h2-margin">Вакансии</div>
    </div>

    <VacanciesSlider
      @clickButton="formActive = true"
    />

    <div class="wrapper wrapper_paddings">
      <div class="vacancies__grid">
        <VacanciesCard
            v-for="item in list"
            :key="item.id"
            :vacancy="item"
            @click="selectActive(item)"
        />
      </div>
    </div>
  </div>

  <OverflowContainer
      :active="activeOverflow"
      @closeOverflow="closeOverflow()"
  >
    <OverflowVacancies
        @close="closeOverflow()"
        :vacancy="activeItem"
    />
  </OverflowContainer>

  <OverflowContainer
      :active="formActive"
      @closeOverflow="formActive = false"
  >
    <OverflowMoreInfo
        @close="formActive = false"
    />
  </OverflowContainer>

</template>

<script setup>
const {simpleGet: simpleGet} = useApi();

const {data: data} = await simpleGet('/page/vacancies');
const list = toValue(data).page.vacancies;

const activeItem = ref({});
const activeOverflow = ref(false);
const formActive = ref(false);

function selectActive(item) {
  activeItem.value = item;
  activeOverflow.value = true;
}

function closeOverflow() {
  activeOverflow.value = false;
  activeItem.value = {};
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.vacancies-block {
  margin-top: 100px;
  margin-bottom: 100px;
}

.vacancies__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  margin-top: 60px;
  margin-bottom: 120px;

  @media @min580 {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media @min1200 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.vacancies__card {
  width: 100%;
  height: auto;

  box-sizing: border-box;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  background: @LightGreyColor;
}
</style>
