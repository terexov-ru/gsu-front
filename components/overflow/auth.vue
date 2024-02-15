<template>

  <OverflowRegistration
      v-if="activeOverflow === 'reg'"
      @openLogin="activeOverflow = 'login'"
      @close="this.$emit('close')"
  />

  <OverflowLogin
      v-if="activeOverflow === 'login'"
      @openReg="activeOverflow = 'reg'"
      @openPass="activeOverflow = 'pass'"
      @close="this.$emit('close')"
  />

  <OverflowPass
      v-if="activeOverflow === 'pass'"
      @openLogin="activeOverflow = 'login'"
      @close="this.$emit('close')"
  />
</template>

<script>
export default {
  data() {
    return {
      activeOverflow: 'login',
    }
  }
}
</script>

<style scoped>

</style>
