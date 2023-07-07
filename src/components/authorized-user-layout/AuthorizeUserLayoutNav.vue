<template>
  <nav
    class="px-[4.5rem] h-[5.1rem] bg-[#22203099] flex items-center justify-between"
  >
    <router-link
      :to="{ name: 'news-feed' }"
      class="text-[#DDCCAA] hidden md:block lg:block"
    >
      {{ $t("movie_quotes") }}
    </router-link>
    <div>
      <icon-mobile-navbar-menu
        class="cursor-pointer md:hidden lg:hidden"
        @click="toggleNavbar"
      ></icon-mobile-navbar-menu>
    </div>
    <div class="flex items-center">
      <icon-search
        class="translate-x-[100%] md:hidden lg:hidden"
        @click="openSearch"
      ></icon-search>
      <div
        class="flex translate-x-[100%] md:translate-x-[0rem] lg:translate-x-[0rem] cursor-pointer"
        @click="openNotifications"
      >
        <icon-notification></icon-notification>
        <span
          class="flex items-center justify-center text-white -translate-x-[90%] -translate-y-[10%] bg-[#E33812] rounded-full w-[1.25rem] h-[1.25rem]"
        >
          <span v-if="!isLoading.not">
            {{ displayNewNotificationsLength }}
          </span>
          <load-spinner v-else classes="h-[.3rem] w-[.3rem]"></load-spinner>
        </span>
      </div>
      <div
        v-if="isNotificationsOpen"
        class="w-full h-screen bg-black fixed z-[90] top-[0rem] left-[0rem] opacity-60"
        @click="openNotifications"
      ></div>

      <div
        v-if="isNotificationsOpen"
        class="absolute top-[5rem] md:w-[50%] lg:w-[50%] w-full right-[5%] left-[0rem] rounded-lg md:left-auto lg:left-auto z-[100] bg-[#11101A] opacity-100"
      >
        <div v-if="notifications.length">
            <authorized-user-layout-notification-card
          :is-loading="isLoading"
          :notifications="notifications"
        ></authorized-user-layout-notification-card>
        </div>
        <div v-else>
            <div class="flex flex-col items-center justify-center p-20">
          <icon-not-found></icon-not-found>
          <icon-eclipse></icon-eclipse>
          <h1 class="text-white mt-8 italic">{{ $t('no_notifications_yet') }}</h1>
        </div>
        </div>
      </div>

      <language-switch class="mb-[1.25rem]"></language-switch>
      <base-button
        button-class="google"
        class="mb-[1.1rem] hidden md:block lg:block"
        @click="logOutUser"
      >
        <span v-if="!isLoading.lOut">{{ $t("log_out") }}</span>

        <load-spinner v-else classes="h-[1,9rem] w-[1.9rem]"></load-spinner>
      </base-button>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";

import IconNotFound from "@/components/icons/IconNotFound.vue";
import IconEclipse from "@/components/icons/IconEclipse.vue";
import IconMobileNavbarMenu from "@/components/icons/IconMobileNavbarMenu.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconNotification from "@/components/icons/IconNotification.vue";
import AuthorizedUserLayoutNotificationCard from "@/components/authorized-user-layout/AuthorizedUserLayoutNotificationCard.vue";
import LanguageSwitch from "@/components/LanguageSwitch.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios/index";
import { useUserStore } from "@/stores/user/index";

export default {
  components: {
    IconMobileNavbarMenu,
    IconSearch,
    IconNotification,
    AuthorizedUserLayoutNotificationCard,
    LanguageSwitch,
    LoadSpinner,
    BaseButton,
    IconEclipse,
    IconNotFound
  },
  props: {
    displayNewNotificationsLength: {
      type: Number,
      default: 0,
    },
    notifications: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Object,
      default: () => {},
    },
  },
  emits: {
    "toggle-navbar": null,
    "set-is-loading": (type, bool) =>
      typeof type === "string" && typeof bool == Boolean,
  },
  setup(_, { emit }) {
    const router = useRouter();
    const isNotificationsOpen = ref(false);
    const userStore = useUserStore();
    const toggleNavbar = () => {
      emit("toggle-navbar");
    };

    const openSearch = () => {
      router.push({
        name: "news-feed",
        query: {
          openSearch: true,
        },
      });
    };

    const openNotifications = () => {
      isNotificationsOpen.value = !isNotificationsOpen.value;
    };

    const logOutUser = async () => {
      localStorage.clear()
      try {
        emit("set-is-loading", "lOut", true);
        await axios.get("logout");
        emit("set-is-loading", "lOut", false);
        userStore.setAuth(false);
        router.push({ name: "main" });
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      toggleNavbar,
      openSearch,
      openNotifications,
      isNotificationsOpen,
      logOutUser,
    };
  },
};
</script>
