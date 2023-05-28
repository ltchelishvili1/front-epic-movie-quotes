<template>
  <Form @submit="handleClick">
    <base-input
      :title="$t('name')"
      name="username"
      :placeholder="$t('name_placeholder')"
      rules="required|min:3|max:15"
      @set-input-value="setInputValue"
    ></base-input>

    <base-input
      :title="$t('email')"
      name="email"
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
    <base-input
      :title="$t('confirm_password')"
      name="repeat_password"
      :placeholder="$t('confirm_password_placeholder')"
      rules="required|confirmed:password"
      type="password"
      @set-input-value="setInputValue"
    ></base-input>
    <base-button buttonClass="primary">{{ $t("get_started") }}</base-button>
    <base-button buttonClass="google" displayIcon @click-button="handleClick">
      {{ $t("sign_up_with_google") }}</base-button
    >
  </Form>
</template>

<script>
import BaseInput from "@/components/UI/inputs/BaseInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { useSignUpStore } from "@/stores/sign-up/index";
import { Form } from "vee-validate";
import { provide, toRef } from "vue";

export default {
  emits: ["click-button"],
  components: { BaseInput, BaseButton, Form },
  setup(_, { emit }) {
    const signUpStore = useSignUpStore();
    const handleClick = async () => {
      emit("click-button");
    };

    const setInputValue = ({ key, value }) => {
      signUpStore.setInputValue({ key, value });
    };

    const getErrors = () => {
      return toRef(signUpStore, "errors");
    };

    provide("getErrors", getErrors());

    return {
      handleClick,
      setInputValue,
      getErrors,
    };
  },
};
</script>
