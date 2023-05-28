<template>
  <auth-layout>
    <log-in-form @click-button="handleButtonClick"></log-in-form>
    <p class="flex items-center justify-center mt-[40px]">
      <span class="text-[#6C757D]">{{ $t('not_have_an_account') }}</span>
      <router-link :to="{name: 'sign-up'}" class="text-[#0D6EFD] ml-[4px]" >{{ $t('sign_up') }}</router-link>
    </p>
  </auth-layout>
</template>

<script>
import LogInForm from "@/components/log-in/LogInForm.vue";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useLogInStore } from "@/stores/log-in/index";
import AuthLayout from "@/components/layout/AuthLayout.vue";

export default {
  components: { LogInForm, AuthLayout },
  setup() {
    const logInStore = useLogInStore();
    const { handleSubmit } = useForm();
    const router = useRouter();

    const handleButtonClick = handleSubmit(async (_, actions) => {
      await logInStore.logInUser();
      actions.setErrors(logInStore.errors);
      router.replace({ name: 'landing' }).then(() => {
        location.reload();
      });
    });

    return {
      handleButtonClick,
    };
  },
};
</script>
