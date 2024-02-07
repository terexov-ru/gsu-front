<template>
  <div class="course">
    <div class="course__img-container">
      <img
          v-if="course && course.banner_image"
          :src="course.banner_image"
          class="course__img"
          alt="course">
    </div>

    <div class="course__info">
      <div>
        <div>
          <div class="text text_h3">{{ course.title }}</div>
          <CardTipList
              class="course__info__card-list"
              :tips="course.specs"
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
          <div class="text text_h4">{{ course.price }} ₽</div>
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
import {toValue} from "vue";

export default {
  props: {
    course: {
      type: Object,
      require: true,
      default: {}
    },
  },
  setup() {
    const basket = useState('basket');
    return {
      basket
    }
  },
  methods: {
    addToBasket(course) {
      const basket = toValue(this.basket);
      if (basket.length > 0) {
        if (!basket.find((element) => element.id === course.id)){
          this.basket.value = basket.push(course);
        }
      } else {
        this.basket.value = basket.push(course);
      }
    }
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
  height: 100%;
  width: auto;
}

.course__img-container {
  background: @DarkGreyColor;
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
