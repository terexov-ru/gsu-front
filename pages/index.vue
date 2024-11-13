<template>
  <main class="home-page">
    <MissionSlider
      class="mission-block"
      @clickButton="formConActive = true"
      :banner="page.top_banner"
    />

    <ProgramSearchBlock class="search-block" />

    <ReviewBlock class="review-block" :reviews="page.reviews" />

    <NewsBlock class="news-block" :news="page.news[0].slice(0, 3)" />

    <AdvantagesSlider
      class="advantages-block"
      :banner="page.bottom_banner"
      @clickButton="moreInfoActive = true"
    />

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
import { onMounted, toValue } from "vue";

const { simpleGet, getUser } = useApi();
const formConActive = ref(false);
const sucActive = ref(false);
const successOrder = ref(false);
const moreInfoActive = ref(false);
const logActive = ref(false);

const { data: data } = await simpleGet("/page/main");

const page = toValue(data).page;

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
