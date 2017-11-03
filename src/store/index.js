import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistedState from 'vuex-persistedstate';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  computed: {
    user: function user() {
      return user;
    },
  },
  getters: {
    isAuthorised(state) {
      return Boolean(state.user);
    },
  },
  actions,
  mutations,
  plugins: [
    VuexPersistedState({ storage: window.sessionStorage }),
  ],
});
