<template>
  <auth-layout>
    <sign-up-form @click-button="handleButtonClick"> </sign-up-form>
    <div class="locale-changer">
    </div>
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

    const handleButtonClick = handleSubmit(async () => {
      try {
        await signUpStore.registerUser();
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
