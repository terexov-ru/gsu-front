<template>
  <div class="overflow-card">

    <svg class="overflow-card__close"
         @click="$emit('close')"
         width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
          d="M18.9979 17.0009L25.0896 10.9234C25.3563 10.6567 25.5062 10.2948 25.5062 9.91758C25.5062 9.54032 25.3563 9.17851 25.0896 8.91175C24.8228 8.64498 24.461 8.49512 24.0837 8.49512C23.7065 8.49512 23.3447 8.64498 23.0779 8.91175L17.0004 15.0034L10.9229 8.91175C10.6561 8.64498 10.2943 8.49512 9.91707 8.49512C9.53981 8.49512 9.178 8.64498 8.91124 8.91175C8.64447 9.17851 8.49461 9.54032 8.49461 9.91758C8.49461 10.2948 8.64447 10.6567 8.91124 10.9234L15.0029 17.0009L8.91124 23.0784C8.77845 23.2101 8.67306 23.3668 8.60114 23.5394C8.52922 23.7121 8.49219 23.8972 8.49219 24.0842C8.49219 24.2713 8.52922 24.4564 8.60114 24.6291C8.67306 24.8017 8.77845 24.9584 8.91124 25.0901C9.04293 25.2229 9.19962 25.3283 9.37225 25.4002C9.54489 25.4721 9.73005 25.5091 9.91707 25.5091C10.1041 25.5091 10.2893 25.4721 10.4619 25.4002C10.6345 25.3283 10.7912 25.2229 10.9229 25.0901L17.0004 18.9984L23.0779 25.0901C23.2096 25.2229 23.3663 25.3283 23.5389 25.4002C23.7116 25.4721 23.8967 25.5091 24.0837 25.5091C24.2708 25.5091 24.4559 25.4721 24.6286 25.4002C24.8012 25.3283 24.9579 25.2229 25.0896 25.0901C25.2223 24.9584 25.3277 24.8017 25.3997 24.6291C25.4716 24.4564 25.5086 24.2713 25.5086 24.0842C25.5086 23.8972 25.4716 23.7121 25.3997 23.5394C25.3277 23.3668 25.2223 23.2101 25.0896 23.0784L18.9979 17.0009Z"
          fill="#199AF0"/>
    </svg>

    <div class="text text_h3 text_center">
      Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19
    </div>

    <div class="form">
      <InputBlock
          :name="'ФИО'"
          :type="'text'"
          :placeholder="'Иванов Иван Иванович'"
      />

      <div class="row row_gap24">
        <InputBlock
            :name="'Телефон'"
            :type="'text'"
            :placeholder="'Номер телефона'"
        />
        <InputBlock
            :name="'E-mail'"
            :type="'text'"
            :placeholder="'Почта'"
        />
      </div>

      <InputBlock
          :name="'Комментарий'"
          :type="'text'"
          :placeholder="'Ваш комментарий'"
      />
    </div>

    <button class="button overflow-card__button button_gradient button_paddings">Получить консультацию</button>
  </div>
</template>

<script>
export default {
  name: "request"
}
</script>

<style scoped lang="less">
@import "assets/core";

/* OVERFLOW */
.overflow-card {
  position: relative;

  width: 1043px;
  height: 583px;

  overflow: hidden;
  box-sizing: border-box;
  padding: 40px 165px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 36px;
  border: 1px solid @MidGreyColor;
  background: @WhiteColor;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.overflow-card__button {
  align-self: center;
}

.overflow-card__close {
  position: absolute;
  top: 34px;
  right: 34px;
  cursor: pointer;
}
</style>
