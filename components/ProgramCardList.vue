<script setup>
const {data: posts } = await useFetch('https://jsonplaceholder.typicode.com/posts');

const filteredPosts = toValue(posts).slice(0, 3);
</script>

<template>
  <div class="card-list">
    <ProgramCard
        v-for="card in filteredPosts"
        :key="card.id"
        :title="card.title"
        :tips="card.tips"
    />
  </div>
</template>

<script>
export default {
  name: "ProgramCardList",
  data() {
    return {
      cards: [
        {
          id: 0, title: "Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19",
          tips: [{id: 0, text: "36 часов", active: true}, {id: 1, text: "лабораторная диагностика"}, {
            id: 2,
            text: "Бактериология"
          }]
        },
        {
          id: 1, title: "Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19",
          tips: [{id: 0, text: "36 часов", active: true}, {id: 1, text: "лабораторная диагностика"}, {
            id: 2,
            text: "Бактериология"
          }]
        },
        {
          id: 2, title: "Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19",
          tips: [{id: 0, text: "36 часов", active: true}, {id: 1, text: "лабораторная диагностика"}, {
            id: 2,
            text: "Бактериология"
          }]
        },
        {
          id: 3, title: "Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19",
          tips: [{id: 0, text: "36 часов", active: true}, {id: 1, text: "лабораторная диагностика"}, {
            id: 2,
            text: "Бактериология"
          }]
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.card-list {
  margin-top: 40px;
  gap: 12px;
  box-sizing: border-box;
  width: 100%;
  display: grid;
  overflow: hidden;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;

  @media @min580 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-auto-rows: 0;
  }

  @media @min990 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }

}
</style>
