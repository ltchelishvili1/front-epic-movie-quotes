<template>
  <auth-layout>
    <icon-account-activated></icon-account-activated>
    <h1 class="text-white text-[2rem] font-medium mt-[1.25rem]">
      {{ $t("thank_you") }}
    </h1>
    <p class="text-white text-[1.1rem] font-medium mt-[1.9rem] text-center">
      {{ $t("activated") }}
    </p>
    <base-button
      class="mt-[2.5rem]"
      button-class="primary"
      @click-button="redirectToNewsFeed"
    >
      {{ $t("go_to_news_feed") }}</base-button
    >
  </auth-layout>
</template>

<script>
import AuthLayout from "@/components/layout/AuthLayout.vue";
import IconAccountActivated from "@/components/icons/IconAccountActivated.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    AuthLayout,
    IconAccountActivated,
    BaseButton,
  },
  setup() {
    const router = useRouter();

    const redirectToNewsFeed = () => {
      router.push({ name: "log-in" });
    };

    return {
      redirectToNewsFeed,
    };
  },
};
</script>
