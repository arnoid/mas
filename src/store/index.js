import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistedState from 'vuex-persistedstate';

import actions from './actions';
import mutations from './mutations';

import AuthController from '../controller/AuthController';

const authController = new AuthController();
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      currentUser: null,
    },
  },
  getters: {
    isAuthorised(state) {
      return state.user && state.user.currentUser && state.user.currentUser.securityToken;
    },
    getAuth() {
      return authController;
    },
  },
  actions,
  mutations,
  plugins: [
    VuexPersistedState({ storage: window.localStorage }),
  ],
});
