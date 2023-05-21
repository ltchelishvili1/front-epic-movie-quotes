<template>
  <div
    class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.24)] z-50"
  >
    <div
      class="rounded-[10px] py-[53px] w-[600px] px-[120px] flex flex-col items-center justify-center fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#222030]"
    >
      <h1 class="text-white font-medium text-[32px]">
        {{ $t("createProfile") }}
      </h1>
      <p class="text-[#6C757D] pb-[23px]">{{ $t("startJourney") }}</p>

      <sign-up-form @click-button="handleButtonClick"> </sign-up-form>
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
    </div>
  </div>
</template>

<script>
import SignUpForm from "@/components/sign-up/Form.vue";
import { useForm } from "vee-validate";
import { setLocale } from "@vee-validate/i18n";
import { useSignUpStore } from "@/stores/sign-up/index";

export default {
  components: { SignUpForm },
  setup() {
    const signUpStore = useSignUpStore();
    const { handleSubmit } = useForm();

    const handleButtonClick = handleSubmit(async () => {
      try {
        await signUpStore.registerUser();
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
