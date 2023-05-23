import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "@/pages/authentication/sign-up/SignUpPage.vue";
import LogInPage from "@/pages/authentication/log-in/LogInPage.vue";
import { useAuthStore } from "@/stores/auth/index";
import axios from "@/config/axios";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUpPage,
    },
    {
      path: "/log-in",
      name: "log-in",
      component: LogInPage,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
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
});

export default router;
