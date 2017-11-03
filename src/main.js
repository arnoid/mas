// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import VueFire from 'vuefire';
import firebase from 'firebase';
import App from '@/App';
import router from './router';
import store from './store';
import sockets from './sockets';

const config = {
  socket: {
    host: 'http://localhost:9999',
  },
};

Vue.use(VueFire);
Vue.use(VueSocketio, config.socket.host, store);

const firebaseConfig = {
  apiKey: 'AIzaSyCJd18RupDoMAQ_If-m-uRy6N263nr-Zlk',
  authDomain: 'merc-as.firebaseapp.com',
  databaseURL: 'https://merc-as.firebaseio.com',
  projectId: 'merc-as',
  storageBucket: '',
  messagingSenderId: '341948203819',
};
firebase.initializeApp(firebaseConfig);

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
