<template>
  <authorized-user-layout>
    <view-profile-description :user="user"></view-profile-description>
    <div class="mt-12 flex items-center justify-center flex-col relative mb-20">
      <h1 class="text-white text-5xl my-12">{{ $t("quotes") }}</h1>
      <div>
        <div class="flex">
          <div v-for="(quo, index) in user?.quotes" :key="quo">
            <router-link
              v-if="
                index >= (page - 1) * dataPerPage && index < page * dataPerPage
              "
              :to="{ name: 'view-quote', params: { quoteId: quo.id } }"
              class="md:mx-12 lg:mx-12 mx-2 flex flex-col items-center justify-center"
            >
              <p class="text-white mb-4">" {{ quo.quote[locale] }} "</p>
              <img
                :src="quo?.image"
                class="w-[300px] md:h-[300px] lg:h-[300px] h-[150px]"
              />
              <div
                class="md:flex lg:flex hidden items-center gap-4 mt-2 scale-[.7]"
              >
                <p class="text-white mb-4 flex text-2xl">
                  <icon-likes class="mx-2"></icon-likes> {{ quo.likes.length }}
                </p>
                <p class="text-white mb-4 flex text-2xl">
                  <icon-comments class="mx-2"></icon-comments
                  >{{ quo.comments.length }}
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div
        v-if="quotePaginationArr.length > 1"
        class="flex absolute -bottom-8 items-center justify-center"
      >
        <button
          :disabled="page === 1"
          :class="page === 1 ? 'opacity-50' : ''"
          class="text-white mr-4"
          @click="changePage(false)"
        >
          <p class="text-white text-2xl translate-x-[.9rem]">
            {{ "<".toLocaleUpperCase() }}
          </p>
        </button>
        <span
          v-for="index in getVisiblePages(quotePaginationArr)"
          :key="index"
          class="text-white text-xl mx-2"
          :class="index === page ? '' : 'opacity-60'"
          @click="setPage(index)"
        >
          <p class="cursor-pointer">{{ index }}</p>
        </span>
        <button
          :disabled="page === quotePaginationArr.length"
          :class="page === quotePaginationArr.length ? 'opacity-50' : ''"
          class="text-white ml-4"
          @click="changePage"
        >
          <p class="text-white text-2xl -translate-x-[.9rem]">
            {{ ">".toLocaleUpperCase() }}
          </p>
        </button>
      </div>
    </div>
  </authorized-user-layout>
</template>
<script>
import AuthorizedUserLayout from "@/components/layout/AuthorizedUserLayout.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getLocale } from "@/config/helpers/index";
import axios from "@/config/axios/index";
import IconLikes from "@/components/icons/IconLikes.vue";
import IconComments from "@/components/icons/IconComments.vue";
import ViewProfileDescription from "@/components/view-profile/ViewProfileDescription.vue";

export default {
  components: {
    AuthorizedUserLayout,
    IconComments,
    IconLikes,
    ViewProfileDescription,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const user = ref({});
    const dataPerPage = 3;

    const moviePaginationArr = [];
    const quotePaginationArr = [];
    const page = ref(1);
    const locale = getLocale();

    onMounted(async () => {
      try {
        const response = await axios.get(`user/${route?.params?.userId}`);
        user.value = response?.data?.user;
        user.value.quotes.reverse();

        for (
          let i = 1;
          i <= Math.floor(user.value?.movies?.length / dataPerPage) + 1;
          i++
        ) {
          moviePaginationArr.push(i);
        }
        for (
          let i = 1;
          i <= Math.floor(user.value?.quotes?.length / dataPerPage) + 1;
          i++
        ) {
          quotePaginationArr.push(i);
        }
      } catch (err) {
        if (err.response.status === 404) {
          router.back();
        }
      }
    });

    const setPage = (pg) => {
      page.value = pg;
    };

    const displayQuotes = computed(() => (quotes) => {
      const arr = [];
      for (let i = page.value; i < page.value * dataPerPage; i++) {
        arr.push(quotes[i]);
      }

      return arr;
    });

    const getVisiblePages = computed(() => (pages) => {
      let pagesToShow = [];

      for (let i = 0; i < pages.length; i++) {
        if (page.value + 4 > pages[i] && page.value - 4 < pages[i]) {
          pagesToShow.push(pages[i]);
        }
      }
      return pagesToShow;
    });

    const changePage = (increase = false) => {
      increase ? page.value++ : page.value--;
    };

    return {
      user,
      moviePaginationArr,
      quotePaginationArr,
      setPage,
      page,
      displayQuotes,
      dataPerPage,
      locale,
      getVisiblePages,
      changePage,
    };
  },
};
</script>
