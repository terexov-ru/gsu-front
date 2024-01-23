<template>
  <div class="review">
    <div class="review__profile">
      <div class="info">
        <div class="text text_h4">Анастасия Ж.</div>
        <div class="tip review__tip tip_accent tip_small">Бактериология</div>
      </div>
      <div class="avatar">
        <div class="avatar__circle"></div>
        <div class="avatar__img"></div>
      </div>
    </div>

    <div class="text review__text text_normal">
      В этом университете меня поразил высокий профессионализм преподавателей и медицинских экспертов, которые вели
      наши занятия. Они обладали огромным опытом и глубоким знанием в своей области, и их преподавательский стиль
      позволял нам легко усваивать сложные медицинские концепции. Особенно мне запомнились практические занятия, во
      время которых мы могли применить полученные знания на практике. Они обладали огромным опытом и глубоким знанием
      в своей области, и их преподавательский стиль позволял нам легко усваивать сложные медицинские концепции.
      Особенно мне запомнились практические занятия
    </div>

    <div class="link review__link">
      Читать полностью
    </div>
  </div>
</template>

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

.avatar__img {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  z-index: 100;

  background: @MidGreyColor;
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
