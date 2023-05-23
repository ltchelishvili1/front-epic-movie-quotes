<template>
  <form @submit.prevent="submitForm">
    <base-input
      :title="$t('email')"
      name="username"
      :placeholder="$t('email_placeholder')"
      rules="required|email"
      type="email"
      @set-input-value="setInputValue"
    ></base-input>

    <base-input
      :title="$t('password')"
      name="password"
      :placeholder="$t('password_placeholder')"
      rules="required|min:8|max:15"
      type="password"
      @set-input-value="setInputValue"
    ></base-input>

    <base-button buttonClass="primary" @click-button="handleClick"
      >Get started</base-button
    >

    <base-button buttonClass="google" @click-button="handleClick">
      Sign up with Google</base-button
    >
  </form>
</template>

<script>
import BaseInput from "@/components/UI/inputs/BaseInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { useLogInStore } from "@/stores/log-in/index";
export default {
  components: { BaseInput, BaseButton },
  setup(_, { emit }) {
    const signUpStore = useLogInStore();
    const handleClick = () => {
      emit("click-button");
    };

    const setInputValue = ({ key, value }) => {
      signUpStore.setInputValue({ key, value });
    };

    return {
      handleClick,
      setInputValue,
    };
  },
};
</script>
