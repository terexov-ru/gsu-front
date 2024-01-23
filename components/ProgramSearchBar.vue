<script setup>


const { windowWidth, windowHeight, isWidth990, isWidth760, isWidth580 } = useWidthHeight();
</script>
<template>
  <!--  TODO вынести input как отедльный компонент и добваить slot под icon-->
  <div class="search-container">
    <div class="input-container">
      <input class="input" :placeholder="isWidth990() ? 'Поиск по ключевым словам...' : 'Поиск'" type="text">
      <svg class="input-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M21 21L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z"
            stroke="#B9BFC6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <button class="button button_size button_gradient">Найти</button>
  </div>

  <SearchTipList
      :tips="tips"
      @selectTip="selectTip"
      @unselectTip="unselectTip"
  />
</template>

<!--<script>-->

<!--export default {-->
<!--  name: "ProgramSearchBar",-->
<!--  data() {-->
<!--    return {-->
<!--      tips: [-->
<!--        {id: 0, text: "Непрерывное медицинское и фармацевтическое образование"},-->
<!--        {id: 1, text: "Повышение квалификации"},-->
<!--        {id: 2, text: "Профессиональная переподготовка"},-->
<!--        {id: 3, text: "Профессиональная переобучение"},-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    selectTip(tip) {-->
<!--      console.log(tip);-->
<!--    },-->
<!--    unselectTip(tip) {-->
<!--      console.log(tip);-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
@import "assets/core.less";

.input {
  box-sizing: border-box;
  display: flex;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  height: 46px;

  border: none;

  border-radius: 6px;
  background: @LightGreyColor;

  color: @DarkGreyColor;

  /* Text Large */
  //font-family: Nunito Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 140% */

  &::placeholder {
    color: @MidGreyColor;
  }

  &:focus {
    outline: none;
  }

  @media @min760 {
    height: 52px;
  }
}

.input-icon {
  position: absolute;
  right: 14px;
  top: 10px;

  @media @min760 {
    top: 14px;
  }
}

.search-container {
  gap: 12px;
  margin-top: 32px;
  margin-bottom: 16px;
  flex-direction: column;
  display: flex;

  @media @min580 {
    flex-direction: row;
    gap: 24px;
  }

  @media @min760 {
    margin-bottom: 24px;
  }

  @media @min990 {
    margin-top: 40px;
  }
}

.input-container {
  position: relative;
  width: 100%;
  display: flex;
}
</style>
