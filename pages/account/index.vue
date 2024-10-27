<template>
  <div class="wrapper wrapper_paddings wrapper_margins">
    <h2 class="text text_h2">Личный кабинет</h2>

    <div class="account">
      <div class="account__nav">
        <button
          @click="changeTab(0)"
          :class="{ account__button_active: activeComponent === COMPONENTS[0] }"
          class="button account__button"
        >
          Личный профиль
        </button>
        <button
          @click="changeTab(1)"
          :class="{ account__button_active: activeComponent === COMPONENTS[1] }"
          class="button account__button"
        >
          Мои программы
        </button>
        <button
          @click="changeTab(2)"
          :class="{ account__button_active: activeComponent === COMPONENTS[2] }"
          class="button account__button"
        >
          Мои заказы
        </button>
        <button @click="logOut()" class="button account__button">Выйти</button>
      </div>

      <div>
        <AccountProfile
          v-if="activeComponent === COMPONENTS[0]"
          :profile="profile"
          :documents="documents"
          @updateDocs="updateDocs()"
          @updateProfile="updateProfile()"
        />

        <AccountPrograms v-if="activeComponent === COMPONENTS[1]" />

        <AccountOrders
          :profile="profile"
          v-if="activeComponent === COMPONENTS[2]"
          @navigateToProfile="changeTab(0)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { deleteTokenCookie } = useUtils();

const COMPONENTS = ["AccountProfile", "AccountPrograms", "AccountOrders"];
const activeComponent = ref(COMPONENTS[0]);

const { getUser } = useApi();

const data = await getUser();
const profile = ref(data.profile);
const documents = ref(data.documents);
const name = ref(`${data.profile.surname === null ? "" : data.profile.surname}
${data.profile.name === null ? "" : data.profile.name}
${data.profile.last_name === null ? "" : data.profile.last_name}`);

provide("name", name);

onMounted(() => {
  const tab = route.query.tab || COMPONENTS[0];
  activeComponent.value = tab;
});

watch(
  () => route.query.tab,
  (newTab) => {
    activeComponent.value = newTab || COMPONENTS[0];

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
);

function changeTab(index) {
  activeComponent.value = COMPONENTS[index];
  router.push({ query: { ...route.query, tab: activeComponent.value } });
}

async function updateDocs() {
  const data = await getUser();
  documents.value = data.documents;
}

async function updateProfile() {
  const data = await getUser();
  profile.value = data.profile;
}

function logOut() {
  deleteTokenCookie();
  navigateTo("/");
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
