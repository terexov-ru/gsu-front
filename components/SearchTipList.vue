<template>
  <div class="tip-list">
    <div v-for="tip in tips"
         :key="tip.id"
    >
      <div @click="selectTip(tip)"
           :class="{'tip_active' : tip.id == selectedTipId}"
           class="tip tip_dark"
      >
        {{ tip.title }}
        <!--        <img v-if="selectedTips.includes(tip)" src="~/assets/svg/close_white.svg" alt="close">-->
        <svg v-if="tip.id == selectedTipId"
             class="close"
             width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 18L6 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18 6L6 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import {toValue} from "vue";

export default {
  props: {
    tips: {
      type: Array,
      require: true,
    },
    selected: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      selectedTipId: Number,
      selectedTips: [],
    }
  },
  methods: {
    // selectTip(tip) {
    //   if (this.selectedTips.includes(tip)) {
    //     this.selectedTips = this.selectedTips.filter((t) => t.id !== tip.id);
    //     this.$emit("update:selected", this.selectedTips)
    //   } else {
    //     this.selectedTips.push(tip)
    //     this.$emit('update:selected', this.selectedTips)
    //   }
    // },
    selectTip(tip) {
      //Метод, проверяет выбран ли сейчас tip, если нет,
      //то переключает, если кликнут по выбранному, то отменяет выбор
      //похоже на реализация radioButton
      if (this.selectedTipId == tip.id) {
        tip.active = false;
        this.selectedTipId = undefined;
        this.$emit('update:selected', null);
      } else {
        this.tips.forEach((item) => {
          if (item.id === tip.id) {
            this.selectedTipId = item.id;
            item.active = true
            this.$emit('update:selected', this.selectedTipId)
          }
        })
      }
    },
  },
  setup() {
    const route = useRoute();
    const activeTip = ref(route.query.id);

    onBeforeRouteUpdate((to, from) => {
      activeTip.value = to.query.id;
    });

    return {activeTip};
  },
  // watch: {
  //   activeTip(val, oldVal) {
  //     this.selectedTips = this.tips.filter((i) => i.id === parseInt(val))
  //   }
  // },
  watch: {
    activeTip(val, oldVal) {
      // console.log(val);
      this.selectedTipId = toValue(val);
    }
  },
  mounted() {
    if (this.selectedTipId)
      this.selectedTipId = toValue(this.activeTip);
  }
}
</script>

<style lang="less" scoped>
@import "/assets/core";

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

.close {
  width: 16px;
  height: 16px;

  @media @min760 {
    width: 20px;
    height: 20px;
  }
}
</style>
