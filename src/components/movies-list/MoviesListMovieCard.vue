<template>
  <div>
    <img :src="movie.image" :alt="movie.name" class="h-[371px]" />
    <p class="mt-4 text-white text-[24px] font-medium">
      {{ movie.title[locale] }} <span>({{ movie.release_year }})</span>
    </p>
    <p class="text-white">4</p>
  </div>
</template>

<script>
import { computed } from "vue";
import i18n from "@/config/i18n/index.js";
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const locale = computed(() => i18n.global.locale.value || "en");
    return {
      locale,
    };
  },
};
</script>
