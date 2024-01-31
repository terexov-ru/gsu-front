<template>
  <div class="tip tip_dark">
    {{ text }}

    <img src="~/assets/svg/close.svg" alt="close">
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      require: true
    },
  }
}
</script>

<style lang="less" scoped>


</style>
