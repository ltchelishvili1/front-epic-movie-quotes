<template>
  <authorized-user-layout>
    <router-view></router-view>

    <movies-list-nav :length="movies?.length"></movies-list-nav>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-[50px]"
    >
      <div v-for="movie in movies" :key="movie.id">
        <movies-list-movie-card :movie="movie"></movies-list-movie-card>
      </div>
    </div>
  </authorized-user-layout>
</template>
<script>
import AuthorizedUserLayout from "@/components/layout/AuthorizedUserLayout.vue";

import axios from "@/config/axios/index";
import { computed, onMounted, ref } from "vue";
import MoviesListNav from "@/components/movies-list/MoviesListNav.vue";
import MoviesListMovieCard from "@/components/movies-list/MoviesListMovieCard.vue";
import { useMovieStore } from "@/stores/movie/index";

export default {
  components: {
    AuthorizedUserLayout,
    MoviesListNav,
    MoviesListMovieCard,
  },
  setup() {
    const movieStore = useMovieStore();

    onMounted(async () => {
      await movieStore.fetchMovies();
    });

    const movies = computed(() => movieStore?.getMovies);

    return {
      movies,
    };
  },
};
</script>
