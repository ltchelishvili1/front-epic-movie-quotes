<template>
  <auth-layout :title="$t('create_profile')" :description="$t('start_journey')">
    <sign-up-form> </sign-up-form>
    <p class="flex items-center justify-center mt-[2.5rem]">
      <span class="text-[#6C757D]">{{ $t("already_have_an_account") }}</span>
      <router-link :to="{ name: 'log-in' }" class="text-[#0D6EFD] ml-[.25rem]">{{
        $t("log_in")
      }}</router-link>
    </p>
  </auth-layout>
</template>

<script>
import SignUpForm from "@/components/sign-up/SignUpForm.vue";
import AuthLayout from "@/components/layout/AuthLayout.vue";

export default {
  components: { SignUpForm, AuthLayout },
};
</script>
