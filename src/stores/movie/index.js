import { defineStore } from "pinia";

import axios from "@/config/axios/index";
import { useUserStore } from "@/stores/user/index";

export const useMovieStore = defineStore({
  id: "movie",
  state: () => ({
    movies: null,
    movie: null,
    quote: null,
    posts: null,
    errors: null,
  }),
  actions: {
    async fetchMovie(id) {
      try {
        const response = await axios.get(`movies/${id}`);
        this.movie = response.data.movie;
      } catch (error) {
        //
      }
    },
    async fetchMovies() {
      try {
        const response = await axios.get("movies");
        this.movies = response.data.movies;
        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        //
      }
    },

    async deleteMovie(id) {
      try {
        await axios.delete(`movies/${id}`);
      } catch (error) {
        //
      }
    },

    async deleteQuote(id) {
      this.movie.quotes = this.movie.quotes.filter((quote) => quote.id !== id);
      try {
        await axios.delete(`quotes/${id}`);
      } catch (error) {
        //
      }
    },

    async addMovie(formData) {
      const userStore = useUserStore();
      try {
        const response = await axios.post("movies", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        const movieToPush = {
          author_id: userStore.getUser.id,
          ...response.data.movie,
        };
        this.movies.push(movieToPush);

        console.log(this.movies);
        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        this.errors = error.response.data.message;
      }
    },

    async addQuote(formData) {
      try {
        const response = await axios.post("quotes", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        if (this?.movie?.quotes) {
          this.movie.quotes.unshift(response.data.quote);
        }
        if (response.status !== 201) {
          throw new Error("Request failed with status " + response.status);
        }

        return response;
      } catch (error) {
        this.errors = error.response.data.message;
      }
    },

    async editQuote(id, formData) {
      try {
        const response = await axios.post(`quotes/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        this.errors = error.response.data.message;
      }
    },

    async editMovie(id, formData) {
      try {
        const response = await axios.post(`movies/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        this.movie = response.data.movie;

        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        this.errors = error.response.data.message;
      }
    },

    async fetchMoviesForGenres(id, formData) {
      try {
        const response = await axios.get(`movies/${id}`);
        this.movie = response.data.movie;
        Object.keys(this.movie).forEach((key) => {
          if (key === "genres") {
            return formData.set(
              key,
              JSON.stringify(this.movie[key].map((genre) => genre.id))
            );
          }
          return formData.set(key, JSON.stringify(this.movie[key]));
        });
      } catch (error) {
        //
      }
    },
  },
  getters: {
    getMovie: (state) => state.movie,
    getMovies: (state) => state.movies,
    getQuote: (state) => state.quote,
    getErrors: (state) => state.errors,
  },
});
