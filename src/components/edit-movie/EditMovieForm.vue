<template>
  <Form v-if="movie" @submit="updateMovie">
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
      :image="movie?.image"
    ></upload-file-input>

    <p v-if="errors" class="text-red-500 ml-4">{{ errors }}</p>
    <base-button class="mt-[40px]" buttonClass="primary">{{
      $t("add_movie")
    }}</base-button>
  </Form>
</template>

<script>
import AddMovieInput from "@/components/UI/inputs/AddMovieInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { getLocale } from "@/config/helpers/index";

import axios from "@/config/axios/index";

import { Form, useForm, Field } from "vee-validate";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import UploadFileInput from "@/components/UI/inputs/UploadFileInput.vue";
import AddMovieCaategoriesInput from "@/components/add-movie/AddMovieCaategoriesInput.vue";
import { useRoute } from "vue-router";

export default {
  components: {
    AddMovieInput,
    BaseButton,
    Form,
    Field,
    UploadFileInput,
    AddMovieCaategoriesInput,
  },
  setup() {
    const formData = new FormData();
    const errorMessage = ref(null);
    const movie = ref(null);
    const { handleSubmit } = useForm();
    const route = useRoute();
    const locale = getLocale();

    const setInputValue = ({ key, value }) => {
      formData.set(key, value);
    };

    const uploadImage = (file) => {
      formData.set("image", file);
    };

    const updateMovie = handleSubmit(async () => {
      formData.append("_method", "patch");
      try {
        const response = await axios.post(
          `movies/${route.params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (response.status !== 200) {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        errorMessage.value = error.response.data.message;
      }
    });

    const setCategories = (selectedCategories) => {
      const categoryIds = selectedCategories.map((category) => category.id);
      formData.set("genres", JSON.stringify(categoryIds));
    };

    const fetchMovie = async () => {
      try {
        const response = await axios.get(`movies/${route.params.id}`);
        movie.value = response.data.movie;
        Object.keys(response.data.movie).forEach((key) => {
          if (key === "genres") {
            return formData.set(
              key,
              JSON.stringify(response.data.movie[key].map((genre) => genre.id))
            );
          }
          return formData.set(key, JSON.stringify(response.data.movie[key]));
        });
      } catch (error) {
        //
      }
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
