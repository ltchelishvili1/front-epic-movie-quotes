import { createRouter, createWebHistory } from "vue-router";
import SignUpPage from "@/pages/authentication/sign-up/SignUpPage.vue";
import LogInPage from "@/pages/authentication/log-in/LogInPage.vue";
import LandingPage from "@/pages/LandingPage.vue";
import VerificationEmailSendModal from "@/components/modals/VerificationEmailSendModal.vue";
import ResetPasswordEmailSentModal from "@/components/modals/reset-password/ResetPasswordEmailSentModal.vue";
import AccountActivated from "@/components/modals/AccountActivatedModal.vue";
import ResetPasswordRequest from "@/components/modals/reset-password/ResetPasswordRequestModal.vue";
import UpdatePassword from "@/components/modals/reset-password/UpdatePasswordModal.vue";
import UpdatePasswordSuccessModal from "@/components/modals/reset-password/UpdatePasswordSuccessModal.vue";
import UpdateProfilePage from "@/pages/UpdateProfilePage.vue";
import MoviesListPage from "@/pages/MoviesListPage.vue";
import CheckMoviePage from "@/pages/CheckMoviePage.vue";
import AddMovieModal from "@/components/modals/AddMovieModal.vue";
import EditMovieModal from "@/components/modals/EditMovieModal.vue";
import AddQuoteModal from "@/components/modals/AddQuoteModal.vue";
import EditQuoteModal from "@/components/modals/EditQuoteModal.vue";

import {
  authenticateUser,
  Guest,
  checkPasswordUpdateToken,
} from "@/router/guards";

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
      beforeEnter: authenticateUser,
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
          component: VerificationEmailSendModal,
          beforeEnter: Guest,
        },
        {
          path: "/account-activated",
          name: "account-activated",
          component: AccountActivated,
          beforeEnter: Guest,
        },
        {
          path: "/update-password-success",
          name: "update-password-success",
          component: UpdatePasswordSuccessModal,
          beforeEnter: Guest,
        },
        {
          path: "/reset-password-request",
          name: "reset-password-request",
          component: ResetPasswordRequest,
        },
        {
          path: "/email-verify-token=:token/email=:email",
          name: "email-verify-token",
          component: UpdatePassword,
          beforeEnter: checkPasswordUpdateToken,
        },
        {
          path: "/reset-password-email-send/email=:email",
          name: "reset-password-email-send",
          beforeEnter: Guest,
          component: ResetPasswordEmailSentModal,
        },
      ],
    },
    {
      path: "/update-profile",
      name: "update-profile",
      component: UpdateProfilePage,
      beforeEnter: authenticateUser,
    },
    {
      path: "/movies",
      name: "movies",
      component: MoviesListPage,
      beforeEnter: authenticateUser,
      children: [
        {
          path: "/movies/add",
          name: "add-movie",
          component: AddMovieModal,
          beforeEnter: authenticateUser,
        },
      ],
    },
    {
      path: "/check-movies/:id",
      name: "checkmovie",
      component: CheckMoviePage,
      beforeEnter: authenticateUser,
      children:[
        {
          path: "edit-movie",
          name: "edit-movie",
          component: EditMovieModal,
          beforeEnter: authenticateUser, 
        },
        {
          path: "add-quote",
          name: "add-quote",
          component: AddQuoteModal,
          beforeEnter: authenticateUser, 
        },
        {
          path: "edit-quote/:quoteId",
          name: "edit-quote",
          component: EditQuoteModal,
          beforeEnter: authenticateUser, 
        }
      ]
    },
  ],
});

export default router;
