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

    <div
        class="course-coast__item course-coast__item_hours"
        :class="{ 'course-coast__item_hours-open': hoursDropdownActive }"
    >
      <div class="text course-coast__item__name text_normal">
        Кол-во часов
      </div>
      <div
          v-if="hasRelatedCourses"
          class="course-hours"
          v-click-outside="closeHoursDropdown"
      >
        <button
            class="text text_h3 course-coast__item__value course-hours__button"
            type="button"
            :aria-expanded="hoursDropdownActive.toString()"
            aria-label="Выбрать количество часов"
            @click="toggleHoursDropdown"
        >
          <span>{{ selectedCourseHours }}</span>
          <svg
              class="course-hours__icon"
              :class="{ 'course-hours__icon_open': hoursDropdownActive }"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
          >
            <path
                d="M7 9.19727L12 14.1973L17 9.19727"
                stroke="#B9BFC6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </button>

        <ul
            v-if="hoursDropdownActive"
            class="course-hours__list"
        >
          <li
              v-for="course in hourOptions"
              :key="course.id"
              class="course-hours__item"
          >
            <button
                class="text text_semi-bold course-hours__option"
                :class="{ 'text_accent': isCurrentCourse(course) }"
                type="button"
                @click="selectRelatedCourse(course)"
            >
              {{ formatHours(course.hours) }}
            </button>
          </li>
        </ul>
      </div>
      <div
          v-else
          class="text text_h3 course-coast__item__value"
      >
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

export default {
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
  data() {
    return {
      hoursDropdownActive: false,
    };
  },
  computed: {
    relatedCourses() {
      return Array.isArray(this.page?.related_courses)
          ? this.page.related_courses
          : [];
    },
    hasRelatedCourses() {
      return this.relatedCourses.length > 0;
    },
    currentCourseId() {
      return this.page?.id ?? this.$route?.params?.id;
    },
    selectedCourseHours() {
      return this.formatHours(this.page?.hours ?? this.page?.duration);
    },
    hourOptions() {
      const courses = [
        {
          id: this.currentCourseId,
          hours: this.page?.hours ?? this.page?.duration,
        },
        ...this.relatedCourses,
      ];

      return courses
          .filter((course) => course?.id !== undefined && course?.hours !== undefined)
          .filter((course, index, list) => (
              list.findIndex((item) => String(item.id) === String(course.id)) === index
          ));
    },
  },
  methods: {
    formatHours(hours) {
      return String(hours ?? "")
          .replace(/\s*час(ов|а)?\.?$/i, "")
          .trim();
    },
    isCurrentCourse(course) {
      return String(course?.id) === String(this.currentCourseId);
    },
    toggleHoursDropdown() {
      this.hoursDropdownActive = !this.hoursDropdownActive;
    },
    closeHoursDropdown() {
      this.hoursDropdownActive = false;
    },
    selectRelatedCourse(course) {
      this.hoursDropdownActive = false;

      if (!course?.id || this.isCurrentCourse(course)) {
        return;
      }

      this.$router.push(`/courses/${course.id}`);
    },
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
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;

  @media @min580 {
    grid-template-columns: 140px 1fr;
  }
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
    grid-column: 1;

    @media @min580 {
      grid-column: 1 / 3;
    }
  }

  &_hours {
    position: relative;
    z-index: 2;
  }

  &_hours-open {
    box-shadow: @BoxShadowEffect;
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
  grid-column: 1;

  @media @min990 {
    width: 440px;
    justify-self: flex-end;
  }

  @media @min580 {
    grid-column: 1 / 3;
  }
}

.course-hours {
  position: relative;
  width: 100%;
}

.course-hours__button {
  cursor: pointer;
  width: 100%;
  min-height: 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  border: 0;
  padding: 0;
  background: transparent;
  color: @DarkGreyColor;
}

.course-hours__icon {
  flex: 0 0 24px;
  transition: transform @dur150;

  &_open {
    transform: rotate(180deg);
  }
}

.course-hours__list {
  position: absolute;
  top: 44px;
  left: -20px;
  right: -20px;
  z-index: 10;

  max-height: 327px;
  overflow-y: auto;

  box-sizing: border-box;
  padding: 12px 20px 20px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  list-style: none;
  border-radius: 0 0 12px 12px;
  background: @LightGreyColor;
  box-shadow: @BoxShadowEffect;
}

.course-hours__list::-webkit-scrollbar {
  width: 5px;
}

.course-hours__list::-webkit-scrollbar-track,
.course-hours__list::-webkit-scrollbar-thumb {
  border-radius: 18px;
}

.course-hours__list::-webkit-scrollbar-track {
  background: @LightGreyColor;
}

.course-hours__list::-webkit-scrollbar-thumb {
  background: @MidGreyColor;
}

.course-hours__item {
  display: flex;
}

.course-hours__option {
  cursor: pointer;
  width: 100%;

  border: 0;
  padding: 0;
  background: transparent;
  color: @DarkGreyColor;
  text-align: left;

  &:hover {
    color: @BlueNewColor;
    transition-duration: @dur150;
  }
}
</style>
