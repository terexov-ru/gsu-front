<template>
  <div class="course">
    <div class="course__img">

    </div>

    <div class="course__info">
      <div>
        <div>
          <div class="text text_h3">{{ test.title }}</div>
          <CardTipList
              class="course__info__card-list"
              :tips="course.tips"
          />
        </div>

        <DetailsInfo
            :text="test.description"
            class="details"
        />
      </div>

      <div class="course__info__sale">
        <div class="price">
          <div class="text text_normal text_light">Стоимость курса</div>
          <div class="text text_h4">{{ test.price }} ₽</div>
        </div>
        <div class="buttons">
          <div class="button course__info__sale__button button_black-bordered button_size">
            <NuxtLink :to="`/courses/${test.id}`">
              Подробнее
            </NuxtLink>
          </div>
          <div class="button course__info__sale__button button_gradient button_size">Записаться</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      course: {
        id: 0,
        title: 'Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19',
        description: 'Вебинары образовательного проекта Level One — современный формат интеллектуального досуга, который будет\n' +
            '        интересен всем, кто хочет узнать что-то новое. Всего за пару часов вы совершите путешествие в увлекательный мир\n' +
            '        науки и искусства. Талантливые лекторы поделятся своими знаниями, доступно расскажут о важных научных открытиях\n' +
            '        и расширят ваш кругозор.',
        price: 20000,
        tips: [{id: 0, text: "36 часов", active: true}, {id: 1, text: "лабораторная диагностика"}, {id: 2, text: "Бактериология"}],
      }
    }
  },
  props: {
    test: {
      type: Object,
      require: true
    },
  },
  mounted() {
    console.log(this.test);
  }
}
</script>

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
  flex: 1;
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
