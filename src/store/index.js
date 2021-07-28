import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    countText: (state) => `Urutan ke ${state.count}`,
  },
  mutations: {
    increment: (state) => state.count++,
    decrement: (state) => state.count--,
  },
  actions: {},
  modules: {
    auth,
  },
  plugins: [
    createPersistedState({
      paths: ["count", "auth.user"],
    }),
  ],
});
