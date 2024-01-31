<template>
  <div class="tip-list">
    <div v-for="tip in tips"
         :key="tip.id"
    >
      <div @click="selectTip(tip)"
           :class="{'tip_active' : selectedTips.includes(tip)}"
           class="tip tip_dark"
      >

        {{ tip.text }}

        <img v-if="selectedTips.includes(tip)" src="~/assets/svg/close_white.svg" alt="close">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tips: {
      type: Array,
      require: true,
    }
  },
  data() {
    return {
      selectedTipId: Number,
      selectedTips: [],
    }
  },
  methods: {
    selectTip(tip) {
      if (this.selectedTips.includes(tip))
        this.selectedTips = this.selectedTips.filter((t) => t.id !== tip.id);
      else
        this.selectedTips.push(tip)
    },
    // selectTip(tip) {
    //   //Метод, проверяет выбран ли сейчас tip, если нет,
    //   //то переключает, если кликнут по выбранному, то отменяет выбор
    //   //похоже на реализация radioButton
    //   if (this.selectedTipId === tip.id) {
    //     tip.active = false;
    //     this.selectedTipId = undefined;
    //     this.$emit('unselectTip', tip);
    //   } else {
    //     this.tips.forEach((item) => {
    //       if (item.id === tip.id) {
    //         this.selectedTipId = item.id;
    //         item.active = true
    //       } else item.active = false;
    //     })
    //     this.$emit('selectTip', tip)
    //   }
    // },
  }
}
</script>

<style lang="less" scoped>
.tip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  grid-area: auto;
}

.tip {
  display: flex;
  align-items: center;
  text-overflow: initial;
  max-width: initial;

  transition: 0.2s;
}

.tip_active {
  transition: 0.2s;
}
</style>
