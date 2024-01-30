<template>
  <header class="header">

    <div class="wrapper wrapper_paddings"
         :class="{'header_fixed' : menuActive}"
    >
      <div class="header__container">

        <NuxtLink to="/">
          <img class="icon" src="~/assets/logo.png"/>
        </NuxtLink>

        <div
            v-if="!$viewport.isLessThan('desktop')"
            class="delimiter delimiter_column delimiter_light-grey"/>

        <div class="nav">
          <!--     Верх навигации     -->
          <div class="nav__container">
            <ul v-if="!$viewport.isLessThan('desktop')" class="nav__list">
              <li class="nav__list__item text text_caption">
                <NuxtLink to="/loyalty">
                  Программа лояльности
                </NuxtLink>
              </li>
              <li class="nav__list__item text text_caption">
                <NuxtLink to="/vacancies">
                  Вакансии
                </NuxtLink>
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
                <NuxtLink to="/about/contacts">
                  Контакты
                </NuxtLink>
              </li>
            </ul>
            <!--     Иконки     -->
            <div class="nav__icons">

              <img class="pointer" src="~/assets/svg/search.svg" alt="search">

              <img class="pointer" v-if="!$viewport.isLessThan('mobile')"
                   @click="logActive = !logActive"
                   src="~/assets/svg/profile.svg"
                   alt="profile"
              >

              <NuxtLink to="/basket">
                <img class="pointer" src="~/assets/svg/basket.svg" alt="basket">
              </NuxtLink>
            </div>
          </div>

          <div v-if="!$viewport.isLessThan('desktop')" class="delimiter delimiter_gradient"/>

          <div v-if="!$viewport.isLessThan('mobile')" class="nav__container">
            <!--     Низ навигации     -->
            <ul v-if="!$viewport.isLessThan('desktop')" class="nav__list">

              <li class="dropdown nav__list__item">
                <span class="dropdown__btn text text_caption text_dark">Обучение</span>
                <ul class="dropdown__list text text_normal text_dark">
                  <li>
                    <NuxtLink to="/courses">
                      Непрерывное медицинское <br>
                      и фармацевтическое образование
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/courses">
                      Профессиональная переподготовка
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/courses">
                      Повышение квалификации
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/courses">
                      Профессиональное обучение
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li class="dropdown nav__list__item">
                <span class="dropdown__btn text text_caption text_dark">О компании</span>
                <ul class="dropdown__list text text_dark">
                  <li>
                    <NuxtLink to="/about">
                      Университет
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/news">
                      Новости
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/license">
                      Лицензии
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/reviews">
                      Отзывы клиентов
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/team">
                      Наша команда
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/about/requisites">
                      Реквизиты
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

          <div v-if="$viewport.isLessThan('desktop')"
               @click="menuActive = !menuActive"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="31" height="31" rx="1.5" stroke="#25292D"/>
              <path d="M7 10H25" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M7 16H25" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M7 22H25" stroke="#25292D" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

      </div>
    </div>

    <div v-if="menuActive" class="burger-menu">
      <div class="text burger-menu__title text_h3">Меню</div>
      <div class="column">
        <div class="burger-menu__item">
          <div class="text burger-menu__text text_caption text_dark"
               @click="activeStudy = !activeStudy; activeAbout = false">Обучение
          </div>

          <div class="info__body"
               :class="{'info__body_active' : activeStudy}"
          >
            <div class="column column_gap16 text text_normal text_light">
              <div>Непрерывное медицинское и фармацевтическое образование</div>
              <div>Профессиональная переподготовка</div>
              <div>Повышение квалификации</div>
              <div>Профессиональное обучение</div>
            </div>

          </div>
        </div>
        <div class="burger-menu__item">
          <div class="text burger-menu__text text_caption text_dark"
               @click="activeAbout = !activeAbout; activeStudy = false">О компании
          </div>

          <div class="info__body"
               :class="{'info__body_active' : activeAbout}"
          >
            <div class="column column_gap16 text text_normal text_light">
              <div>Университет</div>
              <div>Новости</div>
              <div>Лицензии</div>
              <div>Отзывы клиентов</div>
              <div>СМИ о нас</div>
              <div>Наша команда</div>
              <div>Реквизиты</div>
              <div>Государственный реестр ФИС ФРДО</div>
            </div>
          </div>
        </div>
      </div>

      <div class="delimiter delimiter_gradient"/>

      <ul class="nav__list burger-menu__block nav__list_mob">
        <li class="nav__list__item text text_caption">Программа лояльности</li>
        <li class="nav__list__item text text_caption">Вакансии</li>

        <div class="burger-menu__item">
          <div class="text text_caption text_dark"
               @click="activeHelp = !activeHelp">Помощь
          </div>
          <div class="info__body" :class="{'info__body_active info__body_help' : activeHelp}">
            <div class="column column_gap16 text text_normal text_light">
              <div>Ответы на вопросы</div>
              <div>Технические требования</div>
            </div>
          </div>
        </div>

        <li class="nav__list__item text text_caption">Контакты</li>
      </ul>

      <div class="delimiter delimiter_gradient"/>

      <div class="burger-menu__block">
        <div class="row row_gap10 row_al-c">
          <img class="pointer" src="~/assets/svg/profile.svg" alt="profile">
          <div class="text text_caption">
            Профиль
          </div>
        </div>
      </div>

      <div class="delimiter delimiter_gradient"/>

      <button class="button burger-menu__button button_rounded button_gradient button_small">Заказать звонок</button>


    </div>

    <OverflowContainer
        :active="reqActive"
        @closeOverflow="closeOverflow()"
    >
      <div class="overflow-card">

        <svg class="overflow-card__close"
             @click="reqActive = !reqActive"
             width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M18.9979 17.0009L25.0896 10.9234C25.3563 10.6567 25.5062 10.2948 25.5062 9.91758C25.5062 9.54032 25.3563 9.17851 25.0896 8.91175C24.8228 8.64498 24.461 8.49512 24.0837 8.49512C23.7065 8.49512 23.3447 8.64498 23.0779 8.91175L17.0004 15.0034L10.9229 8.91175C10.6561 8.64498 10.2943 8.49512 9.91707 8.49512C9.53981 8.49512 9.178 8.64498 8.91124 8.91175C8.64447 9.17851 8.49461 9.54032 8.49461 9.91758C8.49461 10.2948 8.64447 10.6567 8.91124 10.9234L15.0029 17.0009L8.91124 23.0784C8.77845 23.2101 8.67306 23.3668 8.60114 23.5394C8.52922 23.7121 8.49219 23.8972 8.49219 24.0842C8.49219 24.2713 8.52922 24.4564 8.60114 24.6291C8.67306 24.8017 8.77845 24.9584 8.91124 25.0901C9.04293 25.2229 9.19962 25.3283 9.37225 25.4002C9.54489 25.4721 9.73005 25.5091 9.91707 25.5091C10.1041 25.5091 10.2893 25.4721 10.4619 25.4002C10.6345 25.3283 10.7912 25.2229 10.9229 25.0901L17.0004 18.9984L23.0779 25.0901C23.2096 25.2229 23.3663 25.3283 23.5389 25.4002C23.7116 25.4721 23.8967 25.5091 24.0837 25.5091C24.2708 25.5091 24.4559 25.4721 24.6286 25.4002C24.8012 25.3283 24.9579 25.2229 25.0896 25.0901C25.2223 24.9584 25.3277 24.8017 25.3997 24.6291C25.4716 24.4564 25.5086 24.2713 25.5086 24.0842C25.5086 23.8972 25.4716 23.7121 25.3997 23.5394C25.3277 23.3668 25.2223 23.2101 25.0896 23.0784L18.9979 17.0009Z"
              fill="#199AF0"/>
        </svg>

        <div class="text text_h3 text_center">
          Медицинская реабилитация как вид помощи при коронавирусной инфекции Covid-19
        </div>

        <div class="form">
          <InputBlock
              :name="'ФИО'"
              :type="'text'"
              :placeholder="'Иванов Иван Иванович'"
          />

          <div class="row row_gap24">
            <InputBlock
                :name="'Телефон'"
                :type="'text'"
                :placeholder="'Номер телефона'"
            />
            <InputBlock
                :name="'E-mail'"
                :type="'text'"
                :placeholder="'Почта'"
            />
          </div>

          <InputBlock
              :name="'Комментарий'"
              :type="'text'"
              :placeholder="'Ваш комментарий'"
          />
        </div>

        <button class="button overflow-card__button button_gradient button_paddings">Получить консультацию</button>
      </div>
    </OverflowContainer>

    <OverflowContainer
        :active="logActive"
        @closeOverflow="closeOverflow()"
    >
      <OverflowLogin
          @close="logActive = false"
      />
    </OverflowContainer>

  </header>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      menuActive: false,
      reqActive: false,
      logActive: false,
      activeStudy: false,
      activeAbout: false,
      activeHelp: false,
    }
  },
  methods: {
    closeOverflow() {
      this.reqActive = false
    },
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

/* OVERFLOW */
.overflow-card {
  position: relative;

  width: 1043px;
  height: 583px;

  overflow: hidden;
  box-sizing: border-box;
  padding: 40px 165px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 36px;
  border: 1px solid @MidGreyColor;
  background: @WhiteColor;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.overflow-card__button {
  align-self: center;
}

.overflow-card__close {
  position: absolute;
  top: 34px;
  right: 34px;
  cursor: pointer;
}

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

.icon {
  max-width: 125px;

  @media @min760 {
    max-width: 150px;
  }

  @media @min990 {
    max-width: 175px;
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
  gap: 20px;
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

</style>
