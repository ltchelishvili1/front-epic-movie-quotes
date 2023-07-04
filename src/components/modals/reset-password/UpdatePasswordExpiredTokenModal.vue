<template>
  <auth-layout>
    <icon-token-expired></icon-token-expired>
    <h1 class="text-white text-[32px] font-medium mt-[20px]">
      {{ $t("link_expired") }}
    </h1>
    <p class="text-white text-[17px] font-medium mt-[30px] text-center">
      {{ $t("link_has_expired") }}
    </p>
    <base-button
      class="mt-[40px] w-[180px]"
      button-class="primary"
      @click-button="sendLink"
    >
      <span v-if="!isLoading"> {{ $t("request_another_link") }}</span>
      <load-spinner v-else classes="w-[25px] h-[25px]"></load-spinner>
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
          params: { email },
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
