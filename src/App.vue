<template>
  <router-view v-slot="slotProps">
    <transition name="fade" mode="out-in">
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
.fade-enter-from,
.fade-leave-to {
  opacity: 0.9;
}

.fade-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
