<template>
  <div class="course">
    <NuxtLink :to="`/courses/${course.id}`">
      <div class="course__img-container">
        <img
            v-if="course && course.banner_image"
            :src="course.banner_image"
            class="course__img"
            alt="course">

        <div
            v-if="course && course.tag"
            class="course__tag-container"
        >
          <div :style="{background: course.tag.color}" class="text course__tag text_semi-bold">
            {{ course.tag.title }}
          </div>
          <!--        <div class="text course__tag text_semi-bold">-->
          <!--          Скидка-->
          <!--        </div>-->
        </div>

      </div>
    </NuxtLink>

    <div class="course__info">
      <div>
        <div>
          <NuxtLink :to="`/courses/${course.id}`">
            <div class="text course__info__title text_h3">{{ course.title }}</div>
          </NuxtLink>
          <CardTipList
              class="course__info__card-list"
              :tips="course.specs"
              :time="course.duration"
          />
        </div>

        <DetailsInfo
            :text="course.description"
            class="details"
        />
      </div>

      <div class="course__info__sale">
        <div class="price">
          <div class="text text_normal text_light">Стоимость курса</div>

          <div class="row row_gap10 row_al-c" v-if="course.price_sale">
            <span class="text text_h4">{{ course.price_sale }} ₽</span>
            <span class="text text_semi-bold text_light text_margin text_through">{{ course.price }} ₽</span>
          </div>

          <div v-else>
            <span class="text text_h4">{{ course.price }} ₽</span>
          </div>

        </div>
        <div class="buttons">
          <NuxtLink :to="`/courses/${course.id}`">
            <div class="button course__info__sale__button button_black-bordered button_size">
              Подробнее
            </div>
          </NuxtLink>

          <NuxtLink
              to="/basket"
              @click="addToBasket(course)"
          >
            <div class="button course__info__sale__button button_gradient button_size">
              Записаться
            </div>
          </NuxtLink>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      require: true,
      default: {}
    },
  },
  setup() {
    const { addToBasket } = useUtils();
    return {
      addToBasket
    }
  },
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
  height: 100%;
  width: auto;
}

.course__img-container {
  position: relative;
  border-radius: 4px;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

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

.course__info__title {
  transition: @dur150;

  &:hover {
    color: @BlueNewColor;
    transition: @dur150;
  }
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

.course__tag-container {
  width: auto;
  position: absolute;

  display: flex;
  gap: 8px;

  bottom: 12px;
  left: 12px;
}

.course__tag {
  width: auto;
  height: auto;

  box-sizing: border-box;
  padding: 4px 16px;

  border-radius: 60px;

  color: @WhiteColor;
  background: @BlueNewColor;

  @media @min760 {
    padding: 4px 24px;
    bottom: 20px;
    left: 20px;
  }
}
</style>
