import axios from "@/config/axios";
import { useUserStore } from "@/stores/user/index";

export const authenticateUser = async (to, from, next) => {
  const userStore = useUserStore();
  // if (userStore.authenticated === null) {
  //   try {
  //     const response = await axios.get("user");
  //     userStore.authenticated = true;
  //     userStore.setUser(response.data.user);
  //   } catch (err) {
  //     userStore.authenticated = false;
  //   }
  // }
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
    next({ name: "landing" });
  } else {
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
    console.log(response);
  } catch (err) {
    console.log(err);
  }

  return next({ name: "log-in" });
};
