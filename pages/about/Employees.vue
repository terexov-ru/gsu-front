<template>
  <div class="wrapper team-block wrapper_paddings">

    <h2 class="text text_h2">Наша команда</h2>

    <div class="radio-button radio-button_margins">
      <div class="radio-button__hover"
           :class="{'radio-button__hover_active' : active}"
      />

      <div @click="active = false"
           class="text radio-button__text text_normal"
           :class="{'radio-button__text_active' : !active}">
        Администрация
      </div>
      <div @click="active = true"
           class="text radio-button__text text_normal"
           :class="{'radio-button__text_active' : active}">
        Преподаватели
      </div>
    </div>

    <div class="team">

      <div v-for="i in 9" :key="i" class="team__card">
        <div class="team__card__img-container">
          <img class="team__card__img" src="~/assets/team.png" alt="team"/>
        </div>
        <div class="team__card__description">
          <div class="text text_large">Фамилия <br> Имя Отчество</div>
          <div class="text text_normal">Должность</div>
        </div>
      </div>

    </div>

    <div class="pagination">
      <PaginationBar
          :size="5"
          :count="42"
          :page="1"
      />
    </div>

  </div>
</template>

<script>
import PaginationBar from "@/components/pagination/PaginationBar";

export default {
  name: "AboutEmployees",
  components: {PaginationBar},
  data() {
    return {
      active: false,
    }
  }
}
</script>

<style lang="less" scoped>


.team-block {
  margin-top: 80px;
  margin-bottom: 120px;
}

.team {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media @min580 {
    grid-template-columns: 1fr 1fr;
  }

  @media @min990 {
    gap: 22px;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.team__card {
  overflow: hidden;
  width: 100%;
  height: auto;

  border-radius: 8px;
  background: @LightGreyColor;
}

.team__card__img-container {
  width: 100%;
  height: 250px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.team__card__img-container__img {
  height: 100%;
  width: auto;
}

.team__card__description {
  box-sizing: border-box;
  padding: 8px;
}

.radio-button {
  position: relative;
  overflow: hidden;

  height: 44px;
  width: auto;
  max-width: 310px;

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

.radio-button__hover_active {
  left: 50%;
  transition: 150ms;
}

</style>
