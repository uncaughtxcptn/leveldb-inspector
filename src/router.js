import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@pages/Home.vue';
import Inspector from '@pages/Inspector.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/inspector',
    component: Inspector
  }
];

export default new VueRouter({
  routes
});
