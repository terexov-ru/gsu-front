<template>
  <header class="header">
    <div class="wrapper wrapper_paddings" :class="{ header_fixed: menuActive }">
      <div class="header__container">
        <NuxtLink to="/" class="logo-link">
          <img
            src="~/assets/christmas-cap.png"
            alt=""
            class="christmas-cap"
            v-if="isSnowThemeOn()"
          />
          <img class="logo_s" src="~/assets/logo_s.png" />
        </NuxtLink>

        <div
          v-if="!$viewport.isLessThan('desktop')"
          class="delimiter delimiter_column header__logo-divider"
        />

        <div class="nav">
          <div
            v-if="!$viewport.isLessThan('desktop')"
            class="nav__container header__top-row"
          >
            <div class="header-socials">
              <NuxtLink
                :to="
                  footerPage?.page?.phone ? 'tel:' + footerPage.page.phone : '/'
                "
                target="_blank"
                external
              >
                <img src="~/assets/svg/phone.svg" alt="phone" />
              </NuxtLink>
              <NuxtLink
                :to="footerPage?.page?.whatsapp || '/'"
                target="_blank"
                external
              >
                <img src="~/assets/svg/whatsapp.svg" alt="whatsapp" />
              </NuxtLink>
              <NuxtLink
                :to="footerPage?.page?.vk || '/'"
                target="_blank"
                external
              >
                <img src="~/assets/svg/vk.svg" alt="vk" />
              </NuxtLink>
              <NuxtLink
                :to="footerPage?.page?.max || '/'"
                target="_blank"
                external
              >
                <img src="~/assets/svg/max.svg" alt="max" />
              </NuxtLink>
              <NuxtLink
                :to="footerPage?.page?.telegram || '/'"
                target="_blank"
                external
              >
                <img src="~/assets/svg/telegram.svg" alt="telegram" />
              </NuxtLink>
            </div>

            <div class="header-actions">
              <div class="nav__icons">
                <SearchSmallAnimated />

                <img
                  class="pointer"
                  @click="login()"
                  src="~/assets/svg/profile.svg"
                  alt="profile"
                />

                <NuxtLink to="/basket">
                  <div class="row basket row_al-c">
                    <img
                      class="pointer"
                      src="~/assets/svg/basket.svg"
                      alt="basket"
                    />

                    <ClientOnly>
                      <div v-if="basket.length > 0" class="basket__count">
                        {{ basket.length }}
                      </div>
                    </ClientOnly>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div
            v-if="!$viewport.isLessThan('desktop')"
            class="delimiter delimiter_gradient header__nav-divider"
          />

          <div
            v-if="!$viewport.isLessThan('desktop')"
            class="nav__container header__bottom-row"
          >
            <ul class="nav__list header__nav-list">
              <HeaderEducationMenu
                :specialty-areas="specialtyAreas"
                @navigate="menuActive = false"
              />

              <li class="dropdown nav__list__item">
                <NuxtLink
                  to="/about"
                  class="dropdown__btn text text_caption text_dark"
                >
                  О компании
                </NuxtLink>
                <ul class="dropdown__list text text_dark">
                  <li>
                    <NuxtLink to="/about"> О нас </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/team"> Наша команда </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/license"> Лицензии </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/details">
                      Сведения об образовательной организации
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/requisites"> Реквизиты </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/register">
                      Государственный реестр ФИС ФРДО
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/news"> Новости </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/reviews"> Отзывы клиентов </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/vacancies"> Вакансии </NuxtLink>
                  </li>
                </ul>
              </li>
              <li class="dropdown nav__list__item">
                <NuxtLink
                  to="/help/questions"
                  class="dropdown__btn text text_caption text_dark"
                >
                  Помощь
                </NuxtLink>
                <ul class="dropdown__list text text_normal text_dark">
                  <li>
                    <NuxtLink to="/help/questions">
                      Ответы на вопросы
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/help/tech">
                      Технические требования
                    </NuxtLink>
                  </li>
                </ul>
              </li>
              <li class="nav__list__item text text_caption">
                <NuxtLink to="/about/contacts"> Контакты </NuxtLink>
              </li>
            </ul>

            <button
              @click="reqActive = !reqActive"
              class="button button_rounded button_gradient button_small header__callback"
            >
              Заказать звонок
            </button>
          </div>

          <div
            v-if="$viewport.isLessThan('desktop')"
            class="nav__container header__mobile-actions"
          >
            <div class="nav__icons">
              <SearchSmallAnimated />

              <img
                class="pointer"
                v-if="!$viewport.isLessThan('mobile')"
                @click="login()"
                src="~/assets/svg/profile.svg"
                alt="profile"
              />

              <NuxtLink to="/basket">
                <div class="row basket row_al-c">
                  <img
                    class="pointer"
                    src="~/assets/svg/basket.svg"
                    alt="basket"
                  />

                  <ClientOnly>
                    <div v-if="basket.length > 0" class="basket__count">
                      {{ basket.length }}
                    </div>
                  </ClientOnly>
                </div>
              </NuxtLink>
            </div>
          </div>

          <div
            v-if="$viewport.isLessThan('desktop')"
            @click="menuActive = !menuActive"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="1.5"
                stroke="#25292D"
              />
              <path
                d="M7 10H25"
                stroke="#25292D"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M7 16H25"
                stroke="#25292D"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M7 22H25"
                stroke="#25292D"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div v-if="menuActive" class="burger-menu">
      <div class="text burger-menu__title text_h3">Меню</div>

      <div class="column">
        <HeaderEducationMenu
          mobile
          :specialty-areas="specialtyAreas"
          :is-open="activeStudy"
          @toggle="
            activeStudy = !activeStudy;
            activeAbout = false;
          "
          @navigate="menuActive = false"
        />

        <div class="burger-menu__item">
          <div
            class="text burger-menu__text text_caption text_dark pointer"
            @click="
              activeAbout = !activeAbout;
              activeStudy = false;
            "
          >
            О компании
          </div>
          <div class="info__body" :class="{ info__body_active: activeAbout }">
            <div class="column column_gap16 text text_normal text_light">
              <div>
                <NuxtLink to="/about" @click="menuActive = false"
                  >О нас</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/team" @click="menuActive = false"
                  >Наша команда</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/license" @click="menuActive = false"
                  >Лицензии</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/details" @click="menuActive = false"
                  >Сведения об образовательной организации</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/requisites" @click="menuActive = false"
                  >Реквизиты</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/register" @click="menuActive = false">
                  Государственный реестр ФИС ФРДО
                </NuxtLink>
              </div>
              <div>
                <NuxtLink to="/news" @click="menuActive = false"
                  >Новости</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/reviews" @click="menuActive = false"
                  >Отзывы клиентов</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/vacancies" @click="menuActive = false"
                  >Вакансии</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="delimiter delimiter_gradient" />

      <ul class="nav__list burger-menu__block nav__list_mob">
        <!-- <li class="nav__list__item text text_caption">
          <NuxtLink to="/loyalty" @click="menuActive = false"
            >Программа лояльности</NuxtLink
          >
        </li>
        <li class="nav__list__item text text_caption">
          <NuxtLink to="/vacancies" @click="menuActive = false"
            >Вакансии</NuxtLink
          >
        </li> -->

        <div class="burger-menu__item">
          <div
            class="text text_caption text_dark"
            @click="activeHelp = !activeHelp"
          >
            Помощь
          </div>
          <div
            class="info__body"
            :class="{ 'info__body_active info__body_help': activeHelp }"
          >
            <div class="column column_gap16 text text_normal text_light">
              <div>
                <NuxtLink to="/help/questions" @click="menuActive = false"
                  >Ответы на вопросы</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/help/tech" @click="menuActive = false"
                  >Технические требования</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>

        <li class="nav__list__item text text_caption">
          <NuxtLink to="/about/contacts" @click="menuActive = false"
            >Контакты</NuxtLink
          >
        </li>
      </ul>

      <div class="delimiter delimiter_gradient" />

      <div class="burger-menu__block">
        <div @click="login()" class="row row_gap10 row_al-c">
          <img class="pointer" src="~/assets/svg/profile.svg" alt="profile" />
          <div class="text text_caption">Профиль</div>
        </div>
      </div>

      <div class="delimiter delimiter_gradient" />

      <button
        class="button burger-menu__button button_rounded button_gradient button_small"
      >
        Заказать звонок
      </button>
    </div>

    <OverflowContainer :active="reqActive" @closeOverflow="reqActive = false">
      <OverflowMoreInfo @close="reqActive = false" />
    </OverflowContainer>

    <OverflowContainer :active="logActive" @closeOverflow="logActive = false">
      <OverflowAuth @close="logActive = false" />
    </OverflowContainer>
  </header>
</template>

<script setup>
import { ref, onMounted, toValue } from "vue";
import AppInput from "./AppInput.vue";
import Test from "./SearchSmallAnimated.vue";
import { useUtils } from "@/composables/useUtils";
import { useApi } from "@/composables/useApi";
import { useRouter } from "vue-router";
import { API } from "~/constants/index.js";
import { isSnowThemeOn } from "~/theme/snow";

const menuActive = ref(false);
const reqActive = ref(false);
const logActive = ref(false);
const activeStudy = ref(false);
const activeAbout = ref(false);
const activeHelp = ref(false);
const basket = ref([]);

const { getBasket, getTokenCookie } = useUtils();
const { getUser } = useApi();
const router = useRouter();

onMounted(() => {
  basket.value = getBasket();
});

const closeOverflow = () => {
  reqActive.value = false;
};

const { data: mainPage } = await useFetch(API + "/page/main", {
  method: "GET",
});

const { data: footerPage } = await useFetch(API + "/page/footer", {
  method: "GET",
});

const specialtyAreas = toValue(mainPage)?.page?.specialty_areas || [];

const login = async () => {
  if (!getTokenCookie()) {
    logActive.value = !logActive.value;
  } else {
    const data = await getUser();
    if (data.profile) {
      router.push("/account");
    } else {
      logActive.value = !logActive.value;
    }
  }
};
</script>

<style lang="less" scoped>
@import "assets/core.less";

/* COMPONENT */
a {
  text-decoration: none;
  color: initial;

  &:hover {
    color: @BlueNewColor;
    transition-duration: @dur150;
  }
}

.header {
  background: @WhiteColor;
  box-shadow: @BoxShadowEffect;
  z-index: 1000;
}

.header__container {
  width: 100%;
  height: auto;
  padding: 10px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;

  @media @min760 {
    padding: 16px 0;
  }

  @media @min990 {
    padding: 20px 0;
    height: 76px;
    align-items: stretch;
  }
}

.logo {
  max-width: 125px;

  @media @min760 {
    max-width: 150px;
  }

  @media @min990 {
    max-width: 175px;
  }
}

.logo_s {
  max-width: 42px;

  @media @min580 {
    max-width: 42px;
  }

  @media @min760 {
    max-width: 59px;
  }

  @media @min990 {
    max-width: 68px;
  }
}

.logo-link {
  position: relative;
}

.christmas-cap {
  position: absolute;
  top: -25%;
  left: 35%;

  width: 90%;

  transform: translateX(-50%);
}

.header__logo-divider {
  display: none;

  @media @min990 {
    display: block;
    width: 1px;
    height: 64px;
    align-self: center;
    background: @MidGreyColor;
  }
}

/* Navigation */
.nav {
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media @min990 {
    flex: 1;
    flex-direction: column;
    gap: 0;
  }
}

.nav__container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .button {
    margin-left: auto;
  }
}

.header__top-row {
  min-height: 24px;
}

.header__bottom-row {
  min-height: 36px;
}

.header-socials,
.header-actions {
  display: flex;
  align-items: center;
}

.header-socials {
  gap: 20px;
}

.header-socials a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.header-socials img {
  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(47%) sepia(99%) saturate(1851%)
    hue-rotate(176deg) brightness(99%) contrast(93%);
}

.header-actions {
  gap: 20px;
}

.header__nav-divider {
  height: 1px;
}

.header__callback {
  min-width: 157px;
}

.header__mobile-actions {
  justify-content: flex-end;
}

.nav__list {
  list-style: none;

  display: flex;
  align-items: flex-start;
  gap: 20px;

  padding: 0;

  &_mob {
    flex-direction: column;
  }
}

.nav__list__item {
  position: relative;
  cursor: pointer;

  &:hover {
    color: @BlueNewColor;
    transition-duration: @dur250;
  }
}

.nav__icons {
  gap: 8px;

  @media @min760 {
    gap: 20px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Drop down */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 25px;
}

.dropdown__list {
  display: none;

  width: max-content;
  max-width: 320px;
  height: auto;

  box-sizing: border-box;
  padding: 12px 20px;

  position: absolute;
  top: 25px;
  left: -12px;
  z-index: 1100;

  border-radius: 12px;
  background: @WhiteColor;
  text-transform: none;
  list-style: none;

  box-shadow: @BoxShadowEffect;
  transition-duration: @dur250;
}

.dropdown__list li {
  display: block;
  margin-top: 16px;
  padding: 0;
  cursor: pointer;

  &:first-child {
    margin-top: 0;
  }

  &:hover {
    color: @BlueNewColor;
    transition-duration: @dur150;
  }
}

.dropdown:hover .dropdown__list {
  display: block;
  transition-duration: @dur250;
}

.dropdown:hover .dropdown__btn {
  position: relative;
  z-index: 100;
  color: @BlueNewColor;
}

/* Mob version of header */
.burger-menu {
  position: fixed;
  z-index: 200;
  width: 100%;
  top: 60px;
  min-height: calc(100vh - 60px);
  background: @WhiteColor;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  padding: 24px;

  @media @min760 {
    top: 90px;
  }
}

.burger-menu__block {
  margin-top: 15px;
  margin-bottom: 15px;
}

.burger-menu__title {
  margin-bottom: 12px;
}

.burger-menu__button {
  width: fit-content;
  margin-top: 15px;
}

.burger-menu__text {
  margin-bottom: 16px;
}

.header_fixed {
  background: @WhiteColor;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  z-index: 200;
}

//Open list for mobile
.info__body {
  max-height: 0;
  overflow: hidden;
  transition: 0.4s;
  margin-left: 8px;

  &_active {
    max-height: 350px;
    margin-bottom: 16px;
  }
}

.info__body_help {
  margin-bottom: 0;
  margin-top: 16px;
}

.basket {
  position: relative;
}

.basket__count {
  position: absolute;
  top: 0;
  right: 0;

  width: 16px;
  height: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: @WhiteColor;
  background: @BlueNewColor;
  font-size: 12px;

  border-radius: 50%;
}
</style>
