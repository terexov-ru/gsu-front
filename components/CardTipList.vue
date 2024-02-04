<template>
  <div class="card__tip-list">
    <ProgramCardTip
        v-for="tip in tips"
        :key="tip"
        :text="tip"
        :class="{'tip_active': tip.active}"
    />
  </div>
</template>

<script>
export default {
  name: "CardTipList",
  props: {
    tips: Array
  }
}
</script>

<style scoped>
.card__tip-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
