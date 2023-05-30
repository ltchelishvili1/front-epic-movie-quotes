import axios from "axios";
import { useUserStore } from "@/stores/user/index";
import router from "@/router/index";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      const userStore = useUserStore();
      userStore.authenticated = false;
      router.push({ name: "main" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
