import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import SuperHeroes from './components/SuperHeroes.vue';
import Calendar from './components/Calendar.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/super-heroes', component: SuperHeroes },
  { path: '/calendar', component: Calendar }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
