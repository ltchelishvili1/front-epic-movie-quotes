<template>
  <auth-layout :title="$t('login_to_profile')" :description="$t('welcome_back')">
    <log-in-form
    
    ></log-in-form>
    <p class="flex items-center justify-center mt-[40px]">
      <span class="text-[#6C757D]">{{ $t("not_have_an_account") }}</span>
      <router-link :to="{ name: 'sign-up' }" class="text-[#0D6EFD] ml-[4px]">{{
        $t("sign_up")
      }}</router-link>
    </p>
  </auth-layout>
</template>

<script>
import LogInForm from "@/components/log-in/LogInForm.vue";

import AuthLayout from "@/components/layout/AuthLayout.vue";


export default {
  components: { LogInForm, AuthLayout },

};
</script>
