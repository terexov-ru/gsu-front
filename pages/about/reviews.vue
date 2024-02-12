<template>
  <div class="wrapper reviews-block wrapper_paddings">

    <h2 class="text text_h2">Отзывы</h2>

    <div class="radio-button radio-button_margins">
      <div class="radio-button__hover"
           :class="[{'radio-button__hover_1' : active === 0}, {'radio-button__hover_2' : active === 1}]"
      />

      <div @click="active = 0"
           class="text radio-button__text text_normal radio-button__text_left"
           :class="{'radio-button__text_active' : active === 0}">
        Отзывы
      </div>

      <div @click="active = 1"
           class="text radio-button__text text_normal radio-button__text_right"
           :class="{'radio-button__text_active' : active === 1}">
        Благодарности
      </div>
    </div>

    <div v-if="active === 0">
      <div class="reviews">

        <div v-for="rev in reviews" :key="rev.id" class="reviews__card">
          <div class="reviews__card__info">
            <div class="row">
              <div class="reviews__card__info__img-container">
                <img :src="rev.image" class="reviews__card__info__img"/>
              </div>
              <div class="column column_gap8">
                <div class="text text_h4">{{ rev.name }}</div>
                <ProgramCardTip
                    :text="rev.spec"
                />
                <div class="stars">
                  <svg width="136" height="24" viewBox="0 0 136 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.2668 2.25662C11.4976 1.54633 12.5024 1.54633 12.7332 2.25662L14.5211 7.75908C14.6243 8.07673 14.9203 8.2918 15.2543 8.2918H21.0399C21.7868 8.2918 22.0973 9.24748 21.4931 9.68646L16.8124 13.0872C16.5422 13.2835 16.4291 13.6315 16.5323 13.9491L18.3202 19.4516C18.551 20.1619 17.738 20.7525 17.1338 20.3135L12.4532 16.9128C12.1829 16.7165 11.8171 16.7165 11.5468 16.9128L6.86617 20.3135C6.26197 20.7525 5.44901 20.1619 5.6798 19.4516L7.46765 13.9491C7.57087 13.6315 7.4578 13.2835 7.18759 13.0872L2.50692 9.68646C1.90271 9.24748 2.21323 8.2918 2.96007 8.2918H8.7457C9.0797 8.2918 9.37571 8.07673 9.47892 7.75908L11.2668 2.25662Z"
                        v-if="rev.star_rating > 0"
                        fill="#F7D41B"/>
                    <path
                        d="M11.2668 2.25662C11.4976 1.54633 12.5024 1.54633 12.7332 2.25662L14.5211 7.75908C14.6243 8.07673 14.9203 8.2918 15.2543 8.2918H21.0399C21.7868 8.2918 22.0973 9.24748 21.4931 9.68646L16.8124 13.0872C16.5422 13.2835 16.4291 13.6315 16.5323 13.9491L18.3202 19.4516C18.551 20.1619 17.738 20.7525 17.1338 20.3135L12.4532 16.9128C12.1829 16.7165 11.8171 16.7165 11.5468 16.9128L6.86617 20.3135C6.26197 20.7525 5.44901 20.1619 5.6798 19.4516L7.46765 13.9491C7.57087 13.6315 7.4578 13.2835 7.18759 13.0872L2.50692 9.68646C1.90271 9.24748 2.21323 8.2918 2.96007 8.2918H8.7457C9.0797 8.2918 9.37571 8.07673 9.47892 7.75908L11.2668 2.25662Z"
                        v-else
                        fill="#A0A09F"/>
                    <path
                        d="M39.2668 2.25662C39.4976 1.54633 40.5024 1.54633 40.7332 2.25662L42.5211 7.75908C42.6243 8.07673 42.9203 8.2918 43.2543 8.2918H49.0399C49.7868 8.2918 50.0973 9.24748 49.4931 9.68646L44.8124 13.0872C44.5422 13.2835 44.4291 13.6315 44.5323 13.9491L46.3202 19.4516C46.551 20.1619 45.738 20.7525 45.1338 20.3135L40.4532 16.9128C40.1829 16.7165 39.8171 16.7165 39.5468 16.9128L34.8662 20.3135C34.262 20.7525 33.449 20.1619 33.6798 19.4516L35.4677 13.9491C35.5709 13.6315 35.4578 13.2835 35.1876 13.0872L30.5069 9.68646C29.9027 9.24748 30.2132 8.2918 30.9601 8.2918H36.7457C37.0797 8.2918 37.3757 8.07673 37.4789 7.75908L39.2668 2.25662Z"
                        v-if="rev.star_rating > 1"
                        fill="#F7D41B"/>
                    <path
                        d="M39.2668 2.25662C39.4976 1.54633 40.5024 1.54633 40.7332 2.25662L42.5211 7.75908C42.6243 8.07673 42.9203 8.2918 43.2543 8.2918H49.0399C49.7868 8.2918 50.0973 9.24748 49.4931 9.68646L44.8124 13.0872C44.5422 13.2835 44.4291 13.6315 44.5323 13.9491L46.3202 19.4516C46.551 20.1619 45.738 20.7525 45.1338 20.3135L40.4532 16.9128C40.1829 16.7165 39.8171 16.7165 39.5468 16.9128L34.8662 20.3135C34.262 20.7525 33.449 20.1619 33.6798 19.4516L35.4677 13.9491C35.5709 13.6315 35.4578 13.2835 35.1876 13.0872L30.5069 9.68646C29.9027 9.24748 30.2132 8.2918 30.9601 8.2918H36.7457C37.0797 8.2918 37.3757 8.07673 37.4789 7.75908L39.2668 2.25662Z"
                        v-else
                        fill="#A0A09F"/>
                    <path
                        d="M67.2668 2.25662C67.4976 1.54633 68.5024 1.54633 68.7332 2.25662L70.5211 7.75908C70.6243 8.07673 70.9203 8.2918 71.2543 8.2918H77.0399C77.7868 8.2918 78.0973 9.24748 77.4931 9.68646L72.8124 13.0872C72.5422 13.2835 72.4291 13.6315 72.5323 13.9491L74.3202 19.4516C74.551 20.1619 73.738 20.7525 73.1338 20.3135L68.4532 16.9128C68.1829 16.7165 67.8171 16.7165 67.5468 16.9128L62.8662 20.3135C62.262 20.7525 61.449 20.1619 61.6798 19.4516L63.4677 13.9491C63.5709 13.6315 63.4578 13.2835 63.1876 13.0872L58.5069 9.68646C57.9027 9.24748 58.2132 8.2918 58.9601 8.2918H64.7457C65.0797 8.2918 65.3757 8.07673 65.4789 7.75908L67.2668 2.25662Z"
                        v-if="rev.star_rating > 2"
                        fill="#F7D41B"/>
                    <path
                        d="M67.2668 2.25662C67.4976 1.54633 68.5024 1.54633 68.7332 2.25662L70.5211 7.75908C70.6243 8.07673 70.9203 8.2918 71.2543 8.2918H77.0399C77.7868 8.2918 78.0973 9.24748 77.4931 9.68646L72.8124 13.0872C72.5422 13.2835 72.4291 13.6315 72.5323 13.9491L74.3202 19.4516C74.551 20.1619 73.738 20.7525 73.1338 20.3135L68.4532 16.9128C68.1829 16.7165 67.8171 16.7165 67.5468 16.9128L62.8662 20.3135C62.262 20.7525 61.449 20.1619 61.6798 19.4516L63.4677 13.9491C63.5709 13.6315 63.4578 13.2835 63.1876 13.0872L58.5069 9.68646C57.9027 9.24748 58.2132 8.2918 58.9601 8.2918H64.7457C65.0797 8.2918 65.3757 8.07673 65.4789 7.75908L67.2668 2.25662Z"
                        v-else
                        fill="#A0A09F"/>
                    <path
                        d="M95.2668 2.25662C95.4976 1.54633 96.5024 1.54633 96.7332 2.25662L98.5211 7.75908C98.6243 8.07673 98.9203 8.2918 99.2543 8.2918H105.04C105.787 8.2918 106.097 9.24748 105.493 9.68646L100.812 13.0872C100.542 13.2835 100.429 13.6315 100.532 13.9491L102.32 19.4516C102.551 20.1619 101.738 20.7525 101.134 20.3135L96.4532 16.9128C96.1829 16.7165 95.8171 16.7165 95.5468 16.9128L90.8662 20.3135C90.262 20.7525 89.449 20.1619 89.6798 19.4516L91.4677 13.9491C91.5709 13.6315 91.4578 13.2835 91.1876 13.0872L86.5069 9.68646C85.9027 9.24748 86.2132 8.2918 86.9601 8.2918H92.7457C93.0797 8.2918 93.3757 8.07673 93.4789 7.75908L95.2668 2.25662Z"
                        v-if="rev.star_rating > 3"
                        fill="#F7D41B"/>
                    <path
                        d="M95.2668 2.25662C95.4976 1.54633 96.5024 1.54633 96.7332 2.25662L98.5211 7.75908C98.6243 8.07673 98.9203 8.2918 99.2543 8.2918H105.04C105.787 8.2918 106.097 9.24748 105.493 9.68646L100.812 13.0872C100.542 13.2835 100.429 13.6315 100.532 13.9491L102.32 19.4516C102.551 20.1619 101.738 20.7525 101.134 20.3135L96.4532 16.9128C96.1829 16.7165 95.8171 16.7165 95.5468 16.9128L90.8662 20.3135C90.262 20.7525 89.449 20.1619 89.6798 19.4516L91.4677 13.9491C91.5709 13.6315 91.4578 13.2835 91.1876 13.0872L86.5069 9.68646C85.9027 9.24748 86.2132 8.2918 86.9601 8.2918H92.7457C93.0797 8.2918 93.3757 8.07673 93.4789 7.75908L95.2668 2.25662Z"
                        v-else
                        fill="#A0A09F"/>
                    <path
                        d="M123.267 2.25662C123.498 1.54633 124.502 1.54633 124.733 2.25662L126.521 7.75908C126.624 8.07673 126.92 8.2918 127.254 8.2918H133.04C133.787 8.2918 134.097 9.24748 133.493 9.68646L128.812 13.0872C128.542 13.2835 128.429 13.6315 128.532 13.9491L130.32 19.4516C130.551 20.1619 129.738 20.7525 129.134 20.3135L124.453 16.9128C124.183 16.7165 123.817 16.7165 123.547 16.9128L118.866 20.3135C118.262 20.7525 117.449 20.1619 117.68 19.4516L119.468 13.9491C119.571 13.6315 119.458 13.2835 119.188 13.0872L114.507 9.68646C113.903 9.24748 114.213 8.2918 114.96 8.2918H120.746C121.08 8.2918 121.376 8.07673 121.479 7.75908L123.267 2.25662Z"
                        v-if="rev.star_rating > 4"
                        fill="#A0A09F"/>
                    <path
                        d="M123.267 2.25662C123.498 1.54633 124.502 1.54633 124.733 2.25662L126.521 7.75908C126.624 8.07673 126.92 8.2918 127.254 8.2918H133.04C133.787 8.2918 134.097 9.24748 133.493 9.68646L128.812 13.0872C128.542 13.2835 128.429 13.6315 128.532 13.9491L130.32 19.4516C130.551 20.1619 129.738 20.7525 129.134 20.3135L124.453 16.9128C124.183 16.7165 123.817 16.7165 123.547 16.9128L118.866 20.3135C118.262 20.7525 117.449 20.1619 117.68 19.4516L119.468 13.9491C119.571 13.6315 119.458 13.2835 119.188 13.0872L114.507 9.68646C113.903 9.24748 114.213 8.2918 114.96 8.2918H120.746C121.08 8.2918 121.376 8.07673 121.479 7.75908L123.267 2.25662Z"
                        v-else
                        fill="#A0A09F"/>
                  </svg>
                </div>
              </div>
            </div>
            <div class="text reviews__card__info__data text_normal text_light">
              {{ rev.date }}
            </div>
          </div>
          <div class="reviews__card__text">
            <div class="text reviews__card__text__title text_h3">Заголовок</div>
            <div class="text text_normal">
              {{ rev.text }}
            </div>
          </div>
        </div>

      </div>

      <div class="pagination">
        <PaginationBar
            :size="5"
            :count="42"
            :page="1"
            @ChangePage="changePage"
        />
      </div>

    </div>

    <div v-if="active === 1">
      <div class="thanks">

        <div
            v-for="th in thanks"
            :key="th.id"
            class="thanks-card"
        >
          <div class="thanks-card__img-container">
            <img class="thanks-card__img" src="~/assets/thanks.png"/>
          </div>

          <div class="column thanks-card__content column_gap40">
            <div class="column column_gap16">
              <div class="text text_h3">{{ th.title }}</div>
              <div class="text text_normal"> {{ th.text }}</div>
            </div>


            <div class="row row_gap10">
              <div class="avatar__img-container">
                <img class="avatar__img" src="~/assets/reviews.png">
              </div>
              <div class="column row_jc-sb row_fill">
                <div class="text text_h4">{{ th.name }}</div>
                <div class="row row_jc-sb">
                  <div class="text text_normal">{{ th.job }}</div>
                  <div class="text text_normal text_light">{{ th.date }}</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
const {getRevs: getRevs} = useApi();
const {data: data} = await getRevs(0, 10);

const thanks = [
  {
    id: 0,
    title: 'Заголовок',
    text: 'В этом университете меня поразил высокий профессионализм преподавателей и медицинских экспертов, которые вели наши занятия. Они обладали огромным опытом и глубоким знанием в своей области, и их преподавательский стиль позволял нам легко усваивать сложные медицинские концепции. Особенно мне запомнились практические занятия. В этом университете меня поразил высокий профессионализм преподавателей и медицинских экспертов, которые вели наши занятия.  Они обладали огромным опытом и глубоким знанием в своей области, и их преподавательский стиль позволял нам легко усваивать сложные медицинские концепции. Особенно мне запомнились практические занятия.',
    name: 'Анастасия Ж.',
    image: '',
    imageSer: '',
    date: '28.03.2022',
    job: 'Генеральный директор “Название компании”'
  },
  {
    id: 2,
    title: 'Заголовок',
    text: 'В этом университете меня поразил высокий профессионализм преподавателей и медицинских экспертов, которые вели наши занятия. Они обладали огромным опытом и глубоким знанием в своей области, и их преподавательский стиль позволял нам легко усваивать сложные медицинские концепции. Особенно мне запомнились практические занятия. В этом университете меня поразил высокий профессионализм преподавателей и медицинских экспертов, которые вели наши занятия.  Они обладали огромным опытом и глубоким знанием в своей области, и их преподавательский стиль позволял нам легко усваивать сложные медицинские концепции. Особенно мне запомнились практические занятия.',
    name: 'Анастасия Ж.',
    image: '',
    imageSer: '',
    date: '28.03.2022',
    job: 'Генеральный директор “Название компании”'
  }
]


const page = ref(toValue(data).page);
const reviews = ref(toValue(page).reviews);
const active = ref(0);

console.log(toValue(reviews));

</script>

<style lang="less" scoped>
@import "assets/core.less";

.reviews-block {
  margin-top: 80px;
  margin-bottom: 120px;
}

.reviews {
  display: flex;
  flex-direction: column;
  gap: 40px;

  margin-top: 40px;
}

.reviews__card {
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;

  box-sizing: border-box;
  padding-bottom: 20px;

  background: none;
  border-bottom: 1px solid @MidGreyColor;

  @media @min760 {
    flex-direction: row;
    gap: 60px;
  }
}

.reviews__card__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.reviews__card__info__img-container {
  width: 80px;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 16px;

  border-radius: 50%;
  overflow: hidden;
}

.reviews__card__info__img {
  width: auto;
  height: 100%;
}

.reviews__card__text {
  max-width: 800px;
}

.reviews__card__text__title {
  margin-bottom: 12px;

  @media @min760 {
    margin-bottom: 16px;
  }
}

// RADIO BUTTONS
.radio-button {
  position: relative;
  overflow: hidden;

  height: 44px;
  width: fit-content;

  box-sizing: border-box;
  padding: 10px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 42px;
  background: @LightGreyColor;
}

.radio-button_margins {
  margin-top: 40px;
  margin-bottom: 20px;
}

.radio-button__text {
  z-index: 10;
  color: @DarkGreyColor;
  transition: 150ms;
  width: 130px;
  cursor: pointer;

  &_left {
    padding-right: 10px;
    text-align: center;
  }

  &_center {
    text-align: center;
  }

  &_right {
    padding-left: 15px;
    text-align: center;
  }
}

.radio-button__text_active {
  color: @WhiteColor;
  transition: 150ms;
}

.radio-button__hover {
  position: absolute;
  left: 0;

  width: 50%;
  height: 100%;

  border-radius: inherit;
  background: @BluButtonGradient;

  transition: 150ms;
}

.radio-button__hover_1 {
  left: 0;
  transition: 150ms;
}

.radio-button__hover_2 {
  left: 50%;
  transition: 150ms;
}

//.radio-button__hover_3 {
//  left: 66%;
//  transition: 150ms;
//}

.radio-button__hover_active {
  left: 33%;
  transition: 150ms;
}

//thanks-card
.thanks {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.thanks-card {
  display: flex;
  justify-content: space-between;

  box-sizing: border-box;
  padding: 20px;

  background: @LightGreyColor;
}

.thanks-card__content {
  max-width: 800px;
  margin-left: 20px;
}

.thanks-card__img-container {
  max-height: 360px;
  max-width: 260px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.thanks-card__img {
  width: auto;
  height: 100%;
}

.avatar__img-container {
  width: 80px;
  height: 80px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 50%;

  flex-shrink: 0;

  background: @DarkGreyColor;
}

.avatar__img {
  width: 100%;
  height: auto;

}

</style>
