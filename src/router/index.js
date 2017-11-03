import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/Home';
import SocketDemo from '@/components/SocketDemo';
import Authorise from '@/components/Authorise';
import UserProfile from '@/components/user/UserProfile';

import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/authorise',
      name: 'Authorise',
      component: Authorise,
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/socket',
      name: 'Socket',
      component: SocketDemo,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(`~~~~~~~~~~~ ${to.meta.requiresAuth}`);
  console.log(`~~~~~~~~~~~ ${!store.getters.isAuthorised}`);
  console.log(`~~~~~~~~~~~ ${to.meta.requiresAuth && !store.getters.isAuthorised}`);
  if (to.meta.requiresAuth && !store.getters.isAuthorised) {
    router.push({ path: '/authorise' });
  } else {
    next();
  }
});

export default router;
