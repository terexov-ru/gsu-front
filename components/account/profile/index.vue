<template>
  <h3 class="text text_h3">Данные профиля</h3>

  <AccountProfileAbout
    class="about-block"
  />

  <AccountProfileDocument
      class="document-block"
  />

  <AccountProfilePassword
      class="document-block"
  />

</template>

<script>
export default {
  name: "profile"
}
</script>

<style scoped>
.about-block {
  margin-top: 40px;
}

.document-block {
  margin-top: 60px;
}
</style>
