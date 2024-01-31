<template>
  <div class="search-block wrapper wrapper_paddings">
    <h2 class="text text_h2 text_dark">Обучение</h2>

    <ProgramSearchBar

    />

    <div class="search-block__filters">
      <DropDown
          :title="'Заголовок'"
          :options="options"
          class="search-block__drop-down"
      />

      <DropDown
          :title="'Заголовок'"
          :options="options"
          class="search-block__drop-down"
      />

      <DropDown
          :title="'Заголовок'"
          :options="options"
          class="search-block__drop-down"
      />
    </div>

    <CourseCardList class="search-block__card-list"/>

    <div class="pagination">
      <PaginationBar
          :size="5"
          :count="42"
          :page="1"
          @ChangePage="changePage"
      />
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { text: 'Первый', value: '1' },
        { text: 'Второй', value: '2' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
        { text: 'Третий', value: '3' },
      ],
    }
  },
  methods: {
    changePage(page) {
      console.log(page)
    }
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.search-block {
  padding-top: 40px;

  @media @min1200 {
    padding-top: 80px;
  }
}

.search-block__drop-down {
  background: @LightGreyColor;
}

.search-block__card-list {
  margin-top: 32px;

  @media @min760 {
    margin-top: 40px;
  }
}

.search-block__filters {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;

  margin-top: 24px;

  @media @min580 {
    flex-direction: row;
  }
}
</style>
