import { createStore } from "vuex";

const store = createStore({
  state() {
    return { isAuthenticated: false, authUser: {}, isLoginOpen: false };
  },
  mutations: {
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    setAuthUser(state, payload) {
      state.authUser = payload;
    },
    setIsLoginOpen(state, payload) {
      state.isLoginOpen = payload;
    }
  },
});

export default store;
