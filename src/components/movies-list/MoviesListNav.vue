<template>
  <nav
    class="flex mb-[68px] items-center justify-between px-12 md:px-0 lg:px-0"
  >
    <div class="md:flex lg:flex mt-[25px]">
      <p class="text-white w-[130px]">
        {{ $t("my_list_of_movies") }}
      </p>
      <p class="text-white md:ml-[10px] lg:ml-[10px]">
        ({{ $t("total") }} <span>{{ length }}</span
        >)
      </p>
    </div>
    <div class="flex items-center justify-center">
      <button
        v-if="!isSearchOpen"
        class="text-white flex items-center mt-4 mr-8 md:flex lg:flex hidden"
        @click="toggleSearch"
      >
        <icon-search class="mx-2 w-[16px] h-[16px]"></icon-search>
        {{ $t("search_by") }}
      </button>
      <div v-if="isSearchOpen" class="relative">
        <Field
          id="search"
          name="search"
          class="pl-[50px] border border-[#232323 -translate-x-[1.6rem] text-white bg-transparent flex rounded-lg mt-[1.3rem] z-[10] h-[2rem]"
          :value="searchVal"
          @input="setSearchVal"
        />
        <icon-search
          class="absolute opacity-50 w-[1.5rem] h-[1.5rem] -left-[15px] top-[25px]"
        ></icon-search>
        <span
          class="absolute opacity-50 w-[1.5rem] h-[1.5rem] -right-[5px] cursor-pointer top-[25px] text-white"
          @click="toggleSearch"
          >X</span
        >
      </div>
      <base-button
        class="flex items-center justify-center lg:text-normal md:text-normal text-[13px]"
        button-class="primary"
        @click-button="openAddMovieModal"
      >
        <span class="absolute mt-[4px]"
          ><icon-add-movie-plus class="-translate-y-[3px]"></icon-add-movie-plus
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
import IconSearch from "../icons/IconSearch.vue";
import { Field } from "vee-validate";

import { onMounted, ref, watch } from "vue";
export default {
  components: {
    BaseButton,
    IconAddMoviePlus,
    IconSearch,
    Field,
  },
  props: {
    length: {
      type: Number,
      default: 0,
    },
  },
  emits: {
    "search-movies": (searchValue) => typeof searchValue === "string",
  },
  setup(_, { emit }) {
    const router = useRouter();
    const isSearchOpen = ref(false);
    const searchVal = ref("");

    const openAddMovieModal = () => {
      router.push({ name: "add-movie" });
    };

    const toggleSearch = () => {
      isSearchOpen.value = !isSearchOpen.value;
    };

    const setSearchVal = (event) => {
      searchVal.value = event.target.value;
    };

    onMounted(() => {
      searchVal.value = localStorage.getItem("moviesListSearchKey") || "";
      emit("search-movies", searchVal.value);
    });

    watch(
      () => searchVal.value,
      (newValue) => {
        setTimeout(() => {
          emit("search-movies", newValue);
          localStorage.setItem("moviesListSearchKey", newValue);
        }, 500);
      }
    );

    return {
      openAddMovieModal,
      toggleSearch,
      isSearchOpen,
      setSearchVal,
      searchVal,
    };
  },
};
</script>
