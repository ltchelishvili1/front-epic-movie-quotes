<template>
  <auth-layout>
    <log-in-form @click-button="handleButtonClick"></log-in-form>
    <div class="locale-changer">
    </div>
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

    const handleButtonClick = handleSubmit(async () => {
      try {
        await logInStore.logInUser();
      } catch (error) {
        throw new Error(error.message);
      }
    });

    return {
      handleButtonClick,
    };
  },
};
</script>
