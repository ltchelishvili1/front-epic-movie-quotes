<template>
  <Form @submit="handleClick">
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

    <base-button buttonClass="primary"
      >Get started</base-button
    >

    <base-button buttonClass="google" displayIcon @click-button="handleClick">
      Sign up with Google</base-button
    >
  </Form>
</template>

<script>
import BaseInput from "@/components/UI/inputs/BaseInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { useLogInStore } from "@/stores/log-in/index";
import { Form } from "vee-validate";
import { provide, toRef } from 'vue';

export default {
  components: { BaseInput, BaseButton , Form},
  setup(_, { emit }) {
    const logInStore = useLogInStore();
    const handleClick = () => {
      emit("click-button");
    };

    const setInputValue = ({ key, value }) => {
      logInStore.setInputValue({ key, value });
    };


    const getErrors = () => {
      return toRef(logInStore, "errors");
    }

    provide('getErrors', getErrors());


    return {
      handleClick,
      setInputValue,
    };
  },
};
</script>
