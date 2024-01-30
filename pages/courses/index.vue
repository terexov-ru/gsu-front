<template>
  <main>

    <RouterHistory/>

    <ProgrammAdvancedSearch class="search-block"/>

  </main>
</template>

<style lang="less" scoped>
@import "assets/core.less";

.search-block {
  margin-top: 60px;
  margin-bottom: 60px;

  @media @min760 {
    margin-bottom: 120px;
  }
}
</style>
