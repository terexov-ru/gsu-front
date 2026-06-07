<template>
  <div
    v-if="isVisible"
    class="promo-popup-layer"
  >
    <PromoPopupModal
      v-if="activePromo"
      :promo="activePromo"
      :can-navigate="actualPromos.length > 1"
      @close="closePopup"
      @next="showNextPromo"
      @prev="showPrevPromo"
      @dirty-change="onPromoFormDirtyChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const PROMO_DELAY_MS = 60000;
const PROMO_ROTATE_DELAY_MS = 10000;
const PROMO_SESSION_KEY = "gsu:promo-popup-seen";

type Promo = {
  id: number;
  title: string;
  body: string;
  button_text: string;
  valid_from?: string | null;
  valid_to?: string | null;
};

const { getPromos } = useApi();
const actualPromos = ref<Promo[]>([]);
const activePromoIndex = ref(0);
const activePromo = ref<Promo | null>(null);
const isVisible = ref(false);
const isPromoFormDirty = ref(false);
let promoTimer: ReturnType<typeof setTimeout> | undefined;
let promoRotateTimer: ReturnType<typeof setInterval> | undefined;

function hasSeenPromo() {
  return sessionStorage.getItem(PROMO_SESSION_KEY) === "1";
}

function markPromoAsSeen() {
  sessionStorage.setItem(PROMO_SESSION_KEY, "1");
}

function clearPromoTimer() {
  if (promoTimer) {
    clearTimeout(promoTimer);
    promoTimer = undefined;
  }
}

function clearPromoRotateTimer() {
  if (promoRotateTimer) {
    clearInterval(promoRotateTimer);
    promoRotateTimer = undefined;
  }
}

function parsePromoDate(value?: string | null) {
  if (!value) return null;

  const parsedDate = new Date(value.replace(" ", "T"));
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function isPromoActual(promo: Promo, now = new Date()) {
  const validFrom = parsePromoDate(promo.valid_from);
  const validTo = parsePromoDate(promo.valid_to);

  if (validFrom && validFrom > now) return false;
  if (validTo && validTo < now) return false;

  return true;
}

function filterActualPromos(promos: Promo[]) {
  return promos.filter((promo) => isPromoActual(promo));
}

function setActivePromo(index: number) {
  if (actualPromos.value.length === 0) {
    activePromo.value = null;
    activePromoIndex.value = 0;
    return;
  }

  activePromoIndex.value =
    (index + actualPromos.value.length) % actualPromos.value.length;
  activePromo.value = actualPromos.value[activePromoIndex.value];
}

function startPromoRotation() {
  clearPromoRotateTimer();

  if (actualPromos.value.length < 2 || isPromoFormDirty.value) return;

  promoRotateTimer = setInterval(showNextPromo, PROMO_ROTATE_DELAY_MS);
}

function showPopup() {
  if (!activePromo.value || hasSeenPromo()) return;

  isVisible.value = true;
  markPromoAsSeen();
  startPromoRotation();
}

function closePopup() {
  isVisible.value = false;
  markPromoAsSeen();
  clearPromoTimer();
  clearPromoRotateTimer();
}

function schedulePopup() {
  clearPromoTimer();

  if (!activePromo.value || hasSeenPromo()) return;

  promoTimer = setTimeout(showPopup, PROMO_DELAY_MS);
}

function showNextPromo() {
  setActivePromo(activePromoIndex.value + 1);
  startPromoRotation();
}

function showPrevPromo() {
  setActivePromo(activePromoIndex.value - 1);
  startPromoRotation();
}

function onPromoFormDirtyChange(isDirty: boolean) {
  isPromoFormDirty.value = isDirty;

  if (isDirty) {
    clearPromoRotateTimer();
    return;
  }

  if (isVisible.value) {
    startPromoRotation();
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && isVisible.value) {
    closePopup();
  }
}

async function loadPromos() {
  if (hasSeenPromo()) return;

  try {
    const response = await getPromos();
    const promos = Array.isArray(response?.promos) ? response.promos : [];

    if (response?.status === "ok" && promos.length > 0) {
      actualPromos.value = filterActualPromos(promos);
      if (actualPromos.value.length === 0) return;

      setActivePromo(0);
      schedulePopup();
    }
  } catch (error) {
    actualPromos.value = [];
    activePromo.value = null;
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  loadPromos();
});

onBeforeUnmount(() => {
  clearPromoTimer();
  clearPromoRotateTimer();
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped lang="less">
.promo-popup-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1;
}

.promo-popup-layer {
  position: relative;
  z-index: 2;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  pointer-events: auto;
}
</style>
