<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template>

<script>
import { onMounted } from "vue";
import { setLocale } from "@vee-validate/i18n";
import axios from "@/config/axios/index";

export default {
  setup() {
    onMounted(() => {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLocale(storedLanguage);
        try {
          axios.get("set-language/" + storedLanguage);
        } catch (error) {
          //
        }
      }
    });
  },
};
</script>
