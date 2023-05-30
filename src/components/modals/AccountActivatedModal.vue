<template>
  <auth-layout>
    <icon-account-activated></icon-account-activated>
    <h1 class="text-white text-[32px] font-medium mt-[20px]">Thank you!</h1>
    <p class="text-white text-[17px] font-medium mt-[30px] text-center">
      Your account has been activated.
    </p>
    <base-button
      class="mt-[40px]"
      @click-button="redirectToNewsFeed"
      buttonClass="primary"
    >
      Go to my news feed</base-button
    >
  </auth-layout>
</template>

<script>
import AuthLayout from "@/components/layout/AuthLayout.vue";
import IconAccountActivated from "@/components/icons/IconAccountActivated.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";

export default {
  components: {
    AuthLayout,
    IconAccountActivated,
    BaseButton,
  },
  setup() {
    const redirectToNewsFeed = () => {};

    return {
      redirectToNewsFeed,
    };
  },
};
</script>
