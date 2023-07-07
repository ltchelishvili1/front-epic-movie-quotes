<template>
  <div class="w-full px-[3.1rem] md:px-0 lg:px-0">
    <router-link :to="{ name: 'checkmovie', params: { id: movie.id } }">
      <img
        :src="movie?.thumbnail"
        :alt="movie.name"
        class="md:h-[23.1875rem] lg:h-[23.1875rem] w-full"
      />
      <p class="mt-4 text-white text-[1.5rem] font-medium">
        {{ movie.title[locale] }} <span>({{ movie.release_year }})</span>
      </p>
    </router-link>
    <p class="text-white">{{ countComments }}</p>
  </div>
</template>

<script>
import { getLocale } from "@/config/helpers/index";
import { computed } from "vue";

export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const locale = getLocale();

    const countComments = computed(() => {
      let count = 0;
      if (props.movie?.quotes?.length) {
        props.movie.quotes.forEach((quote) => (count += quote.comments.length));
      }
      return count;
    });

    return {
      locale,
      countComments,
    };
  },
};
</script>
