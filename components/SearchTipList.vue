<template>
  <div class="tip-list">
    <div
      v-for="tip in tips"
      :key="tip.id"
      class="tip-card"
      :class="{ 'tip-card_active': tip.id == selectedTipId }"
    >
      <button
        @click="selectTip(tip)"
        class="tip-card__button"
        type="button"
      >
        <img
          class="tip-card__image"
          :src="getTipImage(tip)"
          :alt="tip.title"
          loading="lazy"
          @error="onImageError"
        />
        <div class="tip-card__body">
          <div class="tip-card__title">
            {{ tip.title }}
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { toValue } from "vue";
import { API } from "~/constants/index.js";
import categoryPlaceholder from "~/assets/category-placeholder.svg";

const API_ORIGIN = API.replace(/\/api\/?$/, "");

const getImageValue = (value) => {
  if (!value) return null;
  if (Array.isArray(value)) return getImageValue(value[0]);
  if (typeof value === "object") {
    return getImageValue(value.url || value.src || value.path || value.file || value.image);
  }

  return String(value);
};

export default {
  props: {
    tips: {
      type: Array,
      require: true,
    },
    selected: {
      type: Number,
      default: null,
    },
    redirect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedTipId: Number,
      selectedTips: [],
      categoryPlaceholder,
    };
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
    async selectTip(tip) {
      //Метод, проверяет выбран ли сейчас tip, если нет,
      //то переключает, если кликнут по выбранному, то отменяет выбор
      //похоже на реализация radioButton
      if (this.$props.redirect) {
        await navigateTo({
          path: "/courses",
          query: {
            id: tip.id,
          },
        });
      } else {
        if (this.selectedTipId == tip.id) {
          tip.active = false;
          this.selectedTipId = undefined;
          this.$emit("update:selected", null);
        } else {
          this.tips.forEach((item) => {
            if (item.id === tip.id) {
              this.selectedTipId = item.id;
              item.active = true;
              this.$emit("update:selected", this.selectedTipId);
            }
          });
        }
      }
    },
    getTipImage(tip) {
      const image = getImageValue(
        tip?.image ||
        tip?.photo ||
        tip?.picture ||
        tip?.preview_image ||
        tip?.category_image ||
        tip?.banner_image
      );

      if (!image) return this.categoryPlaceholder;
      if (/^(https?:)?\/\//.test(image) || image.startsWith("data:")) return image;
      if (image.startsWith("/")) return `${API_ORIGIN}${image}`;

      return `${API_ORIGIN}/${image}`;
    },
    onImageError(event) {
      event.target.onerror = null;
      event.target.src = this.categoryPlaceholder;
    },
  },
  setup() {
    const route = useRoute();
    const activeTip = ref(route.query.id);

    onBeforeRouteUpdate((to, from) => {
      activeTip.value = to.query.id;
    });

    return { activeTip };
  },
  // watch: {
  //   activeTip(val, oldVal) {
  //     this.selectedTips = this.tips.filter((i) => i.id === parseInt(val))
  //   }
  // },
  watch: {
    activeTip(val, oldVal) {
      this.selectedTipId = toValue(val);
    },
  },
  mounted() {
    if (this.selectedTipId) this.selectedTipId = toValue(this.activeTip);
  },
};
</script>

<style lang="less" scoped>
@import "/assets/core";

.tip-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;

  @media @min580 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media @min990 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 30px;
  }
}

.tip-card {
  min-width: 0;
  height: 240px;
}

.tip-card__button {
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: none;
  border-radius: 4px;
  background: @LightGreyColor;
  color: @DarkGreyColor;
  cursor: pointer;
  text-align: left;
  transition: box-shadow @dur150, transform @dur150;

  &:hover {
    box-shadow: @BoxShadowEffect;
    transform: translateY(-1px);
  }
}

.tip-card__image {
  width: 100%;
  height: 130px;
  display: block;
  object-fit: cover;
  background: @LightBlueColor;
}

.tip-card__body {
  min-height: 110px;
  width: 100%;
  box-sizing: border-box;
  padding: 15px 25px;
  display: flex;
  align-items: flex-start;
  background: @LightGreyColor;
  transition: background @dur150, color @dur150;
}

.tip-card__title {
  font-family: Nunito Sans;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

.tip-card_active .tip-card__body {
  background: @BlueNewColor;
  color: @WhiteColor;
}
</style>
