<template>
  <auth-layout>
    <icon-email-verification></icon-email-verification>
    <h1 class="text-white text-[32px] font-medium mt-[20px]">
      Check your email
    </h1>
    <p class="text-white text-[17px] font-medium mt-[30px] text-center">
      Please check your email and follow the instructions to activate your
      account.
    </p>
    <base-button
      class="mt-[40px]"
      @click-button="redirectToEmail"
      buttonClass="primary"
    >
      Go to my email</base-button
    >
  </auth-layout>
</template>

<script>
import AuthLayout from "@/components/layout/AuthLayout.vue";
import IconEmailVerification from "@/components/icons/IconEmailVerification.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { useSignUpStore } from "@/stores/sign-up/index";

export default {
  components: {
    AuthLayout,
    IconEmailVerification,
    BaseButton,
  },
  setup() {
    const signUpStore = useSignUpStore();

    const redirectToEmail = () => {
      let domain;
      let email = signUpStore.$state.registrationData.email;
      if (email) {
        domain = email.split("@")[1];
      } else {
        domain = "gmail.com";
      }

      let redirectLink = `https://${domain}`;

      window.location.href = redirectLink;
    };

    return {
      email: signUpStore.$state.registrationData.email,
      redirectToEmail,
    };
  },
};
</script>
