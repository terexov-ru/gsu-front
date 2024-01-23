<template>
  <div class="wrapper wrapper_paddings">
    <div class="about-block">

      <h1 class="text text_h2">О компании «Гарант сервис университет»</h1>

      <div class="about-block__container">
        <div class="about-block__img-container">
          <img class="about-block__img" src="~/assets/about.png" alt="">
        </div>

        <div class="about-block__description">
          <h3 class="text text_h3">Наша миссия — сделать образование доступным и удобным</h3>
          <p class="text text_normal">Гарант Сервис Университет - организация, осуществляющая деятельность в сфере
            дополнительного профессионального образования и являющаяся официальным провайдером образовательных
            мероприятий непрерывного медицинского и фармацевтического образования (НМиФО).
          </p>
          <p class="text text_normal">
            Гарант Сервис Университет опирается на самые современные научные исследования, руководства, нормативные
            правовые акты и предоставляет исключительно достоверную и актуальную информацию в сфере образования. В
            организации обучается более 4000 медицинских учреждений и специалистов, перечень которых непрерывно растёт.
          </p>
        </div>
      </div>
    </div>

    <SummaryCard class="summary"/>

    <QuestionSlider class="questions"/>

  </div>
</template>

<script>
export default {
  name: "AboutPage",
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.about-block {
  margin-top: 80px;
}

.summary {
  margin-top: 60px;
}

.questions {
  margin-top: 120px;
  margin-bottom: 120px;
}

.about-block__container {
  width: auto;
  height: auto;
}

.about-block__description {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: auto;
  width: 100%;

  @media @min760 {
    width: 560px;
  }

  @media @min1200 {
    gap: 20px;
  }
}

.about-block__img {
  width: 100%;
  height: auto;
}

.about-block__container {
  margin-top: 40px;
  display: flex;

  flex-direction: column;
  gap: 20px;


  @media @min760 {
    justify-content: space-between;
    flex-direction: row;
    gap: 32px;
  }

  @media @min1200 {
    gap: 40px;
  }
}

</style>
