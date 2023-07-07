<template>
  <nav
    class="flex items-center justify-between px-[1.6rem] md:px-[4.5rem] lg:px-[4.5rem] py-[1.9rem]"
  >
    <router-link :to="{ name: 'main' }" class="text-[#DDCCAA] mt-6">{{
      $t("movie_quotes")
    }}</router-link>
    <div class="flex items-center justify-center h-[2.4rem]">
      <div class="flex items-center justify-center">
        <change-language></change-language>
        <base-button
          button-class="primary"
          class="md:w-[7.5rem] lg:w-[7.5rem] h-[2.4rem] mr-[.9rem]"
          @click-button="openSignUpModal"
          >{{ $t("sign_up") }}</base-button
        >

        <base-button
          class="md:w-[7.5rem] lg:w-[7.5rem] w-[4.4rem] h-[2.4rem]"
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
