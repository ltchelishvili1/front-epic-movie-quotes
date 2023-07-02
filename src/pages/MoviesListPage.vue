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
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-[50px]"
      >
        <div v-for="movie in movies" :key="movie.id">
          <movies-list-movie-card :movie="movie"></movies-list-movie-card>
        </div>
      </div>
    </div>
  </authorized-user-layout>
</template>
<script>
import AuthorizedUserLayout from "@/components/layout/AuthorizedUserLayout.vue";

import { computed, onMounted, ref } from "vue";
import MoviesListNav from "@/components/movies-list/MoviesListNav.vue";
import MoviesListMovieCard from "@/components/movies-list/MoviesListMovieCard.vue";
import { useMovieStore } from "@/stores/movie/index";
import LoadSpinner from "@/components/LoadSpinner.vue";

export default {
  components: {
    AuthorizedUserLayout,
    MoviesListNav,
    MoviesListMovieCard,
    LoadSpinner,
  },
  setup() {
    const movieStore = useMovieStore();
    const isLoading = ref(false);

    onMounted(async () => {
      isLoading.value = true;
      await movieStore.fetchMovies();
      isLoading.value = false;
    });

    const movies = computed(() => movieStore?.getMovies);

    return {
      movies,
      isLoading,
    };
  },
};
</script>
