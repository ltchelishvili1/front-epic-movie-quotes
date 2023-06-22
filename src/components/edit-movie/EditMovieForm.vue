<template>
  <vee-validate-form v-if="movie" @submit="updateMovie">
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
      @set-categories="setCategories"
      :value="selectedGenres(locale)"
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
      @upload-image="uploadImage"
      :image="movie?.thumbnail"
    ></upload-file-input>

    <p v-if="errors" class="text-red-500 ml-4">{{ errors }}</p>
    <base-button class="mt-[40px]" buttonClass="primary">{{
      $t("add_movie")
    }}</base-button>
  </vee-validate-form>
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

export default {
  components: {
    AddMovieInput,
    BaseButton,
    VeeValidateForm: Form,

    UploadFileInput,
    AddMovieCaategoriesInput,
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

      await movieStore.editMovie(route.params.id, formData);
      router.back();
    });

    const setCategories = (selectedCategories) => {
      const categoryIds = selectedCategories.map((category) => category.id);
      formData.set("genres", JSON.stringify(categoryIds));
    };

    const fetchMovie = async () => {
      await movieStore.fetchMoviesForGenres(route.params.id, formData);
    };

    const selectedGenres = computed(() => (locale) => {
      return movie?.value?.genres.map((val) => {
        return {
          value: val?.name[locale],
          id: val.id,
        };
      });
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
    };
  },
};
</script>
