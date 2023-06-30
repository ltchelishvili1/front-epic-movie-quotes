import axios from "@/config/axios/index";
import i18n from "@/config/i18n/index.js";
import NoUserImage from "@/assets/images/NoUserImage.png";

import { useUserStore } from "@/stores/user/index";
import { computed } from "vue";

export const handleGoogleAuth = async () => {
  try {
    const response = await axios.get("/auth/google");
    await axios.get("sanctum/csrf-cookie");
    window.location.replace(response.data);
  } catch (error) {
    //
  }
};

export const authUser = async (userStore) => {
  if (userStore.authenticated === null) {
    try {
      const response = await axios.get("user");
      userStore.authenticated = true;
      userStore.setUser(response.data.user);
    } catch (err) {
      userStore.authenticated = false;
    }
  }
};

export const getLocale = () => {
  return computed(() => i18n.global.locale.value || "en");
};

export const displayImage = computed(() => {
  const userStore = useUserStore();
  return userStore.getUser?.thumbnail
    ? userStore.getUser?.thumbnail
    : NoUserImage;
});
