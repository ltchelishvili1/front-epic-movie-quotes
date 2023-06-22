<template>
  <vee-validate-form @submit="addQuote">
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
    <div class="flex">
      <icon-list-of-movies
        class="absolute mt-[50px] ml-[10px]"
      ></icon-list-of-movies>
      <select
        @change="selectMovieId"
        v-if="!route.params.id"
        class="w-full mt-[28px] h-[86px] bg-[#000000] text-white px-[50px]"
        id=""
        as="select"
        name="movie_id"
      >
        <option selected disabled>{{ $t("choose_movie") }}</option>
        <option v-for="movie in movies" :key="movie" :value="movie?.id">
          {{ movie?.title[locale] }}
        </option>
      </select>
    </div>

    <p v-if="errors" class="text-red-500 ml-4">{{ errors }}</p>
    <base-button class="mt-[40px]" buttonClass="primary">{{
      $t("add_quote")
    }}</base-button>
  </vee-validate-form>
</template>

<script>
import AddMovieInput from "@/components/UI/inputs/AddMovieInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { getLocale } from "@/config/helpers/index";

import axios from "@/config/axios/index";

import { Form, useForm } from "vee-validate";
import { onMounted, ref } from "vue";
import UploadFileInput from "@/components/UI/inputs/UploadFileInput.vue";
import IconListOfMovies from "@/components/icons/IconListOfMovies.vue";
import { useMovieStore } from "@/stores/movie/index";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    AddMovieInput,
    BaseButton,
    VeeValidateForm: Form,
    UploadFileInput,
    IconListOfMovies,
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

      await movieStore.addQuote(formData);
      router.back();
    });

    onMounted(() => {
      const fetchMovies = async () => {
        try {
          const response = await axios.get("movies");
          movies.value = response.data.movies.map((movie) => {
            return { title: movie.title, id: movie.id };
          });
        } catch (error) {
          errorMessage.value = error.response.data.message;
        }
      };

      if (!route.params.id) {
        fetchMovies();
      }
    });

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
