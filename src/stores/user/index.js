import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    authenticated: null,
  }),
  getters: {
    isAuthenticated: (state) => state.authenticated,
  },
  actions: {
    login(userData) {
      this.user = userData;
    },
    setAuth(isAuth) {
      this.authenticated = isAuth;
    },
  },
});
