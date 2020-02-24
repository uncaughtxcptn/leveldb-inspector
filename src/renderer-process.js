import Vue from 'vue';
import router from './router';
import App from './components/App.vue';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
