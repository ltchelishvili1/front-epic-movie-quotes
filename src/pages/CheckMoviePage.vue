<template>
  <authorized-user-layout>
    <router-view></router-view>
    <load-spinner
      v-if="isLoading"
      class="absolute top-0 left-0"
      classes="h-[6.25rem] w-[6.25rem]"
    ></load-spinner>
    <div v-else>
      <p class="text-white mx-[1.9rem] my-[1.9rem]">
        {{ $t("movie_description") }}
      </p>
      <div class="gap-0">
        <div class="w-full px-[1.25rem] lg:grid lg:grid-cols-2">
          <div
            :style="{
              backgroundImage: `url(${movie?.thumbnail})`,
              backgroundSize: 'cover',
            }"
            class="lg:w-full lg:h-[27.5625rem] w-full h-[19rem]"
          ></div>
          <div class="lg:mx-[2.6rem]">
            <div class="grow mx-[1.3rem]">
              <div class="flex items-center justify-between">
                <p class="text-[#DDCCAA] text-[1.5rem]">
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
                class="mt-[1.5rem] grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 text-center items-center gap-[0.625rem]"
              >
                <div v-for="genre in sortedGenres(movie?.genres)" :key="genre">
                  <p
                    class="bg-[#6C757D] flex items-center justify-center text-center text-white w-full font-bold min-h-[3.1rem] max-w-[12.5rem]"
                  >
                    {{ genre.name[locale] }}
                  </p>
                </div>
              </div>

              <p class="text-white mt-[1.625rem] font-bold text-[1rem]">
                {{ $t("director") }}:<span class="font-normal ml-[0.625rem]">
                  {{ movie?.director[locale] }}</span
                >
              </p>
              <p
                class="md:w-[25rem] lg:w-[25rem] mt-[1.25rem] text-white break-word"
                style="word-wrap: break-word"
              >
                {{ movie?.description[locale] }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col p-2 gap-[2.5rem] px-[2.5rem]">
          <div class="h-[2.5rem] flex space-x-3 rounded-xl p-2 mb-[2.5rem]">
            <p class="text-white text-center mt-[1.6rem]">
              {{ $t("quotes_total") }} ({{ movie?.quotes.length }})
            </p>
            <div class="border-r translate-y-[1.6rem]"></div>
            <base-button
              class="py-[0rem] py-[0rem]"
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
