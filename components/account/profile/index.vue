<template>
  <h3 class="text text_h3">Данные профиля</h3>

  <AccountProfileAbout
    class="about-block"
    :profile="profile"
    @updateProfile="this.$emit('updateProfile')"
  />

  <AccountProfileDocument
      class="document-block"
      :documents="documents"
      @updateDocs="this.$emit('updateDocs')"
  />

  <AccountProfilePassword
      class="document-block"
  />

</template>

<script>
export default {
  name: "profile",
  props: {
    profile: Object,
    documents: Object,
  },
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
