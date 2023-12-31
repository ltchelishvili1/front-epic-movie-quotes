<template>
  <section>
    <load-spinner
      v-if="isLoading.quote"
      classes="w-[6.25rem] h-[6.25rem]"
    ></load-spinner>
    <vee-validate-form v-else @submit="updateQuote">
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
        rules=""
        @upload-image="uploadImage"
      ></upload-file-input>

      <p v-if="errors" class="text-red-500 ml-4">{{ errors }}</p>
      <base-button class="mt-[2.5rem]" button-class="primary">
        <span v-if="!isLoading.submit">
          {{ $t("edit_quote") }}
        </span>
        <load-spinner v-else classes="h-[1.5rem] w-[1.5rem]"></load-spinner>
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
import { onBeforeMount, ref } from "vue";
import { useMovieStore } from "@/stores/movie/index";
import UploadFileInput from "@/components/UI/inputs/UploadFileInput.vue";
import { useRoute, useRouter } from "vue-router";
import LoadSpinner from "@/components/LoadSpinner.vue";

export default {
  components: {
    AddMovieInput,
    BaseButton,
    VeeValidateForm: Form,
    UploadFileInput,
    LoadSpinner,
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
    const isLoading = ref({
      quote: false,
      submit: false,
    });

    const setInputValue = ({ key, value }) => {
      quote.value[key.split("_")[0]][key.split("_")[1]] = value;
    };

    const uploadImage = (file) => {
      formData.set("image", file);
    };

    onBeforeMount(() => {
      isLoading.value.quote = true;
      const fetchQuote = async () => {
        try {
          const response = await axios.get(`quotes/${route.params.quoteId}`);
          quote.value = response.data.quote;
          formData.set("movie_id", quote.value.movie.id);
          Object.keys(quote.value).forEach((key) => {
            return formData.set(key, JSON.stringify(quote.value[key]));
          });
        } catch (error) {
          //
        } finally {
          isLoading.value.quote = false;
        }
      };

      fetchQuote();
    });

    const updateQuote = handleSubmit(async () => {
      formData.set("quote_id", route.params.quoteId);
      formData.set("quote_en", quote.value.quote.en);
      formData.set("quote_ka", quote.value.quote.ka);
      formData.append("_method", "patch");
      isLoading.value.submit = true;
      await movieStore.editQuote(route.params.quoteId, formData);
      isLoading.value.submit = false;
      errorMessage.value = movieStore.getErrors;

      router.push({name:'news-feed'})

    });

    return {
      setInputValue,
      uploadImage,
      errors: errorMessage,
      locale,
      updateQuote,
      quote,
      isLoading,
    };
  },
};
</script>
