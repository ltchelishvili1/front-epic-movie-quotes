<template>
  <auth-layout>
    <log-in-form @click-button="handleButtonClick"></log-in-form>
  </auth-layout>
</template>

<script>
import LogInForm from "@/components/log-in/LogInForm.vue";
import { useForm } from "vee-validate";
import { useLogInStore } from "@/stores/log-in/index";
import AuthLayout from "@/components/layout/AuthLayout.vue";

export default {
  components: { LogInForm, AuthLayout },
  setup() {
    const logInStore = useLogInStore();
    const { handleSubmit } = useForm();

    const handleButtonClick = handleSubmit(async (_, actions) => {
      await logInStore.logInUser();
      actions.setErrors(logInStore.errors);
    });

    return {
      handleButtonClick,
    };
  },
};
</script>
