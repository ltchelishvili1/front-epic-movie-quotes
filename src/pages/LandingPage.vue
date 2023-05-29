<template>
  <div class="w-full bg-dark-bg">
    <router-view></router-view>
    <nav class="flex items-center justify-between px-[70px] py-[30px]">
      <p class="text-[#DDCCAA]">{{ $t("movie_quotes") }}</p>
      <div class="flex items-center justify-center h-[38px]">
        <select
          class="flex items-center justify-center p-[5px] mr-[40px] h-[38px] bg-transparent text-white"
          v-model="$i18n.locale"
          @change="setLocale($i18n.locale)"
        >
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
        <div v-if="user">
          <base-button
            buttonClass="primary"
            class="w-[120px] h-[38px] mr-[15px]"
            @click-button="logOutUser"
            >{{ $t("log_out") }}</base-button
          >
        </div>
        <div v-else class="flex items-center justify-center">
          <base-button
            buttonClass="primary"
            class="w-[220px] h-[38px] mr-[15px]"
            @click-button="openSignUpModal"
            >{{ $t("sign_up") }}</base-button
          >

          <base-button
            class="w-[120px] h-[38px]"
            buttonClass="google"
            @click-button="openLogInModal"
          >
            {{ $t("log_in") }}</base-button
          >
        </div>
      </div>
    </nav>
    <header class="mt-[344px] flex flex-col items-center justify-center">
      <p
        class="flex flex-col items-center justify-center text-6xl text-[#DDCCAA] font-bold"
      >
        {{ $t("find_any_quote") }} <br />
        <span class="mt-[10px]">{{ $t("from_million_movies") }}</span>
      </p>
      <base-button
        v-if="!user"
        buttonClass="primary"
        class="w-[133px] h-[38px] mr-[15px] mt-[30px]"
        @click-button="openLogInModal"
        >{{ $t("get_started") }}</base-button
      >
    </header>
    <div class="mt-[200px]">
      <div class="w-full">
        <p class="absolute mt-[400px] text-6xl text-white bg-transparent">
          “You have to leave somethig behind to go forward”
        </p>
      </div>
      <img :src="InterstellarBackground" alt="intersetellar" />
    </div>
  </div>
</template>

<script>
import { setLocale } from "@vee-validate/i18n";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/user/index";
import axios from "@/config/axios/index";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import InterstellarBackground from "@/assets/images/InterstellarBackground.jpg";

export default {
  components: { BaseButton, InterstellarBackground },
  setup() {
    const authStore = useAuthStore();
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
        window.location.reload();
      } catch (error) {
        throw new Error(error.message);
      } 
    };
    return {
      setLocale,
      openSignUpModal,
      openLogInModal,
      InterstellarBackground,
      user: authStore.$state.user,
      logOutUser,
    };
  },
};
</script>
