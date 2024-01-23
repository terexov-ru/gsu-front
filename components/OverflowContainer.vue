<template>
  <div v-if="active" @click="this.$emit('closeOverflow')" class="overflow">
    <div @click.stop>
      <slot>

      </slot>
    </div>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: "OverflowContainer",-->
<!--  props: {-->
<!--    active: {-->
<!--      type: Boolean,-->
<!--      require: true-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style scoped>
.overflow {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  position: fixed;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
}
</style>
