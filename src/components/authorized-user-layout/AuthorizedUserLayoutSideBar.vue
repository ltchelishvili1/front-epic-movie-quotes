<template>
  <div v-if="displayScreenNavbar" class="pl-[4.5rem] min-w-[22rem]">
    <div class="flex mt-[1.9rem]">
      <img
        class="mr-[1.25rem] w-[3.75rem] h-[3.75rem] rounded-full border-2 border-solid"
        :src="displayImage"
        :class="`border-[${displayIconBackground('update-profile')}]`"
      />
      <div>
        <h1 class="text-white">{{ username }}</h1>
        <router-link :to="{ name: 'update-profile' }" class="text-white">{{
          $t("edit_profile")
        }}</router-link>
      </div>
    </div>

    <div class="flex iems-center mt-[2.5rem]">
      <icon-news-feed
        :color="displayIconBackground('news-feed')"
        class="ml-[.9rem]"
      ></icon-news-feed>
      <router-link
        :to="{ name: 'news-feed' }"
        class="text-white text-2xl ml-[2rem]"
        >{{ $t("news_feed") }}</router-link
      >
    </div>
    <div class="flex iems-center mt-[2.5rem]">
      <icon-list-of-movies
        :color="displayIconBackground('movies')"
        class="ml-[.9rem]"
      ></icon-list-of-movies>
      <router-link
        :to="{ name: 'movies' }"
        class="text-white text-2xl ml-[2rem]"
        >{{ $t("list_of_movies") }}</router-link
      >

    </div>

    <div class="flex iems-center mt-[2.5rem]">
      <log-out-user mobile :is-loading="isLoading" @set-is-loading="setIsLoading"></log-out-user>
    
    </div>

  </div>
</template>

<script>
import { displayImage } from "@/config/helpers";
import IconNewsFeed from "@/components/icons/IconNewsFeed.vue";
import IconListOfMovies from "@/components/icons/IconListOfMovies.vue";
import { useUserStore } from "@/stores/user/index";
import LogOutUser from '@/components/LogOutUser.vue';


import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    IconNewsFeed,
    IconListOfMovies,
    LogOutUser
  },
  props: {
    displayScreenNavbar: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Object,
      default: () => {},
    },
  },
  emits: {
    "set-is-loading": (type, bool) =>
      typeof type === "string" && typeof bool == Boolean,
  },
  setup(_,{emit}) {
    const route = useRoute();
    const userStore = useUserStore();
    const displayUsername = computed(() => userStore.getUser?.username);

    const displayIconBackground = computed(
      () => (name) => route.fullPath.includes(name) ? "#E31221" : "white"
    );


    const setIsLoading = (type, bool) => {
      emit("set-is-loading", type, bool);
    }


    return {
      displayImage,
      username: displayUsername,
      displayIconBackground,
      setIsLoading
    };
  },
};
</script>
