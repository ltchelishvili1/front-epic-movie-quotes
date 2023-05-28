import { useAuthStore } from "@/stores/user/index";
import axios from "@/config/axios";

export const authenticateUser = async (to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.authenticated === null) {
    try {
      const response = await axios.get("user");
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

export const Auth = (to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.authenticated) {
    return next();
  } else {
    next({ name: "log-in" });
  }
};

export const Guest = (to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.authenticated) {
    next({ name: "landing" });
  } else {
    return next();
  }
};
