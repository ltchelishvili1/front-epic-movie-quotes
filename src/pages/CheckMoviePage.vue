<template>
  <authorized-user-layout>
    <router-view></router-view>
    <p class="text-white mx-[30px] my-[30px]">{{ $t("movie_description") }}</p>
    <div class="gap-0">
      <div class="w-full px-[20px] lg:grid lg:grid-cols-2 ">
        <div
          :style="{
            backgroundImage: `url(${movie?.thumbnail})`,
            backgroundSize: 'cover',
          }"
          class="lg:w-full lg:h-[441px] w-full h-[300px]"
        ></div>
        <div class="lg:mx-[42px]">
          <div class="grow mx-[21px]">
            <div class="flex items-center justify-between">
              <p class="text-[#DDCCAA] text-[24px]">
                {{ movie?.title[locale] }} ({{ movie?.release_year }})
              </p>

              <div
                class="md:flex lg:flex hidden space-x-3 bg-[#24222F] rounded-xl p-2"
              >
                <router-link :to="{ name: 'edit-movie' }"
                  ><icon-edit></icon-edit
                ></router-link>
                <div class="border-r"></div>
                <icon-delete @click="deleteMovie"></icon-delete>
              </div>
            </div>
            <div
              class="mt-[24px] grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2  text-center items-center gap-[10px] w-[300px] lg:w-[480px] md:w-[480px]"
            >
              <div v-for="genre in movie?.genres" :key="genre">
                <p
                  class="max-w-[150px] text-center text-white w-[auto] bg-[#6C757D] font-bold p-[5px]"
                >
                  {{ genre.name[locale] }}
                </p>
              </div>
            </div>
            <p class="text-white mt-[26px] font-bold text-[16px]">
              {{ $t("director") }}:<span class="font-normal ml-[10px]">
                {{ movie?.director[locale] }}</span
              >
            </p>
            <p
              class="md:w-[400px] lg:w-[400px] mt-[20px] text-white break-word"
              style="word-wrap: break-word"
            >
              {{ movie?.description[locale] }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col p-2 gap-[40px] px-[40px]">
        <div class="h-[40px] flex space-x-3 rounded-xl p-2 mb-[40px]">
          <p class="text-white text-center mt-[25px]">
            {{ $t("quotes_total") }} ({{ movie?.quotes.length }})
          </p>
          <div class="border-r translate-y-[25px]"></div>
          <base-button
            class="py-[0px] py-[0px]"
            button-class="primary"
            @click="openAddQuoteModal"
            >{{ $t("add_quote") }}</base-button
          >
        </div>
        <div
          v-for="quote in movie?.quotes"
          :key="quote.id"
          class="relative lg:w-[60%]"
        >
          <check-movie-quote-card
            :quote="quote"
            :display-quote="displayQuote"
            @delete-quote="deleteQuote"
            @toggle-quote-menu="toggleQuoteMenu"
          ></check-movie-quote-card>
        </div>
      </div>
    </div>
  </authorized-user-layout>
</template>
<script>
import AuthorizedUserLayout from "@/components/layout/AuthorizedUserLayout.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import { getLocale } from "@/config/helpers/index";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import CheckMovieQuoteCard from "@/components/CheckMovieQuoteCard.vue";
import { useMovieStore } from "@/stores/movie/index";

export default {
  components: {
    AuthorizedUserLayout,
    IconEdit,
    IconDelete,
    BaseButton,
    CheckMovieQuoteCard,
  },
  setup() {
    const displayQuote = ref({});
    const locale = getLocale();
    const route = useRoute();
    const router = useRouter();
    const movieStore = useMovieStore();

    onMounted(async () => {
      await movieStore.fetchMovie(route.params.id);
    });

    const movie = computed(() => movieStore.getMovie);

    const deleteMovie = async () => {
      await movieStore.deleteMovie(route.params.id);
      router.push({ name: "movies" });
    };

    const deleteQuote = async (id) => {
      await movieStore.deleteQuote(id);
    };

    const openAddQuoteModal = () => {
      router.push({ name: "add-quote" });
    };

    const toggleQuoteMenu = (id) => {
      displayQuote.value[id + "quote"] = !displayQuote.value[id + "quote"];
    };

    return {
      movie,
      locale,
      deleteMovie,
      openAddQuoteModal,
      toggleQuoteMenu,
      displayQuote,
      deleteQuote,
    };
  },
};
</script>