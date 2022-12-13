<template>
  <div class="container">
    <div class="nav">
      <li :class="{ selected: isDDA }" @click="isDDA = true">
        <router-link to="/dda">DDA</router-link>
      </li>
      <li :class="{ selected: !isDDA }" @click="isDDA = false">
        <router-link to="bresenham">Bresenham</router-link>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: ["isDDA"],
  mounted() {
    console.log("teh change", this.isDDA);
  },
};
</script>

<style scoped>
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
  color: yellow;
  font-weight: bold;
}
</style>
