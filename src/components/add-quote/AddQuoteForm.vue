<template>
    <Form @submit="addQuote">
      <add-movie-input
        title='"Quote in English."'
        name="quote_en"
        rules="required|min:3|lcase"
        lang="Eng"
        type="textarea"
        @set-input-value="setInputValue"
      ></add-movie-input>
      <add-movie-input
        title='“ციტატა ქართულ ენაზე”'
        name="quote_ka"
        rules="required|min:3|geo"
        type="textarea"
        lang="ქარ"
        @set-input-value="setInputValue"
      ></add-movie-input>
  
      <upload-file-input
        @upload-image="uploadImage"
       
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
  import { ref } from "vue";
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
      const { handleSubmit } = useForm();
      const route = useRoute();
      const locale = getLocale();
  
      const setInputValue = ({ key, value }) => {
        formData.set(key, value);
      };
  
      const uploadImage = (file) => {
        formData.set("image", file);
      };
  
      const addQuote = handleSubmit(async () => {
        formData.set('movie_id' , route.params.id)
        try {
          const response = await axios.post(
            'quotes',
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
  

  
  
      return {
        setInputValue,
        uploadImage,
        errors: errorMessage,
        locale,
        addQuote
      };
    },
  };
  </script>
  