<template>
  <footer class="footer">
    <div class="wrapper wrapper_paddings">
      <div class="footer__content">

        <div class="nav">
          <ul class="nav__list">
            <li class="text nav__list__item text_semi-bold">
              <NuxtLink to="/course" class="link link_white">
                ПРОГРАММЫ ОБУЧЕНИЯ
              </NuxtLink>
            </li>
            <li class="text nav__list__item text_semi-bold">
              <NuxtLink to="/about" class="link link_white">
                ОБ УНИВЕРСИТЕТЕ
              </NuxtLink>
            </li>
            <li class="text nav__list__item text_semi-bold">
              <NuxtLink to="/about/reviews" class="link link_white">
                ОТЗЫВЫ КЛИЕНТОВ
              </NuxtLink>
            </li>
          </ul>
          <ul class="nav__list">
            <li class="text nav__list__item text_semi-bold">
              <NuxtLink to="/about/news" class="link link_white">
                НОВОСТИ
              </NuxtLink>
            </li>
            <li class="text nav__list__item text_semi-bold">
              <NuxtLink to="/about/loyalty" class="link link_white">
                ПРОГРАММА ЛОЯЛЬНОСТИ
              </NuxtLink>
            </li>
            <li class="text nav__list__item text_semi-bold">
              <NuxtLink to="/about/contacts" class="link link_white">
                КОНТАКТЫ
              </NuxtLink>
            </li>
          </ul>
          <ul class="nav__list">
            <li class="text nav__list__item text_semi-bold">
              <NuxtLink to="/" class="link link_white">
                ЛИЧНЫЙ КАБИНЕТ
              </NuxtLink>
            </li>
            <li class="text nav__list__item text_semi-bold">
              <NuxtLink to="/basket" class="link link_white">
                КОРЗИНА
              </NuxtLink>
            </li>
            <li class="text nav__list__item text_semi-bold">
              <NuxtLink to="/help/questions" class="link link_white">
                ПОМОЩЬ
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="delimiter delimiter_dark-grey"/>

        <div class="contacts">
          <div class="contacts__info">
            <div class="text contacts__info__address text_semi-bold">г. Тюмень, ул. Мельникайте 112, стр. 3 БЦ
              «СОЛАРИС», 4 эт. офис 403,404
            </div>
            <div>
              <div class="text contacts__info__number text_semi-bold">+7 (800) 550-40-48</div>
              <div class="text contacts__info__mail text_semi-bold">info@gsu-prof.ru</div>
            </div>
            <div>
              <div class="text text_normal">Способ оплаты</div>

              <div class="contacts__payment-methods">
                <img src="~/assets/svg/pay_master.svg" alt="pay_master">
                <img src="~/assets/svg/pay_visa.svg" alt="pay_visa">
                <img src="~/assets/svg/pay_mir.svg" alt="pay_mir">
              </div>

            </div>
          </div>

          <div class="contacts__social-media">
            <img src="~/assets/svg/phone.svg" alt="phone">
            <img src="~/assets/svg/whatsapp.svg" alt="whatsapp">
            <img src="~/assets/svg/telegram.svg" alt="telegram">
          </div>
        </div>

        <div class="delimiter delimiter_dark-grey"/>

        <div class="policy">
          <div class="text text_normal">Все права защищены 2022©</div>
          <div class="text text_normal">Политика конфиденциальности</div>
        </div>

      </div>
    </div>
  </footer>
</template>

<style lang="less" scoped>
@import "assets/core.less";

.footer {
  box-sizing: border-box;
  padding: 40px 0;
  width: 100%;
  height: auto;

  background: @BlackColor;

  @media @max760 {
    padding: 32px 0;
  }
}

.footer__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;

  @media @max760 {
    gap: 20px;
  }
}

.nav {
  display: flex;
  justify-content: space-between;

  @media @max760 {
    flex-direction: column;
  }
}

.nav__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav__list__item {
  color: @WhiteColor;
}

.contacts {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media @max760 {
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }
}

.contacts__info {
  display: flex;
  gap: 40px;

  color: @WhiteColor;

  @media @max760 {
    flex-direction: column;
  }
}

.contacts__info__address {
  width: 220px;
}

.contacts__info__mail {
  margin-top: 8px;
}

.contacts__payment-methods {
  display: flex;
  gap: 5px;
  align-items: center;

  margin-top: 10px;
}

.contacts__social-media {
  display: flex;
  gap: 15px;
}

.policy {
  display: flex;
  justify-content: space-between;
  color: @WhiteColor;

  @media @max760 {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
