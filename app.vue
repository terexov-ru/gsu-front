<template>

<!--  <Profile />-->

<!--  <Alert/>-->

  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>

<!--  <NuxtLayout>-->
<!--    <ul>-->
<!--      <li>-->
<!--        <NuxtLink to="/">-->
<!--          Home-->
<!--        </NuxtLink>-->
<!--      </li>-->
<!--      <li>-->
<!--        <NuxtLink to="events">-->
<!--        Events-->
<!--      </NuxtLink>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </NuxtLayout>-->

</template>
<script>
import Alert from "./components/Alert.vue";
export default {
  components: {Alert}
}
</script>
