import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const authenticated = ref(null);
  const user = ref(null);

  function login(userData) {
    user.value = userData;
  }

  return { authenticated, login, user };
});
