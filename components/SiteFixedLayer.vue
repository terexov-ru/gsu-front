<template>
  <div class="site-fixed-layer">
    <div class="site-fixed-layer__stack">
      <CookieBanner />
      <PromoPopupManager />
    </div>
  </div>
</template>

<style scoped lang="less">
.site-fixed-layer {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
}

.site-fixed-layer__stack {
  position: absolute;
  right: 16px;
  bottom: 24px;
  left: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  pointer-events: none;
}

.site-fixed-layer :deep(.overflow),
.site-fixed-layer :deep(.promo-popup-backdrop),
.site-fixed-layer :deep(.promo-popup-layer),
.site-fixed-layer :deep(.cookie-banner-layer) {
  pointer-events: auto;
}
</style>
