<template>
  <auth-layout :title="$t('create_profile')" :description="$t('start_journey')">
    <sign-up-form @click-button="handleButtonClick"> </sign-up-form>
    <p class="flex items-center justify-center mt-[40px]">
      <span class="text-[#6C757D]">{{ $t('already_have_an_account') }}</span>
      <router-link :to="{name: 'log-in'}" class="text-[#0D6EFD] ml-[4px]" >{{ $t('log_in') }}</router-link>
    </p>
  </auth-layout>
</template>

<script>
import SignUpForm from "@/components/sign-up/Form.vue";
import { useForm } from "vee-validate";
import { useSignUpStore } from "@/stores/sign-up/index";
import { useRouter } from "vue-router";
import AuthLayout from "@/components/layout/AuthLayout.vue";

export default {
  components: { SignUpForm, AuthLayout },
  setup() {
    const router = useRouter();
    const signUpStore = useSignUpStore();
    const { handleSubmit } = useForm();

    const handleButtonClick = handleSubmit(async (_, actions) => {
      await signUpStore.registerUser();
      actions.setErrors(signUpStore.errors);
      router.push({ name: "verification-email-send" });
    });

    return {
      handleButtonClick,
    };
  },
};
</script>
