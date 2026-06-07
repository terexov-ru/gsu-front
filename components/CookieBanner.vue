<template>
  <Transition name="cookie-banner-fade">
    <div v-if="isVisible" class="cookie-banner-layer">
      <section class="cookie-banner" aria-label="Уведомление о Cookie">
        <div class="cookie-banner__title-row">
          <p class="cookie-banner__title">Мы используем файлы Cookie</p>
          <span class="cookie-banner__arrow" aria-hidden="true" />
        </div>

        <div class="cookie-banner__actions">
          <button
            type="button"
            class="cookie-banner__button cookie-banner__button_accept"
            @click="setCookieChoice('accepted')"
          >
            Принять
          </button>

          <button
            type="button"
            class="cookie-banner__button cookie-banner__button_decline"
            @click="setCookieChoice('declined')"
          >
            Отклонить
          </button>
        </div>
      </section>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const COOKIE_BANNER_STORAGE_KEY = "gsu:cookie-banner-choice";

type CookieChoice = "accepted" | "declined";

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = !localStorage.getItem(COOKIE_BANNER_STORAGE_KEY);
});

function setCookieChoice(choice: CookieChoice) {
  localStorage.setItem(COOKIE_BANNER_STORAGE_KEY, choice);
  isVisible.value = false;
}
</script>

<style scoped lang="less">
@import "assets/core.less";

.cookie-banner-layer {
  position: relative;
  z-index: 3;
  align-self: flex-end;
  pointer-events: auto;

  @media @max760 {
    align-self: stretch;
  }
}

.cookie-banner {
  width: min(330px, calc(100vw - 32px));
  box-sizing: border-box;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  background: linear-gradient(77.045deg, #40b9f5 5.226%, #0c90ed 96.913%);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16);

  @media @max760 {
    width: 100%;
  }
}

.cookie-banner__title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cookie-banner__title {
  color: @WhiteColor;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  white-space: nowrap;

  @media @max760 {
    white-space: normal;
  }
}

.cookie-banner__arrow {
  position: relative;
  width: 16px;
  height: 16px;
  flex: 0 0 auto;

  &::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 3px;
    width: 7px;
    height: 7px;
    border-top: 1.6px solid @WhiteColor;
    border-right: 1.6px solid @WhiteColor;
    transform: rotate(45deg);
  }
}

.cookie-banner__actions {
  display: flex;
  align-items: center;
  gap: 8px;

  @media @max760 {
    align-items: stretch;
    flex-direction: column;
  }
}

.cookie-banner__button {
  min-height: 40px;
  box-sizing: border-box;
  padding: 8px 32px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  cursor: pointer;
}

.cookie-banner__button_accept {
  min-width: 129px;
  border: 1px solid @WhiteColor;
  background: @WhiteColor;
  color: @DarkGreyColor;
}

.cookie-banner__button_decline {
  min-width: 144px;
  border: 1px solid @WhiteColor;
  background: transparent;
  color: @WhiteColor;
}

.cookie-banner-fade-enter-active,
.cookie-banner-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.cookie-banner-fade-enter-from,
.cookie-banner-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
