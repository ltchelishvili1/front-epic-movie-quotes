<template>
  <Form v-if="quote" @submit="updateQuote">
    <add-movie-input
      title='"Quote in English."'
      name="quote_en"
      rules="required|min:3|lcase"
      lang="Eng"
      :value="quote?.quote['en']"
      type="textarea"
      @set-input-value="setInputValue"
      :isQuote="true"
    ></add-movie-input>
    <add-movie-input
      title="“ციტატა ქართულ ენაზე”"
      name="quote_ka"
      rules="required|min:3|geo"
      :value="quote?.quote['ka']"
      type="textarea"
      lang="ქარ"
      @set-input-value="setInputValue"
      :isQuote="true"
    ></add-movie-input>

    <upload-file-input
      @upload-image="uploadImage"
      :image="quote?.image"
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
    const quote = ref(null);
    const { handleSubmit } = useForm();
    const route = useRoute();
    const locale = getLocale();

    const setInputValue = ({ key, value }) => {
      formData.set(key, value);
    };

    const uploadImage = (file) => {
      formData.set("image", file);
    };

    onBeforeMount(() => {
      const fetchQuote = async () => {
        try {
          const response = await axios.get(`movies/${route.params.id}`);
          quote.value = response.data.movie.quotes.filter(
            (quote) => quote.id == route.params.quoteId
          )[0];
          Object.keys(quote.value).forEach((key) => {
            return formData.set(key, JSON.stringify(quote.value[key]));
          });
        } catch (error) {
          //
        }
      };

      fetchQuote();
    });

    const updateQuote = handleSubmit(async () => {
      formData.set("movie_id", route.params.id);
      formData.set("quote_id", route.params.quoteId);
      formData.append("_method", "patch");
      try {
        const response = await axios.post(
          `quotes/${route.params.quoteId}`,
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
      updateQuote,
      quote,
    };
  },
};
</script>
