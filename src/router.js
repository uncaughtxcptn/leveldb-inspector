import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

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
    component: Inspector,
    beforeEnter(routeTo, routeFrom, next) {
      if (!store.getters.isConnected) {
        next('/');
      }
      next();
    }
  }
];

export default new VueRouter({
  routes
});
