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
import { onMounted, ref } from "vue";
import MoviesListNav from "@/components/movies-list/MoviesListNav.vue";
import MoviesListMovieCard from "@/components/movies-list/MoviesListMovieCard.vue";

export default {
  components: {
    AuthorizedUserLayout,
    MoviesListNav,
    MoviesListMovieCard,
  },
  setup() {
    const movies = ref([]);

    onMounted(() => {
      const fetchMovies = async () => {
        try {
          const response = await axios.get("movies");
          movies.value = response.data.movies;
          if (response.status !== 200) {
            throw new Error("Request failed with status " + response.status);
          }
        } catch (error) {
          //
        }
      };

      fetchMovies();
    });
    return {
      movies,
    };
  },
};
</script>
