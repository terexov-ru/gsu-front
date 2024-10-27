<template>
  <Overflow class="order-overflow">
    <img
      class="close"
      @click="emits('close')"
      src="~/assets/svg/close.svg"
      alt="close"
    />

    <div class="overflow__content">
      <div class="column column_gap16">
        <div class="text text_h3 text_center">Профиль не заполнен!</div>
        <div class="text text_normal text_center">
          Для подписания договора нужно заполнить все обязательные поля в
          профиле
        </div>
      </div>

      <div class="order-overflow__buttons">
        <button
          @click="emits('toProfile')"
          class="button button_black-bordered"
        >
          Заполнить данные в профиле
        </button>
      </div>
    </div>
  </Overflow>
</template>

<script setup>
const emits = defineEmits(["close", "toProfile"]);
</script>

<style scoped lang="less">
@import "assets/core.less";

.order-overflow {
  width: 100%;

  @media @min1200 {
    width: 1000px;
  }
}

.order-overflow__buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  @media @min760 {
    flex-direction: row;
    max-width: 620px;
  }
}

.overflow__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>
