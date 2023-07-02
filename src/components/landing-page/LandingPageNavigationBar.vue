<template>
  <nav
    class="flex items-center justify-between px-[26px] md:px-[70px] lg:px-[70px] py-[30px]"
  >
    <router-link :to="{ name: 'main' }" class="text-[#DDCCAA] mt-6">{{
      $t("movie_quotes")
    }}</router-link>
    <div class="flex items-center justify-center h-[38px]">
      <div  class="flex items-center justify-center">
        <change-language></change-language>
        <base-button
          button-class="primary"
          class="md:w-[120px] lg:w-[120px] w-[72px] h-[38px] mr-[15px]"
          @click-button="openSignUpModal"
          >{{ $t("sign_up") }}</base-button
        >

        <base-button
          class="md:w-[120px] lg:w-[120px] w-[72px] h-[38px]"
          button-class="google"
          @click-button="openLogInModal"
        >
          {{ $t("log_in") }}</base-button
        >
      </div>
    </div>
  </nav>
</template>

<script>
import ChangeLanguage from "@/components/LanguageSwitch.vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";

export default {
  components: {
    BaseButton,
    ChangeLanguage,
  },
  setup() {
    const router = useRouter();

    const openSignUpModal = () => {
      router.push({ name: "sign-up" });
    };
    const openLogInModal = () => {
      router.push({ name: "log-in" });
    };


    return {
      openSignUpModal,
      openLogInModal,
    };
  },
};
</script>
