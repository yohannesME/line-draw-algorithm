<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center flex-col">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello there</h1>
        <p class="py-6"
          >This is a simple web app built for educational purposes to show the
          different methods of line drawing algorithms in a computer screen.</p
        >
        <router-link to="/dda" class="btn btn-primary">Get Started</router-link>
      </div>
      <div>
        Made with ❤️ by
        <a href="github.com/yohannesME">Yohannes Mesganaw</a> and
        <a href="github.com/John-droid-dotcom">Yohannes Teshome</a>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarVue from "../components/NavBar.vue";
export default {
  name: "HomeView",
  components: {},
};
</script>

<style></style>
