<template>
  <vee-validate-form @submit="handleClick">
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
    <base-button buttonClass="primary">{{ $t("reset_password") }}</base-button>
    <nav class="flex items-center justify-center">
      <router-link :to="{ name: 'landing' }">
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
import { Form } from "vee-validate";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/config/axios";

export default {
  components: {
    BaseButton,
    BaseInput,
    VeeValidateForm: Form,
    IconNavigateBack,
  },
  setup() {
    const updatePasswordData = ref({});
    const errorMessage = ref(null);
    const route = useRoute();
    const router = useRouter();

    const handleClick = async () => {
      const { email, token } = route.params;
      try {
        await axios.post("reset-password", {
          token,
          email,
          ...updatePasswordData.value,
        });
        router.push({ name: "update-password-success" });
      } catch (err) {
        errorMessage.value = err.response.data.errors.password[0];
        throw new Error(err);
      }
    };

    const setInputValue = ({ key, value }) => {
      errorMessage.value = null;
      updatePasswordData.value[key] = value;
    };

    const passwordConfirmationRules = computed(() => {
      return "required|confirmed:" + updatePasswordData.value.password;
    });

    return {
      setInputValue,
      handleClick,
      error: errorMessage,
      updatePasswordData,
      passwordConfirmationRules,
    };
  },
};
</script>
