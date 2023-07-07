<template>
  <auth-layout>
    <icon-token-expired></icon-token-expired>
    <h1 class="text-white text-[2rem] font-medium mt-[1.25rem]">
      {{ $t("link_expired") }}
    </h1>
    <p class="text-white text-[1.1rem] font-medium mt-[1.9rem] text-center">
      {{ $t("link_has_expired") }}
    </p>
    <base-button
      class="mt-[2.5rem] w-[11.25rem]"
      button-class="primary"
      @click-button="sendLink"
    >
      <span v-if="!isLoading"> {{ $t("request_another_link") }}</span>
      <load-spinner v-else classes="w-[1.6rem] h-[1.6rem]"></load-spinner>
    </base-button>
  </auth-layout>
</template>

<script>
import AuthLayout from "@/components/layout/AuthLayout.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import IconTokenExpired from "@/components/icons/IconTokenExpired.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";

import axios from "@/config/axios";

import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

export default {
  components: {
    AuthLayout,
    IconTokenExpired,
    BaseButton,
    LoadSpinner,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const { email } = route.params;
    const isLoading = ref(false);

    const sendLink = async () => {
      isLoading.value = true;
      try {
        const response = await axios.post("forgot-password", {
          email: atob(email),
        });
        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }
        router.push({
          name: "reset-password-email-send",
          query: { email },
        });
      } catch (error) {
        //
      } finally {
        isLoading.value = false;
      }
    };

    return {
      sendLink,
      isLoading,
    };
  },
};
</script>
