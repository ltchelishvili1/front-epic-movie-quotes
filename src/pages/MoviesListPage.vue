<template>
  <authorized-user-layout>
    <router-view></router-view>
    <load-spinner
      v-if="isLoading"
      class="absolute top-0 left-0"
      classes="h-[100px] w-[100px]"
    ></load-spinner>

    <div v-else>
      <movies-list-nav :length="movies?.length"></movies-list-nav>
      <div
        v-if="movies?.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-[50px]"
      >
        <div v-for="movie in movies" :key="movie.id">
          <movies-list-movie-card :movie="movie"></movies-list-movie-card>
        </div>
      </div>
      <div
        v-else
        class="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
      >
        <div class="flex flex-col items-center justify-center">
          <icon-not-found></icon-not-found>
          <icon-eclipse></icon-eclipse>
          <h1 class="text-white mt-8 italic">{{ $t("not_added_yet") }}</h1>
        </div>
      </div>
    </div>
  </authorized-user-layout>
</template>
<script>
import AuthorizedUserLayout from "@/components/layout/AuthorizedUserLayout.vue";

import { computed, onMounted, ref } from "vue";
import IconNotFound from "@/components/icons/IconNotFound.vue";
import IconEclipse from "@/components/icons/IconEclipse.vue";
import MoviesListNav from "@/components/movies-list/MoviesListNav.vue";
import MoviesListMovieCard from "@/components/movies-list/MoviesListMovieCard.vue";
import { useMovieStore } from "@/stores/movie/index";
import LoadSpinner from "@/components/LoadSpinner.vue";
import { useUserStore } from "@/stores/user/index";

export default {
  components: {
    AuthorizedUserLayout,
    MoviesListNav,
    MoviesListMovieCard,
    LoadSpinner,
    IconNotFound,
    IconEclipse,
  },
  setup() {
    const movieStore = useMovieStore();
    const isLoading = ref(false);
    const userStore = useUserStore();

    onMounted(async () => {
      isLoading.value = true;
      await movieStore.fetchMovies();
      isLoading.value = false;
    });

    const movies = computed(
      () =>
        movieStore.movies &&
        movieStore?.movies.filter(
          (movie) => movie.author_id == userStore.user.id
        )
    );

    return {
      movies,
      isLoading,
    };
  },
};
</script>
