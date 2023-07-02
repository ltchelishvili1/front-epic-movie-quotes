<template>
  <vee-validate-form v-slot="{meta}" @submit="handleClick">
    <base-input
      :title="$t('email')"
      name="email"
      :placeholder="$t('email_placeholder')"
      rules="required|email"
      type="email"
      @set-input-value="setInputValue"
    ></base-input>
    <p v-if="error" class="text-red-500 ml-4">{{ error }}</p>
    <base-button :disabled="!meta.valid" button-class="primary">
    <span v-if="!isLoading">
      {{
      $t("send_insturctions")
    }}
    </span>
    <load-spinner v-else classes="h-[25px] w-[25px]"></load-spinner>
  </base-button>
    <nav class="flex items-center justify-center">
      <router-link :to="{ name: 'log-in' }">
        <icon-navigate-back></icon-navigate-back>
      </router-link>
      <p class="text-[#6C757D] ml-[10px]">{{ $t("back_to_login") }}</p>
    </nav>
  </vee-validate-form>
</template>

<script>
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import BaseInput from "@/components/UI/inputs/BaseInput.vue";
import IconNavigateBack from "@/components/icons/IconNavigateBack.vue";

import axios from "@/config/axios/index";
import { Form } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoadSpinner from '@/components/LoadSpinner.vue';

export default {
  components: {
    BaseButton,
    BaseInput,
    VeeValidateForm: Form,
    IconNavigateBack,
    LoadSpinner
  },
  setup() {
  
    const resetPasswordData = ref({});
    const errorMessage = ref(null);
    const router = useRouter();
    const isLoading = ref(false)

    const handleClick = async () => {
      isLoading.value = true;
      try {
        const response = await axios.post(
          "forgot-password",
          {
            ...resetPasswordData.value,
          },
          {}
        );
        if (response.data !== "passwords.sent") {
          errorMessage.value = "Something went wrong, please try again.";
        }
        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }
        router.push({
          name: "reset-password-email-send",
          params: { email: resetPasswordData.value.email },
        });
      } catch (error) {
        console.log(error);
        errorMessage.value = error.response.data.errors.email
          ? error.response.data.errors.email[0]
          : "";
      } finally{
        isLoading.value = false;
      }
    };

    const setInputValue = ({ key, value }) => {
      errorMessage.value = null;
      resetPasswordData.value[key] = value;
    };

    return {
      setInputValue,
      handleClick,
      error: errorMessage,
      isLoading
    };
  },
};
</script>
