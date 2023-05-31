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
      :errors="errors"
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
    <base-button buttonClass="primary">{{ $t("get_started") }}</base-button>
    <base-button buttonClass="google" displayIcon @click-button="handleClick">
      {{ $t("sign_up_with_google") }}</base-button
    >
  </Form>
</template>

<script>
import BaseInput from "@/components/UI/inputs/BaseInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import BaseCheckBox from "@/components/UI/inputs/BaseCheckBox.vue";

import { Form } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user/index";

import axios from "@/config/axios/index";

export default {
  components: { BaseInput, BaseButton, Form, BaseCheckBox },
  setup() {
    const logInData = ref({});
    const userStore = useUserStore();
    const errorMessage = ref(null);

    const router = useRouter();
    const setInputValue = ({ key, value }) => {
      logInData.value[key] = value;
    };

    const handleButtonClick = async () => {
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
        router.push({ name: "landing" });
      } catch (error) {
        errorMessage.value = error.response.data.errors.password[0];
      }
    };

    return {
      handleClick: handleButtonClick,
      setInputValue,
      errors: errorMessage,
    };
  },
};
</script>
