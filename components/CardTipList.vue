<template>
  <div class="card__tip-list">
    <ProgramCardTip
        v-for="tip in tips"
        :key="tip.id"
        :text="tip.text"
        :class="{'tip_active': tip.active}"
    />
  </div>
</template>

<!--<script>-->
<!--import ProgramCardTip from "@/components/cards/programm/ProgramCardTip";-->
<!--export default {-->
<!--  name: "CardTipList",-->
<!--  components: {ProgramCardTip},-->
<!--  props: {-->
<!--    tips: Array-->
<!--  }-->
<!--}-->
<!--</script>-->

<style scoped>
.card__tip-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
