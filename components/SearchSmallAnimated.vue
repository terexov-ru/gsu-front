<template>
  <div
      :class="{'container_active' : active}"
      class="container">

    <input
        :class="{'input_active' : active}"
        placeholder="Поиск..."
        class="input"
        type="text"
    >

    <img
        @click="active = !active"
        class="pointer" src="~/assets/svg/search.svg" alt="search">
  </div>


</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      active: false
    }
  }
}
</script>

<style scoped lang="less">
@import "assets/core";

.container {
  width: auto;
  height: auto;
  overflow: hidden;

  display: flex;

  transition: 0.4s;

  background: @WhiteColor;
  border-radius: 6px;

  padding-right: 5px;
  padding-left: 10px;

  &_active {
    background: @LightGreyColor;
  }
}

.input {
  width: 230px;
  height: 30px;

  max-width: 0;

  overflow: hidden;

  padding: 0;

  font-size: 12px;
  background: white;
  transition: 0.4s;

  &_active {
    max-width: 140px;
    background: @LightGreyColor;

    @media @min760 {
      max-width: 230px;
    }

    @media @min990 {
      max-width: 130px;
    }

    @media @min1200 {
      max-width: 230px;
    }
  }
}


</style>
