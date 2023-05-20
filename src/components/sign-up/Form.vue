<template>
  <form>
    <base-input
      :title="$t('name')"
      name="username"
      :placeholder="$t('namePlaceholder')"
    ></base-input>

    <base-input
      :title="$t('email')"
      name="email"
      :placeholder="$t('emailPlaceholder')"
      type="email"
    ></base-input>

    <base-input
      :title="$t('password')"
      name="password"
      :placeholder="$t('passwordPlaceholder')"
      type="password"
    ></base-input>
    <base-input
      :title="$t('confirmPassword')"
      name="confirm_password"
      :placeholder="$t('confirmPasswordPlaceholder')"
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
