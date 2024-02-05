<template>
  <main class="home-page">

    <MissionSlider class="mission-block"/>

    <ProgramSearchBlock class="search-block"/>

    <ReviewBlock
        class="review-block"
        :reviews="page.reviews"
    />

    <NewsBlock
        class="news-block"
        :news="page.news[0].slice(0, 3)"
    />

    <AdvantagesSlider
        class="advantages-block"
    />

    <SummaryBlock
        class="summary-block"
        :info="page.block_info"
    />

    <QuestionSlider class="question-block"/>

  </main>
</template>
<script setup>
import {toValue} from "vue";

const {simpleGet: simpleGet} = useApi();

const {data: data} = await simpleGet('/page/main');

const page = toValue(data).page;

</script>

<style lang="less" scoped>
@import "assets/core.less";

.home-page {
  @media @min1200 {
    margin-top: 40px;
  }

  @media @min1400 {
    margin-top: 60px;
  }
}

.mission-block {


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
