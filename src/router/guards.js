import { useAuthStore } from "@/stores/user/index";
import axios from "@/config/axios";

export const checkUser = async (to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.authenticated === null) {
    try {
      const response = await axios.get("me");
      authStore.authenticated = true;
      authStore.login(response.data.user);
    } catch (err) {
      authStore.authenticated = false;
    } finally {
      return next();
    }
  }
  return next();
};
