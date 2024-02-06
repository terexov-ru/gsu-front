<template>
  <div class="course-coast">
    <div class="course-coast__item course-coast__item_big">
      <div class="text course-coast__item__name text_normal">
        Специализация
      </div>
      <div>
        <span v-for="spec in page.specs" class="text text_h3 course-coast__item__value">
        <!--        Лабораторная диагностика-->
        {{ spec }};
        </span>
      </div>
    </div>

    <div class="course-coast__item">
      <div class="text course-coast__item__name text_normal">
        Кол-во часов
      </div>
      <div class="text text_h3 course-coast__item__value">
        {{ page.duration }}
      </div>
    </div>

    <div class="course-coast__item">
      <div class="text course-coast__item__name text_normal">
        Стоимость курса
      </div>
      <div class="text text_h3 course-coast__item__value">
        {{ page.price }}
      </div>
    </div>

    <div class="course-coast__item course-coast__item_big">
      <div class="text course-coast__item__name text_normal">
        Категория слушателей
      </div>
      <div class="text text_normal">
        {{ page.student_category }}
      </div>

      <div class="text course-coast__item__name text_normal course-coast__item__name_margin">
        Итоговая аттестация
      </div>
      <div class="text text_normal">
        {{ page.exam }}
      </div>

      <div class="text course-coast__item__name text_normal course-coast__item__name_margin">
        Документ, выдаваемый после обучения
      </div>
      <div class="text text_normal">
        {{ page.document }}
      </div>

      <div class="text course-coast__item__name text_normal course-coast__item__name_margin">
        Форма обучения
      </div>
      <div class="text text_normal">
        {{ page.learning_format }}
      </div>
    </div>

    <div class="course-coast__buttons course-coast__item_big">
      <NuxtLink
          to="/basket"
          @click="addToBasket(page)"
          class="width"
      >
        <button class="button button_black-bordered button_fill">
          Записаться
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import {toValue} from "vue";
import ProgramCardTip from "./ProgramCardTip.vue";

export default {
  components: {ProgramCardTip},
  props: {
    page: {
      type: Object,
      require: true,
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

.width {
  width: 100%;
}

.course-coast {
  width: auto;
  height: fit-content;

  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;
}

.course-coast__item {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  box-sizing: border-box;
  padding: 20px;

  background: @LightGreyColor;
  border-radius: 12px;

  &_big {
    grid-column: 1 / 3;
  }
}

.course-coast__item__name {
  color: @MidGreyColor;

  &_margin {
    margin-top: 16px;
  }
}

.course-coast__buttons {
  display: flex;
  gap: 12px;

  @media @min990 {
    width: 440px;
    justify-self: flex-end;
  }
}
</style>
