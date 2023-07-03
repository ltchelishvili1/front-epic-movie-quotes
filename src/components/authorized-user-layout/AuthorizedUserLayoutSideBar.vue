<template>
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
</template>

<script>
import { displayImage } from "@/config/helpers";
import IconNewsFeed from "@/components/icons/IconNewsFeed.vue";
import IconListOfMovies from "@/components/icons/IconListOfMovies.vue";
import { useUserStore } from "@/stores/user/index";

import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    components:{
        IconNewsFeed,
        IconListOfMovies,
    },
    props:{
        displayScreenNavbar: {
            type: Boolean,
            default: false
        }
    },
    setup(){
        const route = useRoute()
        const userStore = useUserStore();
        const displayUsername = computed(() => userStore.getUser?.username);


    const displayIconBackground = computed(
      () => (name) => route.fullPath.includes(name) ? "#E31221" : "white"
    );

        return{
            displayImage,
            username: displayUsername,
            displayIconBackground
        }
    }
}
</script>
