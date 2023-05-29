import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "@/pages/authentication/sign-up/SignUpPage.vue";
import LogInPage from "@/pages/authentication/log-in/LogInPage.vue";
import LandingPage from "@/pages/LandingPage.vue";
import VerificationEmailSend from "@/components/modals/VerificationEmailSendModal.vue";
import AccountActivated from "@/components/modals/AccountActivatedModal.vue";

import { authenticateUser } from "@/router/guards";
import { Guest } from "@/router/guards";
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
          beforeEnter: Guest,
        },
        {
          path: "/log-in",
          name: "log-in",
          component: LogInPage,
          beforeEnter: Guest,
        },
        {
          path: "/verification-email-send/email=:email",
          name: "verification-email-send",
          component: VerificationEmailSend,
          beforeEnter: Guest,
        },
        {
          path: "/account-activated",
          name: "account-activated",
          component: AccountActivated,
          beforeEnter: Guest,
        },
      ],
    },
    {},
  ],
});
router.beforeEach(authenticateUser);

export default router;
