<template>
  <auth-layout>
    <log-in-form @click-button="handleButtonClick"></log-in-form>
    <div class="locale-changer">
      <select v-model="$i18n.locale" @change="setLocale($i18n.locale)">
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
    </div>
  </auth-layout>
</template>

<script>
import LogInForm from "@/components/log-in/LogInForm.vue";
import { useForm } from "vee-validate";
import { setLocale } from "@vee-validate/i18n";
import { useLogInStore } from "@/stores/log-in/index";
import AuthLayout from "@/components/layout/AuthLayout.vue";

export default {
  components: { LogInForm, AuthLayout },
  setup() {
    const logInStore = useLogInStore();
    const { handleSubmit } = useForm();

    const handleButtonClick = handleSubmit(async () => {
      try {
        const response = await logInStore.logInUser();

        console.log(response)

      } catch (error) {
        throw new Error(error.message);
      }
    });

    return {
      handleButtonClick,
      setLocale,
    };
  },
};
</script>
