<template>
  <vee-validate-form v-if="quote" v-slot="{meta}" @submit="updateQuote">
    <add-movie-input
      title='"Quote in English."'
      name="quote_en"
      rules="required|min:3|lcase"
      lang="Eng"
      :value="quote?.quote['en']"
      type="textarea"
      :is-quote="true"
      @set-input-value="setInputValue"
    ></add-movie-input>
    <add-movie-input
      title="“ციტატა ქართულ ენაზე”"
      name="quote_ka"
      rules="required|min:3|geo"
      :value="quote?.quote['ka']"
      type="textarea"
      lang="ქარ"
      :is-quote="true"
      @set-input-value="setInputValue"
    ></add-movie-input>

    <upload-file-input
      :image="quote?.image"
      @upload-image="uploadImage"
    ></upload-file-input>

    <p v-if="errors" class="text-red-500 ml-4">{{ errors }}</p>
    <base-button :disabled="!meta.valid" class="mt-[40px]" button-class="primary">{{
      $t("add_movie")
    }}</base-button>
  </vee-validate-form>
</template>

<script>
import AddMovieInput from "@/components/UI/inputs/AddMovieInput.vue";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import { getLocale } from "@/config/helpers/index";

import axios from "@/config/axios/index";

import { Form, useForm } from "vee-validate";
import { onBeforeMount, ref } from "vue";
import { useMovieStore } from "@/stores/movie/index";
import UploadFileInput from "@/components/UI/inputs/UploadFileInput.vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    AddMovieInput,
    BaseButton,
    VeeValidateForm: Form,
    UploadFileInput,
  },
  setup() {
    const formData = new FormData();
    const errorMessage = ref(null);
    const movieStore = useMovieStore();
    const quote = ref(null);
    const { handleSubmit } = useForm();
    const route = useRoute();
    const locale = getLocale();
    const router = useRouter();

    const setInputValue = ({ key, value }) => {
      quote.value[key.split("_")[0]][key.split("_")[1]] = value;
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
      formData.set("quote_en", quote.value.quote.en);
      formData.set("quote_ka", quote.value.quote.ka);
      formData.append("_method", "patch");
      await movieStore.editQuote(route.params.quoteId, formData);
      errorMessage.value = movieStore.getErrors();
      router.back();
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
