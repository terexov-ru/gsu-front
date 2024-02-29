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
            :profile="profile"
            :documents="documents"
            @updateDocs="updateDocs()"
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
import { ref } from "vue";
const {deleteTokenCookie} = useUtils();

const COMPONENTS = [
  'AccountProfile',
  'AccountPrograms',
  'AccountOrders'
]
const activeComponent = ref(COMPONENTS[0]);

const { getUser } = useApi();

const data = await getUser();
const profile = ref(data.profile);
const documents = ref(data.documents);

console.log(profile);

async function updateDocs() {
  const data = await getUser();
  documents.value = data.documents;
}

function logOut() {
  deleteTokenCookie();
  navigateTo('/');
}
</script>

<style lang="less" scoped>
@import "assets/core";

.account {
  display: flex;
  flex-direction: column;

  gap: 40px;
  margin-top: 40px;

  @media @min1200 {
    display: grid;
    grid-template-columns: 240px 1fr;
  }
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
