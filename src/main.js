// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import VueFire from 'vuefire';
import App from '@/App';
import router from './router';
import store from './store';
import sockets from './sockets';
import config from './config';

Vue.use(VueFire);
Vue.use(VueSocketio, config.socket.host, store);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
  render: h => h(App),
  sockets,
});
