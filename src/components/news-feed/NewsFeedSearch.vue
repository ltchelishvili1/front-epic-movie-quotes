<template>
  <div
    class="flex mt-8 items-center justify-center md:justify-start lg:justify-start"
  >
    <div
      class="md:bg-[#22203099] lg:bg-[#22203099] mr-6 rounded"
      :class="
        isSearhOpen
          ? 'w-[15%] md:block lg:block hidden'
          : 'lg:w-[75%] md:w-[75%] w-[100%]'
      "
    >
      <router-link :to="{ name: 'add-quote-news-feed' }" class="text-white"
        ><p class="p-4 lg:mx-0 md:mx-0 mx-6">
          {{ $t("write_new_quote") }}
        </p></router-link
      >
    </div>
    <div v-if="isSearhOpen" class="md:w-[70%] lg:w-[70%] w-[90%]">
      <Field
        :ruels="[]"
        name="search"
        class="bg-transparent h-[50px] text-white w-full px-[20px]"
        placeholder="Enter @ to search movies, Enter # to search quotes "
        :value="searchKey"
        @input="handleInput"
      />
      <button
        class="text-white absolute curson-pointer mt-[15px] opacity-[.6] md:-translate-x-[30px] lg:-translate-x-[30px] -translate-x-[10px]"
        @click="hideSearchInput"
      >
        <span v-if="!route.query.openSearch">X</span>
      </button>
      <div class="w-full h-[0.1px] bg-[#EFEFEF] opacity-[0.3]"></div>
    </div>

    <div v-if="!isSearhOpen">
      <button
        class="text-white p-4 md:block lg:block hidden"
        @click="toggleSearch"
      >
        {{ $t("search_by") }}
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Field } from "vee-validate";
export default {
  components: {
    Field,
  },
  props: {
    searchKey: {
      type: String,
      required: true,
    },
  },
  emits: {
    "set-search-key": (val) => typeof val === "string",
  },
  setup(_, { emit }) {
    const isSearhOpen = ref(false);
    const route = useRoute();

    const hideSearchInput = () => {
      isSearhOpen.value = false;
      localStorage.setItem("isSearchOpen", false);
    };

    const toggleSearch = () => {
      isSearhOpen.value = !isSearhOpen.value;
      localStorage.setItem("isSearchOpen", JSON.stringify(isSearhOpen.value));
    };

    onMounted(() => {
      if (localStorage.getItem("isSearchOpen")) {
        isSearhOpen.value = JSON.parse(localStorage.getItem("isSearchOpen"));
      }

      watch(
        () => route.query.openSearch,
        (newValue) => {
          isSearhOpen.value = newValue === undefined ? false : newValue;
          localStorage.setItem(
            "isSearchOpen",
            JSON.stringify(isSearhOpen.value)
          );
        }
      );

      if (route.query.openSearch) {
        isSearhOpen.value = true;
        localStorage.setItem("isSearchOpen", JSON.stringify(isSearhOpen.value));
      } else if (screen.width < 500) {
        isSearhOpen.value = false;
        localStorage.setItem("isSearchOpen", JSON.stringify(isSearhOpen.value));
      }
    });
    const handleInput = (event) => {
      emit("set-search-key", event.target.value);
    };

    return {
      hideSearchInput,
      toggleSearch,
      isSearhOpen,
      route,
      handleInput,
    };
  },
};
</script>
