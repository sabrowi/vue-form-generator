import firebase from "@/plugins/firebase";

const db = firebase.firestore();

const state = {
  user: null,
  test: 123,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  check: (state) => state.test,
};

const actions = {
  async login({ commit }, { email, password }) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = firebase.auth().currentUser;
    if (user) {
      const { uid } = user;
      const userRef = db.collection("user").doc(uid);
      const doc = await userRef.get();
      await commit("setUser", doc.exists ? doc.data() : null);
    }
  },
  async logout({ commit }) {
    await firebase.auth().signOut();
    await commit("setUser", null);
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
