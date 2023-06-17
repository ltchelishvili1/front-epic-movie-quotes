<template>
  <authorized-user-layout>
    <router-view></router-view>
    <p class="text-white">{{ $t("movie_description") }}</p>
    <div class="md:flex lg:flex gap-0">
      <div class="w-[60%]">
        <div
          :style="{
            backgroundImage: `url(${movie?.image})`,
            backgroundSize: 'cover',
          }"
          class="w-full h-[441px]"
        ></div>

        <div class="mx-[42px]">
          <div class="h-[40px] flex space-x-3 rounded-xl p-2 mb-[40px]">
            <p class="text-white text-center mt-[25px]">
              {{ $t("quotes_total") }} ({{ movie?.quotes.length }})
            </p>
            <div class="border-r translate-y-[25px]"></div>
            <base-button
              @click="openAddQuoteModal"
              class="py-[0px] py-[0px]"
              buttonClass="primary"
              >{{ $t("add_quote") }}</base-button
            >
          </div>

          <div class="flex flex-col p-2 gap-[40px]">
            <div
              v-for="quote in movie?.quotes"
              :key="quote.id"
              class="relative"
            >
              <check-movie-quote-card
                :quote="quote"
                @delete-quote="deleteQuote"
                @toggle-quote-menu="toggleQuoteMenu"
                :displayQuote="displayQuote"
              ></check-movie-quote-card>
            </div>
          </div>
        </div>
      </div>

      <div class="grow mx-[21px]">
        <div class="flex items-center justify-between">
          <p class="text-[#DDCCAA] text-[24px]">
            {{ movie?.title[locale] }} ({{ movie?.release_year }})
          </p>

          <div class="flex space-x-3 bg-[#24222F] rounded-xl p-2">
            <router-link :to="{ name: 'edit-movie' }"
              ><icon-edit></icon-edit
            ></router-link>
            <div class="border-r"></div>
            <icon-delete @click="deleteMovie"></icon-delete>
          </div>
        </div>
        <div
          class="mt-[24px] grid grid-cols-3 items-center gap-[10px] lg:w-[480px] md:w-[480px]"
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
          class="w-[400px] mt-[20px] text-white break-word"
          style="word-wrap: break-word"
        >
          {{ movie?.description[locale] }}
        </p>
      </div>
    </div>
  </authorized-user-layout>
</template>
<script>
import AuthorizedUserLayout from "@/components/layout/AuthorizedUserLayout.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconView from "@/components/icons/IconView.vue";
import IconComments from "@/components/icons/IconComments.vue";
import IconLikes from "@/components/icons/IconLikes.vue";
import { getLocale } from "@/config/helpers/index";
import axios from "@/config/axios/index";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMoviesStore } from "@/stores/movie/index";
import BaseButton from "@/components/UI/inputs/BaseButton.vue";
import CheckMovieQuoteCard from "@/components/CheckMovieQuoteCard.vue";

export default {
  components: {
    AuthorizedUserLayout,
    IconEdit,
    IconDelete,
    BaseButton,
    IconComments,
    IconLikes,
    IconView,
    CheckMovieQuoteCard,
  },
  setup() {
    const movie = ref(null);
    const displayQuote = ref({});
    const locale = getLocale();
    const route = useRoute();
    const router = useRouter();

    const movieStore = useMoviesStore();

    onMounted(() => {
      const fetchMovie = async () => {
        await movieStore.getMovie(route.params.id);
        movie.value = movieStore.movie;
        movie.value.quotes
          .map((quote) => quote.id)
          .forEach((quoteId) => {
            displayQuote.value[quoteId + "quote"] = false;
          });
      };

      fetchMovie();
    });

    const deleteMovie = async () => {
      try {
        await axios.delete(`movies/${route.params.id}`);
      } catch (error) {
        //
      } finally {
        router.push({ name: "movies" });
      }
    };

    const deleteQuote = async (id) => {
      try {
        await axios.delete(`quotes/${id}`);
      } catch (error) {
        //
      }
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
