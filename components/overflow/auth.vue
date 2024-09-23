<template>
  <OverflowRegistration
    v-if="activeOverflow === 'reg'"
    @openLogin="activeOverflow = 'login'"
    @openSended="activeOverflow = 'sended'"
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
    @openReg="activeOverflow = 'reg'"
    @openReset="activeOverflow = 'reset'"
    @close="this.$emit('close')"
  />

  <OverflowReset
    v-if="activeOverflow === 'reset'"
    @openLogin="activeOverflow = 'login'"
    @close="this.$emit('close')"
  >
  </OverflowReset>

  <OverflowSended
    v-if="activeOverflow === 'sended'"
    @openLogin="activeOverflow = 'login'"
    @close="this.$emit('close')"
  >
  </OverflowSended>
</template>

<script>
export default {
  data() {
    return {
      activeOverflow: "login",
    };
  },
};
</script>

<style scoped></style>
