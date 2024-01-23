<script setup>
const { sayHello } = useUtils();
sayHello();

definePageMeta({
  layout: "custom"
});
</script>

<template>
  <div>This is the test!</div>
</template>

<style scoped>

</style>
