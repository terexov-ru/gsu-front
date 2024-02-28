<template>
  <div class="overflow" v-if="active" @click="this.$emit('closeOverflow')">
    <div class="container" @click.stop>
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      require: true
    }
  }
}
</script>

<style scoped>
.overflow {
  width: 100%;
  height: 100vh;
  z-index: 1000;


  position: fixed;
  top: 0;
  left: 0;

  box-sizing: border-box;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.width {
  width: 100%;
}
</style>
