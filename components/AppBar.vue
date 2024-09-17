<template>
  <header class="header">
    <div class="wrapper wrapper_paddings" :class="{ header_fixed: menuActive }">
      <div class="header__container">
        <NuxtLink to="/">
          <img class="logo_s" src="~/assets/logo_s.png" />
        </NuxtLink>

        <div class="nav">
          <!--     Верх навигации     -->
          <div class="nav__container">
            <ul v-if="!$viewport.isLessThan('desktop')" class="nav__list">
              <li class="nav__list__item text text_caption">
                <NuxtLink to="/loyalty"> Программа лояльности </NuxtLink>
              </li>
              <li class="nav__list__item text text_caption">
                <NuxtLink to="/vacancies"> Вакансии </NuxtLink>
              </li>
              <li class="dropdown nav__list__item">
                <span class="dropdown__btn text text_caption">Помощь</span>
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
            <!--     Иконки     -->
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
            v-if="!$viewport.isLessThan('desktop')"
            class="delimiter delimiter_gradient"
          />

          <div v-if="!$viewport.isLessThan('mobile')" class="nav__container">
            <!--     Низ навигации     -->
            <ul v-if="!$viewport.isLessThan('desktop')" class="nav__list">
              <li class="dropdown nav__list__item">
                <span class="dropdown__btn text text_caption text_dark"
                  >Обучение</span
                >
                <ul class="dropdown__list text text_normal text_dark">
                  <li v-for="category in categories">
                    <NuxtLink
                      :to="'/courses?id=' + category.id"
                      @click="menuActive = false"
                      >{{ category.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li class="dropdown nav__list__item">
                <span class="dropdown__btn text text_caption text_dark"
                  >О компании</span
                >
                <ul class="dropdown__list text text_dark">
                  <li>
                    <NuxtLink to="/about"> Университет </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/news"> Новости </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/license"> Лицензии </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/reviews"> Отзывы клиентов </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/team"> Наша команда </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/requisites"> Реквизиты </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/details">
                      Сведения об организации
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/register">
                      Государственный реестр ФИС ФРДО
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>

            <!--     Кнопка действия     -->
            <button
              @click="reqActive = !reqActive"
              class="button button_rounded button_gradient button_small"
            >
              Заказать звонок
            </button>
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
        <div class="burger-menu__item">
          <div
            class="text burger-menu__text text_caption text_dark pointer"
            @click="
              activeStudy = !activeStudy;
              activeAbout = false;
            "
          >
            Обучение
          </div>
          <div class="info__body" :class="{ info__body_active: activeStudy }">
            <div class="column column_gap16 text text_normal text_light">
              <div v-for="category in categories">
                <NuxtLink
                  :to="'/courses?id=' + category.id"
                  @click="menuActive = false"
                  >{{ category.title }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

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
                  >Университет</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/news" @click="menuActive = false"
                  >Новости</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/license" @click="menuActive = false"
                  >Лицензии</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/reviews" @click="menuActive = false"
                  >Отзывы клиентов</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/team" @click="menuActive = false"
                  >Наша команда</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/requisites" @click="menuActive = false"
                  >Реквизиты</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/details" @click="menuActive = false"
                  >Сведения об организации</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about/register" @click="menuActive = false"
                  >Государственный реестр ФИС ФРДО</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="delimiter delimiter_gradient" />

      <ul class="nav__list burger-menu__block nav__list_mob">
        <li class="nav__list__item text text_caption">
          <NuxtLink to="/loyalty" @click="menuActive = false"
            >Программа лояльности</NuxtLink
          >
        </li>
        <li class="nav__list__item text text_caption">
          <NuxtLink to="/vacancies" @click="menuActive = false"
            >Вакансии</NuxtLink
          >
        </li>

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

const firstRequestBody = {
  start: 0,
  amount: 1,
  sort: 0,
  category: 0,
};

const { data: page } = await useFetch(API + "/page/learning", {
  method: "POST",
  body: firstRequestBody,
});

const categories = toValue(page).page.categories;

console.log(categories);

const login = async () => {
  console.log(getTokenCookie());

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
