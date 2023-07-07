<template>
  <section
    class="mt-[100px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-[50px]"
  >
    <div
      v-for="quote in quotes"
      :key="quote.id"
      class="cursor-pointer"
      @click="navigateToQuote(quote.id,quote.movie_id)"
    >
      <div class="w-full px-[50px] md:px-0 lg:px-0 flex flex-col items-center justify-center">
        <h3 class="text-white mb-[30px] italic ">
          " {{ quote.quote[locale] }} "
        </h3>
        <img
          :src="quote.image"
          :alt="quote.quote[locale]"
          class="md:h-[371px] lg:h-[371px] w-full"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { getLocale } from "@/config/helpers/index";
import { useRouter } from "vue-router";
export default {
  props: {
    quotes: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const locale = getLocale();
    const router = useRouter();

    const navigateToQuote = (quoteId) => {
      router.push({
        name: "view-quote",
        params: {
          quoteId,
        },
      });
    };

    return {
      locale,
      navigateToQuote,
    };
  },
};
</script>
