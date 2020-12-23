import UserCrud from "./pages/UserCrud.vue";
import Chat from "./pages/Chat.vue";
import SuperHeroes from "./pages/SuperHeroes.vue";
import Calendar from "./pages/Calendar.vue";
import Markdown from "./pages/Markdown.vue";
import Slider from "./pages/Slider.vue";
import Calculator from "./pages/Calculator.vue";
import ReusableModal from "./pages/ReusableModal.vue";
import Home from "./pages/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";

const routes = [
  { path: "/", component: Home },
  { path: "/super-heroes", component: SuperHeroes },
  { path: "/calendar", component: Calendar },
  { path: "/markdown", component: Markdown },
  { path: "/slider", component: Slider },
  { path: "/calculator", component: Calculator, meta: { middleware: "auth" } },
  { path: "/reusable-modal", component: ReusableModal },
  { path: "/chat", component: Chat, meta: { middleware: "auth" } },
  { path: "/user-crud", component: UserCrud },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.middleware) {
    const middleware = require(`./middleware/${to.meta.middleware}`);
    if (middleware) {
      middleware.default(next, store);
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
