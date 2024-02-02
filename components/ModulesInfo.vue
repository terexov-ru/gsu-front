<template>
  <div class="module">
    <div class="module__header">
      <h4 class="text module__name text_h4">Модуль 1</h4>
      <svg @click="active = !active"
           :class="{'module__icon_active': active}"
           class="module__icon"
           width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 9.19727L12 14.1973L17 9.19727" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="text module__description text_semi-bold">
      Организация помощи детям и подросткам с сердечно-сосудистой
      патологией.
    </div>
    <div class="text module__text text_normal"
         :class="{'module__text_active' : active}">
      Данная программа дополнительного профессионального образования прошла экспертную оценку и опубликована на портале
      непрерывного медицинского и фармацевтического образования Минздрава России, для получения баллов, оформите заявку
      на сайте росминздрав edu.rosminzdrav.ru.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    }
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.module {
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  padding: 20px;

  background: none;
  border-radius: 8px;

  border: 1px solid @BlueNewColor;
}

.module__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.module__name {
  color: @BlueNewColor;
}

.module__description {
  margin-top: 12px;
}

.module__text {
  max-height: 0;
  overflow: hidden;
  transition: 0.4s;

  &_active {
    max-height: 150px;
  }
}

.module__icon {
  transition: 0.2s;

  &_active {
    transform: rotate(180deg);
  }
}

</style>
