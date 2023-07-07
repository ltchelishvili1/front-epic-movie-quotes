<template>
  <auth-layout>
    <h1 class="text-center text-white font-medium text-[2rem]">
      {{ $t("create_new_password") }}
    </h1>
    <p class="mt-[.75rem] text-[1rem] text-center text-[#6C757D] mb-[1.6rem]">
      {{ $t("password_must_be_different") }}
    </p>
    <update-password-form></update-password-form>
  </auth-layout>
</template>

<script>
import UpdatePasswordForm from "@/components/update-password/UpdatePasswordForm.vue";
import AuthLayout from "@/components/layout/AuthLayout.vue";

export default {
  components: {
    AuthLayout,
    UpdatePasswordForm,
  },
};
</script>
