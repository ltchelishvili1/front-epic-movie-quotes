import axios from "@/config/axios";
import { useUserStore } from "@/stores/user/index";
import { authUser } from "@/config/helpers";

export const authenticateUser = async (to, from, next) => {
  const userStore = useUserStore();
  await authUser(userStore);
  return next();
};

export const Auth = (to, from, next) => {
  const userStore = useUserStore();
  if (userStore.authenticated) {
    return next();
  } else {
    next({ name: "log-in" });
  }
};

export const Guest = (to, from, next) => {
  const userStore = useUserStore();
  if (userStore.authenticated) {
    next({ name: "news-feed" });
  } else {
    userStore.authenticated = false;
    return next();
  }
};

export const checkPasswordUpdateToken = async (to, from, next) => {
  const { token, email } = to.params;
  try {
    const response = await axios.post("check-token", {
      token,
      email,
    });
    if (response.status === 200) {
      return next();
    }
  } catch (err) {
    if (err.response.status === 404) {
      return next({ name: "not-found", params: { catchAll: "wrong-token" } });
    }
    if (err.response.status === 401) {
      return next({ name: "email-verify-token-expired", params: { email } });
    }
    throw new Error(err);
  }

  return next({ name: "log-in" });
};
