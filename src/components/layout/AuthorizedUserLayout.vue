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
        <icon-search
          class="translate-x-[100%] md:hidden lg:hidden"
          @click="openSearch"
        ></icon-search>
        <div
          class="flex translate-x-[100%] md:translate-x-[0px] lg:translate-x-[0px] cursor-pointer"
          @click="openNotifications"
        >
          <icon-notification ></icon-notification>
          <span
            class="flex items-center justify-center text-white -translate-x-[90%] -translate-y-[10%] bg-[#E33812] rounded-full w-[20px] h-[20px]"
          >
            {{ displayNewNotificationsLength }}
          </span>
        </div>
        <div
          v-if="isNotificationsOpen"
          class="w-full h-screen bg-black fixed z-[90] top-[0px] left-[0px] opacity-60"
          @click="openNotifications"
        ></div>

        <div
          v-if="isNotificationsOpen"
          class="absolute top-[80px] md:w-[50%] lg:w-[50%] w-full right-[5%] left-[0px] md:left-auto lg:left-auto z-[100] bg-[#11101A] opacity-100"
        >
          <div class="p-4 z-[100]">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="md:flex lg:flex p-4 border border-[#6C757D] justify-between"
              @click="handleNotificationClick(notification)"
            >
              <div class="flex">
                <img
                  :src="notification.notification_sender.thumbnail"
                  class="-[60px] h-[60px] rounded-full border-4 border-solid mx-4"
                  :class="
                    !notification.has_user_seen ? ' border-green-600' : ''
                  "
                />
                <div>
                  <p class="text-white">
                    {{ notification.notification_sender.username }}
                  </p>
                  <p
                    v-if="notification.type === 'comment'"
                    class="break-words text-white flex items-center mt-2 md:text-normal lg:text-normal text-[14px]"
                  >
                    <icon-comments
                      class=" h-[20px] mr-2"
                    ></icon-comments>
             
                    {{ $t("commented_to_your_movie_quote") }}
               
                  </p>
                  <p v-else class="text-white flex items-center mt-2">
                    <icon-likes
                      :is-selected="true"
                      class="w-[20px] h-[20px] mr-2"
                    ></icon-likes>
                    {{ $t("reacted_to_your_quote") }}
                  </p>
                </div>
              </div>

              <div>
                <p class="text-white">
                  {{ displayDate(notification.created_at, notification.id) }}
                </p>

                <p
                  v-if="!notification.has_user_seen"
                  class="text-white float-right -translate-y-[25px] md:-translate-y-[0px] lg:-translate-y-[0px]"
                >
                  {{ $t("new") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <language-switch class="mb-[20px]"></language-switch>
        <base-button
          button-class="google"
          class="mb-[17px] hidden md:block lg:block"
          @click="logOutUser"
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
          <router-link
            :to="{ name: 'news-feed' }"
            class="text-white text-2xl ml-[32px]"
            >{{ $t("news_feed") }}</router-link
          >
        </div>
        <div class="flex iems-center mt-[40px]">
          <icon-list-of-movies
            :color="displayIconBackground('movies')"
            class="ml-[15px]"
          ></icon-list-of-movies>
          <router-link
            :to="{ name: 'movies' }"
            class="text-white text-2xl ml-[32px]"
            >{{ $t("list_of_movies") }}</router-link
          >
        </div>
      </div>
      <div
        class="flex grow flex-col md:mx-[10%] lg:mx-[10%] justify-center"
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
import IconSearch from "@/components/icons/IconSearch.vue";

import { useUserStore } from "@/stores/user/index";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { displayImage } from "@/config/helpers";
import { useI18n } from 'vue-i18n';


import axios from "@/config/axios/index";

import instantiatePusher from "@/config/helpers/instantiatePusher.js";
import IconComments from "@/components/icons/IconComments.vue";
import IconLikes from "../icons/IconLikes.vue";

export default {
  components: {
    LanguageSwitch,
    BaseButton,
    IconNotification,
    IconListOfMovies,
    IconNewsFeed,
    IconMobileNavbarMenu,
    IconComments,
    IconLikes,
    IconSearch,
  },

  setup() {
    const displayNavbar = ref(false);
    const isMobile = ref(false);
    const userStore = useUserStore();
    const route = useRoute();
    const isNotificationsOpen = ref(false);
    const notifications = ref([]);
    const router = useRouter();
    const { t } = useI18n();

    onMounted(async () => {
      instantiatePusher();

      window.Echo.private(`feedback-${userStore.getUser?.id}`).listen(
        "UserFeedBack",
        (dat) => {
          notifications.value.unshift(dat.message.notification);
        }
      );

      const response = await axios.get("notifications");

      notifications.value = response.data.notifications;
    });

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

    const displayUsername = computed(() => userStore.getUser?.username);

    const hideNavbar = computed(() => (displayNavbar.value ? "hidden" : ""));

    const displayScreenNavbar = computed(
      () => displayNavbar.value || !isMobile.value
    );

    const displayIconBackground = computed(
      () => (name) => route.fullPath.includes(name) ? "#E31221" : "white"
    );

    const openNotifications = () => {
      isNotificationsOpen.value = !isNotificationsOpen.value;
    };

    const displayDate = computed(() => (time) => {
      const currentTime = new Date();
      const pastTime = new Date(time);
      const timeDifference = Math.round((currentTime - pastTime) / 60000);

      if (timeDifference < 60) {
        return timeDifference +" " + t('minutes_ago');
      } else if (timeDifference < 1440) {
        const hours = Math.floor(timeDifference / 60);
        return hours + " " + t('hours_ago');
      } else if (timeDifference < 10080) {
        const days = Math.floor(timeDifference / 1440);
        return days + " " + t('days_ago');
      } else if (timeDifference < 43200) {
        const weeks = Math.floor(timeDifference / 10080);
        return weeks + " " + t('weeks_ago');
      } else if (timeDifference < 525600) {
        const months = Math.floor(timeDifference / 43200);
        return months + " " + t('monts_ago');
      } else {
        const years = Math.floor(timeDifference / 525600);
        return years + " " + t('years_ago');
      }
    });

    const handleNotificationClick = async (notification) => {
      const formData = new FormData();
      formData.set("id", notification.id);
      formData.append("_method", "patch");

      try {
        await axios.post("notifications", formData);
        notification.has_user_seen = true;
        router.push({name: 'view-quote', params: {quoteId: notification.quote.quote_id, id: notification.quote.movie_id}})
      } catch (error) {
        //
      }
    };

    const displayNewNotificationsLength = computed(
      () =>
        notifications.value.filter(
          (notification) => notification.has_user_seen == 0
        ).length
    );

    const logOutUser = async () => {
      try {
        await axios.get("logout");
        userStore.setAuth(false);
        router.push({name: 'main'})
      } catch (error) {
        throw new Error(error);
      }
    };

    const openSearch = () => {
      router.push({
        name: "news-feed",
        query: {
          openSearch: true,
        },
      });
    };

    return {
      displayNavbar,
      toggleNavbar,
      isMobile,
      displayImage,
      username: displayUsername,
      hideNavbar,
      displayScreenNavbar,
      displayIconBackground,
      openNotifications,
      isNotificationsOpen,
      notifications,
      displayDate,
      displayNewNotificationsLength,
      handleNotificationClick,
      logOutUser,
      openSearch,
    };
  },
};
</script>
