<template>
  <nav class="flex mb-[68px] items-center justify-between">
    <p class="text-white">
      {{ $t("my_list_of_movies") }} ({{ $t('total') }} <span>{{ length }}</span
      >)
    </p>
    <div class="flex items-center justify-center">
      <base-button
        class="flex items-center justify-center"
        buttonClass="primary"
        @click-button="openAddMovieModal"
      >
        <span class="absolute mt-[4px]"
          ><icon-add-movie-plus></icon-add-movie-plus
        ></span>
        <span class="ml-[20px]"> {{ $t("add_movie") }}</span></base-button
      >
    </div>
  </nav>
</template>

<script>
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import IconAddMoviePlus from "@/components/icons/IconAddMoviePlus.vue";

import { useRouter } from "vue-router";
export default {
  props: {
    length: {
      type: Number,
      default: 0,
    },
  },
  components: {
    BaseButton,
    IconAddMoviePlus,
  },
  setup() {
    const router = useRouter();

    const openAddMovieModal = () => {
      router.push({ name: "add-movie" });
    };

    return {
      openAddMovieModal,
    };
  },
};
</script>