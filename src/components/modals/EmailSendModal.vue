<template>
  <auth-layout>
    <icon-email-verification></icon-email-verification>
    <h1 class="text-white text-[32px] font-medium mt-[20px]">
      Check your email
    </h1>
    <p class="text-white text-[17px] font-medium mt-[30px] text-center">
      {{ description }}
    </p>
    <base-button
      class="mt-[40px]"
      button-class="primary"
      @click-button="redirectToEmail"
    >
      Go to my email</base-button
    >
  </auth-layout>
</template>

<script>
import AuthLayout from "@/components/layout/AuthLayout.vue";
import IconEmailVerification from "@/components/icons/IconEmailVerification.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    AuthLayout,
    IconEmailVerification,
    BaseButton,
  },
  props: {
    description: {
      type: String,
      required: true,
    },
  },
  setup() {
    const route = useRoute();

    const redirectToEmail = () => {
      let domain;
      let email = route.params.email;
      if (email) {
        domain = email.split("@")[1];
      } else {
        domain = "gmail.com";
      }

      let redirectLink = `https://${domain}`;

      window.open(redirectLink, "_blank");
    };

    return {
      redirectToEmail,
    };
  },
};
</script>
