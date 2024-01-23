<template>
  <div class="course">
    <div class="course__img">

    </div>

    <div class="course__info">
      <div>
        <div>
          <div class="text text_h3">Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19</div>
          <CardTipList
              class="course__info__card-list"
              :tips="tips"
          />
        </div>

        <DetailsInfo class="details"/>

      </div>

      <div class="course__info__sale">
        <div class="price">
          <div class="text text_normal text_light">Стоимость курса</div>
          <div class="text text_h4">20 000 ₽</div>
        </div>
        <div class="buttons">
          <div class="button course__info__sale__button button_black-bordered button_size">В корзину</div>
          <div class="button course__info__sale__button button_gradient button_size">Купить сейчас</div>
        </div>
      </div>
    </div>

  </div>
</template>

<!--<script>-->
<!--import CardTipList from "@/components/cards/programm/CardTipList";-->
<!--import DetailsInfo from "@/components/details/DetailsInfo";-->

<!--export default {-->
<!--  name: "CourseCard",-->
<!--  components: {DetailsInfo, CardTipList},-->
<!--  data() {-->
<!--    return {-->
<!--      tips: [{id: 0, text: "36 часов", active: true}, {id: 1, text: "лабораторная диагностика"}, {-->
<!--        id: 2,-->
<!--        text: "Бактериология"-->
<!--      }]-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
@import "assets/core.less";

.course {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;

  box-sizing: border-box;
  padding: 12px;
  overflow: hidden;

  background: @LightGreyColor;
  border-radius: 12px;

  @media @min580 {
    flex-direction: row;
  }

  @media @min760 {
    padding: 20px;
  }
}

.course__img {
  background: @DarkGreyColor;
  border-radius: 4px;
  flex-shrink: 0;

  width: 100%;
  height: 240px;

  @media @min580 {
    width: 200px;
    height: 150px;
  }

  @media @min760 {
    width: 320px;
    height: 240px;
  }
}

.course__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.details {
  margin-top: 40px;
  margin-bottom: 20px;
  @media @min1200 {
    margin-bottom: 0;
  }
}

.course__info__card-list {
  margin-top: 12px;
}

.course__info__sale {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;

  @media @min990 {
    flex-direction: row;
    align-items: flex-end;
  }

  .buttons {
    display: flex;
    gap: 12px;
    flex-direction: column;
    width: 100%;

    @media @min580 {
      width: initial;
      flex-direction: row;
    }
  }


}

.course__info__sale__button {
  width: 100%;

  @media @min580 {
    width: 150px;
    height: 40px;
    font-size: 15px;
  }

  @media @min760 {
    width: 170px;
    height: 44px;
    font-size: 16px;
  }
}
</style>
