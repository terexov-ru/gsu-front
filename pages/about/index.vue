<template>
  <div class="wrapper wrapper_paddings">
    <div class="about-block">

      <h1 class="text text_h2">{{ page.title }}</h1>

      <div class="about-block__container">
        <div class="about-block__img-container">
          <img class="about-block__img" src="~/assets/about.png" alt="">
        </div>

        <div class="about-block__description">
          <h3 class="text text_h3">
            {{ page.description.title }}
          </h3>
          <p class="text text_normal">
            {{ page.description.text }}
          </p>
        </div>
      </div>
    </div>

    <SummaryCard class="summary"/>

    <QuestionSlider class="questions"/>

  </div>
</template>

<script setup>
const {getAbout} = useApi();

const {data} = await getAbout();

const page = data.value?.page;

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
