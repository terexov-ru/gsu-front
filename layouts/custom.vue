<template>
  <div class="custom">
    <slot />
  </div>
</template>

<script>
export default {
  name: "custom"
}
</script>

<style scoped>
.custom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 20px;
}
</style>
