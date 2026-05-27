<template>
  <main class="home-page">
    <div v-if="currentTopBanner" class="top-banner">
      <Transition name="top-banner-fade" mode="out-in">
        <MissionSlider
          :key="activeBannerIndex"
          class="mission-block"
          @clickButton="formConActive = true"
          :banner="currentTopBanner"
        />
      </Transition>

      <div
        v-if="topBanners.length > 1"
        class="top-banner__bullets"
        aria-label="Навигация по баннерам"
      >
        <button
          v-for="(_, index) in topBanners"
          :key="index"
          type="button"
          class="top-banner__bullet"
          :class="{ 'top-banner__bullet_active': index === activeBannerIndex }"
          :aria-label="`Показать баннер ${index + 1}`"
          :aria-current="index === activeBannerIndex ? 'true' : undefined"
          @click="selectTopBanner(index)"
        />
      </div>
    </div>

    <ProgramSearchBlock class="search-block" />

    <ReviewBlock class="review-block" :reviews="page.reviews" />

    <NewsBlock class="news-block" :news="page.news[0].slice(0, 3)" />

    <!-- <AdvantagesSlider
      class="advantages-block"
      :banner="page.bottom_banner"
      @clickButton="moreInfoActive = true"
    /> -->

    <SummaryBlock class="summary-block" :info="page.block_info" />

    <QuestionSlider
      class="question-block"
      :banner="page.questions_banner"
      @success="sucActive = true"
    />

    <OverflowContainer
      :active="formConActive"
      @closeOverflow="formConActive = false"
    >
      <OverflowConsultation @close="formConActive = false" />
    </OverflowContainer>

    <OverflowContainer :active="sucActive" @closeOverflow="sucActive = false">
      <OverflowSuccess @close="sucActive = false" />
    </OverflowContainer>

    <OverflowContainer
      :active="successOrder"
      @closeOverflow="closeSuccessOrder()"
    >
      <OverflowSuccessOrder @close="closeSuccessOrder()" @toAuth="toAuth()" />
    </OverflowContainer>

    <OverflowContainer
      :active="moreInfoActive"
      @closeOverflow="moreInfoActive = false"
    >
      <OverflowMoreInfo @close="moreInfoActive = false" />
    </OverflowContainer>
    <OverflowContainer :active="logActive" @closeOverflow="logActive = false">
      <OverflowAuth @close="logActive = false" />
    </OverflowContainer>
  </main>
</template>
<script setup>
import { computed, onBeforeUnmount, onMounted, toValue, watch } from "vue";
import { absoluteUrl, buildCanonical, getSiteUrl } from "~/utils/seo.js";
import { buildEducationalOrganizationSchema } from "~/utils/schema.js";

const TOP_BANNER_ROTATE_DELAY = 5000;

const { simpleGet, getUser } = useApi();
const siteUrl = getSiteUrl(useRuntimeConfig());
const formConActive = ref(false);
const sucActive = ref(false);
const successOrder = ref(false);
const moreInfoActive = ref(false);
const logActive = ref(false);

const { data: data } = await simpleGet("/page/main");

const page = toValue(data).page;
const activeBannerIndex = ref(0);
let topBannerTimer;

const topBanners = computed(() => {
  if (Array.isArray(page?.top_banners) && page.top_banners.length > 0) {
    return page.top_banners.filter(Boolean);
  }

  return page?.top_banner ? [page.top_banner] : [];
});

const currentTopBanner = computed(() => {
  return topBanners.value[activeBannerIndex.value] || topBanners.value[0];
});

const homeOgImage = topBanners.value?.[0]?.image || "/favicon.ico";

function nextTopBanner() {
  if (topBanners.value.length < 1) return;

  activeBannerIndex.value = (activeBannerIndex.value + 1) % topBanners.value.length;
}

function stopTopBannerAutoplay() {
  if (topBannerTimer) {
    clearInterval(topBannerTimer);
    topBannerTimer = undefined;
  }
}

function startTopBannerAutoplay() {
  if (!import.meta.client) return;

  stopTopBannerAutoplay();

  if (topBanners.value.length < 2) return;

  topBannerTimer = setInterval(nextTopBanner, TOP_BANNER_ROTATE_DELAY);
}

function selectTopBanner(index) {
  activeBannerIndex.value = index;
  startTopBannerAutoplay();
}

if (import.meta.client) {
  onMounted(startTopBannerAutoplay);
  onBeforeUnmount(stopTopBannerAutoplay);

  watch(topBanners, () => {
    if (activeBannerIndex.value >= topBanners.value.length) {
      activeBannerIndex.value = 0;
    }

    startTopBannerAutoplay();
  });
}

useSeoMeta({
  title: "Обучение и повышение квалификации",
  description:
    "ГСУ: образовательные программы, повышение квалификации, новости, отзывы и консультации по обучению.",
  ogTitle: "Обучение и повышение квалификации | ГСУ",
  ogDescription:
    "Подберите программу обучения и повысьте квалификацию вместе с ГСУ.",
  ogUrl: buildCanonical("/", siteUrl),
  ogImage: absoluteUrl(homeOgImage, siteUrl),
});

useHead({
  link: [{ rel: "canonical", href: buildCanonical("/", siteUrl) }],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(buildEducationalOrganizationSchema({ url: siteUrl })),
    },
  ],
});

/* SUCCESS from store (use with redirect)*/
const success = useState("mainSuccess");
if (success.value === true) {
  const data = await getUser();
  console.log(data.profile);

  successOrder.value = true;
}

async function toAuth() {
  const { getTokenCookie } = useUtils();
  successOrder.value = false;
  success.value = false;

  if (
    getTokenCookie() === undefined ||
    getTokenCookie() === "" ||
    getTokenCookie() === null
  ) {
    logActive.value = !logActive.value;
  } else {
    const data = await getUser();
    if (data.profile) {
      await navigateTo("/account");
    } else {
      this.logActive = !this.logActive;
    }
  }
}

function closeSuccessOrder() {
  successOrder.value = false;
  success.value = false;
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.home-page {
  @media @min1200 {
    margin-top: 40px;
  }

  @media @min1400 {
    margin-top: 60px;
  }
}

.mission-block {
  position: relative;
}

.top-banner {
  position: relative;
}

.top-banner__bullets {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.top-banner__bullet {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: @MidGreyColor;
  cursor: pointer;
  transition: width @dur150, background @dur150;
}

.top-banner__bullet_active {
  width: 28px;
  background: @BlueNewColor;
}

.top-banner-fade-enter-active,
.top-banner-fade-leave-active {
  transition: opacity @dur250;
}

.top-banner-fade-enter-from,
.top-banner-fade-leave-to {
  opacity: 0;
}

.search-block {
  margin-top: 40px;

  @media @min760 {
    margin-top: 80px;
  }
}

.review-block {
  margin-top: 60px;

  @media @min760 {
    margin-top: 125px;
  }
}

.advantages-block {
  margin-top: 70px;

  @media @min760 {
    margin-top: 140px;
  }
}

.news-block {
  margin-top: 60px;

  @media @min580 {
    margin-top: 70px;
  }

  @media @min760 {
    margin-top: 150px;
  }

  @media @min990 {
    margin-top: 150px;
  }

  @media @min1200 {
    margin-top: 130px;
  }
}

.summary-block {
  margin-top: 60px;

  @media @min990 {
    margin-top: 120px;
  }

  @media @min1200 {
    margin-top: 130px;
  }
}

.question-block {
  margin-top: 60px;
  //TODO убрать
  margin-bottom: 120px;

  @media @min760 {
    margin-top: 140px;
  }
}
</style>
