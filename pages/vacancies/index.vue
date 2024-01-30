<template>

  <div class="vacancies-block">

    <div class="wrapper wrapper_paddings">
      <div class="text text_h2 text_h2-margin">Вакансии</div>
    </div>

    <VacanciesSlider/>

    <div class="wrapper wrapper_paddings">
      <div class="vacancies__grid">
        <div
            class="vacancies__card"
            v-for="i in 6"
            :key="i"
        >
          <div class="text text_large">Главный специалист
            учебного отдела</div>

          <div class="row row_al-c row_gap60">

            <div class="column">
              <div class="text text_normal">Опыт</div>
              <div class="text text_normal text_light">1-3 года</div>
            </div>
            <div class="column">
              <div class="text text_normal">Зарплата</div>
              <div class="text text_normal text_light">30 000 Р</div>
            </div>
          </div>

          <div class="button button_dark">
            Подробнее
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

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
