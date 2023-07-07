<template>
  <auth-layout>
    <icon-account-activated></icon-account-activated>
    <h1 class="text-white text-[2rem] font-medium mt-[1.25remrem]">
      {{ $t("success") }}
    </h1>
    <p class="text-white text-[1.1rem] font-medium mt-[1.9rem] text-center">
      {{ $t("password_changed_successfully") }}
    </p>
    <base-button
      class="mt-[2.5rem]"
      button-class="primary"
      @click-button="redirectTologin"
    >
      {{ $t("log_in") }}</base-button
    >
  </auth-layout>
</template>

<script>
import AuthLayout from "@/components/layout/AuthLayout.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import IconAccountActivated from "@/components/icons/IconAccountActivated.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    AuthLayout,
    IconAccountActivated,
    BaseButton,
  },
  props: {
    description: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const redirectTologin = () => {
      router.push({ name: "log-in" });
    };
    return {
      redirectTologin,
    };
  },
};
</script>
