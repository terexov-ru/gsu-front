<template>
  <div class="wrapper">
    <div class="slider">

      <h2 class="slider__title">
        Учитесь выгодно!
      </h2>

      <div class="text slider__text text_h4">С нашей системой лояльности вы сможете сэкономить до 30% от стоимости</div>

      <div style="flex-basis: 100%"/>
      <button class="button slider__button button_white button_size">
        Узнать больше
      </button>


      <div class="card-list">
        <div class="card card_1">
          <div class="text title">Бонусная программа «Отзыв»</div>
          <div class="text card__text">Оставьте свой отзыв после пройденного обучения и получите скидку 15% на следующую
            покупку!
          </div>
        </div>
        <div class="card card_2">
          <div class="text title">Карта лояльности «Вместе»</div>
          <div class="text card__text">Пригласите друга, и после его успешного обучения получите возможность пройти
            курсы бесплатно!
          </div>
        </div>
        <div class="card card_3">
          <div class="text title">Программа лояльности «Гарант»</div>
          <div class="text card__text">Возвращает 10% от стоимости обучения в виде баллов, которые можно потратить на
            оплату следующего обучения!
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="less" scoped>
@import "assets/core.less";

.slider {
  position: relative;
  border-radius: 0;
  background: linear-gradient(263.66deg, #7CF8E1 1.1%, #46B2FF 99.77%);
  overflow: initial;
}

.slider__text {
  color: @WhiteColor;
  margin-top: 4px;

  max-width: 100%;

  @media @min580 {
    max-width: 50%;
  }

  @media @min760 {
    margin-top: 12px;
    max-width: 46%;
  }

}

.slider__button {
  @media (max-width: 580px) {
    width: 170px;
  }
}

.card-list {
  position: absolute;
  top: 0;
  display: none;

  @media @min580 {
    display: block;
    right: 10px;
    top: -10px;
  }

  @media @min760 {
    right: 40px;
  }

  @media @min990 {
    right: 20px;
  }

  @media @min1200 {
    right: 90px;
  }
}

.card {
  position: absolute;
  display: flex;
  box-sizing: border-box;

  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  border-radius: 11.979px;
  background: linear-gradient(290deg, #FFF 3.4%, #EFF6FA 100%);
  box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 0.10);

  width: 210px;
  height: 130px;
  padding: 12px 15px;

  @media @min990 {
    width: 280px;
    height: 170px;
    padding: 16px 20px 0 20px;
  }

  &_1 {
    z-index: 5;
    right: 0;
    top: -10px;

    @media @min990 {
      top: -15px;
    }
  }

  &_2 {
    top: 60px;
    right: 70px;
    z-index: 10;

    @media @min760 {
      right: 90px;
    }

    @media @min990 {
      top: 75px;
      right: 150px;
    }
  }

  &_3 {
    top: 125px;
    right: 150px;
    z-index: 15;

    @media @min760 {
      top: 125px;
      right: 180px;
    }


    @media @min990 {
      top: 170px;
      right: 260px;
    }
  }

  .title {
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;

    @media @min990 {
      font-size: 16px;
      line-height: 24px;
    }

  }

  .card__text {
    font-size: 9px;
    font-weight: 400;
    line-height: 12px;

    @media @min990 {
      font-size: 12px;
      line-height: 16px;
    }
  }
}


</style>
