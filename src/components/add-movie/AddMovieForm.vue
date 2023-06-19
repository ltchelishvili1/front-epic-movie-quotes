<template>
  <Form @submit="addMovie">
    <add-movie-input
      title="Movie Name"
      name="title_en"
      rules="required|min:3|lcase"
      lang="Eng"
      @set-input-value="setInputValue"
    ></add-movie-input>
    <add-movie-input
      title="ფილმის სახელი"
      name="title_ka"
      rules="required|min:3|geo"
      lang="ქარ"
      @set-input-value="setInputValue"
    ></add-movie-input>

    <add-movie-caategories-input
      @set-categories="setCategories"
    ></add-movie-caategories-input>

    <add-movie-input
      title="წელი/Year"
      name="release_year"
      rules="required"
      type="number"
      @set-input-value="setInputValue"
    ></add-movie-input>
    <add-movie-input
      title="Director"
      name="director_en"
      rules="required|min:3|lcase"
      lang="Eng"
      @set-input-value="setInputValue"
    ></add-movie-input>
    <add-movie-input
      title="რეჟისორი"
      name="director_ka"
      rules="required|min:3|geo"
      lang="ქარ"
      @set-input-value="setInputValue"
    ></add-movie-input>
    <add-movie-input
      title="Movie description"
      name="description_en"
      rules="required|min:3|lcase"
      lang="Eng"
      type="textarea"
      @set-input-value="setInputValue"
    ></add-movie-input>
    <add-movie-input
      title="აღწერა"
      name="description_ka"
      rules="required|min:3|geo"
      type="textarea"
      lang="ქარ"
      @set-input-value="setInputValue"
    ></add-movie-input>

    <upload-file-input @upload-image="uploadImage"></upload-file-input>

    <p v-if="errors" class="text-red-500 ml-4">{{ errors }}</p>
    <base-button class="mt-[40px]" buttonClass="primary">{{
      $t("add_movie")
    }}</base-button>
  </Form>
</template>

<script>
import AddMovieInput from "@/components/UI/inputs/AddMovieInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";

import axios from "@/config/axios/index";

import { Form, useForm, Field } from "vee-validate";
import { ref } from "vue";
import UploadFileInput from "@/components/UI/inputs/UploadFileInput.vue";
import AddMovieCaategoriesInput from "@/components/add-movie/AddMovieCaategoriesInput.vue";

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
    const { handleSubmit } = useForm();

    const setInputValue = ({ key, value }) => {
      formData.set(key, value);

    };

    const uploadImage = (file) => {
      formData.set("thumbnail", file);
    };

    const addMovie = handleSubmit(async () => {
      try {
        const response = await axios.post("movies", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

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

    return {
      setInputValue,
      uploadImage,
      setCategories,
      errors: errorMessage,
      addMovie,
    };
  },
};
</script>
