<template>
  <router-view v-slot="slotProps">
    <transition name="fade-button" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
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

<style>
.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0.9;
}

.fade-button-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-button-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}
</style>
