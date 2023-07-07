<template>
  <authorized-user-layout>
    <router-view></router-view>
    <load-spinner
      v-if="isLoading"
      class="absolute top-0 left-0"
      classes="h-[100px] w-[100px]"
    ></load-spinner>
    <div v-else>
      <p class="text-white mx-[30px] my-[30px]">
        {{ $t("movie_description") }}
      </p>
      <div class="gap-0">
        <div class="w-full px-[20px] lg:grid lg:grid-cols-2">
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
                  v-if="checkPermission(movie?.author_id)"
                  class="md:flex lg:flex hidden space-x-3 bg-[#24222F] rounded-xl p-2"
                >
                  <router-link :to="{ name: 'edit-movie' }"
                    ><icon-edit></icon-edit
                  ></router-link>
                  <div class="border-r"></div>
                  <icon-delete
                    class="cursor-pointer"
                    @click="deleteMovie"
                  ></icon-delete>
                </div>
              </div>
              <div
                v-if="movie?.genres.length"
                class="mt-[24px] grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 text-center items-center gap-[10px]"
              >
                <div v-for="genre in sortedGenres(movie?.genres)" :key="genre">
                  <p
                    class="bg-[#6C757D] flex items-center justify-center text-center text-white w-full font-bold min-h-[50px] max-w-[200px]"
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
              :has-permission="checkPermission(quote.author_id)"
              @delete-quote="deleteQuote"
              @toggle-quote-menu="toggleQuoteMenu"
            ></check-movie-quote-card>
          </div>
          <div v-if="!movie?.quotes.length">
            <div class="">
              <icon-not-found></icon-not-found>
              <icon-eclipse></icon-eclipse>
              <h1 class="text-white mt-8 italic">{{ $t("data_not_added") }}</h1>
            </div>
          </div>
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
import LoadSpinner from "@/components/LoadSpinner.vue";
import { useUserStore } from "@/stores/user/index";
import IconNotFound from "@/components/icons/IconNotFound.vue";
import IconEclipse from "@/components/icons/IconEclipse.vue";

export default {
  components: {
    AuthorizedUserLayout,
    IconEdit,
    IconDelete,
    BaseButton,
    CheckMovieQuoteCard,
    LoadSpinner,
    IconNotFound,
    IconEclipse,
  },
  setup() {
    const displayQuote = ref({});
    const locale = getLocale();
    const route = useRoute();
    const router = useRouter();
    const movieStore = useMovieStore();
    const isLoading = ref(false);
    const { getUser } = useUserStore();

    const movie = computed(() => movieStore.getMovie);

    onMounted(async () => {
      isLoading.value = true;
      await movieStore.fetchMovie(route.params.id);
      isLoading.value = false;
    });

    const deleteMovie = async () => {
      isLoading.value = true;
      await movieStore.deleteMovie(route.params.id);
      isLoading.value = false;
      router.push({ name: "movies" });
    };

    const deleteQuote = async (id) => {
      isLoading.value = true;
      await movieStore.deleteQuote(id);
      isLoading.value = false;
    };

    const openAddQuoteModal = () => {
      router.push({
        name: "add-quote",
        query: { id: movie.value.id },
      });
    };

    const toggleQuoteMenu = (id) => {
      displayQuote.value[id + "quote"] = !displayQuote.value[id + "quote"];
    };

    const checkPermission = computed(() => (id) => getUser.id === parseInt(id));
    const sortedGenres = computed(
      () => (genres) =>
        genres.sort((a, b) => {
          const genreA = a.name[locale.value].toLowerCase();
          const genreB = b.name[locale.value].toLowerCase();
          if (genreA < genreB) {
            return -1;
          }
          if (genreA > genreB) {
            return 1;
          }
          return 0;
        })
    );

    return {
      movie,
      locale,
      deleteMovie,
      openAddQuoteModal,
      toggleQuoteMenu,
      displayQuote,
      deleteQuote,
      isLoading,
      getUser,
      checkPermission,
      sortedGenres,
    };
  },
};
</script>
