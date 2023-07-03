<template>
  <section>
    <load-spinner v-if="isLoading" classes="w-[100px] h-[100px]"></load-spinner>
    <vee-validate-form v-else @submit="null">
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
  </section>
</template>

<script>
import AddMovieInput from "@/components/UI/inputs/AddMovieInput.vue";
import UploadFileInput from "@/components/UI/inputs/UploadFileInput.vue";

import axios from "@/config/axios/index";

import { Form } from "vee-validate";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import LoadSpinner from "@/components/LoadSpinner.vue";

export default {
  components: {
    AddMovieInput,
    UploadFileInput,
    VeeValidateForm: Form,
    LoadSpinner,
  },
  setup() {
    const route = useRoute();
    const quote = ref(null);
    const isLoading = ref(false);

    onMounted(async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(`quotes/${route.params.quoteId}`);
        quote.value = response.data.quote;
      } catch (error) {
        //
      } finally {
        isLoading.value = false;
      }
    });

    return {
      quote,
      isLoading,
    };
  },
};
</script>
