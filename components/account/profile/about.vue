<template>
  <div class="about">
    <div class="text text_large">О себе</div>

    <div class="about__image">
      <div class="text text_normal">Фотография профиля</div>

      <div v-if="!$viewport.isLessThan('desktop')" class="about__image__drop">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M20 19.3782C21.6714 19.3782 23.2743 18.7142 24.4561 17.5324C25.6379 16.3506 26.3019 14.7477 26.3019 13.0763C26.3019 11.4049 25.6379 9.80202 24.4561 8.62019C23.2743 7.43836 21.6714 6.77441 20 6.77441C18.3286 6.77441 16.7257 7.43836 15.5439 8.62019C14.3621 9.80202 13.6981 11.4049 13.6981 13.0763C13.6981 14.7477 14.3621 16.3506 15.5439 17.5324C16.7257 18.7142 18.3286 19.3782 20 19.3782ZM20 22.1469C11.6213 22.1469 6.25 26.7707 6.25 29.0219V33.2257H33.75V29.0219C33.75 26.2994 28.665 22.1469 20 22.1469Z"
              fill="#B9BFC6"/>
        </svg>
        <div class="text text_normalt">
          <span>Перетащите файл сюда или </span>
          <span class="text_accent pointer">загрузите с компьютера</span>
        </div>
      </div>

      <div v-else class="about__image__button">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M20 19.3782C21.6714 19.3782 23.2743 18.7142 24.4561 17.5324C25.6379 16.3506 26.3019 14.7477 26.3019 13.0763C26.3019 11.4049 25.6379 9.80202 24.4561 8.62019C23.2743 7.43836 21.6714 6.77441 20 6.77441C18.3286 6.77441 16.7257 7.43836 15.5439 8.62019C14.3621 9.80202 13.6981 11.4049 13.6981 13.0763C13.6981 14.7477 14.3621 16.3506 15.5439 17.5324C16.7257 18.7142 18.3286 19.3782 20 19.3782ZM20 22.1469C11.6213 22.1469 6.25 26.7707 6.25 29.0219V33.2257H33.75V29.0219C33.75 26.2994 28.665 22.1469 20 22.1469Z"
              fill="#B9BFC6"/>
        </svg>
        <div class="text text_normal text_accent">Загрузить</div>
      </div>

    </div>

    <Form class="about__edit-profile">

      <div class="about__edit-profile__row">
        <InputBlock
            :name="'name'"
            :title="'Имя'"
            :type="'text'"
            v-model:value="nameValue"
            :rule="validateName"
        />

        <InputBlock
            :name="'sename'"
            :title="'Отчество'"
            :type="'text'"
            v-model:value="senameValue"
            :mask="phoneMask"
            :rule="validatePhone"
        />

        <InputBlock
            :name="'lastName'"
            :title="'Фамилия'"
            :type="'text'"
            v-model:value="lastNameValue"
            :rule="validateEmail"
        />
      </div>

      <div class="about__edit-profile__row">
        <InputBlock
            :name="'phone'"
            :title="'Телефон'"
            :type="'text'"
            v-model:value="phoneValue"
            :placeholder="'+7 (___)___-__-__'"
            :mask="phoneMask"
            :rule="validatePhone"
        />

        <InputBlock
            :name="'email'"
            :title="'E-mail'"
            :type="'text'"
            v-model:value="mailValue"
            :placeholder="'Почта'"
            :rule="validateEmail"
        />
      </div>

      <div class="about__edit-profile__row">
        <InputBlock
            :name="'pasport'"
            :title="'Серия и номер паспорта'"
            :type="'text'"
            v-model:value="pasportValue"
            :placeholder="'00 00 000000'"
            :mask="phoneMask"
            :rule="validatePhone"
        />

        <InputBlock
            :name="'snils'"
            :title="'Снилс'"
            :type="'text'"
            v-model:value="snilsValue"
            :rule="validateEmail"
        />
      </div>

      <button class="button button_gradient button_170">
        Сохранить
      </button>

    </Form>

  </div>
</template>

<script>
export default {
  name: "about"
}
</script>

<style lang="less" scoped>
@import "assets/core";

.about {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.about__image {

}

.about__image__drop {
  width: 496px;
  height: 120px;

  margin-top: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;


  border: 1px dashed @MidGreyColor;
}

.about__image__button {
  box-sizing: border-box;
  width: 116px;
  height: 116px;

  margin-top: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background: @LightGreyColor;
}

.about__edit-profile {
  display: flex;
  flex-direction: column;

  row-gap: 16px;
  column-gap: 24px;
}

.about__edit-profile__row {
  display: grid;
  column-gap: inherit;

  grid-template-columns: 1fr;

  @media @min580 {
    grid-template-columns: 1fr 1fr;
  }


  @media @min760 {
    grid-template-columns: 1fr 1fr 1fr;
  }



}
</style>
