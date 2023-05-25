import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "@/pages/authentication/sign-up/SignUpPage.vue";
import LogInPage from "@/pages/authentication/log-in/LogInPage.vue";
import LandingPage from "@/pages/LandingPage.vue";
import { authenticateUser } from "@/router/guards";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/landing",
      name: "main",
    },

    {
      path: "/landing",
      name: "landing",
      component: LandingPage,
      children: [
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
    },
    {},
  ],
});
router.beforeEach(authenticateUser);

export default router;
