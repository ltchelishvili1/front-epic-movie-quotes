<template>
  <section class="flex flex-col items-center justify-center">
    <div
      v-for="quote in quotes"
      :key="quote.id"
      class="text-white flex items-center justify-center mt-[40px] p-[50px] bg-[#11001A] w-[70%] rounded-xl"
    >
      <div class="flex flex-col items-center justify -center">
        <h3 class="text-white mb-[30px] italic">
          " {{ quote.quote[locale] }} "
        </h3>
        <img
          :src="quote.image"
          :alt="quote.quote[locale]"
          class="w-[70%] h-[400px]"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { getLocale } from "@/config/helpers/index";
export default {
  props: {
    quotes: {
      type: Array,
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
