<template>
  <vee-validate-form v-slot="{ meta }" @submit="handleClick()">
    <base-input
      :title="$t('email_or_username_placeholder')"
      name="username"
      :placeholder="$t('email_or_username_placeholder')"
      rules="required"
      type="email"
      @set-input-value="setInputValue"
    ></base-input>
    <base-input
      :title="$t('password')"
      name="password"
      :placeholder="$t('password_placeholder')"
      rules="required|min:8|max:15"
      type="password"
      :errors="errors"
      @set-input-value="setInputValue"
    ></base-input>
    <p v-if="errors" class="text-red-500 ml-4">{{ errors }}</p>
    <div class="flex items-center justify-between">
      <base-check-box
        :title="$t('remember_me')"
        name="remember_me"
        :placeholder="$t('password_placeholder')"
        type="checkbox"
        value="true"
        @set-input-value="setInputValue"
      ></base-check-box>
      <router-link :to="{ name: 'reset-password-request' }">
        <p class="text-[#0D6EFD] underline">
          {{ $t("forgot_password") }}
        </p></router-link
      >
    </div>

    <base-button button-class="primary" :disabled="!meta.valid">
      <span v-if="!isLoading">
        {{ $t("log_in") }}
      </span>
      <load-spinner v-else classes="h-[25px] w-[25px]"></load-spinner>
      </base-button
    >
    <base-button
      type="button"
      button-class="google"
      display-icon
      @click-button="handleGoogleAuth"
    >
      {{ $t("log_in_with_google") }}</base-button
    >
  </vee-validate-form>
</template>

<script>
import BaseInput from "@/components/UI/inputs/BaseInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import BaseCheckBox from "@/components/UI/inputs/BaseCheckBox.vue";
import { handleGoogleAuth } from "@/config/helpers";

import { Form, useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/index";

import axios from "@/config/axios/index";
import LoadSpinner from "@/components/LoadSpinner.vue";

export default {
  components: {
    BaseInput,
    BaseButton,
    VeeValidateForm: Form,
    BaseCheckBox,
    LoadSpinner,
  },
  setup() {
    const logInData = ref({});
    const userStore = useUserStore();
    const errorMessage = ref(null);
    const { handleSubmit } = useForm();
    const isLoading = ref(false);

    const router = useRouter();
    const setInputValue = ({ key, value }) => {
      logInData.value[key] = value;
    };

    const handleButtonClick = handleSubmit(async () => {
      isLoading.value = true;
      try {
        await axios.get("sanctum/csrf-cookie");
        const response = await axios.post("login", {
          ...logInData.value,
          remember_me: logInData.value.remember_me
            ? logInData.value.remember_me
            : false,
        });

        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }

        userStore.setAuth(true);
        userStore.setUser(response.data.user);

        router.push({ name: "news-feed" });
      } catch (error) {
        errorMessage.value = error.response.data.errors.password[0];
      } finally {
        isLoading.value = false;
      }
    });

    return {
      handleClick: handleButtonClick,
      handleGoogleAuth,
      setInputValue,
      errors: errorMessage,
      isLoading,
    };
  },
};
</script>
