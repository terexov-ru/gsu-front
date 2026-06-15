<template>
  <div
    v-if="mobile"
    class="burger-menu__item header-education-menu header-education-menu_mobile"
  >
    <div
      class="text burger-menu__text text_caption text_dark pointer"
      @click="$emit('toggle')"
    >
      Обучение
    </div>

    <div class="info__body" :class="{ info__body_active: isOpen }">
      <div class="column column_gap16 text text_normal text_light">
        <div
          v-for="specialtyArea in specialtyAreas"
          :key="specialtyArea.id"
          class="header-education-menu__mobile-group"
        >
          <div class="header-education-menu__mobile-head">
            <NuxtLink
              :to="getSpecialtyAreaLink(specialtyArea.id)"
              class="header-education-menu__mobile-link"
              @click="$emit('navigate')"
            >
              {{ specialtyArea.title }}
            </NuxtLink>

            <button
              v-if="specialtyArea.categories?.length"
              type="button"
              class="header-education-menu__mobile-toggle"
              @click.stop="toggleMobileArea(specialtyArea.id)"
            >
              <span :class="{ 'header-education-menu__mobile-toggle_active': activeMobileAreaId === specialtyArea.id }">
                +
              </span>
            </button>
          </div>

          <div
            v-if="specialtyArea.categories?.length"
            class="header-education-menu__mobile-sublist"
            :class="{
              'header-education-menu__mobile-sublist_active':
                activeMobileAreaId === specialtyArea.id,
            }"
          >
            <NuxtLink
              v-for="category in specialtyArea.categories"
              :key="category.id"
              :to="getCategoryLink(specialtyArea.id, category.id)"
              class="header-education-menu__mobile-sublink"
              @click="$emit('navigate')"
            >
              {{ category.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <li v-else class="nav__list__item header-education-menu">
    <div
      class="header-education-menu__desktop"
      @mouseenter="openDesktopMenu()"
      @mouseleave="closeDesktopMenu()"
      @focusin="openDesktopMenu()"
    >
      <NuxtLink to="/courses" class="header-education-menu__trigger text text_caption text_dark">
        Обучение
      </NuxtLink>

      <div
        v-show="isDesktopOpen"
        class="header-education-menu__dropdown text text_normal text_dark"
      >
        <ul class="header-education-menu__areas">
          <li
            v-for="specialtyArea in specialtyAreas"
            :key="specialtyArea.id"
            class="header-education-menu__area-item"
            :class="{
              'header-education-menu__area-item_active':
                activeDesktopAreaId === specialtyArea.id,
            }"
            @mouseenter="setActiveDesktopArea(specialtyArea.id)"
            @focusin="setActiveDesktopArea(specialtyArea.id)"
          >
            <NuxtLink
              :to="getSpecialtyAreaLink(specialtyArea.id)"
              class="header-education-menu__area-link"
              @click="handleNavigate()"
            >
              {{ specialtyArea.title }}
            </NuxtLink>
          </li>
        </ul>

        <div
          v-if="activeDesktopAreaCategories.length"
          class="header-education-menu__panel"
        >
          <NuxtLink
            v-for="category in activeDesktopAreaCategories"
            :key="category.id"
            :to="getCategoryLink(activeDesktopAreaId, category.id)"
            class="header-education-menu__category-link"
            @click="handleNavigate()"
          >
            {{ category.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  specialtyAreas: {
    type: Array,
    default: () => [],
  },
  mobile: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const activeMobileAreaId = ref(null);
const isDesktopOpen = ref(false);
const emit = defineEmits(["navigate", "toggle"]);

const defaultDesktopAreaId = computed(() => {
  const firstAreaWithCategories = props.specialtyAreas.find((specialtyArea) => {
    return specialtyArea?.categories?.length;
  });

  return firstAreaWithCategories?.id ?? props.specialtyAreas[0]?.id ?? null;
});

const activeDesktopAreaId = ref(defaultDesktopAreaId.value);

watch(
  () => props.specialtyAreas,
  () => {
    activeDesktopAreaId.value = defaultDesktopAreaId.value;

    if (
      activeMobileAreaId.value &&
      !props.specialtyAreas.some((specialtyArea) => specialtyArea.id === activeMobileAreaId.value)
    ) {
      activeMobileAreaId.value = null;
    }
  },
  { immediate: true },
);

const activeDesktopAreaCategories = computed(() => {
  const activeArea = props.specialtyAreas.find((specialtyArea) => {
    return Number(specialtyArea.id) === Number(activeDesktopAreaId.value);
  });

  return activeArea?.categories || [];
});

const setActiveDesktopArea = (specialtyAreaId) => {
  activeDesktopAreaId.value = specialtyAreaId ?? defaultDesktopAreaId.value;
};

const openDesktopMenu = () => {
  isDesktopOpen.value = true;
};

const closeDesktopMenu = () => {
  isDesktopOpen.value = false;
  activeDesktopAreaId.value = defaultDesktopAreaId.value;
};

const toggleMobileArea = (specialtyAreaId) => {
  activeMobileAreaId.value =
    activeMobileAreaId.value === specialtyAreaId ? null : specialtyAreaId;
};

const handleNavigate = () => {
  closeDesktopMenu();
  emit("navigate");
};

const getSpecialtyAreaLink = (specialtyAreaId) => {
  return {
    path: "/courses",
    query: {
      specialty_area_id: specialtyAreaId,
    },
  };
};

const getCategoryLink = (specialtyAreaId, categoryId) => {
  return {
    path: "/courses",
    query: {
      specialty_area_id: specialtyAreaId,
      category: categoryId,
    },
  };
};
</script>

<style lang="less" scoped>
@import "assets/core.less";

.header-education-menu {
  position: relative;
}

.header-education-menu__desktop {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 20px;
  }

  &:hover .header-education-menu__trigger,
  &:focus-within .header-education-menu__trigger {
    color: @BlueNewColor;
  }
}

.header-education-menu__trigger {
  display: inline-block;
}

.header-education-menu__dropdown {
  display: flex;
  position: absolute;
  top: calc(100% + 16px);
  left: -12px;
  z-index: 1100;
  min-width: 240px;
  max-width: 640px;
  padding: 12px;
  gap: 12px;
  border-radius: 12px;
  background: @WhiteColor;
  box-shadow: @BoxShadowEffect;
}

.header-education-menu__areas {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 240px;
  min-width: 240px;
  flex: 0 0 240px;
}

.header-education-menu__area-item {
  border-radius: 8px;
  transition-duration: @dur150;
}

.header-education-menu__area-item_active {
  background: @LightGreyColor;
}

.header-education-menu__area-link,
.header-education-menu__category-link,
.header-education-menu__mobile-link,
.header-education-menu__mobile-sublink {
  display: block;
  color: inherit;
  text-decoration: none;
}

.header-education-menu__area-link,
.header-education-menu__category-link {
  padding: 10px 12px;
}

.header-education-menu__area-link {
  font-weight: 700;
}

.header-education-menu__panel {
  min-width: 240px;
  padding-left: 12px;
  border-left: 1px solid @MidGreyColor;
  display: flex;
  flex-direction: column;
}

.header-education-menu__category-link {
  border-radius: 8px;

  &:hover,
  &:focus-visible {
    color: @BlueNewColor;
    background: @LightGreyColor;
  }
}

.header-education-menu__mobile-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.header-education-menu__mobile-link {
  flex: 1;
}

.header-education-menu__mobile-toggle {
  min-width: 24px;
  height: 24px;
  border: 0;
  padding: 0;
  background: transparent;
  color: @DarkGreyColor;
  cursor: pointer;
}

.header-education-menu__mobile-toggle_active {
  display: inline-block;
  transform: rotate(45deg);
}

.header-education-menu__mobile-sublist {
  max-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 8px;
  transition: 0.3s;
}

.header-education-menu__mobile-sublist_active {
  max-height: 400px;
  margin-top: 12px;
}
</style>
