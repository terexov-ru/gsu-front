<template>
  <div class="wrapper wrapper_paddings wrapper_margins">
    <h2 class="text text_h2">Личный кабинет</h2>

    <div class="account">

      <div class="account__nav">
        <button
            @click="activeComponent = COMPONENTS[0]"
            :class="{'account__button_active': activeComponent === COMPONENTS[0]}"
            class="button account__button">Личный профиль
        </button>
        <button
            @click="activeComponent = COMPONENTS[1]"
            :class="{'account__button_active': activeComponent === COMPONENTS[1]}"
            class="button account__button">Мои программы
        </button>
        <button
            @click="activeComponent = COMPONENTS[2]"
            :class="{'account__button_active': activeComponent === COMPONENTS[2]}"
            class="button  account__button">Мои заказы
        </button>
        <button
            @click="logOut()"
            class="button account__button">Выйти
        </button>
      </div>

      <div>
        <AccountProfile
            v-if="activeComponent === COMPONENTS[0]"
        />

        <AccountPrograms
            v-if="activeComponent === COMPONENTS[1]"
        />

        <AccountOrders
            v-if="activeComponent === COMPONENTS[2]"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref, markRaw} from "vue";

const COMPONENTS = [
  'AccountProfile',
  'AccountPrograms',
  'AccountOrders'
]
const activeComponent = ref(COMPONENTS[0]);

function logOut() {
  console.log('Log out');
}
</script>

<style lang="less" scoped>
@import "assets/core";

.account {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;

  margin-top: 40px;
}

.account__nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.account__button {
  justify-content: flex-start;
  height: 48px;
  font-weight: 700;
  font-size: 16px;

  background: @LightGreyColor;
  transition: @dur150;

  &_active {
    background: @BluButtonGradient;
    color: @WhiteColor;
  }
}
</style>
