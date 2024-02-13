<template>
  <div class="card__tip-list">
    <ProgramCardTip
        :text="`${time} ${getTimeWord()}`"
        class="tip_active"

    />
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
    tips: Array,
    time: Number
  },
  methods: {
    getTimeWord() {
      if (this.time % 10 > 4) return 'часов';
      else if (this.time % 10 > 0) return 'часа';
      else return 'час';
    }
  }
}
</script>

<style lang="less" scoped>
@import "/assets/core.less";

.card__tip-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tip_active {
  background: @BlueNewColor;
  color: @WhiteColor;
}
</style>
