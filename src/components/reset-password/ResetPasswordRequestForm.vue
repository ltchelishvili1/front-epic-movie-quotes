<template>
  <Form @submit="handleClick">
    <base-input
      :title="$t('email')"
      name="email"
      :placeholder="$t('email_placeholder')"
      rules="required|email"
      type="email"
      @set-input-value="setInputValue"
    ></base-input>
    <p v-if="error" class="text-red-500 ml-4">{{ error }}</p>
    <base-button buttonClass="primary">{{$t('send_insturctions')}}</base-button>
    <nav class="flex items-center justify-center">
      <router-link :to="{ name: 'landing' }">
        <icon-navigate-back></icon-navigate-back>
      </router-link>
      <p class="text-[#6C757D] ml-[10px]">{{$t('back_to_login')}}</p>
    </nav>
  </Form>
</template>

<script>
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import BaseInput from "@/components/UI/inputs/BaseInput.vue";
import IconNavigateBack from "@/components/icons/IconNavigateBack.vue";

import axios from "@/config/axios/index";
import { Form } from "vee-validate";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {
    BaseButton,
    BaseInput,
    Form,
    IconNavigateBack,
  },
  setup() {
    const resetPasswordData = ref({});
    const errorMessage = ref(null);
    const router = useRouter()

    const handleClick = async () => {
      try {
        const response = await axios.post(
          "forgot-password",
          {
           ...resetPasswordData.value
          },
          {}
        );
        if(response.data !== 'passwords.sent'){
          errorMessage.value = 'Something went wrong, please try again.'
        }
        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }
        router.push({
          name: "reset-password-email-send",
          params: { email: resetPasswordData.value.email },
        });
      } catch (error) {
        console.log(error)
        errorMessage.value = error.response.data.errors.email
          ? error.response.data.errors.email[0]
          : "";
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
    };
  },
};
</script>