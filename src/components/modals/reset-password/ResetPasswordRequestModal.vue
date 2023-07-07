<template>
  <auth-layout>
    <h1 class="text-white font-medium text-[2rem]">
      {{ $t("forgot_password") }}
    </h1>
    <p class="mt-[.75rem] text-[1rem] text-center text-[#6C757D] mb-[1.6rem]">
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
