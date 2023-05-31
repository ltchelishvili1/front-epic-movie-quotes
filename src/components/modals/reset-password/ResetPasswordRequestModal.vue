<template>
  <auth-layout>
    <h1 class="text-white font-medium text-[32px]">
      {{ $t("forgot_password") }}
    </h1>
    <p class="mt-[12px] text-[16px] text-center text-[#6C757D] mb-[25px]">
      {{ $t("enter_email") }}
    </p>
    <reset-password-request-form></reset-password-request-form>
  </auth-layout>
</template>

<script>
import ResetPasswordRequestForm from "@/components/reset-password/ResetPasswordRequestForm.vue";
import AuthLayout from "@/components/layout/AuthLayout.vue";

export default {
  components: {
    ResetPasswordRequestForm,
    AuthLayout,
  },
};
</script>
