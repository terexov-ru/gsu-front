<template>
  <div class="modules-block">
    <div class="modules-block__header">
      <h4 class="text text_h4">Программа курса</h4>
      <NuxtLink :to="planLink">
        <div class="modules-block__download">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 12L12 17M12 17L17 12M12 17L12 4" stroke="#129DF4" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M6 20H18" stroke="#129DF4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text text_normal text_accent">
            Учебный план
          </span>
        </div>
      </NuxtLink>
    </div>

    <div class="modules-block__list">
      <ModulesInfo
          v-for="module in modules"
          :key="module.id"
          :module="module"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modules: {
      type: Array,
      require: true,
    },
    planLink: {
      type: String,
      require: true,
    }
  }
}
</script>

<style scoped>

.modules-block {

}

.modules-block__list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modules-block__header {
  display: flex;
  justify-content: space-between;
}

.modules-block__download {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
