<template>
  <authorized-user-layout>
    <router-view> </router-view>
    <div
      class="flex mt-8 items-center justify-center md:justify-start lg:justify-start"
    >
      <div
        class="md:bg-[#22203099] lg:bg-[#22203099] mr-6"
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
          v-model="searchKey"
          class="bg-transparent h-[50px] text-white w-full px-[20px]"
          placeholder="Enter @ to search movies, Enter # to search quotes "
          :value="searchKey"
          @input="searchKey = $event.target.value"
        />
        <button
          @click="hideSearchInput"
          class="text-white absolute curson-pointer mt-[15px] opacity-[.6] md:-translate-x-[30px] lg:-translate-x-[30px] -translate-x-[10px]"
        >
          X
        </button>
        <div class="w-full h-[0.1px] bg-[#EFEFEF] opacity-[0.3]"></div>
      </div>

      <div v-if="!isSearhOpen">
        <button
          @click="toggleSearch"
          class="text-white p-4 md:block lg:block hidden"
        >
          {{ $t("search_by") }}
        </button>
      </div>
    </div>
    <div v-if="posts">
      <div
        v-for="post in posts"
        :key="post.id"
        class="text-white md:text-[30px] lg:text-[30px] my-[22px] p-6 bg-[#11101A] rounded-xl w-[100%] md:w-[88%] lg:w-[88%]"
      >
        <div class="flex items-center">
          <img
            class="mr-[20px] w-[60px] h-[60px] rounded-full border-2 border-solid border-[#E31221]"
            :src="post?.user?.thumbnail"
          />
          <p class="text-white ml-4 text-[20px]">{{ post?.user?.username }}</p>
        </div>
        <div>
          <p class="text-white py-4">
            “{{ post?.quote[locale] }}” {{ $t("movie") }}-
            <span class="text-[#DDCCAA]"
              >{{ post?.movie?.title[locale] }}.
            </span>
            ({{ post?.movie?.release_year }})
          </p>
          <img :src="post?.image" class="w-full rounded-lg h-[500px]" />
          <div>
            <div class="flex items-center">
              <div class="flex items-center mr-6">
                <p class="text-white text-[20px]">
                  {{ post?.comments?.length || 0 }}
                </p>
                <icon-comments class="ml-3"></icon-comments>
              </div>
              <button
                @click="
                  handleLikePost(
                    post?.id,
                    post?.user_id,
                    hasUserLikedPost(post?.likes),
                    post?.likes
                  )
                "
                class="text-white flex items-center text-[20px] my-[24px]"
              >
                {{ post?.likes?.length || 0 }}
                <icon-likes
                  :isSelected="hasUserLikedPost(post?.likes)"
                  class="ml-3"
                ></icon-likes>
              </button>
            </div>

            <div v-if="post?.comments && post?.comments.length">
              <div
                class="flex items-center"
                v-for="(comment, index) in post?.comments"
                :key="comment.id"
              >
                <img
                  class="w-[52px] h-[52px] rounded-full lg:mx-6 md:mx-6 mx-2"
                  :src="comment?.user?.thumbnail"
                />
                <div class="w-[80%] mt-[35px] ml-[20px]">
                  <p class="text-white text-[20px]">
                    {{ comment?.user?.username }}
                  </p>
                  <p
                    class="text-white text-[20px] break-words w-full mt-[11px] mb-6"
                  >
                    {{ comment?.comment }}
                  </p>
                  <div
                    v-if="index != post?.comments.length - 1"
                    class="w-full h-[0.1px] bg-[#EFEFEF] opacity-[0.3] mt-[24px]"
                  ></div>
                </div>
              </div>
            </div>

            <div class="flex items-center">
              <img
                class="w-[52px] h-[52px] rounded-full lg:mx-6 md:mx-6 mx-2"
                :src="userStore.getUser.thumbnail"
              />
              <vee-validate-form
                class="w-full relative ml-[10px]"
                @submit="addComment(post?.id, post?.user_id, post?.comments)"
              >
                <Field
                  as="textarea"
                  rules="required"
                  name="comment"
                  id="comment"
                  rows="2"
                  style="background-color: #22203099"
                  class="w-full text-white bg-transparent flex p-4 h-[80px] rounded-lg mt-[8px] z-[10]"
                  :placeholder="$t('write_a_comment')"
                  :value="comment"
                  @input="setComment"
                />
                <button class="absolute right-[10px] bottom-[15px] text-white">
                  send
                </button>
              </vee-validate-form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="quotes" class="flex flex-col items-center justify-center">
      <div
        v-for="quote in quotes"
        :key="quote.id"
        class="text-white flex items-center justify-center mt-[40px] p-[50px] bg-[#11001A] w-[70%] rounded-xl"
      >
        <div class="flex flex-col items-center justify -center">
          <h3 class="text-white mb-[30px] italic">
            " {{ quote.quote[locale] }} "
          </h3>
          <img
            :src="quote.image"
            :alt="quote.quote[locale]"
            class="w-[70%] h-[400px]"
          />
        </div>
      </div>
    </div>

    <div
      v-if="movies"
      class="mt-[100px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-[50px]"
    >
      <div v-for="movie in movies" :key="movie.id">
        <movies-list-movie-card :movie="movie"></movies-list-movie-card>
      </div>
    </div>
  </authorized-user-layout>
</template>
<script>
import AuthorizedUserLayout from "@/components/layout/AuthorizedUserLayout.vue";

import { useUserStore } from "@/stores/user/index";
import { getLocale } from "@/config/helpers/index";
import { Field, Form } from "vee-validate";
import axios from "@/config/axios/index";

import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import MoviesListMovieCard from "@/components/movies-list/MoviesListMovieCard.vue";
import IconLikes from "@/components/icons/IconLikes.vue";
import IconComments from "@/components/icons/IconComments.vue";

import { useNotificationStore } from "@/stores/notification/index";

import instantiatePusher from "@/config/helpers/instantiatePusher.js";

export default {
  components: {
    AuthorizedUserLayout,
    Field,
    MoviesListMovieCard,
    VeeValidateForm: Form,
    IconLikes,
    IconComments,
  },
  setup() {
    let searchTimeout = null;
    const notificationStore = useNotificationStore();
    const posts = ref([]);
    const movies = ref([]);
    const quotes = ref([]);
    const comment = ref("");

   


    onMounted(() => {
      instantiatePusher();
      window.Echo.channel("likes").listen("UserLiked", (data) => {
        if (Object.keys(data.message).includes("comment")) {
          posts.value
            .filter((post) => post.id == data.message.comment.quote_id)[0]
            .comments.push(data.message.comment);
        }else {
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
    const page = ref({
      posts: 2,
      quotes: 2,
      movies: 2,
    });
    const searchKey = ref("");
    const isSearhOpen = ref(false);
    const locale = getLocale();
    const userStore = useUserStore();

    if (localStorage.getItem("searchKey")) {
      searchKey.value = localStorage.getItem("searchKey");
    }
    if (localStorage.getItem("isSearchOpen")) {
      isSearhOpen.value = JSON.parse(localStorage.getItem("isSearchOpen"));
    }

    const toggleSearch = () => {
      isSearhOpen.value = !isSearhOpen.value;
      localStorage.setItem("isSearchOpen", JSON.stringify(isSearhOpen.value));
    };

    const fetchSearchResult = async (search, page = 1) => {
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
          if (response.data.posts) {
            response.data.posts.forEach((post) => {
              posts.value.push(post);
            });

            page.value.posts++;
          }
          if (response.data.movies) {
            response.data.movies.forEach((movie) => {
              movies.value.push(movie);
            });

            page.value.movies++;
          }

          if (response.data.quotes) {
            response.data.quotes.forEach((movie) => {
              quotes.value.push(movie);
            });

            page.value.quotes++;
          }
        } catch (error) {
          //
        }
      }
    };

    const hideSearchInput = () => {
      isSearhOpen.value = false;
      localStorage.setItem("isSearchOpen", false);
    };

    const handleLikePost = async (
      quote_id,
      quote_user_id,
      hasAlreadyLiked,
      likes
    ) => {

      if (!hasAlreadyLiked) {
        try {
          const response = await axios.post("likes", {
            quote_id,
          });
        } catch (error) {
          //
        }
      } else {
        const likeId = likes.find(
          (like) => like.user_id === userStore.getUser.id
        ).id;
        try {
          await axios.delete(`likes/${likeId}`, {
            quote_id,
            quote_user_id,
          });

          const index = likes.findIndex((like) => like.id === likeId);
          if (index !== -1) {
            likes.splice(index, 1);
          }
        } catch (error) {
          //
        }
      }
    };

    const addComment = async (quote_id, quote_user_id, comments) => {
      try {
        await axios.post("comments", {
          quote_id,
          quote_user_id,
          comment: comment.value,
        });
      } catch (error) {
        //
      }
    };

    window.addEventListener("scroll", handleScroll);

    const setComment = (e) => {
      comment.value = e.target.value;
    };

    const hasUserLikedPost = computed(() => (likes) => {
      return likes.map((like) => like.user_id).includes(userStore.getUser.id);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    onMounted(() => {
      fetchSearchResult(searchKey.value);
    });

    return {
      posts,
      userStore,
      locale,
      isSearhOpen,
      toggleSearch,
      searchKey,
      movies,
      quotes,
      hideSearchInput,
      handleLikePost,
      hasUserLikedPost,
      setComment,
      comment,
      addComment,
      messages: notificationStore.getNotifications,
    };
  },
};
</script>
