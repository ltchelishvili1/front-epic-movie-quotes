<template>
  <nav
    class="flex mb-[4.25rem] items-center justify-between px-12 md:px-0 lg:px-0"
  >
    <div class="md:flex lg:flex mt-[1.6rem]">
      <p class="text-white w-[8.125rem]">
        {{ $t("my_list_of_movies") }}
      </p>
      <p class="text-white md:ml-[0.625rem] lg:ml-[0.625rem]">
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
        <icon-search class="mx-2 w-[1rem] h-[1rem]"></icon-search>
        {{ $t("search_by") }}
      </button>
      <div v-if="isSearchOpen" class="relative mr-12 -translate-y-[.2rem]">
        <Field
          id="search"
          name="search"
          class="pl-[3.1rem] border border-[#232323 -translate-x-[1.6rem] text-white bg-transparent flex rounded-lg mt-[1.3rem] z-[10] h-[2rem]"
          :value="searchVal"
          :placeholder="$t('press_enter')"
          @keydown.enter="submitSearch"
          @input="setSearchVal"
        />
        <icon-search
          class="absolute opacity-50 w-[1.5rem] h-[1.5rem] -left-[.9rem] top-[1.6rem]"
        ></icon-search>
        <span
          class="absolute opacity-50 w-[1.5rem] h-[1.5rem] text-[1.5rem] -right-[1rem] cursor-pointer top-[1.2rem] text-white"
          @click="toggleSearch"
          >X</span
        >
      </div>
      <base-button
        class="flex items-center justify-center lg:text-normal md:text-normal text-[0.8125rem]"
        button-class="primary"
        @click-button="openAddMovieModal"
      >
        <span class="absolute mt-[.25rem]"
          ><icon-add-movie-plus
            class="-translate-y-[.2rem]"
          ></icon-add-movie-plus
        ></span>
        <span class="ml-[1.25rem]"> {{ $t("add_movie") }}</span></base-button
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
    const isSearchOpen = ref(
      JSON.parse(localStorage.getItem("isMoviesListSearchOpen")) || false
    );
    const searchVal = ref(localStorage.getItem("moviesListSearchKey") || "");

    const openAddMovieModal = () => {
      router.push({ name: "add-movie" });
    };

    const toggleSearch = () => {
      isSearchOpen.value = !isSearchOpen.value;
      localStorage.setItem("isMoviesListSearchOpen", isSearchOpen.value);
    };

    const setSearchVal = (event) => {
      searchVal.value = event.target.value;
    };

    onMounted(() => {
      emit("search-movies", searchVal.value);
    });

    const submitSearch = () => {
      emit("search-movies", searchVal.value);
      localStorage.setItem("moviesListSearchKey", searchVal.value);
    };

    watch(
      () => isSearchOpen.value,
      (newValue) => {
        if (!newValue) {
          localStorage.removeItem("moviesListSearchKey");
          searchVal.value = "";
          emit("search-movies", searchVal.value);
        }
      }
    );

    return {
      openAddMovieModal,
      toggleSearch,
      isSearchOpen,
      setSearchVal,
      searchVal,
      submitSearch,
    };
  },
};
</script>
