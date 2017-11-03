import Vue from 'vue';
import VueRouter from 'vue-router';

import HelloWorld from '@/components/HelloWorld';
import SocketDemo from '@/components/SocketDemo';
import Authorise from '@/components/Authorise';

import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld,
    },
    {
      path: '/authorise',
      name: 'Authorise',
      component: Authorise,
    },
    {
      path: '/io',
      name: 'Socket',
      component: SocketDemo,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthorised) {
    router.push({ path: '/authorise' });
  } else {
    next();
  }
});

export default router;
