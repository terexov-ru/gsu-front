<template>
  <div class="wrapper wrapper_paddings">
    <div class="tech-block">
      <h1 class="text text_h2">Технические требования к устройству</h1>
      <div class="tech__grid">
        <div
          v-for="tech in page.technical_requirements"
          class="tech-card"
          :class="{ ' tech-card_gradient': tech.is_special }"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
              stroke="white"
              stroke-width="2.66667"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 22.7998C18 23.9044 17.1046 24.7998 16 24.7998C14.8954 24.7998 14 23.9044 14 22.7998C14 21.6952 14.8954 20.7998 16 20.7998C17.1046 20.7998 18 21.6952 18 22.7998Z"
              fill="white"
            />
            <path
              d="M16 17.6001L16 8.8001"
              stroke="white"
              stroke-width="2.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div>
            <h3 class="text text_h3" v-html="tech.title"></h3>
            <div class="text text_normal" v-html="tech.text"></div>
          </div>
        </div>
        <!-- <div class="row">
          <div class="tech-card tech-card_440">
            <div>
              <h3 class="text text_h3">Компьютер</h3>
              <div class="text text_normal">Процессор — тактовая частота не менее 1,3 ГГц</div>
              <div class="text text_normal">Процессор — тактовая частота не менее 1,3 ГГц</div>
              <div class="text text_normal">Процессор — тактовая частота не менее 1,3 ГГц</div>
              <div class="text text_normal">Процессор — тактовая частота не менее 1,3 ГГц</div>
            </div>

            <div></div>

          </div>

          <div class="tech-card">
            <h3 class="text text_h3">На компьютере должен быть установлен один из популярных браузеров последней
              версии:</h3>

            <div class="text text_normal">Mozilla Firefox</div>
            <div class="text text_normal">Mozilla Firefox</div>
            <div class="text text_normal">Mozilla Firefox</div>
            <div class="text text_normal">Mozilla Firefox</div>

            <div class="bottom-right">

              <img class="img" src="~/assets/tech_web_icons.png" alt="">

            </div>
          </div>
        </div> -->

        <!-- <div class="row">
          <div class="row row_media">

            <div class="tech-card tech-card_240">
              <div>
                <h3 class="text text_h3">Операционна система:</h3>

                <div class="text text_normal">Windows 7 / 8 / 9 / 10</div>
                <div class="text text_normal">Mac OS, iOs, Android</div>
              </div>
              <div class="img-container">
                <img class="img" src="~/assets/tech_os_icons.png" alt="">
              </div>
            </div>

            <div class="tech-card tech-card_500">
              <h3 class="text text_h3">Для работы с планшета и мобильных устройств, рекомендуется использовать
                актуальные
                версии браузеров:</h3>

              <div class="text text_normal">Safari</div>
              <div class="text text_normal">Google Chrome</div>
              <div class="img-container">
                <img class="img" src="~/assets/tech_mob_icons.png" alt="">
              </div>

            </div>
          </div>

          <div class="tech-card tech-card_gradient">
            <div class="tech-card__container">

              <div>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
                      stroke="white" stroke-width="2.66667" stroke-miterlimit="10" stroke-linecap="round"
                      stroke-linejoin="round"/>
                  <path
                      d="M18 22.7998C18 23.9044 17.1046 24.7998 16 24.7998C14.8954 24.7998 14 23.9044 14 22.7998C14 21.6952 14.8954 20.7998 16 20.7998C17.1046 20.7998 18 21.6952 18 22.7998Z"
                      fill="white"/>
                  <path d="M16 17.6001L16 8.8001" stroke="white" stroke-width="2.66667" stroke-linecap="round"
                        stroke-linejoin="round"/>
                </svg>
              </div>

              <div>
                <h3 class="text text_h3">Наличие стабильного
                  интернет-соединения:</h3>
                <div class="text text_normal">Рекомендуемая скорость интернет-соединения для просмотра содержимого от 2
                  Мбит/сек.
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const { getTechs } = useApi();
const sucActive = ref(false);

const { data } = await getTechs();

const page = data.value?.page;

console.log(page);
</script>

<style lang="less" scoped>
@import "assets/core.less";

.tech-block {
  margin-top: 120px;
  margin-bottom: 80px;
}

.row {
  display: flex;
  gap: inherit;
  flex-direction: column;

  @media @min760 {
    flex-direction: row;
  }

  &_media {
    flex-direction: column;
    @media @min580 {
      flex-direction: row;
    }
  }
}

.tech__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  row-gap: 12px;
  column-gap: 12px;

  margin-top: 32px;

  @media @min580 {
    grid-template-columns: repeat(3, 1fr);
  }

  @media @min990 {
    grid-template-columns: repeat(5, 1fr);
  }
}

.tech-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: auto;

  background: @LightGreyColor;
  border-radius: 8px;

  svg {
    display: none;
  }

  .bottom-right {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .text_h3 {
    margin-bottom: 12px;
  }

  &_gradient {
    flex-direction: row;
    column-gap: 20px;
    justify-content: flex-start;

    svg {
      display: block;
      flex-shrink: 0;
    }

    background: @BluButtonGradient;
    color: @WhiteColor;
  }

  &_440 {
    flex-shrink: 0;
    width: 100%;
    @media @min760 {
      width: 440px;
    }
  }

  &_500 {
    width: 100%;

    @media @min990 {
      flex-shrink: 0;
      width: 410px;
    }

    @media @min1200 {
      width: 500px;
    }
  }

  &_240 {
    flex-shrink: 0;
    width: 100%;
    @media @min580 {
      width: 220px;
    }
  }

  &:nth-child(1) {
    grid-column: span 1;

    @media @min580 {
      grid-column: span 3;
    }

    @media @min990 {
      grid-column: span 2;
    }
  }

  &:nth-child(2) {
    grid-column: span 1;

    @media @min580 {
      grid-column: span 3;
    }

    @media @min990 {
      grid-column: span 3;
    }
  }

  &:nth-child(4) {
    grid-column: span 1;

    @media @min580 {
      grid-column: span 2;
    }

    @media @min990 {
      grid-column: span 2;
    }
  }

  &:nth-child(5) {
    grid-column: span 1;

    @media @min580 {
      grid-column: span 3;
    }

    @media @min990 {
      grid-column: span 2;
    }
  }
}

.tech-card__container {
  display: flex;
  gap: 20px;
}

.img-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.img {
  width: auto;
  height: 32px;
}
</style>
