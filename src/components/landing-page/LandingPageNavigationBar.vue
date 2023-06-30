<template>
  <nav
    class="flex items-center justify-between px-[26px] md:px-[70px] lg:px-[70px] py-[30px]"
  >
    <router-link :to="{ name: 'main' }" class="text-[#DDCCAA] mt-6">{{
      $t("movie_quotes")
    }}</router-link>
    <div class="flex items-center justify-center h-[38px]">
      <div v-if="userStore.authenticated">
        <base-button
          button-class="primary"
          class="md:w-[120px] lg:w-[120px] w-[72px] h-[38px] mr-[15px]"
          @click-button="logOutUser"
          >{{ $t("log_out") }}</base-button
        >
      </div>

      <div v-else class="flex items-center justify-center">
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
import { useUserStore } from "@/stores/user/index";
import { useRouter } from "vue-router";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import axios from "@/config/axios/index";

export default {
  components: {
    BaseButton,
    ChangeLanguage,
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const openSignUpModal = () => {
      router.push({ name: "sign-up" });
    };
    const openLogInModal = () => {
      router.push({ name: "log-in" });
    };

    const logOutUser = async () => {
      try {
        await axios.get("logout");
        userStore.setAuth(false);
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      openSignUpModal,
      openLogInModal,
      userStore,
      logOutUser,
    };
  },
};
</script>
