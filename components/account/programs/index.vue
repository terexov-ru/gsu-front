<template>
  <h3 class="text text_h3">Курсы</h3>
  <div class="program">

    <Loader v-if="pending"/>

    <div v-else>
      <div v-if="courses.length > 0" class="program__list">
        <div class="course" v-for="course in courses" :key="course.id">
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
                <div class="text text_h3">{{ course.title }}
                </div>
                <CardTipList
                    class="course__info__card-list"
                    :tips="course.specs"
                    :time="course.duration"
                />

              </div>

              <div class="course__date">
                <div class="column column_gap8">
                  <div class="text text_normal text_light">Начало обучения</div>
                  <div class="text text_caption">25 января 2023</div>
                </div>
                <div class="column column_gap8">
                  <div class="text text_normal text_light">Начало обучения</div>
                  <div class="text text_caption">25 января 2023</div>
                </div>
              </div>

            </div>

            <div class="course__info__sale">

              <div class="row row_al-c pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 12L12 17M12 17L17 12M12 17L12 4" stroke="#129DF4" stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
                  <path d="M6 20H18" stroke="#129DF4" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round"/>
                </svg>
                <div class="text text_normal text_accent">{{ course.document }}</div>

              </div>


              <div
                  @click="active = true"
                  class="button course__info__sale__button button_gradient button_size">
                Оставить отзыв
              </div>


            </div>
          </div>
        </div>
      </div>
      <div
          v-else
          class="text text_normal text_accent empty-list"
      >
        У вас пока нет активных программ
      </div>

    </div>

  </div>

  <OverflowContainer
      :active="active"
      @closeOverflow="active = false"
  >
    <OverflowAccountReview
        @close="active = false"
    />
  </OverflowContainer>
</template>

<script setup>
import {ref, watch} from "vue";

const {getAccCourses} = useApi();
const active = ref(false);

const {pending, data} = await getAccCourses();
const courses = ref({});
watch(data, (newVal) => {
  courses.value = newVal.courses;
})
console.log(courses);

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

.course__date {
  margin-top: 32px;
  display: flex;

  flex-direction: column;
  gap: 20px;

  @media @min580 {
    margin-top: 24px;
    flex-direction: row;
    gap: 40px;
  }
}

.program__list {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
