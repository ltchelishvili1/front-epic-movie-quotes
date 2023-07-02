<template>
  <vee-validate-form v-slot="{ meta }" @submit="addMovie">
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
    <base-button
      :disabled="!meta.valid || categoryIds.length === 0"
      class="mt-[40px]"
      button-class="primary"
    >
      <span v-if="!isLoading"> {{ $t("add_movie") }}</span>
      <load-spinner v-else classes="h-[25px] w-[25px]"></load-spinner>
    </base-button>
  </vee-validate-form>
</template>

<script>
import AddMovieInput from "@/components/UI/inputs/AddMovieInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";

import { Form, useForm } from "vee-validate";
import { ref } from "vue";
import UploadFileInput from "@/components/UI/inputs/UploadFileInput.vue";
import AddMovieCaategoriesInput from "@/components/add-movie/AddMovieCaategoriesInput.vue";
import { useMovieStore } from "@/stores/movie/index";
import { useRouter } from "vue-router";
import LoadSpinner from '@/components/LoadSpinner.vue';

export default {
  components: {
    AddMovieInput,
    BaseButton,
    VeeValidateForm: Form,
    UploadFileInput,
    AddMovieCaategoriesInput,
    LoadSpinner
  },
  setup() {
  
    let categoryIds = ref([]);
    const formData = new FormData();
    const errorMessage = ref(null);
    const router = useRouter();
    const { handleSubmit } = useForm();
    const movieStore = useMovieStore();
    const isLoading = ref(false);

    const setInputValue = ({ key, value }) => {
      formData.set(key, value);
    };

    const uploadImage = (file) => {
      formData.set("thumbnail", file);
    };

    const addMovie = handleSubmit(async () => {
      isLoading.value = true;
      await movieStore.addMovie(formData);
      isLoading.value = false;
      errorMessage.value = movieStore?.getErrors;
      if (!movieStore.getErrors) {
        router.push({ name: "movies" });
      }
    });

    const setCategories = (selectedCategories) => {
      categoryIds.value = selectedCategories.map((category) => category.id);
      formData.set("genres", JSON.stringify(categoryIds.value));
    };

    return {
      setInputValue,
      uploadImage,
      setCategories,
      errors: errorMessage,
      addMovie,
      formData,
      categoryIds,
      isLoading,
    };
  },
};
</script>
