<template>
  <div class="wrapper wrapper_paddings">
    <div class="requisites-block">
      <h1 class="text text_h2">Реквизиты</h1>

      <div class="download">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 12L12 17M12 17L17 12M12 17L12 4" stroke="#129DF4" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M6 20H18" stroke="#129DF4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="text text_accent">Реквизиты</span>
      </div>

      <h2 class="text text_normal">Ниже приведены ревизиты компании, в случае необходимости получения дополнительных
        документов: свидетельства о
        государственной регистрации, идентификационного номера налогоплательщика вы можете обратиться в бухгалтерию
        предприятия.</h2>

      <ul class="list">
        <li class="list__item">
          <span class="text text_semi-bold">Полное наименование</span>
          <span class="text text_normal">Общество с ограниченной ответственностью «Гарант Сервис Университет»</span>
        </li>
        <li class="list__item">
          <span class="text text_semi-bold">Сокращенное наименование</span>
          <span class="text text_normal">ООО «Гарант Сервис Университет»</span>
        </li>
        <li class="list__item">
          <span class="text text_semi-bold">ИНН/КПП</span>
          <span class="text text_normal">8603221438/720301001</span>
        </li>
        <li class="list__item">
          <span class="text text_semi-bold">ОГРН</span>
          <span class="text text_normal">1168617056123</span>
        </li>
        <li class="list__item">
          <span class="text text_semi-bold">Юридический адрес</span>
          <span class="text text_normal">625 507, Тюменская область, Г.О. ГОРОД ТЮМЕНЬ, Г ТЮМЕНЬ, УЛ БОРИСА БЫСТРЫХ, Д. 5, ПОМЕЩ. 1</span>
        </li>
        <li class="list__item">
          <span class="text text_semi-bold">Фактический адрес</span>
          <span class="text text_normal">625 007 г. Тюмень, ул. Мельникайте, 112, стр.3, офис 403, 404; <br>
628624, ХМАО-Югра, г. Нижневартовск, ТЦ Джаз, ул. Пермская 1В, ТЦ «Шафран», 2 этаж, офис 200</span>
        </li>
        <li class="list__item">
          <span class="text text_semi-bold">Телефон</span>
          <span class="text text_normal">8-800-550-40-48</span>
        </li>
        <li class="list__item">
          <span class="text text_semi-bold">Электронная почта</span>
          <span class="text text_normal">info@gsu-prof.ru</span>
        </li>
        <li class="list__item">
          <span class="text text_semi-bold">Сайт</span>
          <span class="text text_normal">gsu-prof.ru</span>
        </li>
        <li class="list__item">
          <span class="text text_semi-bold">Банковские реквизиты</span>
          <span class="text text_normal">БИК 046577964 <br>
           <br>Р/с: 40702810038340001204 в Филиале «Екатеринбургский» АО «АЛЬФА-БАНК»
            <br>К/с: 30101810100000000964 в Уральское ГУ Банка России</span>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutRequisites"
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.requisites-block {
  margin-top: 60px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.list {

}

.download {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 12px;

  @media @min760 {
    margin-top: 20px;
  }
}

.list__item {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 12px;

  word-break: break-word;

  padding: 12px 0;

  @media @min580 {
    grid-template-columns: 240px 1fr;
    padding: 20px 0;
    gap: 50px;
  }

  border-top: 1px solid @MidGreyColor;
  list-style: none;
}
</style>
