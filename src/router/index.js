import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Bresenham from "../views/Bresenham.vue";
import DDA from "../views/DDA.vue";
const routes = [
  { path: "/", component: HomeView },
  { path: "/bresenham", component: Bresenham },
  { path: "/dda", component: DDA },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
