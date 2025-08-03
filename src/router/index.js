import { createMemoryHistory, createRouter } from 'vue-router'

import ListView from '../views/ListView.vue';
import Home from '../views/Home.vue';
// import AboutView from './AboutView.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/lists/:id', component: ListView },
//   { path: '/', component: HomeView },
//   { path: '/about', component: AboutView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
