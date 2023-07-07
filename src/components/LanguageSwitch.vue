<template>
  <select
    v-model="$i18n.locale"
    class="mt-[20px] hidden lg:block md:block flex items-center justify-center p-[5px] mr-[40px] h-[38px] bg-transparent text-white"
    @change="changeLanguage"
  >
    <option
      v-for="locale in $i18n.availableLocales"
      :key="`locale-${locale}`"
      class="bg-black hover:bg-white"
      :value="locale"
    >
      {{ displayLocale(locale) }}
    </option>
  </select>
</template>

<script>
import { setLocale } from "@vee-validate/i18n";
import { computed } from "vue";
import axios from "@/config/axios/index";

export default {
  setup() {
    const changeLanguage = (event) => {
      setLocale(event.target.value);
      localStorage.setItem("language", event.target.value);
      try {
        axios.get("set-language/" + event.target.value);
      } catch (error) {
        //
      }
    };

    const displayLocale = computed(
      () => (locale) => locale === "ka" ? "ქარ" : 'Eng'
    );

    return {
      changeLanguage,
      displayLocale,
    };
  },
};
</script>
