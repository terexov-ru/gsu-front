<template>
  <div class="site-fixed-layer">
    <PromoPopupManager />
    <slot name="cookie-banner" />
  </div>
</template>

<style scoped lang="less">
.site-fixed-layer {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
}

.site-fixed-layer :deep(.overflow),
.site-fixed-layer :deep(.promo-popup-layer) {
  pointer-events: auto;
}
</style>
