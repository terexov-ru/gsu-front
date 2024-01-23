<template>
  <div class="wrapper wrapper_paddings">

    <div class="smi-news-block">
      <h2 class="text text_h2">Сми о нас</h2>

      <div class="text back text_normal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12L5 12M5 12L11 18M5 12L11 6" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
        <span>Вернуться</span>
      </div>

      <div class="smi-news">

        <img class="smi-news__content__img" src="~/assets/smi_news.png" alt="smi_news">

        <div class="smi-news__content">
          <h4 class="text text_h4">В новом году на новом месте</h4>
          <div class="text smi-news__content__date text_caption text_accent">17 января 2023</div>
          <div class="text text_normal">Уважаемые коллеги, обращаем ваше внимание, в соответствии с письмом Министерства
            здравоохранения Российской Федерации от 15.03.2022, адресованным руководителям органов исполнительной власти
            субъектов Российской Федерации в сфере охраны здоровья, за подписью заместителя министра здравоохранения
          </div>
          <div class="smi-news__content__buttons">
            <button class="button button_dark button_size">Перейти</button>
            <button class="button button_black-bordered button_size">Скачать</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmiNews"
}
</script>

<style lang="less" scoped>


.back {
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  gap: 8px;
}

.smi-news-block {
  margin-top: 80px;
  margin-bottom: 120px;
}

.smi-news {
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media @min990 {
    flex-direction: row;
  }
}

.smi-news__content {
  display: flex;
  flex-direction: column;
}

.smi-news__content__img {
  width: 100%;
  max-width: 550px;
  height: auto;
}

.smi-news__content__date {
  margin-top: 12px;
  margin-bottom: 16px;
}

.smi-news__content__buttons {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media @min580 {
    flex-direction: row;
  }
}


</style>
