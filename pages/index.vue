<template>
  <main class="home-page">

    <MissionSlider class="mission-block"/>

    <ProgramSearchBlock class="search-block"/>

    <ReviewBlock class="review-block"/>

    <NewsBlock class="news-block"/>

    <AdvantagesSlider class="advantages-block"/>

    <SummaryBlock class="summary-block"/>

    <QuestionSlider class="question-block"/>

  </main>
</template>

<style lang="less" scoped>
@import "assets/core.less";

.home-page {

}

.mission-block {

  @media @min1200 {
    margin-top: 40px;
  }

  @media @min1400 {
    margin-top: 60px;
  }
}

.search-block {
  margin-top: 40px;

  @media @min760 {
    margin-top: 80px;
  }
}

.review-block {
  margin-top: 60px;

  @media @min760 {
    margin-top: 125px;
  }
}

.advantages-block {
  margin-top: 70px;

  @media @min760 {
    margin-top: 140px;
  }
}

.news-block {
  margin-top: 60px;

  @media @min580 {
    margin-top: 70px;
  }

  @media @min760 {
    margin-top: 150px;
  }

  @media @min990 {
    margin-top: 150px;
  }

  @media @min1200 {
    margin-top: 130px;
  }
}

.summary-block {
  margin-top: 60px;

  @media @min990 {
    margin-top: 120px;
  }

  @media @min1200 {
    margin-top: 130px;
  }
}

.question-block {
  margin-top: 60px;
  //TODO убрать
  margin-bottom: 120px;

  @media @min760 {
    margin-top: 140px;
  }
}

</style>
