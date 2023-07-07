<template>
  <div>
    <button
      class="absolute text-white right-[2rem] cursor-pointer text-[2rem]"
      @click="toggleQuoteMenu(quote?.id)"
    >
      ...
    </button>
    <div
      v-if="displayQuote[quote.id + 'quote']"
      class="p-[2.5rem] absolute text-white right-[3.5rem] z-[10] lg:translate-x-[100%] md:translate-x-[100%] translate-x-[10%] top-[2.5rem] bg-[#24222F] rounded-lg cursor-pointer"
    >
      <div class="flex items-center justify-start mb-8">
        <icon-view></icon-view>
        <router-link
          :to="{ name: 'view-quote', params: { quoteId: quote?.id } }"
          class="text-white ml-4"
          >{{ $t("view_quote") }}</router-link
        >
      </div>
      <div v-if="hasPermission" class="flex items-center justify-start mb-8">
        <icon-edit></icon-edit>
        <router-link
          :to="{ name: 'edit-quote', params: { quoteId: quote?.id } }"
          class="text-white ml-4"
          >{{ $t("edit_quote") }}</router-link
        >
      </div>
      <div
        v-if="hasPermission"
        class="flex items-center justify-start"
        @click="deleteQuote(quote.id)"
      >
        <icon-delete></icon-delete>
        <p class="text-white ml-4">{{ $t("delete_quote") }}</p>
      </div>
    </div>

    <div class="bg-[#11101A] w-full px-8 py-6">
      <div class="md:flex lg:flex items-center justify-space-evenly">
        <img
          class="w-[14rem] h-[9rem] rounded"
          :src="quote?.image"
          :alt="quote.quote[locale]"
        />
        <h3 class="text-white ml-[2.1rem] italic text-6">
          "{{ quote.quote[locale] }}"
        </h3>
      </div>
      <div class="w-full h-[0.06rem] bg-[#EFEFEF] opacity-[0.3] mt-6"></div>

      <div class="flex mt-6">
        <div class="flex">
          <p class="text-white mx-4 text-[1.25rem]">
            {{ quote?.comments?.length }}
          </p>
          <icon-comments></icon-comments>
        </div>
        <div class="flex">
          <p class="text-white mx-4 text-[1.25rem]">
            {{ quote?.likes?.length }}
          </p>
          <icon-likes></icon-likes>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLocale } from "@/config/helpers/index";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconView from "@/components/icons/IconView.vue";
import IconComments from "@/components/icons/IconComments.vue";
import IconLikes from "@/components/icons/IconLikes.vue";
export default {
  components: {
    IconEdit,
    IconDelete,
    IconComments,
    IconLikes,
    IconView,
  },
  props: {
    displayQuote: {
      type: Object,
      required: true,
    },
    quote: {
      type: Object,
      required: true,
    },
    hasPermission: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    "toggle-quote-menu": (id) => typeof id === "number",
    "delete-quote": (id) => typeof id === "number",
  },

  setup(_, { emit }) {
    const toggleQuoteMenu = (id) => {
      emit("toggle-quote-menu", id);
    };
    const locale = getLocale();

    const deleteQuote = (id) => {
      emit("delete-quote", id);
    };

    return {
      toggleQuoteMenu,
      locale,
      deleteQuote,
    };
  },
};
</script>
