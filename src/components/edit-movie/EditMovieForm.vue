<template>
  <section>
    <load-spinner
      v-if="isLoading.movies"
      classes="w-[100px] h-[100px]"
    ></load-spinner>
    <vee-validate-form v-else @submit="updateMovie">
      <add-movie-input
        title="Movie Name"
        name="title_en"
        rules="required|min:3|lcase"
        lang="Eng"
        :value="movie?.title['en']"
        @set-input-value="setInputValue"
      ></add-movie-input>
      <add-movie-input
        title="ფილმის სახელი"
        name="title_ka"
        rules="required|min:3|geo"
        lang="ქარ"
        :value="movie?.title['ka']"
        @set-input-value="setInputValue"
      ></add-movie-input>

      <add-movie-caategories-input
        :value="selectedGenres(locale)"
        @set-categories="setCategories"
      ></add-movie-caategories-input>

      <add-movie-input
        title="წელი/Year"
        name="release_year"
        rules="required"
        type="number"
        :value="movie?.release_year"
        @set-input-value="setInputValue"
      ></add-movie-input>
      <add-movie-input
        title="Director"
        name="director_en"
        rules="required|min:3|lcase"
        lang="Eng"
        :value="movie?.director['en']"
        @set-input-value="setInputValue"
      ></add-movie-input>
      <add-movie-input
        title="რეჟისორი"
        name="director_ka"
        rules="required|min:3|geo"
        :value="movie?.director['ka']"
        lang="ქარ"
        @set-input-value="setInputValue"
      ></add-movie-input>
      <add-movie-input
        title="Movie description"
        name="description_en"
        rules="required|min:3|lcase"
        :value="movie?.description['en']"
        lang="Eng"
        type="textarea"
        @set-input-value="setInputValue"
      ></add-movie-input>
      <add-movie-input
        title="აღწერა"
        name="description_ka"
        rules="required|min:3|geo"
        :value="movie?.description['ka']"
        type="textarea"
        lang="ქარ"
        @set-input-value="setInputValue"
      ></add-movie-input>

      <upload-file-input
        :image="movie?.thumbnail"
        rules=""
        @upload-image="uploadImage"
      ></upload-file-input>

      <p v-if="errors" class="text-red-500 ml-4">{{ errors }}</p>
      <base-button
        class="mt-[40px]"
        button-class="primary"
      >
        <span v-if="!isLoading.submit">
          {{ $t("add_movie") }}
        </span>
        <load-spinner v-else classes="h-[25px] w-[25px]"></load-spinner>
      </base-button>
    </vee-validate-form>
  </section>
</template>

<script>
import AddMovieInput from "@/components/UI/inputs/AddMovieInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { getLocale } from "@/config/helpers/index";

import { Form, useForm } from "vee-validate";
import { computed, onBeforeMount, ref } from "vue";
import UploadFileInput from "@/components/UI/inputs/UploadFileInput.vue";
import AddMovieCaategoriesInput from "@/components/add-movie/AddMovieCaategoriesInput.vue";
import { useRoute, useRouter } from "vue-router";
import { useMovieStore } from "@/stores/movie/index";
import LoadSpinner from "../LoadSpinner.vue";

export default {
  components: {
    AddMovieInput,
    BaseButton,
    VeeValidateForm: Form,
    UploadFileInput,
    AddMovieCaategoriesInput,
    LoadSpinner,
  },
  setup() {
    const TRANSLATABLES = ["title", "description", "director"];
    const formData = new FormData();
    const errorMessage = ref(null);
    const movie = computed(() => movieStore.getMovie);
    const { handleSubmit } = useForm();
    const route = useRoute();
    const locale = getLocale();
    const movieStore = useMovieStore();
    const router = useRouter();
    const isLoading = ref({
      submit: false,
      movies: false,
    });

    const setInputValue = ({ key, value }) => {
      if (TRANSLATABLES.includes(key.split("_")[0])) {
        movie.value[key.split("_")[0]][key.split("_")[1]] = value;
      } else {
        movie.value[key] = value;
        formData.set(key, value);
      }
    };

    const uploadImage = (file) => {
      formData.set("thumbnail", file);
    };

    const updateMovie = handleSubmit(async () => {
      formData.append("_method", "patch");
      TRANSLATABLES.forEach((key) => {
        formData.set(key + "_en", movie.value[key].en);
        formData.set(key + "_ka", movie.value[key].ka);
      });

      isLoading.value.submit = true;
      await movieStore.editMovie(route.params.id, formData);
      isLoading.value.submit = false;
      errorMessage.value = movieStore.getErrors;
      if (!movieStore.getErrors) {
        router.back();
      }
    });

    const setCategories = (selectedCategories) => {
      const categoryIds = selectedCategories.map((category) => category.id);
      formData.set("genres", JSON.stringify(categoryIds));
    };

    const fetchMovie = async () => {
      isLoading.value.movies = true;
      await movieStore.fetchMoviesForGenres(route.params.id, formData);
      isLoading.value.movies = false;
    };

    const selectedGenres = computed(() => (locale) => {
      return (
        movie.value.genres &&
        movie?.value?.genres.map((val) => {
          return {
            value: val?.name[locale],
            id: val.id,
          };
        })
      );
    });

    onBeforeMount(fetchMovie);

    return {
      setInputValue,
      uploadImage,
      setCategories,
      errors: errorMessage,
      updateMovie,
      movie,
      selectedGenres,
      locale,
      isLoading,
    };
  },
};
</script>
