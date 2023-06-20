<template>
  <section class="bg-auth-dark min-h-screen">
    <nav
      class="px-[70px] h-[82px] bg-[#22203099] flex items-center justify-between"
    >
      <p class="text-[#DDCCAA] hidden md:block lg:block">
        {{ $t("movie_quotes") }}
      </p>
      <div>
        <icon-mobile-navbar-menu
          class="cursor-pointer md:hidden lg:hidden"
          @click="toggleNavbar"
        ></icon-mobile-navbar-menu>
      </div>
      <div class="flex items-center">
        <div class="flex">
          <icon-notification></icon-notification>
          <span
            class="flex items-center justify-center text-white -translate-x-[90%] -translate-y-[10%] bg-[#E33812] rounded-full w-[20px] h-[20px]"
          >
            11</span
          >
        </div>
        <language-switch class="mb-[20px]"></language-switch>
        <base-button
          buttonClass="google"
          class="mb-[17px] hidden md:block lg:block"
          >{{ $t("log_out") }}</base-button
        >
      </div>
    </nav>

    <div class="flex">
      <div v-if="displayScreenNavbar" class="pl-[70px] min-w-[350px]">
        <div class="flex mt-[30px]">
          <img
            class="mr-[20px] w-[60px] h-[60px] rounded-full border-2 border-solid border-[#E31221]"
            :src="displayImage"
          />
          <div>
            <h1 class="text-white">{{ username }}</h1>
            <router-link :to="{ name: 'update-profile' }" class="text-white">{{
              $t("edit_profile")
            }}</router-link>
          </div>
        </div>

        <div class="flex iems-center mt-[40px]">
          <icon-news-feed
            :color="displayIconBackground('news-feed')"
            class="ml-[15px]"
          ></icon-news-feed>
          <router-link :to="{name: 'news-feed'}" class="text-white text-2xl ml-[32px]">{{
            $t("news_feed")
          }}</router-link>
        </div>
        <div class="flex iems-center mt-[40px]">
          <icon-list-of-movies
            :color="displayIconBackground('movies')"
            class="ml-[15px]"
          ></icon-list-of-movies>
          <router-link :to="{name: 'movies'}" class="text-white text-2xl ml-[32px]">{{
            $t("list_of_movies")
          }}</router-link>
        </div>
      </div>
      <div
        class="flex grow flex-col mx-[10%] justify-center"
        :class="hideNavbar"
      >
        <slot></slot>
      </div>
    </div>
  </section>
</template>
<script>
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import IconNotification from "@/components/icons/IconNotification.vue";
import IconListOfMovies from "@/components/icons/IconListOfMovies.vue";
import IconNewsFeed from "@/components/icons/IconNewsFeed.vue";
import IconMobileNavbarMenu from "@/components/icons/IconMobileNavbarMenu.vue";

import { useUserStore } from "@/stores/user/index";
import { computed, onBeforeUnmount, ref } from "vue";
import { useRoute } from "vue-router";
import { displayImage } from "@/config/helpers";

export default {
  components: {
    LanguageSwitch,
    BaseButton,
    IconNotification,
    IconListOfMovies,
    IconNewsFeed,
    IconMobileNavbarMenu,
  },

  setup() {
    const displayNavbar = ref(false);
    const isMobile = ref(false);
    const userStore = useUserStore();
    const route = useRoute();

    const toggleNavbar = () => {
      displayNavbar.value = !displayNavbar.value;
    };

    const updateScreen = () => {
      isMobile.value = window.matchMedia("(max-width: 768px)").matches;
    };

    updateScreen();

    window.addEventListener("resize", updateScreen);

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateScreen);
    });

    const displayUsername = computed(() => userStore.getUser.username);

    const hideNavbar = computed(() => (displayNavbar.value ? "hidden" : ""));

    const displayScreenNavbar = computed(
      () => displayNavbar.value || !isMobile.value
    );

    const displayIconBackground = computed(
      () => (name) => route.fullPath.includes(name) ? "#E31221" : "white"
    );
    return {
      displayNavbar,
      toggleNavbar,
      isMobile,
      displayImage,
      username: displayUsername,
      hideNavbar,
      displayScreenNavbar,
      displayIconBackground,
    };
  },
};
</script>