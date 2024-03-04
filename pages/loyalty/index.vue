<template>
  <div class="wrapper wrapper_paddings">
    <div class="loyalty-block">
      <h2 class="text text_h2">Программы лояльности</h2>

      <div class="loyalty">

        <div
            v-for="item in list"
            :key="item.id"
            class="loyalty__card"
        >

          <img class="loyalty__card__img" :src="item.image">
          <div class="loyalty__card__content">
            <div class="text text_h3">{{ item.title }}</div>
            <div class="text text_normal">
              {{ item.description }}
            </div>
          </div>

          <button
              @click="formActive = true"
              class="button loyalty__card__button button_gradient">
            Подключиться
          </button>
        </div>

      </div>

      <QuestionSlider
          :banner="data.page.banner"
          @success="sucActive = true"
          class="question-block"
      />

    </div>
  </div>

  <OverflowContainer
      :active="formActive"
      @closeOverflow="formActive = false"
  >
    <OverflowMoreInfo
        @close="formActive = false"
    />
  </OverflowContainer>

  <OverflowContainer
      :active="sucActive"
      @closeOverflow="sucActive = false"
  >
    <OverflowSuccess
        @close="sucActive = false"
    />
  </OverflowContainer>
</template>
<script setup>
import {ref} from "vue";

const {simpleGet: simpleGet} = useApi();

const formActive = ref(false);
const sucActive = ref(false);

const {data: data} = await simpleGet('/page/loyalties');
const list = toValue(data).page.loyalties;
</script>

<style lang="less" scoped>
@import "assets/core.less";

.loyalty-block {
  margin-top: 80px;
}

.question-block {
  margin-top: 120px;
  margin-bottom: 120px;
}

.loyalty {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media @min1200 {
    flex-direction: row;
  }
}

.loyalty__card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;

  box-sizing: border-box;
  padding: 20px;

  border-radius: 8px;
  border: solid 1px @MidGreyColor;

  @media @min580 {
    gap: 40px;
    flex-direction: row;
  }

  @media @min1200 {
    flex-direction: column;
  }
}

.loyalty__card__img {
  height: min-content;
  max-width: 320px;

  @media @min1200 {
    max-width: 350px;
  }
}

.loyalty__card__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.loyalty__card__button {
  align-self: flex-end;

  @media @min580 {
    max-width: 300px;
  }

  @media @min1200 {
    max-width: none;
  }
}

</style>
