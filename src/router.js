import Home from "./pages/Home.vue";
import SuperHeroes from "./pages/SuperHeroes.vue";
import Calendar from "./pages/Calendar.vue";
import Markdown from "./pages/Markdown.vue";
import Slider from "./pages/Slider.vue";
import Calculator from "./pages/Calculator.vue";
import ReusableModal from "./pages/ReusableModal.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/super-heroes", component: SuperHeroes },
  { path: "/calendar", component: Calendar },
  { path: "/markdown", component: Markdown },
  { path: "/slider", component: Slider },
  { path: "/calculator", component: Calculator },
  { path: "/reusable-modal", component: ReusableModal },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
