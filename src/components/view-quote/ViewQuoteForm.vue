<template>
    <Form v-if="quote" @submit="null">
      <add-movie-input
        title='"Quote in English."'
        name="quote_en"
        rules="required|min:3|lcase"
        lang="Eng"
        :value="quote?.quote['en']"
        type="textarea"
        :readOnly="true"
        @set-input-value="null"
        :isQuote="true"
      ></add-movie-input>
      <add-movie-input
        title="“ციტატა ქართულ ენაზე”"
        name="quote_ka"
        rules="required|min:3|geo"
        type="textarea"
        :value="quote?.quote['ka']"
        :readOnly="true"
        :isQuote="true"
        lang="ქარ"
        @set-input-value="null"
      ></add-movie-input>
  
      <upload-file-input @upload-image="null"  :readOnly="true" :image="quote?.image"></upload-file-input>
    </Form>
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
      Form,
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
            console.log(error);
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