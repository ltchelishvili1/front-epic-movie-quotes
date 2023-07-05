<template>
  <section>
    <vee-validate-form v-slot="{ meta }" @submit="addQuote">
      <add-movie-input
        title='"Quote in English."'
        name="quote_en"
        rules="required|min:3|lcase"
        lang="Eng"
        type="textarea"
        @set-input-value="setInputValue"
      ></add-movie-input>
      <add-movie-input
        title="“ციტატა ქართულ ენაზე”"
        name="quote_ka"
        rules="required|min:3|geo"
        type="textarea"
        lang="ქარ"
        @set-input-value="setInputValue"
      ></add-movie-input>

      <upload-file-input @upload-image="uploadImage"></upload-file-input>
      <div v-if="!route.params.id" class="flex relative">
        <icon-list-of-movies
          class="absolute mt-[50px] ml-[10px]"
        ></icon-list-of-movies>

        <select
          id=""
          class="w-full mt-[28px] h-[86px] bg-[#000000] text-white px-[50px]"
          as="select"
          name="movie_id"
          @change="selectMovieId"
        >
          <option selected disabled>{{ $t("choose_movie") }}</option>
          <option v-for="movie in movies" :key="movie" :value="movie?.id">
            {{ movie?.title[locale] }}
          </option>
        </select>
        <load-spinner
          v-if="isLoading.movies"
          class="absolute translate-y-[12px]"
          classes="w-[25px] h-[25px]"
        ></load-spinner>
      </div>

      <p v-if="errors" class="text-red-500 ml-4">{{ errors }}</p>
      <base-button
        :disabled="!meta.valid"
        class="mt-[40px]"
        button-class="primary"
        :class="!meta.valid ? 'opacity-30' : ''"
      >
        <span v-if="!isLoading.submit"> {{ $t("add_quote") }}</span>
        <load-spinner v-else classes="w-[25px] h-[25px]"></load-spinner>
      </base-button>
    </vee-validate-form>
  </section>
</template>

<script>
import AddMovieInput from "@/components/UI/inputs/AddMovieInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { getLocale } from "@/config/helpers/index";

import axios from "@/config/axios/index";

import { Form, useForm } from "vee-validate";
import {  onMounted, ref } from "vue";
import UploadFileInput from "@/components/UI/inputs/UploadFileInput.vue";
import IconListOfMovies from "@/components/icons/IconListOfMovies.vue";
import { useMovieStore } from "@/stores/movie/index";
import { useRoute, useRouter } from "vue-router";
import LoadSpinner from "@/components/LoadSpinner.vue";

export default {
  components: {
    AddMovieInput,
    BaseButton,
    VeeValidateForm: Form,
    UploadFileInput,
    IconListOfMovies,
    LoadSpinner,
  },
  setup() {
    const formData = new FormData();
    const movies = ref([]);
    const router = useRouter();

    const errorMessage = ref(null);
    const { handleSubmit } = useForm();
    const route = useRoute();
    const locale = getLocale();
    const movieStore = useMovieStore();
    const isLoading = ref({
      movies: false,
      submit: false,
    });

    const setInputValue = ({ key, value }) => {
      formData.set(key, value);
    };

    const uploadImage = (file) => {
      formData.set("image", file);
    };

    const addQuote = handleSubmit(async () => {
      if (route.params.id) {
        formData.set("movie_id", route.params.id);
      }

      isLoading.value.submit = true;
      const response = await movieStore.addQuote(formData);
      isLoading.value.submit = false;
      errorMessage.value = movieStore.getErrors;
      if (!movieStore.getErrors) {
        router.push({
          name: "view-quote",
          params: {
            id: response.data.quote.movie.id,
            quoteId: response.data.quote.id,
          },
        });
      }
    });


    onMounted(async () =>{
      if (!route.params.id) {
        isLoading.value.movies = true;
        try {
          const response = await axios.get("movies", {
            params: {
              getAllMovies: true,
            },
          });
          movies.value = response.data.movies.map((movie) => {
            return { title: movie.title, id: movie.id };
          });
        } catch (error) {
          errorMessage.value = error.response.data.message;
        } finally {
          isLoading.value.movies = false;
        }
      }

    })



    const selectMovieId = (e) => {
      formData.set("movie_id", e.target.value);
    };

    return {
      setInputValue,
      uploadImage,
      errors: errorMessage,
      locale,
      addQuote,
      movies,
      route,
      selectMovieId,
      isLoading,
    };
  },
};
</script>

<style scoped>
.selecttxt {
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
</style>
