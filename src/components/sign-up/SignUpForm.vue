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
      :rules="passwordConfirmationRules"
      type="password"
      @set-input-value="setInputValue"
    ></base-input>
    <p v-if="error" class="text-red-500 ml-4">{{ error }}</p>
    <base-button  buttonClass="primary">{{ $t("get_started") }}</base-button>
    <base-button
 
      buttonClass="google"
      displayIcon
      @click-button="handleGoogleAuth"
    >
      {{ $t("sign_up_with_google") }}</base-button
    >
  </Form>
</template>

<script>
import BaseInput from "@/components/UI/inputs/BaseInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { handleGoogleAuth } from "@/config/helpers";

import { Form } from "vee-validate";
import { ref, computed } from "vue";

import axios from "@/config/axios/index";
import { useRouter } from "vue-router";

export default {
  components: { BaseInput, BaseButton, Form },
  setup() {
    const signUpData = ref({});
    const errorMessage = ref(null);
    const router = useRouter();

    const setInputValue = ({ key, value }) => {
      errorMessage.value = null;
      signUpData.value[key] = value;
    };

    const passwordConfirmationRules = computed(() => {
      return "required|confirmed:" + signUpData.value.password;
    });
    const handleClick = async () => {
      try {
        const response = await axios.post(
          "register",
          {
            ...signUpData.value,
          },
          {}
        );
        if (response.status !== 201) {
          throw new Error("Request failed with status " + response.status);
        }
        router.push({
          name: "verification-email-send",
          params: { email: signUpData.value.email },
        });
      } catch (error) {
        errorMessage.value = error.response.data.errors.email
          ? error.response.data.errors.email[0]
          : error.response.data.errors.username[0];
      }
    };



    return {
      handleClick,
      setInputValue,
      handleGoogleAuth,
      error: errorMessage,
      passwordConfirmationRules,
    };
  },
};
</script>
