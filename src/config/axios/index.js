import axios from "axios";
import { useAuthStore } from "@/stores/user";
import router from "@/router/index";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
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
      const authStore = useAuthStore();
      authStore.authenticated = false;
      router.push({name: 'main'});
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
