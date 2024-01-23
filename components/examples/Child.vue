<script setup>
const props = defineProps({
  name: String
})
</script>

<template>
  <div>
    <h1>Child component</h1>
    <h1>{{ name }}</h1>
  </div>
</template>


<style scoped>

</style>
