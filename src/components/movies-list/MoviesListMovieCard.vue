<template>
  <div>
    <router-link   :to="{ name: 'checkmovie', params: { id: movie.id } }">
      <img :src="movie.image" :alt="movie.name" class="h-[371px]" />
      <p class="mt-4 text-white text-[24px] font-medium">
        {{ movie.title[locale] }} <span>({{ movie.release_year }})</span>
      </p>
    </router-link>
    <p class="text-white">4</p>
  </div>
</template>

<script>
import { getLocale } from "@/config/helpers/index";

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const locale = getLocale();

    return {
      locale,
    };
  },
};
</script>
