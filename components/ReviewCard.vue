<template>
  <div class="review">
    <div class="review__profile">
      <div class="info">
        <div class="text text_h4">{{ item.name }}</div>
        <div class="tip review__tip tip_accent tip_small">{{ item.spec }}</div>
      </div>
      <div class="avatar">
        <div class="avatar__circle"/>
        <div class="avatar__img-container">
          <img class="avatar__img" :src="item.image" alt="лицо">
        </div>
      </div>
    </div>

    <div class="text review__text text_normal">
      {{ item.text }}
    </div>

    <div class="link review__link">
      Читать полностью
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

@CircleColor: #BDE9FF;

.review {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;

  overflow: hidden;

  border: solid 1px @MidGreyColor;
  border-radius: 8px;
}

.review__profile {
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-end;
}

.review__tip {
  margin-top: 8px;
}

.avatar {
  position: relative;
}

.avatar__img-container {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  z-index: 100;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background: @MidGreyColor;
}

.avatar__img {
  width: auto;
  height: 100%;
}

.avatar__circle {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 22px;

  top: -8px;
  left: -10px;

  background: @CircleColor;
  z-index: 10;
}

.review__text {
  margin-top: 24px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: inherit; // количество строк
  -webkit-box-orient: vertical;
}

.review__link {
  color: @MidGreyColor;
  text-decoration: underline;
  margin-top: 4px;
}
</style>
