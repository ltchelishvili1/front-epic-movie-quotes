<template>
  <authorized-user-layout>
    <load-spinner
      v-if="isLoading.searchResult"
      class="absolute top-0 left-0"
      classes="h-[6.25rem] w-[6.25rem]"
    ></load-spinner>
    <div v-else>
      <router-view> </router-view>
      <news-feed-search
        :search-key="searchKey"
        @set-search-key="setSearchKey"

      ></news-feed-search>
      <div v-if="posts && posts.length">
        <news-feed-posts :posts="posts"></news-feed-posts>
      </div>

      <div v-else-if="quotes && quotes.length">
        <news-feed-quotes :quotes="quotes"></news-feed-quotes>
      </div>

      <div
        v-else-if="movies && movies.length"
        class="mt-[6.25rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-[3.1rem]"
      >
        <div v-for="movie in movies" :key="movie.id">
          <movies-list-movie-card :movie="movie"></movies-list-movie-card>
        </div>
      </div>
      <div
        v-else
        class=" absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
      >
        <div class="flex flex-col items-center justify-center">
          <icon-not-found></icon-not-found>
          <icon-eclipse></icon-eclipse>
          <h1 class="text-white mt-8 italic">{{ $t('data_not_added') }}</h1>
        </div>

      </div>
    </div>
    <load-spinner
      v-if="isLoading.pagination"
      class="fixed top-0 left-0"
      classes="h-[6.25rem] w-[6.25rem]"
    ></load-spinner>
  </authorized-user-layout>
</template>
<script>
import IconNotFound from "@/components/icons/IconNotFound.vue";
import IconEclipse from "@/components/icons/IconEclipse.vue";
import AuthorizedUserLayout from "@/components/layout/AuthorizedUserLayout.vue";

import axios from "@/config/axios/index";

import { onMounted, onUnmounted, ref, watch } from "vue";
import MoviesListMovieCard from "@/components/movies-list/MoviesListMovieCard.vue";

import { useNotificationStore } from "@/stores/notification/index";

import instantiatePusher from "@/config/helpers/instantiatePusher.js";
import { useRoute } from "vue-router";
import NewsFeedSearch from "@/components/news-feed/NewsFeedSearch.vue";
import NewsFeedPosts from "@/components/news-feed/NewsFeedPosts.vue";
import NewsFeedQuotes from "@/components/news-feed/NewsFeedQuotes.vue";
import LoadSpinner from "@/components/LoadSpinner.vue";

export default {
  components: {
    AuthorizedUserLayout,
    MoviesListMovieCard,
    NewsFeedSearch,
    NewsFeedPosts,
    NewsFeedQuotes,
    LoadSpinner,
    IconNotFound,
    IconEclipse,
  },
  setup() {
    let searchTimeout = null;
    const notificationStore = useNotificationStore();
    const posts = ref([]);
    const movies = ref([]);
    const quotes = ref([]);
    let isEventListenerAdded = false;
    const route = useRoute();
    const page = ref({
      posts: 2,
      quotes: 2,
      movies: 2,
    });
    const searchKey = ref("");
    const isLoading = ref({
      searchResult: false,
      pagination: false,
    });

    onMounted(() => {
      instantiatePusher();
      window.Echo.channel("likes").listen("UserLiked", (data) => {
        if (Object.keys(data.message).includes("comment")) {
          posts.value
            .filter((post) => post.id == data.message.comment.quote_id)[0]
            .comments.push(data.message.comment);
        } else {
          posts.value
            .filter((post) => post.id == data.message.quote_id)[0]
            .likes.push(data.message);
        }
      });

      window.Echo.channel("unlikes").listen("UserUnLiked", (data) => {
        const quoteId = data.message.unlike.quote_id;
        const likeId = data.message.unlike.id;
        const post = posts.value.find((post) => post.id == quoteId);
        const postIndex = posts.value.findIndex((post) => post.id == quoteId);
        const filteredLikes = post.likes.filter((like) => like.id !== likeId);
        posts.value[postIndex].likes = filteredLikes;
      });
    });

    if (localStorage.getItem("searchKey")) {
      searchKey.value = localStorage.getItem("searchKey");
    }

    const fetchSearchResult = async (search, page = 1) => {
      isLoading.value.searchResult = true;
      try {
        const response = await axios.get(
          `${searchKey.value[0] === "@" ? "movies" : "quotes"}?page=${page}`,
          {
            params: {
              searchKey: search,
            },
          }
        );
        if (response.data.posts) {
          posts.value = response.data.posts;
          movies.value = null;
          quotes.value = null;
        }
        if (response.data.movies) {
          movies.value = response.data.movies;
          posts.value = null;
          quotes.value = null;
        }
        if (response.data.quotes) {
          quotes.value = response.data.quotes;
          posts.value = null;
          movies.value = null;
        }
      } catch (error) {
        //
      } finally {
        isLoading.value.searchResult = false;
      }
    };

    watch(searchKey, (newValue) => {
      if (searchKey.value.trim() !== "@") {
        page.value.movies = 2;
      }
      if (searchKey.value.trim() !== "#") {
        page.value.quotes = 2;
      }
      if (searchKey.value.trim() === "@" || searchKey.value.trim() === "#") {
        page.value.posts = 2;
      }
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        fetchSearchResult(newValue);

        if (!isEventListenerAdded) {
          window.addEventListener("scroll", handleScroll);
          isEventListenerAdded = true;
        }
      }, 500);
      localStorage.setItem("searchKey", newValue);
    });

    const handleScroll = async () => {
      if (
        window.scrollY + window.innerHeight + 1 >=
        document.body.scrollHeight
      ) {
        const paginationPage =
          searchKey.value.trim()[0] === "@"
            ? page.value.movies
            : searchKey.value.trim()[0] === "#"
            ? page.value.quotes
            : page.value.posts;

        isLoading.value.pagination = true;
        try {
          const response = await axios.get(
            `${
              searchKey.value[0] === "@" ? "movies" : "quotes"
            }?page=${paginationPage}`,
            {
              params: {
                searchKey: searchKey.value,
              },
            }
          );

          if (response.data.posts && response.data.posts.length) {
            response.data.posts.forEach((post) => {
              posts.value.push(post);
            });

            page.value.posts++;
          } else if (response.data.movies && response.data.movies.length) {
            response.data.movies.forEach((movie) => {
              movies.value.push(movie);
            });

            page.value.movies++;
          } else if (response.data.quotes && response.data.quotes.length) {
            response.data.quotes.forEach((movie) => {
              quotes.value.push(movie);
            });

            page.value.quotes++;
          } else {
            window.removeEventListener("scroll", handleScroll);
            isEventListenerAdded = false;
            return;
          }
        } catch (error) {
          //
        } finally {
          isLoading.value.pagination = false;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    isEventListenerAdded = true;

    const setSearchKey = (val) => {
      searchKey.value = val;
    };

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      isEventListenerAdded = false;
    });



    onMounted(() => {
      fetchSearchResult(searchKey.value);
    });

    return {
      posts,
      searchKey,
      movies,
      quotes,
      messages: notificationStore.getNotifications,
      route,
      setSearchKey,
      isLoading,
    };
  },
};
</script>
