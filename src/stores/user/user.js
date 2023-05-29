import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
  }),
  actions: {
    login(userData) {
      this.user = userData;
    },
  },
});
