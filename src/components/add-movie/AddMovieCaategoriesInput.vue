<template>
  <div>
    <div
      class="w-full min-h-[38px] border border-[#6C757D] px-[16px] py-[5px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4"
      @click="showCategories"
    >
      <p v-if="!displaySelectedCategories.length" class="text-white">
        Categories
      </p>
      <div
        class="text-white bg-[#6C757D] flex justify-center items-center m-[3px]"
        v-for="cat in displaySelectedCategories"
        :key="cat.value"
      >
        <p class="text-center m-[4px]">
          {{ cat.value }} <span @click="removeCategory(cat.value)">X</span>
        </p>
      </div>
    </div>
    <div v-if="showCategoriesRef">
      <input
        v-for="category in displayCategories"
        :key="category.id"
        :value="category.name[locale]"
        class="text-white bg-transparent"
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
import {getLocale} from '@/config/helpers/index'

export default {
  setup(_, { emit }) {
    const showCategoriesRef = ref(false);
    const selectedCategories = ref([]);
    const categories = ref([]);
    const locale = getLocale();

    const showCategories = () => {
      showCategoriesRef.value = true;
    };

    onMounted(() => {
    const fetchCategories = async () => {
        try {
          const response = await axios.get("genres");
          categories.value = response.data.genres;

          if (response.status !== 200) {
            throw new Error("Request failed with status " + response.status);
          }
        } catch (error) {
          errorMessage.value = error.response.data.message;
        }
      };
      fetchCategories();
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
    };
  },
};
</script>
