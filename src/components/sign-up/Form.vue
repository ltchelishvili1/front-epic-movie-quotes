<template>
  <form @submit.prevent="submitForm">
    <base-input
      :title="$t('name')"
      name="username"
      :placeholder="$t('name_placeholder')"
      rules="required|min:3|max:15"
    ></base-input>

    <base-input
      :title="$t('email')"
      name="email"
      :placeholder="$t('email_placeholder')"
      rules="required|email"
      type="email"
    ></base-input>

    <base-input
      :title="$t('password')"
      name="password"
      :placeholder="$t('password_placeholder')"
      rules="required|min:8|max:15"
      type="password"
    ></base-input>
    <base-input
      :title="$t('confirm_password')"
      name="repeat_password"
      :placeholder="$t('confirm_password_placeholder')"
      rules="required|confirmed:password"
      type="password"
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

export default {
  components: { BaseInput, BaseButton },
  setup(_, { emit }) {
    const handleClick = () => {
      emit("click-button");
    };

    return {
      handleClick,
    };
  },
};
</script>
