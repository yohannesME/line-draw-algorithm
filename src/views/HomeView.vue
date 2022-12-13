<template>
  <NavBarVue :isDDA="true"></NavBarVue>

</template>

<script>
import NavBarVue from "../components/NavBar.vue";
export default {
  name: "HomeView",
  components: { NavBarVue },
};
</script>

<style>
.nav {
  display: flex;
  gap: 1rem;
  justify-content: left;
  width: 80vw;
}
.nav li {
  list-style: none;
  font-size: larger;
  cursor: pointer;
  text-transform: uppercase;
}

.selected {
  color: blueviolet;
  font-weight: bold;
}
</style>
