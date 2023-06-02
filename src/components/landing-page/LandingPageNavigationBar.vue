<template>
  <nav
    class="flex items-center justify-between px-[26px] md:px-[70px] lg:px-[70px] py-[30px]"
  >
    <p class="text-[#DDCCAA]">{{ $t("movie_quotes") }}</p>
    <div class="flex items-center justify-center h-[38px]">
      <select
        class="hidden lg:block md:block flex items-center justify-center p-[5px] mr-[40px] h-[38px] bg-transparent text-white"
        v-model="$i18n.locale"
        @change="changeLanguage"
      >
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
        >
          {{ locale }}
        </option>
      </select>
      <div v-if="userStore.authenticated">
        <base-button
          buttonClass="primary"
          class="md:w-[120px] lg:w-[120px] w-[72px] h-[38px] mr-[15px]"
          @click-button="logOutUser"
          >{{ $t("log_out") }}</base-button
        >
      </div>
      <div v-else class="flex items-center justify-center">
        <base-button
          buttonClass="primary"
          class="md:w-[120px] lg:w-[120px] w-[72px] h-[38px] mr-[15px]"
          @click-button="openSignUpModal"
          >{{ $t("sign_up") }}</base-button
        >

        <base-button
          class="md:w-[120px] lg:w-[120px] w-[72px] h-[38px]"
          buttonClass="google"
          @click-button="openLogInModal"
        >
          {{ $t("log_in") }}</base-button
        >
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from "@/stores/user/index";
import { useRouter } from "vue-router";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { setLocale } from "@vee-validate/i18n";
import axios from "@/config/axios/index";

export default {
  components: {
    BaseButton,
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

    const changeLanguage = (event) => {
      setLocale(event.target.value);
      try {
        const response = axios.get("set-language/" + event.target.value);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      localStorage.setItem("language", event.target.value);
    };

    return {
      openSignUpModal,
      openLogInModal,
      userStore,
      logOutUser,
      changeLanguage,
    };
  },
};
</script>
