<template>
  <div class="pagination">
    <vue-awesome-paginate
        :total-items="count"
        v-model="currentPage"
        :items-per-page="size"
        :max-pages-shown="2"
    >
      <template #prev-button>
          <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 17L15 12L10 7" stroke="#89939F" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round"/>
                  </svg>
          </span>
      </template>

      <template #next-button>
          <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 17L15 12L10 7" stroke="#89939F" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round"/>
                  </svg>
          </span>
      </template>
    </vue-awesome-paginate>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "PaginationBar",
  props: {
    page: Number,
    size: Number,
    count: Number,
  },
  setup() {
    const currentPage = ref(1);
    return {
      currentPage,
    };
  },
  watch: {
    currentPage(newVal) {
      this.$emit("update:page", newVal);
    },
    page(newVal) {
      if (newVal !== this.currentPage)
        this.currentPage = newVal;
    }
  }
}
</script>

<style lang="less">
@import "assets/core.less";

.pagination .pagination-container {
  column-gap: 0;
  align-items: center;

  @media @min760 {
    column-gap: 16px;
  }
}

.pagination .paginate-buttons {
  height: 36px;
  width: 36px;
  cursor: pointer;
  border: none;
  background: none;
  user-select: none;
  .text();

  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: 0;
  text-align: left;

  @media @min760 {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
  }
}

.pagination .back-button,
.pagination .next-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  border-radius: 100%;

  background: @LightGreyColor;
}

.pagination .active-page {
  color: @BlueNewColor;
}

.pagination .paginate-buttons:hover {
  color: @BlueNewColor;
}

.pagination .back-button svg {
  transform: rotate(180deg) translateY(-2px);
}

.pagination .next-button svg {
  transform: translateY(2px);
}

.pagination .back-button:hover,
.pagination .next-button:hover {
  background-color: @MidGreyColor;
}
</style>
