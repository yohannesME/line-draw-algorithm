<script>
import NavBarVue from "./components/NavBar.vue";

export default {
  components: { NavBarVue },
};
</script>

<template>
  <NavBarVue :isDDA="false"></NavBarVue>
  <router-view :key="$route.fullPath"></router-view>
</template>

<style scoped></style>
