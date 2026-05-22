<template>
  <main>

    <RouterHistory/>

    <ProgrammAdvancedSearch class="search-block"/>

  </main>
</template>

<script setup>
import { buildCanonical, getSiteUrl } from "~/utils/seo.js";

const siteUrl = getSiteUrl(useRuntimeConfig());

useSeoMeta({
  title: "Обучение",
  description:
    "Каталог образовательных программ ГСУ: повышение квалификации, профессиональное обучение и курсы для специалистов.",
  ogTitle: "Обучение | ГСУ",
  ogDescription:
    "Выберите подходящую программу обучения в каталоге ГСУ.",
  ogUrl: buildCanonical("/courses", siteUrl),
});

useHead({
  link: [{ rel: "canonical", href: buildCanonical("/courses", siteUrl) }],
});
// const activeId = ref(-1);
//
// onBeforeRouteUpdate((to, from) => {
//   activeId.value = to.query.id;
// });
//
// provide('activeTip', activeId);
</script>

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
