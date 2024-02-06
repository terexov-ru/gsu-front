<template>
  <div class="bill-form">

    <div class="basket__bill">
      <div class="text text_large">Данные получателя</div>

      <InputBlock
          :placeholder="'Иванов Иван Иванович'"
          :type="'text'"
          :name="'ФИО'"
          v-model:value="name"
          :white="true"
      />

      <InputBlock
          :placeholder="'8(900) 000-90-90'"
          :type="'text'"
          :name="'Телефон'"
          v-model:value="phone"
          :white="true"
      />

      <InputBlock
          :placeholder="'mail@mail.ru'"
          :type="'text'"
          :name="'E-mail'"
          v-model:value="mail"
          :white="true"
      />

      {{ title }}

    </div>

    <button class="button bill__button button_gradient button_size button_fill">Записаться на курс</button>

  </div>
</template>

<script>
export default {
  setup() {
    const name = ref('');
    const phone = ref('');
    const mail = ref('');
    return {
      name,
      phone,
      mail
    }
  }
}
</script>

<style lang="less" scoped>
@import "assets/core.less";

.bill-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.text_shrink {
  flex-shrink: 0;
}

.basket__list {
  display: flex;
  flex-direction: column;
  gap: inherit;
}

.basket__bill {
  display: flex;
  flex-direction: column;
  gap: 16px;

  box-sizing: border-box;
  padding: 20px;
  border-radius: 8px;

  background: @LightGreyColor;
}

.basket__bill__item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.bill__button {
  width: 100%;
  align-self: self-end;

  @media @min580 {
    width: 360px
  }

  @media @min760 {
    width: 440px
  }

  @media @min1200 {
    width: 100%;
  }
}

</style>
