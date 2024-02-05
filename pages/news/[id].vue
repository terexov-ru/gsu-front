<template>
  <div class="wrapper news-page wrapper_paddings">

    <h2 class="text text_h2">Новости</h2>

    <GoBack
        class="back"
        :text="'Вернуться назад'"
        :link="'/'"
    />

    <div class="news">
      <div class="news__img-container">
        <img class="news__img" src="~/assets/news_banner.png"/>
      </div>

      <div class="news__content">
        <div class="text text_h4">Для внесения сведений о прохождении аккредитации не требуется свидетельство об
          аккредитации специалиста на бумажном носителе
        </div>

        <div class="text text_caption text_accent">17 января 2023 • Новость</div>

        <div class="text text_normal">
          <p>
            Уважаемые коллеги, обращаем ваше внимание, в соответствии с письмом Министерства здравоохранения
            Российской
            Федерации от 15.03.2022, адресованным руководителям органов исполнительной власти субъектов Российской
            Федерации в сфере охраны здоровья, за подписью заместителя министра здравоохранения Т.В. Семеновой, лицо
            считается прошедшим аккредитацию специалиста с момента внесения данных о прохождении аккредитации
            специалиста
            в единую государственную информационную систему в сфере здравоохранения (ЕГИСЗ).
          </p>
          <br>
          <p>
            Для осуществления профессиональной деятельности после прохождения аккредитации специалиста получение
            свидетельства об аккредитации специалиста на бумажном носителе не требуется.
          </p>
          <br>
          <p>
            Минздрав России сообщает о недопустимости требования наличия свидетельства об аккредитации специалиста на
            бумажном носителе у медицинских и фармацевтических работников, контроль исполнения возложен на
            руководителей
            органов исполнительной власти субъектов Российской Федерации в сфере охраны здоровья.
          </p>
        </div>
      </div>
    </div>

    <div class="news-block">

      <h4 class="text text_h4">Смотреть еще</h4>
      <NewsCardList
          class="news-list"
      />
    </div>

  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.news-page {
  margin-top: 80px;
  margin-bottom: 120px;
}

.news-block {
  margin-top: 120px;
}

.news-list {
  margin-top: 20px;
}

.back {
  margin-top: 40px;
  margin-bottom: 20px;
}

.news {
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media @min760 {
    gap: 40px;
  }

  @media @min1200 {
    flex-direction: row;
  }
}

.news__img-container {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;

  width: 100%;
  height: auto;
  flex-shrink: 0;

  @media @min760 {
    width: 560px;
  }
}

.news__img {
  width: 100%;
  height: auto;
}

.news__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}


</style>
