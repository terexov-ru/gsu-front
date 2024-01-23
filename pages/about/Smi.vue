<template>
  <div class="wrapper wrapper_paddings">
    <div class="smi-block">

      <h2 class="text text_h2">Сми о нас</h2>

      <div class="smi">
        <div v-for="i in 6" :key="i" class="smi__card">
          <img class="smi__card__img" src="~/assets/smi.png" alt="smi">

          <div class="text smi__card__date text_caption text_accent">
            17 января 2023
          </div>
          <div class="smi__card__link">
            <span>С нами умнее!</span>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.33594 17L17.3359 7M17.3359 7H7.33594M17.3359 7V17" stroke="#101828" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="pagination">
        <PaginationBar
            :page="1"
            :size="6"
            :count="30"
        />
      </div>
    </div>

  </div>
</template>

<script>
import PaginationBar from "@/components/pagination/PaginationBar";

export default {
  name: "AboutSMI",
  components: {PaginationBar}
}
</script>

<style lang="less" scoped>


.smi {
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media @min580 {
    grid-template-columns: 1fr 1fr;
  }

  @media @min760 {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
  }
}

.pagination {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.smi-block {
  margin-top: 80px;
  margin-bottom: 120px;
}

.smi__card {
  width: 100%;
  height: auto;
}

.smi__card__date {
  margin-top: 24px;
  margin-bottom: 14px;
}

.smi__card__link {
  display: flex;
  justify-content: space-between;
}

.smi__card__img {
  width: 100%;
  height: auto;
}
</style>
