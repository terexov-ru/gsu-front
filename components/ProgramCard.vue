<template>
  <div class="card">

    <CardTipList
      :tips="tips"
    />

    <h3 class="card__title text text_h3 text_dark">
      {{ title }}
    </h3>

    <div class="card__buttons">
      <button class="button button_dark">В корзину</button>
      <button class="button button_black-bordered">Подробнее</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgramCard",
  props: {
    title: {
      type: String,
      require: true,
    },
    tips: {
      type: Array
    },
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.card {
  box-sizing: border-box;
  padding: 12px;
  height: auto;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  border-radius: 8px;
  background: @LightGreyColor;

  @media @min760 {
    padding: 20px;
  }
}

.card__buttons {
  display: flex;
  gap: 12px;
  flex-direction: column;

  @media @min1200 {
    flex-direction: row;
  }
}

.card__title {
  margin-top: 10%;
  margin-bottom: 15%;

  @media @min580 {
    margin-top: 15%;
    margin-bottom: 25%;
  }

  @media @min990 {
    margin-top: 20%;
    margin-bottom: 35%;
  }
}

.card__tip-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

</style>
