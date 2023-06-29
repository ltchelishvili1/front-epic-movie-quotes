<template>
  <vee-validate-form v-if="quote" @submit="null">
    <add-movie-input
      title='"Quote in English."'
      name="quote_en"
      rules="required|min:3|lcase"
      lang="Eng"
      :value="quote?.quote['en']"
      type="textarea"
      :read-only="true"
      :is-quote="true"
      @set-input-value="null"
    ></add-movie-input>
    <add-movie-input
      title="“ციტატა ქართულ ენაზე”"
      name="quote_ka"
      rules="required|min:3|geo"
      type="textarea"
      :value="quote?.quote['ka']"
      :read-only="true"
      :is-quote="true"
      lang="ქარ"
      @set-input-value="null"
    ></add-movie-input>

    <upload-file-input
      :read-only="true"
      :image="quote?.image"
      @upload-image="null"
    ></upload-file-input>
  </vee-validate-form>
</template>

<script>
import AddMovieInput from "@/components/UI/inputs/AddMovieInput.vue";
import UploadFileInput from "@/components/UI/inputs/UploadFileInput.vue";

import axios from "@/config/axios/index";

import { Form } from "vee-validate";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    AddMovieInput,
    UploadFileInput,
    VeeValidateForm: Form,
  },
  setup() {
    const route = useRoute();
    const quote = ref(null);
    onMounted(() => {
      const fetchQuote = async () => {
        try {
          const response = await axios.get(`quotes/${route.params.quoteId}`);
          quote.value = response.data.quote;
        } catch (error) {
          //
        }
      };

      fetchQuote();
    });

    return {
      quote,
    };
  },
};
</script>
