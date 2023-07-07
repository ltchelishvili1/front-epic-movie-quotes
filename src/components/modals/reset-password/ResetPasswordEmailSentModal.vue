<template>
  <auth-layout>
    <icon-email-verification></icon-email-verification>
    <h1 class="text-white text-[2rem] font-medium mt-[1.25remrem]">
     {{ $t('check_your_email') }}
    </h1>
    <p class="text-white text-[1.1rem] font-medium mt-[1.9rem] text-center">
      {{ $t('recover_instructions_sent') }}
    </p>
    <base-button
      class="mt-[2.5rem]"
      button-class="primary"
      @click-button="redirectToEmail"
    >
     {{ $t('go_to_email') }}</base-button
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
      let email = route.query.email;
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
