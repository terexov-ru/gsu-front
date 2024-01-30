<template>

  <div class="wrapper wrapper_paddings">

    <div class="news-page">

      <h2 class="text text_h2">Новости</h2>

      <div class="options">
        <DropDown
            class="options__drop-down"
            :title="'Показать все'"
        />
        <DropDown
            class="options__drop-down"
            :title="'Год'"
        />
      </div>

      <div class="news-block">

        <div class="news__banner">

          <img class="news__banner__img" src="~/assets/news_banner.png" alt="news_banner">

          <div class="text text_caption text_accent">17 января 2023 • Событие</div>

          <div class="row">
            <h2 class="text text_h3">Для внесения сведений о прохождении аккредитации не требуется свидетельство об
              аккредитации</h2>
            <svg class="svg" width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.66016 21L17.6602 11M17.6602 11H7.66016M17.6602 11V21" stroke="#101828" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <div class="text text_normal">Уважаемые коллеги, обращаем ваше внимание, в соответствии с письмом Министерства
            здравоохранения Российской Федерации от 15.03.2022, адресованным руководителям органов исполнительной власти
            субъектов Российской Федерации в сфере охраны здоровья, за подписью заместителя министра здравоохранения
            Т.В. Семеновой, лицо считается прошедшим аккредитацию специалиста с момента внесения данных о прохождении
            аккредитации специалиста в единую государственную информационную систему в сфере здравоохранения (ЕГИСЗ).
          </div>

        </div>

        <NewsCard/>
        <NewsCard/>

        <NewsCard/>
        <NewsCard/>

        <NewsCard/>
        <NewsCard/>

      </div>

      <div class="pagination">
        <PaginationBar
            :page="1"
            :size="8"
            :count="25"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "assets/core.less";

.news-page {
  margin-top: 80px;
}

.options {
  display: flex;
  gap: 12px;
  flex-direction: column;

  margin-top: 40px;
  margin-bottom: 40px;

  @media @min580 {
    flex-direction: row;
  }

  @media @min1200 {
    max-width: 760px;
  }
}

.options__drop-down {
  background: @LightGreyColor;
}

.svg {
  flex-shrink: 0;
}

.news-block {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media @min580 {
    grid-template-columns: 1fr 1fr;
  }

  @media @min760 {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.news__banner {
  display: none;
  flex-direction: column;
  justify-content: space-between;

  gap: 20px;

  width: 100%;
  height: auto;

  @media @min580 {
    display: flex;
    grid-row: 1 / 3;
    grid-column: 1 / 3;
  }

  @media @min760 {
    grid-column: 1 / 4;
    grid-row: 1 / 4;
  }

  @media @min1200 {
    grid-row: 1 / 3;
    grid-column: 1 / 3;
  }
}

.news__banner__img {
  width: 100%;
  height: auto;
}

.pagination {
  display: flex;
  justify-content: center;

  margin-top: 60px;
  margin-bottom: 120px;
}

</style>
