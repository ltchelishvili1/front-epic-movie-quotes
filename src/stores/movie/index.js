import { defineStore } from "pinia";
import axios from "@/config/axios/index";

export const useMoviesStore = defineStore({
  id: "movie",
  state: () => ({
    movie: null,
    movies: null,
  }),
  actions: {
    getMovies() {
      axios.get("movies").then((response) => {
        this.movies = response.data;
      });
    },
    async getMovie(id) {
      try {
        const response = await axios.get(`movies/${id}`);
        this.movie = response.data.movie;
      } catch (error) {
        //
      }
    },
  },
});
