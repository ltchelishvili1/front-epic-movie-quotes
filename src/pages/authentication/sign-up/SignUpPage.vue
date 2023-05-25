<template>
  <auth-layout>
    <sign-up-form @click-button="handleButtonClick">
    </sign-up-form>
  </auth-layout>
</template>

<script>
import SignUpForm from "@/components/sign-up/Form.vue";
import { useForm } from "vee-validate";
import { useSignUpStore } from "@/stores/sign-up/index";
import AuthLayout from "@/components/layout/AuthLayout.vue";


export default {
  components: { SignUpForm, AuthLayout },
  setup() {
    const signUpStore = useSignUpStore();
    const { handleSubmit } = useForm();
    
    const handleButtonClick = handleSubmit(async (_, actions) => {
      await signUpStore.registerUser();
      actions.setErrors(signUpStore.errors);
    });

    return {
      handleButtonClick,
    };
  },
};
</script>
