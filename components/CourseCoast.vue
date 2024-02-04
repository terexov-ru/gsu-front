<template>
  <div class="course-coast">

    <div class="course-coast__item course-coast__item_big">
      <div class="text course-coast__item__name text_normal">
        Специализация
      </div>
      <div v-if="page.specs > 0">
        <span v-for="spec in page.specs" class="text text_h3 course-coast__item__value">
        <!--        Лабораторная диагностика-->
        {{ spec }};
        </span>
      </div>
      <div v-else class="text text_h3 course-coast__item__value">
        Подходит для всех
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

      <div class="text course-coast__item__name text_normal">
        Итоговая аттестация
      </div>
      <div class="text text_normal">
        {{ page.exam }}
      </div>

      <div class="text course-coast__item__name text_normal">
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
      <button class="button button_black-bordered button_fill">
        Записаться
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      require: true,
    }
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

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
    margin-top: 32px;
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
