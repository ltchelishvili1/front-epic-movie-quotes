<template>
  <div>
    <div
      class="cursor-pointer w-full min-h-[3rem] border border-[#6C757D] px-4 py-[0.3rem] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4"
      @click="showCategories"
    >
      <p
        v-if="!displaySelectedCategories.length"
        class="text-white mt-[0.3rem] relative"
      >
        <span v-if="!isLoading" > {{ $t("genres") }}</span>
        <load-spinner
          v-else
          class="absolute -translate-x-[2.5rem]"
          classes="h-[1.5rem] w-[1.5rem]"
        ></load-spinner>
      </p>
      <div
        v-for="cat in displaySelectedCategories"
        :key="cat.value"
        class="text-white bg-[#6C757D] flex justify-center items-center m-[.18rem]"
      >
        <p class="text-center m-1">
          {{ cat.value }}
          <span class="cursor-pointer" @click="removeCategory(cat.value)"
            >X</span
          >
        </p>
      </div>
    </div>
    <div v-if="showCategoriesRef">
      <input
        v-for="category in displayCategories"
        :key="category.id"
        :value="category.name[locale]"
        class="text-white bg-transparent p-2 cursor-pointer hover:bg-[#22203099]"
        :name="category.id"
        readonly
        @click="addCategory"
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import axios from "@/config/axios/index";
import { getLocale } from "@/config/helpers/index";
import { useMovieStore } from "@/stores/movie/index";
import LoadSpinner from "@/components/LoadSpinner.vue";

export default {
  components: { LoadSpinner },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  emits: {
    "set-categories": (val) => Array.isArray(val),
  },

  setup(props, { emit }) {
    const locale = getLocale();
    const showCategoriesRef = ref(false);
    const selectedCategories = ref(props.value);
    const categories = ref([]);
    const movieStore = useMovieStore();
    const isLoading = ref(false);

    const movie = computed(() => movieStore.getMovie);

    const showCategories = () => {
      showCategoriesRef.value = !showCategoriesRef.value;
    };

    onMounted(async () => {
      isLoading.value = true;
      try {
        const response = await axios.get("genres");
        categories.value = response.data.genres;

        if (response.status !== 200) {
          return;
        }
      } catch (error) {
        //
      } finally {
        isLoading.value = false;
      }
    });

    const displayCategories = computed(() => categories.value);

    const addCategory = (event) => {
      if (
        selectedCategories.value.some(
          (selectedCategory) => selectedCategory.value === event.target.value
        )
      ) {
        return;
      }
      selectedCategories.value.push({
        value: event.target.value,
        id: event.target.name,
      });

      movie.value?.genres.push(
        categories.value.filter((cat) => cat.id == event.target.name)[0]
      );

      emit("set-categories", selectedCategories.value);
    };

    const displaySelectedCategories = computed(() => selectedCategories.value);

    const removeCategory = (category) => {
      selectedCategories.value = [
        ...selectedCategories.value.filter(
          (selectedCategory) => selectedCategory.value !== category
        ),
      ];
      emit("set-categories", selectedCategories.value);
    };

    return {
      showCategories,
      showCategoriesRef,
      displayCategories,
      addCategory,
      displaySelectedCategories,
      removeCategory,
      locale,
      isLoading,
    };
  },
};
</script>
