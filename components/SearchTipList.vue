<template>
  <div class="tip-list">
    <SearchTip
      v-for="tip in tips"
      :key="tip.id"
      :text="tip.text"
      :class="{'tip_active' : tip.active}"
      @click="selectTip(tip)"
    />
  </div>
</template>

<!--<script>-->
<!--import SearchTip from "@/components/search/SearchTip";-->

<!--export default {-->
<!--  name: "SearchTipList",-->
<!--  components: {SearchTip},-->
<!--  props: {-->
<!--    tips: {-->
<!--      type: Array,-->
<!--      require: true,-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      selectedTipId: Number,-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    selectTip(tip) {-->
<!--      //Метод, проверяет выбран ли сейчас tip, если нет,-->
<!--      //то переключает, если кликнут по выбранному, то отменяет выбор-->
<!--      //похоже на реализация radioButton-->
<!--      if (this.selectedTipId === tip.id) {-->
<!--        tip.active = false;-->
<!--        this.selectedTipId = undefined;-->
<!--        this.$emit('unselectTip', tip);-->
<!--      }-->
<!--      else {-->
<!--        this.tips.forEach((item) => {-->
<!--          if (item.id === tip.id) {-->
<!--            this.selectedTipId = item.id;-->
<!--            item.active = true-->
<!--          }-->
<!--          else item.active = false;-->
<!--        })-->
<!--        this.$emit('selectTip', tip)-->
<!--      }-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="less" scoped>
.tip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  grid-area: auto;
}
</style>
