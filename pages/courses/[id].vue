<template>

  <BannerBlock
      class="banner-block"
      :title="page.title"
      :img="page.banner_image"
      :articul="page.articul"
      @success="success = true"
  />

  <div class="wrapper course-content wrapper_paddings">

    <div class="course-content__left">

      <div class="text-block">
        <h4 class="text text_h4">Описание курса</h4>
        <div class="text text-block__text text_normal">
          {{ page.description }}
        </div>
      </div>

      <ModulesBlock
          :modules="page.program"
          :planLink="page.learning_plan"
      />


      <div class="text-block">
        <h4 class="text text_h4">
          {{ page.finals_info.title }}
        </h4>
        <div class="text text-block__text text_normal">
          {{ page.finals_info.description }}
        </div>
      </div>

    </div>

    <CourseCoast
        :page="page"
    />
  </div>

  <OverflowContainer
      :active="success"
      @closeOverflow="success = false"
  >
    <OverflowSuccess
        @close="success = false"
    />
  </OverflowContainer>

</template>
<script setup>
import {API} from "~/constants/index.js";
import {toValue} from "vue";
import { absoluteUrl, buildCanonical, getSiteUrl, truncateDescription } from "~/utils/seo.js";
import { buildBreadcrumbSchema, buildCourseSchema } from "~/utils/schema.js";

const route = useRoute();
const id = route.params.id;
const siteUrl = getSiteUrl(useRuntimeConfig());
const success = ref(false);

const {data: reqPage} = await useFetch(API + '/page/course', {
  method: 'POST',
  body: {"course_id": id},
});

const page = toValue(reqPage).page;
const canonical = buildCanonical(`/courses/${id}`, siteUrl);
const description = truncateDescription(page?.description || page?.title || "");

useSeoMeta({
  title: page?.title || "Курс",
  description,
  ogTitle: page?.title || "Курс | ГСУ",
  ogDescription: description,
  ogUrl: canonical,
  ogImage: page?.banner_image ? absoluteUrl(page.banner_image, siteUrl) : undefined,
});

useHead({
  link: [{ rel: "canonical", href: canonical }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(buildCourseSchema(page, canonical)),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify(
        buildBreadcrumbSchema([
          { name: "Главная", url: buildCanonical("/", siteUrl) },
          { name: "Обучение", url: buildCanonical("/courses", siteUrl) },
          { name: page?.title || "Курс", url: canonical },
        ]),
      ),
    },
  ],
});

</script>

<style lang="less" scoped>
@import "assets/core.less";

.banner-block {
  margin-top: 60px;
  margin-bottom: 60px;
}

.text-block {

}

.text-block__text {
  margin-top: 20px;
}

.course-content {
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr;
  margin-bottom: 60px;

  @media @min990 {
    gap: 60px;
    margin-bottom: 120px;
  }

  @media @min1200 {
    grid-template-columns: 1fr 440px;
  }
}

.course-content__left {
  display: flex;
  flex-direction: column;
  gap: inherit;
}

.course-coast__buttons {

}

</style>
