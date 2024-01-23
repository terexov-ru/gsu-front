<script setup lang="ts">
const {data: posts, pending} = await useLazyFetch('https://jsonplaceholder.typicode.com/posts')

</script>
<template>

  <div class="container">
    <div v-if="pending">
        <h1>...Loading</h1>
    </div>
    <div v-else>
      <div class="card"
           v-for="post in posts"
           :key="post.id"
      >
        <div class="title">{{ post.title }}</div>
        <div class="body">{{ post.body }}</div>
      </div>
    </div>
  </div>

</template>
<style scoped>
.container {
  width: 100%;
  height: auto;

  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 40px;
}

.card {
  background: black;
  color: white;

  box-sizing: border-box;
  padding: 20px;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.body {
  font-size: 16px;
}
</style>
