import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
    authenticated: null,
  }),
  actions: {
    setUser(userData) {
      this.user = { ...userData };
    },
    setAuth(isAuth) {
      this.authenticated = isAuth;
    },
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUser: (state) => state.user
  },
});
