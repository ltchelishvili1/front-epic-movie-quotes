<template>
  <nav class="flex mb-[68px] items-center justify-between px-12 md:px-0 lg:px-0">
    <div class="md:flex lg:flex mt-[25px]">
      <p class="text-white w-[130px] " >
      {{ $t("my_list_of_movies") }} 
    </p>
    <p class="text-white md:ml-[10px]  lg:ml-[10px] ">({{ $t("total") }} <span>{{ length }}</span
      >)</p>
    </div>
    <div class="flex items-center justify-center">
      <base-button
        class="flex items-center justify-center lg:text-normal md:text-normal text-[13px]"
        button-class="primary"
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
  components: {
    BaseButton,
    IconAddMoviePlus,
  },
  props: {
    length: {
      type: Number,
      default: 0,
    },
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
